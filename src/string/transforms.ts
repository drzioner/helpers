/**
 * Splits a string into words by spaces, hyphens, underscores,
 * and camelCase/PascalCase/ACRONYM boundaries.
 *
 * @param str - The string to split
 * @returns An array of lowercase words
 *
 * @example
 * splitWords("fooBar")        // ["foo", "bar"]
 * splitWords("foo-bar_baz")   // ["foo", "bar", "baz"]
 * splitWords("HTMLParser")    // ["html", "parser"]
 */
export const splitWords = (str: string): string[] => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[\s\-_]+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
};

/**
 * Capitalizes the first character of a string.
 *
 * @param str - The string to capitalize
 * @returns The string with the first character uppercased
 *
 * @example
 * capitalize("hello")   // "Hello"
 * capitalize("HELLO")   // "HELLO"
 * capitalize("")        // ""
 */
export const capitalize = (str: string): string => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Converts a string to camelCase.
 *
 * @param str - The string to convert
 * @returns The camelCase string
 *
 * @example
 * camelCase("foo-bar")      // "fooBar"
 * camelCase("foo_bar_baz")  // "fooBarBaz"
 * camelCase("FooBar")       // "fooBar"
 */
export const camelCase = (str: string): string => {
  const words = splitWords(str);
  if (words.length === 0) return "";
  return words[0] + words.slice(1).map(capitalize).join("");
};

/**
 * Converts a string to kebab-case.
 *
 * @param str - The string to convert
 * @returns The kebab-case string
 *
 * @example
 * kebabCase("fooBar")       // "foo-bar"
 * kebabCase("foo_bar_baz")  // "foo-bar-baz"
 * kebabCase("FooBar")       // "foo-bar"
 */
export const kebabCase = (str: string): string => splitWords(str).join("-");

/**
 * Converts a string to snake_case.
 *
 * @param str - The string to convert
 * @returns The snake_case string
 *
 * @example
 * snakeCase("fooBar")       // "foo_bar"
 * snakeCase("foo-bar-baz")  // "foo_bar_baz"
 * snakeCase("FooBar")       // "foo_bar"
 */
export const snakeCase = (str: string): string => splitWords(str).join("_");

/**
 * Converts a string to PascalCase.
 *
 * @param str - The string to convert
 * @returns The PascalCase string
 *
 * @example
 * pascalCase("foo-bar")      // "FooBar"
 * pascalCase("foo_bar_baz")  // "FooBarBaz"
 * pascalCase("fooBar")       // "FooBar"
 */
export const pascalCase = (str: string): string => splitWords(str).map(capitalize).join("");
