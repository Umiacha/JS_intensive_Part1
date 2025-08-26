export const upperFirst = (str) => {
    // TODO: установить зависимости (через впн) и привести в соответствие с тестами!
    let arr = Array(...str);
    let words = arr.reduce((acc, item) => {
        if (item === ' ') {
            switch (true) {
                case acc.length == 0 || acc.at(-1).length > 0:
                    acc.push([]);
                    return acc;
                case acc.at(-1).length == 0:
                    return acc;
            }
        } else {
            switch (true) {
                case acc.length == 0:
                    acc.push([]);
                    acc[0].push(item.toUpperCase());
                    return acc;
                case acc.at(-1).length == 0:
                    acc.at(-1).push(item.toUpperCase());
                    return acc;
                case acc.at(-1).length > 0:
                    acc.at(-1).push(item);
                    return acc;
            }
        }
    }, []);
    words = words.reduce((acc, item) => {
        if (item.length > 0) {
            acc.push(item.join(''));
        }
        return acc;
    }, []);
    return words.join(' ');
}

console.log(upperFirst('1234'));
console.log(upperFirst('hello world'));
console.log(upperFirst('  hello world  '));
console.log(upperFirst('John doe'))

// Экспортируем функцию для тестирования
// module.exports = upperFirst;