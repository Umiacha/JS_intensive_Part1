const { createAsyncSafeIterator } = require('../solution');

describe('createAsyncSafeIterator', () => {
    test('итератор возвращает значения и пропускает ошибки', async () => {
        const promises = [
            Promise.resolve(1),
            Promise.reject('Ошибка'),
            Promise.resolve(3)
        ];

        const it = createAsyncSafeIterator(promises);

        const result1 = await it.next();
        expect(result1).toEqual({ value: 1, done: false });

        const result2 = await it.next();
        expect(result2).toEqual({ value: 3, done: false });

        const result3 = await it.next();
        expect(result3).toEqual({ value: undefined, done: true });
    });

    test('все промисы отклонены — итератор завершается сразу', async () => {
        const promises = [
            Promise.reject('Ошибка 1'),
            Promise.reject('Ошибка 2')
        ];

        const it = createAsyncSafeIterator(promises);

        const result = await it.next();
        expect(result).toEqual({ value: undefined, done: true });
    });

    test('все промисы успешны — возвращаются все значения', async () => {
        const promises = [
            Promise.resolve('A'),
            Promise.resolve('B'),
            Promise.resolve('C')
        ];

        const it = createAsyncSafeIterator(promises);

        expect(await it.next()).toEqual({ value: 'A', done: false });
        expect(await it.next()).toEqual({ value: 'B', done: false });
        expect(await it.next()).toEqual({ value: 'C', done: false });
        expect(await it.next()).toEqual({ value: undefined, done: true });
    });

    test('пустой массив — итератор завершается сразу', async () => {
        const it = createAsyncSafeIterator([]);

        const result = await it.next();
        expect(result).toEqual({ value: undefined, done: true });
    });
});
