/**
 * Supported arithmetic operation names.
 */
export type ArithmeticOperationType = "sum" | "subtraction" | "division" | "multiplication";

/**
 * Enum of arithmetic operation names for type-safe usage.
 *
 * @example
 * arithmeticOperations([1, 2, 3], ArithmeticOperations.SUM) // 6
 */
export enum ArithmeticOperations {
  SUM = "sum",
  SUBTRACTION = "subtraction",
  DIVISION = "division",
  MULTIPLICATION = "multiplication",
}
