function getUser(id) {
    const delay = Math.floor(Math.random() * 100) + 100;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id, name: `Bob ${ id }` });
        }, delay);
    });
}

function getUserData(user) {
    const delay = Math.floor(Math.random() * 100) + 100;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: user.id, age: delay - 90 });
        }, delay);
    });
}

module.exports = { getUser, getUserData };
