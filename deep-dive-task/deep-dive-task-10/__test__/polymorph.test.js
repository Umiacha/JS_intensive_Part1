const { Shape, Circle, Rectangle, Triangle } = require('../solution');

describe('all', () => {
    describe('Тестирование базового класса Shape', () => {
        test('Создание объекта Shape с заданным типом', () => {
            const shape = new Shape('Фигура');
            expect(shape.getType()).toBe('Фигура');
        });
    });

    describe('Тестирование класса Circle', () => {
        test('Circle наследует Shape и имеет тип "Круг"', () => {
            const circle = new Circle(5);
            expect(circle.getType()).toBe('Круг');
        });

        test('Метод getArea возвращает правильную площадь круга', () => {
            const circle = new Circle(5);
            const area = Math.PI * 5 ** 2;
            expect(circle.getArea()).toBeCloseTo(area, 5); // Проверка с точностью до 5 знаков
        });

        test('Circle имеет свойство radius', () => {
            const circle = new Circle(5);
            expect(circle.radius).toBe(5);
        });
    });

    describe('Тестирование класса Rectangle', () => {
        test('Rectangle наследует Shape и имеет тип "Прямоугольник"', () => {
            const rectangle = new Rectangle(4, 6);
            expect(rectangle.getType()).toBe('Прямоугольник');
        });

        test('Метод getArea возвращает правильную площадь прямоугольника', () => {
            const rectangle = new Rectangle(4, 6);
            expect(rectangle.getArea()).toBe(24);
        });

        test('Rectangle имеет свойства width и height', () => {
            const rectangle = new Rectangle(4, 6);
            expect(rectangle.width).toBe(4);
            expect(rectangle.height).toBe(6);
        });
    });

    describe('Тестирование класса Triangle', () => {
        test('Triangle наследует Shape и имеет тип "Треугольник"', () => {
            const triangle = new Triangle(3, 8);
            expect(triangle.getType()).toBe('Треугольник');
        });

        test('Метод getArea возвращает правильную площадь треугольника', () => {
            const triangle = new Triangle(3, 8);
            expect(triangle.getArea()).toBe(12);
        });

        test('Triangle имеет свойства base и height', () => {
            const triangle = new Triangle(3, 8);
            expect(triangle.base).toBe(3);
            expect(triangle.height).toBe(8);
        });
    });
});
