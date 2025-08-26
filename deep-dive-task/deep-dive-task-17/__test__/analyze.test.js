const { analyzeUsersActivity } = require('../solution');

jest.mock('../api', () => ({
    getData: jest.fn(id => Promise.resolve({ id })),
}));

describe('analyzeUsersActivity', () => {
    const { getData } = require('../api');

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('должна выбросить ошибку, если ids не передан или пуст', async () => {
        await expect(analyzeUsersActivity()).rejects.toThrow('IDs обязательный и не может быть пустым');
        await expect(analyzeUsersActivity([])).rejects.toThrow('IDs обязательный и не может быть пустым');
    });

    test('должна успешно обработать все успешные запросы', async () => {
        const mockData = (id) => ({ id, name: `User ${ id }` });

        getData.mockImplementation(id => { return new Promise(resolve => { setTimeout(() => resolve(mockData(id)), 100) } )});

        const result = await analyzeUsersActivity([1, 2, 3]);

        expect(result.summary).toEqual({
            total: 3,
            successful: 3,
            failed: 0,
            timedOut: 0
        });

        result.data.forEach(item => {
            expect(item.status).toBe('fulfilled');
            expect(item.duration).toBeGreaterThan(0);
            expect(item.error).toBeNull();
        });
    });

    test('должна обработать таймауты', async () => {
        // Имитируем зависание промиса
        getData.mockImplementation(() => new Promise(() => {})); // never resolves

        const result = await analyzeUsersActivity([1, 2]);

        expect(result.summary).toEqual({
            total: 2,
            successful: 0,
            failed: 0,
            timedOut: 2
        });

        result.data.forEach(item => {
            expect(item.status).toBe('timeout');
            expect(item.duration).toBeGreaterThanOrEqual(500);
            expect(item.error.message).toBe('Timeout');
        });
    });

    test('должна обработать ошибки', async () => {
        getData.mockImplementation(() => Promise.reject(new Error('Network error')));

        const result = await analyzeUsersActivity([1, 2, 3]);

        expect(result.summary).toEqual({
            total: 3,
            successful: 0,
            failed: 3,
            timedOut: 0
        });

        result.data.forEach(item => {
            expect(item.status).toBe('rejected');
            expect(item.error.message).toBe('Network error');
        });
    });

    test('должна обработать смешанные результаты (успех, ошибка, таймаут)', async () => {
        getData
            .mockImplementationOnce(() => Promise.resolve({ id: 1, name: 'Alice' })) // success
            .mockImplementationOnce(() => new Promise(() => {})) // timeout
            .mockImplementationOnce(() => Promise.reject(new Error('Server error'))); // error

        const result = await analyzeUsersActivity([1, 2, 3]);

        expect(result.summary).toEqual({
            total: 3,
            successful: 1,
            failed: 1,
            timedOut: 1
        });

        expect(result.data[0].status).toBe('fulfilled');
        expect(result.data[1].status).toBe('timeout');
        expect(result.data[2].status).toBe('rejected');
    });
});
