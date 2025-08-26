const flattenWithConfig = require('../solution');

describe('flattenWithConfig', () => {
    test('должна возвращать сплющенный массив без конфига', () => {
        expect(flattenWithConfig([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
    });

    test('должна возвращать только уникальные элементы', () => {
        expect(flattenWithConfig([1, [2, 2, [3]]], { onlyUniq: true })).toEqual([1, 2, 3]);
    });

    test('должна возвращать только дубликаты', () => {
        expect(flattenWithConfig([1, [2, 2, [3, 3, 3]]], { onlyDuplicates: true })).toEqual([2, 3, 3]);
    });

    test('должна возвращать ошибку при одновременном указании onlyUniq и onlyDuplicates', () => {
        expect(flattenWithConfig([1, 2, [3]], { onlyUniq: true, onlyDuplicates: true })).toBe(
            'Ошибка: нельзя использовать только уникальные и только дубликаты одновременно'
        );
    });

    test('должна возвращать сплющенный массив с указанной глубиной', () => {
        expect(flattenWithConfig([1, [2, [3]], [2, [3, [4]]]])).toEqual([1, 2, 3, 2, 3, 4]);
        expect(flattenWithConfig([1, [2, [3]], [2, [3, [4]]]], { depth: 1 })).toEqual([1, 2, [3], 2, [3, [4]]]);
        expect(flattenWithConfig([1, [2, [3]], [2, [3, [4]]]], { depth: 2 })).toEqual([1, 2, 3, 2, 3, [4]]);
        expect(flattenWithConfig([1, [2, [3]], [2, [3, [4]]]], { depth: 3 })).toEqual([1, 2, 3, 2, 3, 4]);
    });

    test('должна обрабатывать не массив', () => {
        expect(flattenWithConfig('не массив', {})).toBe('не массив');
    });

    test('должна обрабатывать вложенные объекты и сохранять уникальность', () => {
        const input = [[{ a: 1 }, { a: 2 }], { a: 1 }];
        const result = flattenWithConfig(input, { onlyUniq: true });
        expect(result).toEqual([{ a: 1 }, { a: 2 }]);
    });
});