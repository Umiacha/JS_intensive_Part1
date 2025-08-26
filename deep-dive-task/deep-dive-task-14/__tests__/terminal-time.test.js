const { start, formatTime } = require('../solution');

describe('formatTime', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setInterval');
        jest.spyOn(global, 'setTimeout');
        jest.spyOn(global, 'clearInterval');
        jest.spyOn(process.stdout, 'write').mockImplementation(() => {});
        start();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.useRealTimers();
    });

    test('should call setInterval with 1000ms', () => {
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
    });

    test('должна корректно форматировать 0 секунд', () => {
        expect(formatTime(0)).toBe('00:00:00');
    });

    test('должна корректно форматировать 5 секунд', () => {
        expect(formatTime(5)).toBe('00:00:05');
    });

    test('должна корректно форматировать 60 секунд (1 минута)', () => {
        expect(formatTime(60)).toBe('00:01:00');
    });

    test('должна корректно форматировать 3600 секунд (1 час)', () => {
        expect(formatTime(3600)).toBe('01:00:00');
    });

    test('должна корректно форматировать 3661 секунду (1 час 1 минута 1 секунда)', () => {
        expect(formatTime(3661)).toBe('01:01:01');
    });

    test('должна корректно форматировать большое количество секунд', () => {
        expect(formatTime(12345)).toBe('03:25:45');
    });
});