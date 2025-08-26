import { sumArray } from "../solution"

describe('sumArray', () => {
    it('Проверяет что аргумент - массив', () => {
        expect(() => sumArray(1)).toThrow("Argument must be an array")
        expect(() => sumArray("string")).toThrow("Argument must be an array")
        expect(() => sumArray(true)).toThrow("Argument must be an array")
        expect(() => sumArray({})).toThrow("Argument must be an array")
        expect(() => sumArray(null)).toThrow()
        expect(() => sumArray(undefined)).toThrow("Argument must be an array")
        expect(() => sumArray()).toThrow("Argument must be an array")
    })
    it('Проверяет, что все элементы массива - числа', () => {
        expect(() => sumArray(["string"])).toThrow("Array must contain only numbers")
        expect(() => sumArray([true])).toThrow("Array must contain only numbers")
        expect(() => sumArray([{}])).toThrow("Array must contain only numbers")
        expect(() => sumArray([null])).toThrow("Array must contain only numbers")
        expect(() => sumArray([undefined])).toThrow("Array must contain only numbers")
    })
    it('При передаче пустого массива сумма = 0', () => {
        expect(sumArray([])).toBe(0)
    })
    it('Корректно считает сумму', () => {
        expect(sumArray([1])).toBe(1)
        expect(sumArray([1, 2])).toBe(3)
        expect(sumArray([1, 2, 3])).toBe(6)
        expect(sumArray([-1, -2, -3])).toBe(-6)
        expect(sumArray([1, -2, 3])).toBe(2)
        expect(() => sumArray([NaN])).toThrow()
    })
})