const slowPromise = new Promise(resolve => setTimeout(resolve, 3000, 'Готово'));

function fetchWithTimeout(promise, timeout) {
    // Ваш код
}

fetchWithTimeout(slowPromise, 1000)
    .then(console.log)
    .catch(console.error); // "Время истекло"

fetchWithTimeout(slowPromise, 5000)
    .then(console.log) // "Готово"
    .catch(console.error);

module.exports = { fetchWithTimeout };
