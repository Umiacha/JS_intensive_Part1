import Car from '../solution';

describe('Тестирование конструктора Car', () => {
    test('Создание объекта Car с правильными свойствами', () => {
        const myToyota = new Car('Toyota', 'Camry', 2020, 'черный');
        expect(myToyota.brand).toBe('Toyota');
        expect(myToyota.model).toBe('Camry');
        expect(myToyota.year).toBe(2020);
        expect(myToyota.color).toBe('черный');
    });

    test('Метод getInfo возвращает правильную строку', () => {
        const myToyota = new Car('Toyota', 'Camry', 2020, 'черный');
        const expectedString = 'Марка: Toyota, Модель: Camry, Год: 2020, Цвет: черный';
        expect(myToyota.getInfo()).toBe(expectedString);
    });

    test('Метод getAge возвращает правильный возраст автомобиля', () => {
        const currentYear = new Date().getFullYear();
        const myNissan = new Car('Nissan', 'Sentra', 2018, 'белый');
        expect(myNissan.getAge()).toBe(currentYear - 2018);
    });

    test('Метод getAge находится в прототипе, а не в экземпляре', () => {
        const myToyota = new Car('Toyota', 'Camry', 2020, 'черный');
        expect(myToyota.hasOwnProperty('getAge')).toBe(false);
        expect(typeof myToyota.getAge).toBe('function');
    });
});