class Shape {
    // Ваш код
}

class Circle {
    // Ваш код
}

class Rectangle {
    // Ваш код
}

class Triangle {
    // Ваш код
}

const shapes = [
    new Circle(5),
    new Rectangle(4, 6),
    new Triangle(3, 8),
    new Circle(9),
    new Triangle(7, 3),
    new Rectangle(2, 5),
]

for (const shape of shapes) {
    console.log(`Фигура: ${shape.getType()}, Площадь: ${shape.getArea()}`);
}

module.exports = {
    Shape,
    Circle,
    Rectangle,
    Triangle,
}