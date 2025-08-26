import { Car, Helicopter, Transport } from '../solution';

describe('all', () => {
    describe('Тестирование базового класса Transport', () => {
        test('Создание объекта Transport с правильными свойствами', () => {
            const transport = new Transport(2015, 'Красный');
            expect(transport.year).toBe(2015);
            expect(transport.color).toBe('Красный');
            expect(transport.engineOn).toBe(false);
        });

        test('Метод getAge возвращает правильный возраст', () => {
            const currentYear = new Date().getFullYear();
            const transport = new Transport(2015, 'Красный');
            expect(transport.getAge()).toBe(currentYear - 2015);
        });

        test('Метод toggleEngine переключает состояние двигателя', () => {
            const transport = new Transport(2015, 'Красный');
            expect(transport.engineOn).toBe(false);
            transport.toggleEngine();
            expect(transport.engineOn).toBe(true);
            transport.toggleEngine();
            expect(transport.engineOn).toBe(false);
        });

        test('Методы getAge и toggleEngine находятся в прототипе', () => {
            const transport = new Transport(2015, 'Красный');
            expect(transport.hasOwnProperty('getAge')).toBe(false);
            expect(transport.hasOwnProperty('toggleEngine')).toBe(false);
        });
    });

    describe('Тестирование класса Car', () => {
        test('Car наследует Transport и имеет правильные свойства', () => {
            const car = new Car('Toyota', 'Camry', 'Sedan', 2018, 'Серебристый', 4);
            expect(car.brand).toBe('Toyota');
            expect(car.model).toBe('Camry');
            expect(car.type).toBe('Sedan');
            expect(car.year).toBe(2018);
            expect(car.color).toBe('Серебристый');
            expect(car.wheel).toBe(4);
            expect(car.engineOn).toBe(false);
        });

        test('Метод getInfo возвращает правильную строку', () => {
            const car = new Car('Toyota', 'Camry', 'Sedan', 2018, 'Серебристый', 4);
            const expected = `Мой автомобиль:\n Марка: Toyota\n Модель: Camry\n Тип: Sedan\n Год: 2018\n Цвет: Серебристый\n Кол-во колес: 4\n Двигатель выключен`;
            expect(car.getInfo()).toBe(expected);
        });

        test('Метод toggleEngine переключает двигатель и вызывает родительский метод', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            const car = new Car('Toyota', 'Camry', 'Sedan', 2018, 'Серебристый', 4);
            expect(car.engineOn).toBe(false);
            car.toggleEngine();
            expect(car.engineOn).toBe(true);
            expect(consoleSpy).toHaveBeenCalledWith('Тррр-тррр-тр-тртртттттттттт');

            consoleSpy.mockRestore();
        });

        test('Методы Car находятся в прототипе, а не в экземпляре', () => {
            const car = new Car('Toyota', 'Camry', 'Sedan', 2018, 'Серебристый', 4);
            expect(car.hasOwnProperty('getInfo')).toBe(false);
            expect(car.hasOwnProperty('toggleEngine')).toBe(false);
        });
    });

    describe('Тестирование класса Helicopter', () => {
        test('Helicopter наследует Transport и имеет правильные свойства', () => {
            const helicopter = new Helicopter('UH-1N', 2, 4, 1970, 'Белый');
            expect(helicopter.model).toBe('UH-1N');
            expect(helicopter.engines).toBe(2);
            expect(helicopter.rotors).toBe(4);
            expect(helicopter.year).toBe(1970);
            expect(helicopter.color).toBe('Белый');
            expect(helicopter.engineOn).toBe(false);
        });

        test('Метод getInfo возвращает правильную строку', () => {
            const helicopter = new Helicopter('UH-1N', 2, 4, 1970, 'Белый');
            const expected = `Мой вертолет:\n Модель: UH-1N\n Год: 1970\n Цвет: Белый\n Кол-во роторов: 4\n Кол-во двигателей: 2\n Двигатели выключены`;
            expect(helicopter.getInfo()).toBe(expected);
        });

        test('Метод toggleEngine переключает двигатель и вызывает родительский метод', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            const helicopter = new Helicopter('UH-1N', 2, 4, 1970, 'Белый');
            expect(helicopter.engineOn).toBe(false);
            helicopter.toggleEngine();
            expect(helicopter.engineOn).toBe(true);
            expect(consoleSpy).toHaveBeenCalledWith('Вжух-вжух-вжух-вжух-вжух-вжуууууух');

            consoleSpy.mockRestore();
        });

        test('Методы Helicopter находятся в прототипе, а не в экземпляре', () => {
            const helicopter = new Helicopter('UH-1N', 2, 4, 1970, 'Белый');
            expect(helicopter.hasOwnProperty('getInfo')).toBe(false);
            expect(helicopter.hasOwnProperty('toggleEngine')).toBe(false);
        });
    });
});
