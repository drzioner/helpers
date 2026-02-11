/**
 * Creates a new object with only the specified keys.
 *
 * @param obj - The source object
 * @param keys - The keys to keep
 * @returns A new object with only the specified keys
 *
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ["a", "c"])  // { a: 1, c: 3 }
 */
export const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
};

/**
 * Creates a new object without the specified keys.
 *
 * @param obj - The source object
 * @param keys - The keys to exclude
 * @returns A new object without the specified keys
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ["b"])  // { a: 1, c: 3 }
 */
export const omit = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> => {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result as Omit<T, K>;
};

const UNSAFE_KEYS = new Set(["__proto__", "constructor", "prototype"]);

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

/**
 * Deep merges multiple source objects into a target object.
 * Arrays are replaced, not merged. Only plain objects are recursively merged.
 *
 * @param target - The target object
 * @param sources - One or more source objects to merge
 * @returns The merged object
 *
 * @example
 * merge({ a: 1, b: { x: 1 } }, { b: { y: 2 }, c: 3 })
 * // { a: 1, b: { x: 1, y: 2 }, c: 3 }
 */
export const merge = <T extends Record<string, unknown>>(target: T, ...sources: T[]): T => {
  const result = { ...target } as Record<string, unknown>;
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      if (UNSAFE_KEYS.has(key)) continue;
      const targetVal = result[key];
      const sourceVal = source[key];
      if (isPlainObject(targetVal) && isPlainObject(sourceVal)) {
        result[key] = merge(
          targetVal as Record<string, unknown>,
          sourceVal as Record<string, unknown>,
        );
      } else {
        result[key] = sourceVal;
      }
    }
  }
  return result as T;
};

/**
 * Gets the value at a dot-separated path of an object.
 * Uses dot notation only (e.g., "a.0.b"). Bracket notation ("a[0].b") is not supported.
 *
 * @param obj - The source object
 * @param path - The dot-separated path (e.g., "a.b.c")
 * @param defaultValue - The value returned if the path doesn't exist
 * @returns The value at the path, or the default value
 *
 * @example
 * get({ a: { b: { c: 42 } } }, "a.b.c")           // 42
 * get({ a: { b: 1 } }, "a.c", "default")           // "default"
 * get({ a: [{ b: 1 }] }, "a.0.b")                  // 1
 */
export const get = (obj: unknown, path: string, defaultValue?: unknown): unknown => {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return defaultValue;
    current = (current as Record<string, unknown>)[key];
  }
  return current === undefined ? defaultValue : current;
};

/**
 * Checks if a dot-separated path exists in an object.
 * Uses dot notation only (e.g., "a.0.b"). Bracket notation ("a[0].b") is not supported.
 *
 * @param obj - The source object
 * @param path - The dot-separated path (e.g., "a.b.c")
 * @returns `true` if the path exists
 *
 * @example
 * has({ a: { b: 1 } }, "a.b")   // true
 * has({ a: { b: 1 } }, "a.c")   // false
 * has({ a: null }, "a")          // true
 */
export const has = (obj: unknown, path: string): boolean => {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined) return false;
    if (typeof current !== "object") return false;
    if (!(key in (current as Record<string, unknown>))) return false;
    current = (current as Record<string, unknown>)[key];
  }
  return true;
};
