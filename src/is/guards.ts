import type { PlainObject } from "./types.js";

/**
 * Checks if a value is a string.
 *
 * @param value - The value to check
 * @returns `true` if the value is a string
 *
 * @example
 * isString("hello") // true
 * isString(123)     // false
 */
export const isString = (value: unknown): value is string => typeof value === "string";

/**
 * Checks if a value is a number (excludes NaN).
 * Returns true for numbers excluding NaN. Includes Infinity and -Infinity.
 *
 * @param value - The value to check
 * @returns `true` if the value is a number and not NaN
 *
 * @example
 * isNumber(42)        // true
 * isNumber(Infinity)  // true
 * isNumber(NaN)       // false
 * isNumber("42")      // false
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === "number" && !Number.isNaN(value);

/**
 * Checks if a value is a boolean.
 *
 * @param value - The value to check
 * @returns `true` if the value is a boolean
 *
 * @example
 * isBoolean(true)  // true
 * isBoolean(0)     // false
 */
export const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

/**
 * Checks if a value is a function.
 *
 * @param value - The value to check
 * @returns `true` if the value is a function
 *
 * @example
 * isFunction(() => {})       // true
 * isFunction(console.log)    // true
 * isFunction("hello")        // false
 */
// biome-ignore lint/complexity/noBannedTypes: Function type is intentional for the type guard
export const isFunction = (value: unknown): value is Function => typeof value === "function";

/**
 * Checks if a value is a plain object (not null, not an array, not a Date, not a RegExp).
 *
 * @param value - The value to check
 * @returns `true` if the value is a plain object
 *
 * @example
 * isObject({ a: 1 })       // true
 * isObject([1, 2])         // false
 * isObject(null)           // false
 * isObject(new Date())     // false
 */
export const isObject = (value: unknown): value is PlainObject => {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

/**
 * Checks if a value is an array.
 *
 * @param value - The value to check
 * @returns `true` if the value is an array
 *
 * @example
 * isArray([1, 2, 3])  // true
 * isArray("hello")    // false
 */
export const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

/**
 * Checks if a value is a valid Date instance (not Invalid Date).
 *
 * @param value - The value to check
 * @returns `true` if the value is a Date with a valid time
 *
 * @example
 * isDate(new Date())              // true
 * isDate(new Date("invalid"))     // false
 * isDate("2023-01-01")            // false
 */
export const isDate = (value: unknown): value is Date =>
  value instanceof Date && !Number.isNaN(value.getTime());

/**
 * Checks if a value is a RegExp instance.
 *
 * @param value - The value to check
 * @returns `true` if the value is a RegExp
 *
 * @example
 * isRegExp(/abc/)           // true
 * isRegExp(new RegExp("a")) // true
 * isRegExp("/abc/")         // false
 */
export const isRegExp = (value: unknown): value is RegExp => value instanceof RegExp;

/**
 * Checks if a value is null or undefined.
 *
 * @param value - The value to check
 * @returns `true` if the value is null or undefined
 *
 * @example
 * isNullish(null)      // true
 * isNullish(undefined) // true
 * isNullish(0)         // false
 * isNullish("")        // false
 */
export const isNullish = (value: unknown): value is null | undefined =>
  value === null || value === undefined;

/**
 * Checks if a value is empty. A value is considered empty if it is:
 * - null or undefined
 * - an empty string
 * - an empty array
 * - an empty plain object
 * - an empty Map or Set
 *
 * @param value - The value to check
 * @returns `true` if the value is empty
 *
 * @example
 * isEmpty(null)        // true
 * isEmpty("")          // true
 * isEmpty([])          // true
 * isEmpty({})          // true
 * isEmpty(new Map())   // true
 * isEmpty(new Set())   // true
 * isEmpty("hello")     // false
 * isEmpty([1])         // false
 * isEmpty(0)           // false
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === "object") {
    const proto = Object.getPrototypeOf(value);
    if (proto !== Object.prototype && proto !== null) return false;
    return Object.keys(value).length === 0;
  }
  return false;
};
