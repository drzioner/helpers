import { describe, expect, it } from "vitest";
import {
  isArray,
  isBoolean,
  isDate,
  isEmpty,
  isFunction,
  isNullish,
  isNumber,
  isObject,
  isRegExp,
  isString,
} from "./guards.js";

describe("isString", () => {
  it("should return true for strings", () => {
    expect(isString("hello")).toBe(true);
    expect(isString("")).toBe(true);
    expect(isString(String("test"))).toBe(true);
  });

  it("should return false for non-strings", () => {
    expect(isString(123)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString({})).toBe(false);
  });
});

describe("isNumber", () => {
  it("should return true for numbers", () => {
    expect(isNumber(42)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-1)).toBe(true);
    expect(isNumber(3.14)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(-Infinity)).toBe(true);
  });

  it("should return false for NaN", () => {
    expect(isNumber(Number.NaN)).toBe(false);
  });

  it("should return false for non-numbers", () => {
    expect(isNumber("42")).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(true)).toBe(false);
  });
});

describe("isBoolean", () => {
  it("should return true for booleans", () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  it("should return false for non-booleans", () => {
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean("true")).toBe(false);
    expect(isBoolean(null)).toBe(false);
  });
});

describe("isFunction", () => {
  it("should return true for functions", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(Math.max)).toBe(true);
    expect(isFunction(class Foo {})).toBe(true);
  });

  it("should return false for non-functions", () => {
    expect(isFunction("hello")).toBe(false);
    expect(isFunction(123)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction({})).toBe(false);
  });
});

describe("isObject", () => {
  it("should return true for plain objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ a: 1 })).toBe(true);
    expect(isObject(Object.create(null))).toBe(true);
  });

  it("should return false for null", () => {
    expect(isObject(null)).toBe(false);
  });

  it("should return false for arrays", () => {
    expect(isObject([])).toBe(false);
    expect(isObject([1, 2, 3])).toBe(false);
  });

  it("should return false for Date instances", () => {
    expect(isObject(new Date())).toBe(false);
  });

  it("should return false for RegExp instances", () => {
    expect(isObject(/abc/)).toBe(false);
  });

  it("should return false for Map and Set", () => {
    expect(isObject(new Map())).toBe(false);
    expect(isObject(new Set())).toBe(false);
  });

  it("should return false for class instances", () => {
    expect(isObject(new Error("x"))).toBe(false);
    expect(isObject(new URL("https://x.com"))).toBe(false);
  });

  it("should return false for primitives", () => {
    expect(isObject("hello")).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});

describe("isArray", () => {
  it("should return true for arrays", () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
    expect(isArray(new Array(3))).toBe(true);
  });

  it("should return false for non-arrays", () => {
    expect(isArray("hello")).toBe(false);
    expect(isArray({ length: 3 })).toBe(false);
    expect(isArray(null)).toBe(false);
  });
});

describe("isDate", () => {
  it("should return true for valid dates", () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate(new Date("2023-01-01"))).toBe(true);
    expect(isDate(new Date(0))).toBe(true);
  });

  it("should return false for invalid dates", () => {
    expect(isDate(new Date("invalid"))).toBe(false);
  });

  it("should return false for non-dates", () => {
    expect(isDate("2023-01-01")).toBe(false);
    expect(isDate(1234567890)).toBe(false);
    expect(isDate(null)).toBe(false);
  });
});

describe("isRegExp", () => {
  it("should return true for RegExp instances", () => {
    expect(isRegExp(/abc/)).toBe(true);
    expect(isRegExp(/abc/)).toBe(true);
    expect(isRegExp(/test/gi)).toBe(true);
  });

  it("should return false for non-RegExp", () => {
    expect(isRegExp("/abc/")).toBe(false);
    expect(isRegExp("abc")).toBe(false);
    expect(isRegExp(null)).toBe(false);
    expect(isRegExp({})).toBe(false);
  });
});

describe("isNullish", () => {
  it("should return true for null and undefined", () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
  });

  it("should return false for falsy but non-nullish values", () => {
    expect(isNullish(0)).toBe(false);
    expect(isNullish("")).toBe(false);
    expect(isNullish(false)).toBe(false);
  });

  it("should return false for truthy values", () => {
    expect(isNullish(1)).toBe(false);
    expect(isNullish("hello")).toBe(false);
    expect(isNullish([])).toBe(false);
    expect(isNullish({})).toBe(false);
  });
});

describe("isEmpty", () => {
  it("should return true for null and undefined", () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it("should return true for empty string", () => {
    expect(isEmpty("")).toBe(true);
  });

  it("should return false for non-empty string", () => {
    expect(isEmpty("hello")).toBe(false);
    expect(isEmpty(" ")).toBe(false);
  });

  it("should return true for empty array", () => {
    expect(isEmpty([])).toBe(true);
  });

  it("should return false for non-empty array", () => {
    expect(isEmpty([1])).toBe(false);
  });

  it("should return true for empty object", () => {
    expect(isEmpty({})).toBe(true);
  });

  it("should return false for non-empty object", () => {
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  it("should return true for empty Map and Set", () => {
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
  });

  it("should return false for non-empty Map and Set", () => {
    expect(isEmpty(new Map([["a", 1]]))).toBe(false);
    expect(isEmpty(new Set([1]))).toBe(false);
  });

  it("should return false for numbers", () => {
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(1)).toBe(false);
  });

  it("should return false for booleans", () => {
    expect(isEmpty(false)).toBe(false);
    expect(isEmpty(true)).toBe(false);
  });

  it("should return false for non-plain object instances", () => {
    expect(isEmpty(new Date())).toBe(false);
    expect(isEmpty(/a/)).toBe(false);
    expect(isEmpty(new Error("x"))).toBe(false);
  });
});
