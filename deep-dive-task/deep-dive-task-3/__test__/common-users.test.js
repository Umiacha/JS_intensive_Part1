import findCommonUsers from '../solution'

describe('findCommonUsers', () => {
    test('должна возвращать пользователей по одному интересу', () => {
        const result = findCommonUsers('reading');
        expect(result).toBe('reading: John, Bob\n');
    });

    test('должна возвращать пользователей по нескольким интересам', () => {
        const result = findCommonUsers('reading', 'hiking');
        expect(result).toBe('reading: John, Bob\nhiking: John, Alice, Eve\n');
    });

    test('должна обрабатывать интересы с отсутствующими пользователями', () => {
        const result = findCommonUsers('coding', 'art');
        expect(result).toBe('coding: John, Alice, Bob, Charlie\nart: нет пользователей с таким интересом\n');
    });

    test('должна обрабатывать вложенные массивы интересов', () => {
        const result = findCommonUsers(['swimming', 'art'], ['coding', 'art']);
        expect(result).toBe('swimming: имеет только один пользователь Charlie\nart: нет пользователей с таким интересом\ncoding: John, Alice, Bob, Charlie\n');
    });

    test('должна обрабатывать вложенные массивы любой глубины', () => {
        const result = findCommonUsers(['reading', ['hiking', ['coding', ['art']]]]);
        expect(result).toBe('reading: John, Bob\nhiking: John, Alice, Eve\ncoding: John, Alice, Bob, Charlie\nart: нет пользователей с таким интересом\n');
    });

    test('должна обрабатывать интерес, у которого только один пользователь', () => {
        const result = findCommonUsers('swimming');
        expect(result).toBe('swimming: имеет только один пользователь Charlie\n');
    });

    test('должна обрабатывать интерес, у которого нет пользователей', () => {
        const result = findCommonUsers('dancing');
        expect(result).toBe('dancing: нет пользователей с таким интересом\n');
    });

    test('должна возвращать пустую строку при отсутствии аргументов', () => {
        const result = findCommonUsers();
        expect(result).toBe('');
    });
});