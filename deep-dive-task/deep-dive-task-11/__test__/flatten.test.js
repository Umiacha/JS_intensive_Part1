const flatten = require('../solution'); // Убедитесь, что путь к файлу указан верно

describe('flatten', () => {
    test('должна выпрямить простой двумерный массив', () => {
        expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
    });

    test('должна обрабатывать массив с произвольной вложенностью', () => {
        expect(flatten([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
    });

    test('должна возвращать исходное значение, если аргумент не массив', () => {
        expect(flatten('строка')).toBe('строка');
        expect(flatten(42)).toBe(42);
        expect(flatten({ key: 'value' })).toEqual({ key: 'value' });
    });

    test('должна возвращать пустой массив, если входной массив пустой', () => {
        expect(flatten([])).toEqual([]);
    });

    test('должна обрабатывать массив, содержащий пустые массивы', () => {
        expect(flatten([1, [], [2, [], 3]])).toEqual([1, 2, 3]);
    });

    test('должна корректно обрабатывать массив из массивов', () => {
        expect(flatten([[1], 2, [[3, 4], 5]])).toEqual([1, 2, 3, 4, 5]);
    });

    test('не должна изменять исходный массив', () => {
        const input = [1, [2, [3]]];
        const output = flatten(input);
        expect(output).not.toBe(input);
        expect(input).toEqual([1, [2, [3]]]); // исходный массив не должен измениться
    });
});