const processNumbers = require('../solution');

describe('processNumbers', () => {
    test('обрабатывает обычный массив чисел', () => {
        const input = [1, 2, 2, 3, 4];
        const result = processNumbers(input);

        expect(result.multiplied).toEqual([2, 4, 4, 6, 8]);
        expect(result.unique).toEqual([1, 2, 3, 4]);
        expect(result.even).toEqual([2, 2, 4]);
        expect(result.sum).toBe(12);
        expect(result.hasNegative).toBe(false);
        expect(result.firstOver100).toBeUndefined();
    });

    test('выводит сообщение, если входной параметр не массив', () => {
        expect(processNumbers('не массив')).toBe('Входной параметр должен быть массивом');
    });

    test('выводит сообщение, если массив содержит нечисловые значения', () => {
        expect(processNumbers([1, 'два', 3])).toBe('Входной параметр должен быть массивом из чисел');
    });

    test('обрабатывает отрицательные числа', () => {
        const input = [-1, 2, -3, 4];
        const result = processNumbers(input);
        expect(result.hasNegative).toBe(true);
    });

    test('находит первое число больше 100', () => {
        const input = [10, 50, 150, 20];
        const result = processNumbers(input);
        expect(result.firstOver100).toBe(150);
    });

    test('возвращает undefined, если чисел больше 100 нет', () => {
        const input = [10, 50, 99];
        const result = processNumbers(input);
        expect(result.firstOver100).toBeUndefined();
    });

    test('суммирует числа, включая ноль', () => {
        const input = [0, 0, 0];
        const result = processNumbers(input);
        expect(result.sum).toBe(0);
    });

    test('обрабатывает пустой массив', () => {
        const input = [];
        const result = processNumbers(input);
        expect(result.multiplied).toEqual([]);
        expect(result.unique).toEqual([]);
        expect(result.even).toEqual([]);
        expect(result.sum).toBe(0);
        expect(result.hasNegative).toBe(false);
        expect(result.firstOver100).toBeUndefined();
    });

    test('обрабатывает дубликаты и правильно извлекает уникальные значения', () => {
        const input = [5, 5, 5, 5];
        const result = processNumbers(input);
        expect(result.unique).toEqual([5]);
    });

    test('фильтрует только четные числа', () => {
        const input = [1, 3, 5, 7];
        const result = processNumbers(input);
        expect(result.even).toEqual([]);
    });
});
