function getData(id) {
    const delay = Math.floor(Math.random() * (700 - 300 + 1) + 300);
    if (id === 3 || id === 6) {
        return Promise.reject(new Error('Ошибка'));
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id, data: `Data for ${ id }` });
        }, delay);
    });
}

module.exports = { getData };
