const { fetchWithTimeout } = require('../solution'); // замените на реальный путь

// Включаем фейковые таймеры Jest
jest.useFakeTimers();

describe('fetchWithTimeout', () => {
    beforeEach(() => {
        jest.clearAllTimers();
    });

    test('должен отклонить промис, если время истекло', async () => {
        const neverResolvedPromise = new Promise(() => {}); // никогда не резолвится

        const resultPromise = fetchWithTimeout(neverResolvedPromise, 1000);

        jest.advanceTimersByTime(1000); // эмулируем истечение таймаута

        await expect(resultPromise).rejects.toBe('Время истекло');
    });

    test('должен разрешить промис, если он завершился до таймаута', async () => {
        const slowPromise = new Promise(resolve => setTimeout(resolve, 3000, 'Готово'));

        const result = fetchWithTimeout(slowPromise, 5000);
        jest.advanceTimersByTime(3000); // эмулируем завершение промиса

        await expect(result).resolves.toBe('Готово');
    });

    test('не должен вызвать таймаут, если промис завершился раньше', async () => {
        const fastPromise = Promise.resolve('Быстро');

        await expect(fetchWithTimeout(fastPromise, 5000)).resolves.toBe('Быстро');
        // Убеждаемся, что даже без вызова jest.advanceTimersByTime всё работает
    });
});