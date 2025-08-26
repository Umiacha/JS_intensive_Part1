function Transport(year, color) {
}

function Car(brand, model, type, year, color) {
}

function Helicopter(model, engines, rotors, year, color) {
}

const myCar = new Car('Toyota', 'Corolla', 'Sedan', 2018, 'Серебристый', 4);
console.log(myCar.getInfo());
myCar.toggleEngine();
console.log(myCar.getInfo());
console.log(myCar.getAge());

const myHelicopter = new Helicopter('UH-1N/CH-135/212', 2, 2, 1968, 'Зеленый');
console.log(myHelicopter.getInfo());
myHelicopter.toggleEngine();
console.log(myHelicopter.getInfo());
console.log(myHelicopter.getAge());

// Экспортируем для тестирования
module.exports = {
    Transport,
    Car,
    Helicopter
};