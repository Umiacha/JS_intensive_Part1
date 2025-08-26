import { describe, jest } from '@jest/globals';
import * as readline from 'readline';
import startCalculator from '../solution.js';

jest.mock('readline');

const { createInterface } = readline;

let consoleOutput = [];
let mockQuestionHandler;
let closeHandler;

beforeEach(() => {
  consoleOutput = [];
  jest.spyOn(console, 'log').mockImplementation((...args) => {
    consoleOutput.push(...args);
  });

  mockQuestionHandler = null;
  closeHandler = null;

  createInterface.mockImplementation(() => ({
    question: (prompt, callback) => {
      mockQuestionHandler = callback;
    },
    on: jest.fn((event, handler) => {
      if (event === 'close') {
        closeHandler = handler;
      }
    }),
    close: jest.fn(() => {
      if (closeHandler) closeHandler();
    }),
  }));
});

afterEach(() => {
  console.log.mockRestore();
});

describe('startCalculator', () => {
  test('должен вывести приветственное сообщение при запуске', () => {
    startCalculator();
    expect(consoleOutput).toContain("Калькулятор запущен (введите 'exit' для выхода)");
  });

  describe('ввод некорректного числа выводит ошибку', () => {
    it('Ввод до оператора', () => {
      startCalculator();

      mockQuestionHandler('abc');

      expect(consoleOutput).toContain('Некорректное значение');
    });

    it('Ввод после оператора', () => {
      startCalculator();

      mockQuestionHandler('1');
      mockQuestionHandler('+');
      mockQuestionHandler('qwe');

      expect(consoleOutput).toContain('Некорректное значение');
    });
  });

  test('ввод неверного оператора выводит ошибку', () => {
    startCalculator();

    mockQuestionHandler('5');
    mockQuestionHandler('%');

    expect(consoleOutput).toContain('Неверный оператор');
  });

  test('деление на ноль выводит ошибку', () => {
    startCalculator();

    mockQuestionHandler('10');
    mockQuestionHandler('/');
    mockQuestionHandler('0');

    expect(consoleOutput).toContain('Деление на ноль');
  });

  test('ввод exit должен завершить калькулятор', () => {
    startCalculator();

    mockQuestionHandler('exit');

    expect(consoleOutput).toContain('Калькулятор завершен');
  });

  describe('Арифметические операции с целыми числами', () => {
    const testCases = [
        // ——————— Целые числа ———————
        { name: 'Сложение целых чисел', a: 1, b: 2, op: '+', result: 3 },
        { name: 'Вычитание целых чисел', a: 5, b: 3, op: '-', result: 2 },
        { name: 'Умножение целых чисел', a: 2, b: 3, op: '*', result: 6 },
        { name: 'Деление целых чисел', a: 10, b: 2, op: '/', result: 5 },
        
        // // ——————— Отрицательные числа ———————
        { name: 'Сложение отрицательного и положительного', a: -5, b: 3, op: '+', result: -2 },
        { name: 'Сложение положительного и отрицательного', a: 3, b: -5, op: '+', result: -2 },
        { name: 'Вычитание двух отрицательных', a: -10, b: -5, op: '-', result: -5 },
        { name: 'Умножение отрицательного и положительного', a: -2, b: 3, op: '*', result: -6 },
        { name: 'Деление отрицательного на положительное', a: -10, b: 2, op: '/', result: -5 },
        
        // ——————— Ноль ———————
        { name: 'Сложение нуля с положительным', a: 0, b: 5, op: '+', result: 5 },
        { name: 'Сложение положительного с нулём', a: 5, b: 0, op: '+', result: 5 },
        { name: 'Сложение двух нулей', a: 0, b: 0, op: '+', result: 0 },
        { name: 'Вычитание положительного из нуля', a: 0, b: 5, op: '-', result: -5 },
        { name: 'Вычитание нуля из положительного', a: 5, b: 0, op: '-', result: 5 },
        { name: 'Умножение нуля на число', a: 0, b: 5, op: '*', result: 0 },
        { name: 'Умножение числа на ноль', a: 5, b: 0, op: '*', result: 0 },
        { name: 'Деление нуля на число', a: 0, b: 5, op: '/', result: 0 },
        { name: 'Деление числа на ноль', a: 5, b: 0, op: '/', error: 'Деление на ноль' },
        { name: 'Деление нуля на ноль', a: 0, b: 0, op: '/', error: 'Деление на ноль' },
        
        // ——————— Дроби без целой части ———————
        { name: 'Сложение дробей без целой части', a: '.5', b: '.5', op: '+', result: 1 },
        { name: 'Сложение отрицательной и положительной дроби без целой части', a: '-.25', b: '.5', op: '+', result: 0.25 },
        { name: 'Сложение малых десятичных дробей', a: '0.2', b: '0.1', op: '+', result: 0.3 },
    ];
  
    it.each(testCases)(
      '$name',
      ({ a, b, op, result, error }) => {
        startCalculator();
  
        mockQuestionHandler(a.toString());
        mockQuestionHandler(op);
        mockQuestionHandler(b.toString());
  
        if (error) {
          expect(consoleOutput).toContain(error);
        } else {
          const expected = new RegExp(`^Результат: ${result}(\\.\\d+)?$`);
          expect(consoleOutput).toEqual(expect.arrayContaining([
            expect.stringMatching(expected)
          ]));
        }
      }
    );
  });

  describe('Арифметические операции с дробными числами', () => {
    const testCases = [
        // ——————— Округление результата ———————
        { name: 'Сложение дробей с округлением результата', a: 0.123456, b: 0.654321, op: '+', result: 0.77778 },
        { name: 'Сложение дробей с округлением результата', a: 0.111111, b: 0.222222, op: '+', result: 0.33333 },
      
        // ——————— Вычитание ———————
        { name: 'Вычитание дробей без округления результата', a: 0.3, b: 0.1, op: '-', result: 0.2 },
        { name: 'Вычитание дробей с округлением результата', a: 0.654321, b: 0.123456, op: '-', result: 0.53087 },
      
        // ——————— Умножение ———————
        { name: 'Умножение дробей без округления результата', a: 0.1, b: 0.1, op: '*', result: 0.01 },
        { name: 'Умножение дробей с округлением результата', a: 0.12345, b: 0.6789, op: '*', result: 0.08381 },
      
        // ——————— Деление ———————
        { name: 'Деление целого без округления результата', a: 1, b: 3, op: '/', result: 0.33333 },
        { name: 'Деление целых с округлением результата', a: 10, b: 3, op: '/', result: 3.33333 },
        { name: 'Деление дробей без округления', a: 0.1, b: 0.3, op: '/', result: 0.33333 },
        { name: 'Деление дробей с округлением', a: 0.00001, b: 0.1, op: '/', result: 0.0001 },
      ];

      test.each(testCases)('$name', ({ a, b, op, result, error }) => {
        startCalculator();
  
        mockQuestionHandler(a.toString());
        mockQuestionHandler(op);
        mockQuestionHandler(b.toString());
  
        if (error) {
          expect(consoleOutput).toContain(error);
        } else {
          const expected = new RegExp(`^Результат: ${result}(\\.\\d+)?$`);
          expect(consoleOutput).toEqual(expect.arrayContaining([
            expect.stringMatching(expected)
          ]));
        }
      });

})

  test('последовательные вычисления должны работать корректно', () => {
    startCalculator();

    mockQuestionHandler('5');
    mockQuestionHandler('+');
    mockQuestionHandler('3');
    mockQuestionHandler('*');
    mockQuestionHandler('2');

    const results = consoleOutput.filter(line => line.startsWith('Результат: '));
    expect(results).toHaveLength(2);
    expect(results[0]).toEqual(expect.stringMatching(/^Результат: 8(\.0+)?$/));
    expect(results[1]).toEqual(expect.stringMatching(/^Результат: 16(\.0+)?$/));
  });
});