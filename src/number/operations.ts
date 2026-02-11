/**
 * Clamps a number between a minimum and maximum value.
 *
 * @param value - The number to clamp
 * @param min - The minimum bound
 * @param max - The maximum bound
 * @returns The clamped value
 *
 * @example
 * clamp(15, 0, 10)  // 10
 * clamp(-5, 0, 10)  // 0
 * clamp(5, 0, 10)   // 5
 */
export const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

/**
 * Rounds a number to a specified number of decimal places.
 *
 * @param value - The number to round
 * @param precision - Number of decimal places (default: 0)
 * @returns The rounded number
 *
 * @example
 * round(1.2345, 2)  // 1.23
 * round(1.5)        // 2
 * round(1.005, 2)   // 1.01
 */
export const round = (value: number, precision = 0): number => {
  const factor = 10 ** precision;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

/**
 * Generates a random integer between min and max (inclusive).
 *
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns A random integer in [min, max]
 *
 * @example
 * randomInt(1, 10) // random integer between 1 and 10
 * randomInt(0, 1)  // 0 or 1
 */
export const randomInt = (min: number, max: number): number => {
  const lo = Math.ceil(min);
  const hi = Math.floor(max);
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
};

/**
 * Checks if a number is within a range [min, max).
 *
 * @param value - The number to check
 * @param min - The minimum bound (inclusive)
 * @param max - The maximum bound (exclusive)
 * @returns `true` if the value is in [min, max)
 *
 * @example
 * inRange(5, 0, 10)   // true
 * inRange(10, 0, 10)  // false
 * inRange(0, 0, 10)   // true
 */
export const inRange = (value: number, min: number, max: number): boolean =>
  value >= min && value < max;

/**
 * Sums an array of numbers.
 *
 * @param values - Array of numbers to sum
 * @returns The sum of all values, or 0 for an empty array
 *
 * @example
 * sumAll([1, 2, 3, 4])  // 10
 * sumAll([])             // 0
 */
export const sumAll = (values: number[]): number => {
  let total = 0;
  for (const v of values) total += v;
  return total;
};

/**
 * Calculates the average (arithmetic mean) of an array of numbers.
 * Returns 0 for an empty array (not NaN) for practical usage.
 *
 * @param values - Array of numbers
 * @returns The average, or 0 for an empty array
 *
 * @example
 * average([1, 2, 3, 4])  // 2.5
 * average([10])           // 10
 * average([])             // 0
 */
export const average = (values: number[]): number => {
  if (values.length === 0) return 0;
  return sumAll(values) / values.length;
};
