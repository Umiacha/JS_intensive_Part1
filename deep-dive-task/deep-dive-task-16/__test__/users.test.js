const { getFastestUser } = require('../solution');

// Мокаем модуль './users'
jest.mock('../api', () => ({
    getUser: jest.fn(id => Promise.resolve({ id })),
    getUserData: jest.fn(user => Promise.resolve({ ...user, name: `User ${ user.id }` })),
}));

describe('getFastestUser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('должна вернуть данные самого быстрого пользователя', async () => {
        // Переопределяем getUserData, чтобы имитировать разное время выполнения
        const mockUserData = (user) => new Promise(resolve => {
            const delay = user.id === 2 ? 10 : 100; // ID=2 будет самым быстрым
            setTimeout(() => resolve({ id: user.id, name: `User ${ user.id }` }), delay);
        });

        const { getUserData } = require('../api');
        getUserData.mockImplementation(mockUserData);

        const result = await getFastestUser([1, 2, 3]);

        expect(result).toEqual({
            id: 2,
            name: 'User 2',
        });

        expect(result.id).toBe(2);
    });

    test('должна вызвать getUser для каждого id', async () => {
        const { getUser } = require('../api');

        await getFastestUser([10, 20]);

        expect(getUser).toHaveBeenCalledWith(10);
        expect(getUser).toHaveBeenCalledWith(20);
        expect(getUser).toHaveBeenCalledTimes(2);
    });

    test('должна вызвать getUserData для каждого пользователя', async () => {
        const { getUserData } = require('../api');

        await getFastestUser([1, 2]);

        expect(getUserData).toHaveBeenCalledTimes(2);
    });

    test('должна объединить данные из getUser и getUserData', async () => {
        const { getUser, getUserData } = require('../api');

        // Мокаем конкретные значения
        getUser.mockImplementation(id => Promise.resolve({ id, role: 'user' }));
        getUserData.mockImplementation(user => Promise.resolve({ id: user.id, name: `ID_${ user.id }`, status: 'active' }));

        const result = await getFastestUser([1, 2, 3, 4]);

        expect(result).toEqual({
            id: 1,
            role: 'user',
            name: 'ID_1',
            status: 'active',
        });
    });

    test('должна обработать пустой массив', async () => {
        await expect(getFastestUser([])).rejects.toThrow();
    });
});