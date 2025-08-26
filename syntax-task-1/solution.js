export const sumArray = (array) => {
    if (!Array.isArray(array)) {
        throw Error('Argument must be an array');
    }
    let sum = 0;
    for (const el of array) {
        if (Number.isFinite(el)) {
            sum += el
        } else {
            throw Error('Array must contain only numbers')
        }
    }
    return sum
}