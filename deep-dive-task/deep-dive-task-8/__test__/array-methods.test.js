const processUsers = require('../solution');

describe('processUsers', () => {
    test('должна корректно обрабатывать список пользователей', () => {
        const inputUsers = [
            { firstName: 'Alice', lastName: 'Smith', age: 25 },
            { firstName: 'John', lastName: 'Doe', age: 30 },
            { firstName: 'Bob', lastName: 'Johnson', age: 17 },
            { firstName: 'Eve', lastName: 'Brown', age: 22 },
        ];

        const result = processUsers(inputUsers);

        expect(result.users).toEqual([
            { firstName: 'John', lastName: 'Doe', age: 30, fullName: 'John Doe' },
            { firstName: 'Alice', lastName: 'Smith', age: 25, fullName: 'Alice Smith' },
            { firstName: 'Eve', lastName: 'Brown', age: 22, fullName: 'Eve Brown' },
        ]);

        expect(result.avgAge).toBe((30 + 25 + 22) / 3);

        expect(result.hasJohn).toBe(true);
    });

    test('должна возвращать пустой массив, если все пользователи младше 18', () => {
        const inputUsers = [
            { firstName: 'Alice', lastName: 'Smith', age: 16 },
            { firstName: 'Bob', lastName: 'Johnson', age: 15 },
        ];

        const result = processUsers(inputUsers);

        expect(result.users).toEqual([]);
        expect(result.avgAge).toBe(0);
        expect(result.hasJohn).toBe(false);
    });

    test('должна возвращать false для hasJohn, если John отсутствует', () => {
        const inputUsers = [
            { firstName: 'Alice', lastName: 'Smith', age: 20 },
            { firstName: 'Bob', lastName: 'Johnson', age: 22 },
        ];

        const result = processUsers(inputUsers);

        expect(result.hasJohn).toBe(false);
    });

    test('должна корректно считать средний возраст при одном пользователе', () => {
        const inputUsers = [
            { firstName: 'John', lastName: 'Doe', age: 40 },
        ];

        const result = processUsers(inputUsers);

        expect(result.avgAge).toBe(40);
    });
});