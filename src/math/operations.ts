import type { ArithmeticOperationType } from "./types.js";

/**
 * Adds two numbers.
 *
 * @example
 * sum(2, 3) // 5
 */
export const sum = (previousValue: number, currentValue: number): number =>
  previousValue + currentValue;

/**
 * Subtracts the second number from the first.
 *
 * @example
 * subtraction(5, 3) // 2
 */
export const subtraction = (previousValue: number, currentValue: number): number =>
  previousValue - currentValue;

/**
 * Divides the first number by the second.
 *
 * @example
 * division(10, 2) // 5
 */
export const division = (previousValue: number, currentValue: number): number =>
  previousValue / currentValue;

/**
 * Multiplies two numbers.
 *
 * @example
 * multiplication(3, 4) // 12
 */
export const multiplication = (previousValue: number, currentValue: number): number =>
  previousValue * currentValue;

const reducers = { sum, subtraction, division, multiplication };

/**
 * Reduces an array of numbers using the specified arithmetic operation.
 *
 * @param values - Array of numbers to reduce
 * @param operation - The arithmetic operation to apply
 * @returns The result of reducing the array, or 0 for empty arrays
 *
 * @example
 * arithmeticOperations([2, 1, 4, 3], "sum")            // 10
 * arithmeticOperations([10, 2, 3], "subtraction")       // 5
 * arithmeticOperations([2, 3, 4], "multiplication")     // 24
 */
export const arithmeticOperations = (
  values: number[],
  operation: ArithmeticOperationType,
): number => {
  const reducer = reducers[operation];
  return values?.length > 0 ? values.reduce(reducer) : 0;
};
