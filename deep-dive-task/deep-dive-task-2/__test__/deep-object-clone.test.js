import deepObjectClone from '../solution';

describe('deepObjectClone', () => {
    test('должна клонировать простой объект', () => {
        const obj = { a: 1, b: { c: 2 } };
        const clone = deepObjectClone(obj);
        clone.b.c = 100;
        expect(obj.b.c).toBe(2);
    });

    test('должна клонировать массив', () => {
        const arr = [1, [2, 3], 4];
        const clone = deepObjectClone(arr);
        clone[1][0] = 100;
        expect(arr[1][0]).toBe(2);
    });

    test('должна обрабатывать вложенные объекты', () => {
        const obj = { a: { b: { c: { d: 5 } } }, e: 10 };
        const clone = deepObjectClone(obj);
        clone.a.b.c.d = 999;
        expect(obj.a.b.c.d).toBe(5);
    });

    test('должна возвращать примитив без изменений', () => {
        expect(deepObjectClone(null)).toBe(null);
        expect(deepObjectClone(42)).toBe(42);
        expect(deepObjectClone('hello')).toBe('hello');
        expect(deepObjectClone(undefined)).toBe(undefined);
    });

    test('должна клонировать массив с объектами', () => {
        const arr = [
            { name: 'Alice', skills: ['JS', 'CSS'] },
            { name: 'Bob', skills: ['HTML', 'React'] }
        ];
        const clone = deepObjectClone(arr);
        clone[0].skills.push('TS');
        expect(arr[0].skills.length).toBe(2);
    });

    test('должна клонировать пустой объект', () => {
        const obj = {};
        const clone = deepObjectClone(obj);
        expect(clone).toEqual(obj);
    });

    test('должна клонировать пустой массив', () => {
        const arr = [];
        const clone = deepObjectClone(arr);
        expect(clone).toEqual(arr);
    });

    test('должна клонировать функцию внутри объекта', () => {
        const obj = { greet: function () { return 'Hello'; } };
        const clone = deepObjectClone(obj);
        expect(clone.greet).toBeTruthy();
    });

    test('должна возвращать разные ссылки для объектов', () => {
        const obj = { a: 1 };
        const clone = deepObjectClone(obj);
        expect(clone).not.toBe(obj);
    });

    test('должна возвращать разные ссылки для массивов', () => {
        const arr = [1, 2, 3];
        const clone = deepObjectClone(arr);
        expect(clone).not.toBe(arr);
    });
});