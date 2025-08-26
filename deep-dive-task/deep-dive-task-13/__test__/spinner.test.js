const { start } = require('../solution');
const { write } = process.stdout;

describe('Spinner tests', () => {
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

    test('should call setInterval with 200ms', () => {
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 200);
    });

    test('should call setTimeout with 5000ms', () => {
        expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 5000);
    });

    test('should write to stdout with spinner character', () => {
        const mockCallback = setInterval.mock.calls[0][0];
        process.stdout.write.mockClear();
        mockCallback();
        expect(process.stdout.write).toHaveBeenCalledWith(`\r/ `);
    });

    test('should clear interval and write final newline after 5000ms', () => {
        const mockCallback = setTimeout.mock.calls[0][0];
        mockCallback();
        expect(clearInterval).toHaveBeenCalled();
        expect(process.stdout.write).toHaveBeenCalledWith('\r');
    });
});