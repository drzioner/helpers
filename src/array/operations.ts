import type { Falsy, KeySelector } from "./types.js";

/**
 * Returns a new array with duplicate values removed.
 *
 * @param array - The array to deduplicate
 * @returns A new array with unique values
 *
 * @example
 * unique([1, 2, 2, 3, 3])  // [1, 2, 3]
 */
export const unique = <T>(array: T[]): T[] => [...new Set(array)];

/**
 * Returns a new array with duplicates removed based on a key selector.
 *
 * @param array - The array to deduplicate
 * @param key - A property name or function to extract the key
 * @returns A new array with unique values by key
 *
 * @example
 * uniqueBy([{ id: 1 }, { id: 1 }, { id: 2 }], "id")
 * // [{ id: 1 }, { id: 2 }]
 *
 * uniqueBy([{ id: 1 }, { id: 1 }], (item) => String(item.id))
 * // [{ id: 1 }]
 */
export const uniqueBy = <T>(array: T[], key: keyof T | KeySelector<T>): T[] => {
  const seen = new Set<unknown>();
  const getKey = typeof key === "function" ? key : (item: T) => item[key];
  return array.filter((item) => {
    const k = getKey(item);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

/**
 * Groups array elements by a key selector.
 *
 * @param array - The array to group
 * @param key - A property name or function to extract the grouping key
 * @returns An object where keys are group names and values are arrays of items
 *
 * @example
 * groupBy([{ type: "a", v: 1 }, { type: "b", v: 2 }, { type: "a", v: 3 }], "type")
 * // { a: [{ type: "a", v: 1 }, { type: "a", v: 3 }], b: [{ type: "b", v: 2 }] }
 */
export const groupBy = <T>(array: T[], key: keyof T | KeySelector<T>): Record<string, T[]> => {
  const getKey = typeof key === "function" ? key : (item: T) => String(item[key]);
  const result: Record<string, T[]> = {};
  for (const item of array) {
    const k = getKey(item);
    if (!result[k]) result[k] = [];
    result[k].push(item);
  }
  return result;
};

/**
 * Splits an array into groups of the specified size.
 *
 * @param array - The array to chunk
 * @param size - The maximum size of each chunk. Must be a positive integer.
 * @returns An array of chunks
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2)  // [[1, 2], [3, 4], [5]]
 * chunk([1, 2, 3], 5)         // [[1, 2, 3]]
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  if (size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

/**
 * Returns a new array with elements randomly shuffled using Fisher-Yates algorithm.
 *
 * @param array - The array to shuffle
 * @returns A new shuffled array
 *
 * @example
 * shuffle([1, 2, 3, 4, 5])  // [3, 1, 5, 2, 4] (random)
 */
export const shuffle = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * Generates an array of numbers in a range.
 *
 * @remarks Decimal steps work for values representable in binary (0.25, 0.5, etc.). Steps like 0.1 may exhibit minor floating-point rounding due to IEEE 754.
 *
 * @param start - The start value (inclusive)
 * @param end - The end value (exclusive)
 * @param step - The increment between values (default: 1)
 * @returns An array of numbers
 *
 * @example
 * range(0, 5)      // [0, 1, 2, 3, 4]
 * range(1, 10, 2)  // [1, 3, 5, 7, 9]
 * range(5, 0, -1)  // [5, 4, 3, 2, 1]
 */
export const range = (start: number, end: number, step = 1): number[] => {
  if (step === 0) return [];
  const result: number[] = [];
  if (step > 0) {
    for (let n = 0; start + n * step < end; n++) result.push(start + n * step);
  } else {
    for (let n = 0; start + n * step > end; n++) result.push(start + n * step);
  }
  return result;
};

/**
 * Returns a new array with all falsy values removed.
 *
 * @deprecated Use `array.filter(Boolean)` instead. Will be removed in v2.0.
 *
 * @param array - The array to compact
 * @returns A new array without falsy values
 *
 * @example
 * compact([0, 1, false, 2, "", 3, null, undefined])  // [1, 2, 3]
 */
export const compact = <T>(array: readonly (T | Falsy)[]): T[] => array.filter(Boolean) as T[];

/**
 * Returns the first element of an array.
 *
 * @deprecated Use `array.at(0)` (ES2022) or `array[0]` instead. Will be removed in v2.0.
 *
 * @param array - The source array
 * @returns The first element, or undefined if the array is empty
 *
 * @example
 * first([1, 2, 3])  // 1
 * first([])          // undefined
 */
export const first = <T>(array: T[]): T | undefined => array[0];

/**
 * Returns the last element of an array.
 *
 * @deprecated Use `array.at(-1)` (ES2022) or `array[array.length - 1]` instead. Will be removed in v2.0.
 *
 * @param array - The source array
 * @returns The last element, or undefined if the array is empty
 *
 * @example
 * last([1, 2, 3])  // 3
 * last([])          // undefined
 */
export const last = <T>(array: T[]): T | undefined => array[array.length - 1];

/**
 * Returns elements that exist in both arrays.
 *
 * @param a - The first array
 * @param b - The second array
 * @returns A new array with elements present in both arrays
 *
 * @example
 * intersection([1, 2, 3], [2, 3, 4])  // [2, 3]
 */
export const intersection = <T>(a: T[], b: T[]): T[] => {
  const set = new Set(b);
  return a.filter((item) => set.has(item));
};

/**
 * Returns elements from the first array that don't exist in the second.
 *
 * @param a - The source array
 * @param b - The array of values to exclude
 * @returns A new array with elements from `a` that are not in `b`
 *
 * @example
 * difference([1, 2, 3], [2, 3, 4])  // [1]
 */
export const difference = <T>(a: T[], b: T[]): T[] => {
  const set = new Set(b);
  return a.filter((item) => !set.has(item));
};
