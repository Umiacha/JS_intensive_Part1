import upperFirst from '../solution.js';

describe('upperFirst', () => {
    test('должна корректно обрабатывать обычную строку', () => {
        expect(upperFirst('привет мир')).toBe('Привет Мир');
    });

    test('должна обрабатывать строку с одним словом', () => {
        expect(upperFirst('тест')).toBe('Тест');
    });

    test('должна возвращать "Невалидные входные данные" при передаче не строки', () => {
        expect(upperFirst(123)).toBe('Невалидные входные данные');
        expect(upperFirst(null)).toBe('Невалидные входные данные');
        expect(upperFirst(undefined)).toBe('Невалидные входные данные');
        expect(upperFirst({})).toBe('Невалидные входные данные');
        expect(upperFirst([])).toBe('Невалидные входные данные');
    });

    test('должна возвращать "Невалидные входные данные" при пустой строке', () => {
        expect(upperFirst('')).toBe('Невалидные входные данные');
    });

    test('должна обрабатывать строку, начинающуюся с пробела', () => {
        expect(upperFirst(' hello world')).toBe('Hello World');
    });

    test('должна обрабатывать строку из одних пробелов', () => {
        expect(upperFirst('    ')).toBe('Невалидные входные данные');
    });

    test('должна корректно работать со спецсимволами и числами в строке', () => {
        expect(upperFirst('123abc !hello')).toBe('123abc !hello');
    });
});