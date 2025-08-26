const {describe, test, beforeEach, afterEach} = require('@jest/globals');
const {jest: requiredJest} = require('@jest/globals');
const readline = require('readline');
const {startCalculator, rl, operators} = require('../solution');

jest.mock('readline');

const {createInterface} = readline;

let mockInterface;
let consoleOutput = [];
let questionCallbacks = [];
let closeHandler;

beforeEach(() => {
    consoleOutput = [];
    jest.spyOn(console, 'log').mockImplementation((...args) => {
        consoleOutput.push(...args);
    });

    questionCallbacks = [];
    closeHandler = null;

    mockInterface = {
        question: jest.fn((prompt, callback) => {
            questionCallbacks.push(callback);
        }),
        on: jest.fn((event, handler) => {
            if (event === 'close') closeHandler = handler;
        }),
        close: jest.fn(() => {
            if (closeHandler) closeHandler();
        }),
    };

    createInterface.mockImplementation(() => mockInterface);
});

afterEach(() => {
    console.log.mockRestore();
});

// Helper function for emulating input
function simulateInput(input) {
    const callback = questionCallbacks.shift();
    if (callback) callback(input);
}

describe('startCalculator', () => {
    test('должен вывести приветственное сообщение при запуске', () => {
        startCalculator();
        expect(consoleOutput).toContain("Калькулятор запущен (введите 'exit' для выхода)");
    });

    describe('ввод некорректного числа выводит ошибку', () => {
        test('Ввод до оператора', () => {
            startCalculator();
            simulateInput('abc');
            expect(consoleOutput).toContain('Некорректное значение');
        });

        test('Ввод после оператора', () => {
            startCalculator();
            simulateInput('1');
            simulateInput('+');
            simulateInput('qwe');
            expect(consoleOutput).toContain('Некорректное значение');
        });
    });

    test('ввод неверного оператора выводит ошибку', () => {
        startCalculator();
        simulateInput('5');
        simulateInput('%');
        expect(consoleOutput).toContain('Неверный оператор');
    });

    test('деление на ноль выводит ошибку', () => {
        startCalculator();
        simulateInput('10');
        simulateInput('/');
        simulateInput('0');
        expect(consoleOutput).toContain('Деление на ноль');
    });

    test('ввод exit должен завершить калькулятор', () => {
        startCalculator();
        simulateInput('exit');
        expect(createInterface().close).toHaveBeenCalled();
    });

    describe('Арифметические операции с целыми числами', () => {
        const testCases = [
            {name: 'Сложение целых чисел', a: 1, b: 2, op: '+', result: 3},
            {name: 'Вычитание целых чисел', a: 5, b: 3, op: '-', result: 2},
            {name: 'Умножение целых чисел', a: 2, b: 3, op: '*', result: 6},
            {name: 'Деление целых чисел', a: 10, b: 2, op: '/', result: 5},
            {name: 'Сложение отрицательного и положительного', a: -5, b: 3, op: '+', result: -2},
            {name: 'Сложение положительного и отрицательного', a: 3, b: -5, op: '+', result: -2},
            {name: 'Вычитание двух отрицательных', a: -10, b: -5, op: '-', result: -5},
            {name: 'Умножение отрицательного и положительного', a: -2, b: 3, op: '*', result: -6},
            {name: 'Деление отрицательного на положительное', a: -10, b: 2, op: '/', result: -5},
            {name: 'Сложение нуля с положительным', a: 0, b: 5, op: '+', result: 5},
            {name: 'Сложение положительного с нулём', a: 5, b: 0, op: '+', result: 5},
            {name: 'Сложение двух нулей', a: 0, b: 0, op: '+', result: 0},
            {name: 'Вычитание положительного из нуля', a: 0, b: 5, op: '-', result: -5},
            {name: 'Вычитание нуля из положительного', a: 5, b: 0, op: '-', result: 5},
            {name: 'Умножение нуля на число', a: 0, b: 5, op: '*', result: 0},
            {name: 'Умножение числа на ноль', a: 5, b: 0, op: '*', result: 0},
            {name: 'Деление нуля на число', a: 0, b: 5, op: '/', result: 0},
            {name: 'Деление числа на ноль', a: 5, b: 0, op: '/', error: 'Деление на ноль'},
            {name: 'Деление нуля на ноль', a: 0, b: 0, op: '/', error: 'Деление на ноль'},
            {name: 'Сложение дробей без целой части', a: '.5', b: '.5', op: '+', result: 1},
            {
                name: 'Сложение отрицательной и положительной дроби без целой части',
                a: '-.25',
                b: '.5',
                op: '+',
                result: 0.25
            },
            {name: 'Сложение малых десятичных дробей', a: '0.2', b: '0.1', op: '+', result: 0.3},
        ];

        test.each(testCases)(
            '$name',
            ({a, b, op, result, error}) => {
                startCalculator();
                simulateInput(a.toString());
                simulateInput(op);
                simulateInput(b.toString());

                if (error) {
                    expect(consoleOutput).toContain(error);
                } else {
                    expect(consoleOutput).toContain(`Результат: ${result}`);
                }
            }
        );
    });

    describe('Арифметические операции с дробными числами', () => {
        const testCases = [
            {name: 'Сложение дробей с округлением результата', a: 0.123456, b: 0.654321, op: '+', result: 0.77778},
            {name: 'Сложение дробей с округлением результата', a: 0.111111, b: 0.222222, op: '+', result: 0.33333},
            {name: 'Вычитание дробей без округления результата', a: 0.3, b: 0.1, op: '-', result: 0.2},
            {name: 'Вычитание дробей с округлением результата', a: 0.654321, b: 0.123456, op: '-', result: 0.53087},
            {name: 'Умножение дробей без округления результата', a: 0.1, b: 0.1, op: '*', result: 0.01},
            {name: 'Умножение дробей с округлением результата', a: 0.12345, b: 0.6789, op: '*', result: 0.08381},
            {name: 'Деление целого без округления результата', a: 1, b: 3, op: '/', result: 0.33333},
            {name: 'Деление целых с округлением результата', a: 10, b: 3, op: '/', result: 3.33333},
            {name: 'Деление дробей без округления', a: 0.1, b: 0.3, op: '/', result: 0.33333},
            {name: 'Деление дробей с округлением', a: 0.00001, b: 0.1, op: '/', result: 0.0001},
        ];

        test.each(testCases)('$name', ({a, b, op, result, error}) => {
            startCalculator();
            simulateInput(a.toString());
            simulateInput(op);
            simulateInput(b.toString());

            if (error) {
                expect(consoleOutput).toContain(error);
            } else {
                expect(consoleOutput).toContain(`Результат: ${result}`);
            }
        });
    });

    test('последовательные вычисления должны работать корректно', () => {
        startCalculator();

        // Первое вычисление: 5 + 3
        simulateInput('5');
        simulateInput('+');
        simulateInput('3');

        // Второе вычисление: 8 * 2
        simulateInput('8');
        simulateInput('*');
        simulateInput('2');

        const results = consoleOutput.filter(line => line.startsWith('Результат: '));
        expect(results).toHaveLength(2);
        expect(results[0]).toMatch(/Результат: 8/);
        expect(results[1]).toMatch(/Результат: 16/);
    });
});