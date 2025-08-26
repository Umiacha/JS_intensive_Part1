const deepArrayEqualTest = require('../solution');

describe('deepArrayEqual', () => {
    test('должна возвращать true для идентичных массивов', () => {
        expect(deepArrayEqualTest([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    test('должна возвращать true для одинаковых вложенных массивов', () => {
        expect(deepArrayEqualTest([1, [2, 3], 4], [1, [2, 3], 4])).toBe(true);
    });

    test('должна возвращать false для разных элементов', () => {
        expect(deepArrayEqualTest([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    test('должна возвращать false для разных длин массивов', () => {
        expect(deepArrayEqualTest([1, 2], [1, 2, 3])).toBe(false);
    });

    test('должна возвращать false, если один из аргументов не массив', () => {
        expect(deepArrayEqualTest('not array', [1, 2, 3])).toBe(false);
        expect(deepArrayEqualTest([1, 2, 3], { a: 1 })).toBe(false);
    });

    test('должна корректно обрабатывать многократно вложенные массивы', () => {
        expect(deepArrayEqualTest([1, [2, [3, 4]]], [1, [2, [3, 4]]])).toBe(true);
        expect(deepArrayEqualTest([1, [2, [3, 4]]], [1, [2, [4, 3]]])).toBe(false);
        expect(deepArrayEqualTest([1, [2, [3, 4, '5']]], [1, [2, [3, 4, '5']]])).toBe(true);
    });

    test('должна возвращать true для пустых массивов', () => {
        expect(deepArrayEqualTest([], [])).toBe(true);
    });

    test('должна возвращать false, если один из элементов вложенного массива не совпадает по типу', () => {
        expect(deepArrayEqualTest([1, [2]], [1, 2])).toBe(false);
    });
});