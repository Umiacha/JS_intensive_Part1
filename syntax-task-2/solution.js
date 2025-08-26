const readline = require('readline');

/** Доступные арифметические операторы */
const operators = ['+', '-', '*', '/'];

/**
 * Выполняет арифметическую операцию.
 */
function makeOperation(a, b, operator) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        throw new Error('Деление на ноль');
      }
      return a / b;
    default:
      throw new Error('Неверный оператор');
  }
}

/**
 * Форматирует результат для вывода:
 *  - целые числа остаются без изменений;
 *  - дробные округляются до 5 знаков после запятой, лишние нули убираются.
 */
function formatResult(value) {
  if (Number.isInteger(value)) {
    return value;
  }
  return parseFloat(value.toFixed(5));
}

/**
 * Запускает интерактивный калькулятор.
 * Вопросы задаются последовательно через callbacks — это важно,
 * чтобы тесты, которые мокируют readline, могли корректно симулировать ввод.
 */
function startCalculator() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  module.exports.rl = rl;
  console.log("Калькулятор запущен (введите 'exit' для выхода)");

  let firstNumber = null;
  let operator = null;

  const askFirstNumber = () => {
    rl.question('Введите число: ', (input) => {
      if (input === 'exit') {
        return finish();
      }

      const num = Number(input);
      if (input.trim() === '' || Number.isNaN(num)) {
        console.log('Некорректное значение');
        return askFirstNumber();
      }

      firstNumber = num;
      askOperator();
    });
  };

  const askOperator = () => {
    rl.question('Введите оператор +, -, *, /: ', (input) => {
      if (input === 'exit') {
        return finish();
      }

      if (!operators.includes(input)) {
        console.log('Неверный оператор');
        return askOperator();
      }

      operator = input;
      askSecondNumber();
    });
  };

  const askSecondNumber = () => {
    rl.question('Введите число: ', (input) => {
      if (input === 'exit') {
        return finish();
      }

      const num = Number(input);
      if (input.trim() === '' || Number.isNaN(num)) {
        console.log('Некорректное значение');
        return askSecondNumber();
      }

      try {
        const raw = makeOperation(firstNumber, num, operator);
        const result = formatResult(raw);
        console.log(`Результат: ${result}`);
      } catch (err) {
        console.log(err.message);
      }

      // Готовимся к следующему вычислению
      firstNumber = null;
      operator = null;
      askFirstNumber();
    });
  };

  const finish = () => {
    console.log('Калькулятор завершен');
    rl.close();
  };

  // Запуск первого вопроса
  askFirstNumber();
}

module.exports = {
  startCalculator,
  operators,
};
