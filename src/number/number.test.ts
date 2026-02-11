import { describe, expect, it } from "vitest";
import { formatBytes, ordinal } from "./formatters.js";
import { padNumber } from "./index.js";
import { average, clamp, inRange, randomInt, round, sumAll } from "./operations.js";

describe("clamp", () => {
  it("should return the value when within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("should clamp to min when value is below", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("should clamp to max when value is above", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it("should return min when value equals min", () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it("should return max when value equals max", () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it("should work with negative ranges", () => {
    expect(clamp(-15, -10, -5)).toBe(-10);
    expect(clamp(-3, -10, -5)).toBe(-5);
    expect(clamp(-7, -10, -5)).toBe(-7);
  });

  it("should work with decimal values", () => {
    expect(clamp(1.5, 0, 1)).toBe(1);
    expect(clamp(0.5, 0, 1)).toBe(0.5);
  });
});

describe("round", () => {
  it("should round to nearest integer by default", () => {
    expect(round(1.5)).toBe(2);
    expect(round(1.4)).toBe(1);
  });

  it("should round to specified precision", () => {
    expect(round(1.2345, 2)).toBe(1.23);
    expect(round(1.2355, 2)).toBe(1.24);
    expect(round(1.005, 2)).toBe(1.01);
  });

  it("should handle zero precision", () => {
    expect(round(1.7, 0)).toBe(2);
    expect(round(1.3, 0)).toBe(1);
  });

  it("should handle negative numbers", () => {
    expect(round(-1.5)).toBe(-1);
    expect(round(-1.6)).toBe(-2);
    expect(round(-1.2345, 2)).toBe(-1.23);
  });

  it("should handle integers", () => {
    expect(round(5)).toBe(5);
    expect(round(5, 2)).toBe(5);
  });
});

describe("randomInt", () => {
  it("should return an integer within the range", () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  it("should return the only value when min equals max", () => {
    expect(randomInt(5, 5)).toBe(5);
  });

  it("should work with negative ranges", () => {
    for (let i = 0; i < 50; i++) {
      const result = randomInt(-10, -5);
      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(-5);
    }
  });

  it("should work with a range spanning zero", () => {
    for (let i = 0; i < 50; i++) {
      const result = randomInt(-5, 5);
      expect(result).toBeGreaterThanOrEqual(-5);
      expect(result).toBeLessThanOrEqual(5);
    }
  });
});

describe("inRange", () => {
  it("should return true for values in range [min, max)", () => {
    expect(inRange(5, 0, 10)).toBe(true);
    expect(inRange(0, 0, 10)).toBe(true);
    expect(inRange(9, 0, 10)).toBe(true);
  });

  it("should return false for max (exclusive)", () => {
    expect(inRange(10, 0, 10)).toBe(false);
  });

  it("should return false for values outside range", () => {
    expect(inRange(-1, 0, 10)).toBe(false);
    expect(inRange(11, 0, 10)).toBe(false);
  });

  it("should work with decimals", () => {
    expect(inRange(0.5, 0, 1)).toBe(true);
    expect(inRange(1.0, 0, 1)).toBe(false);
  });

  it("should work with negative ranges", () => {
    expect(inRange(-7, -10, -5)).toBe(true);
    expect(inRange(-5, -10, -5)).toBe(false);
    expect(inRange(-10, -10, -5)).toBe(true);
  });
});

describe("sumAll", () => {
  it("should sum an array of numbers", () => {
    expect(sumAll([1, 2, 3, 4])).toBe(10);
  });

  it("should return 0 for empty array", () => {
    expect(sumAll([])).toBe(0);
  });

  it("should handle single element", () => {
    expect(sumAll([42])).toBe(42);
  });

  it("should handle negative numbers", () => {
    expect(sumAll([-1, -2, -3])).toBe(-6);
  });

  it("should handle mixed numbers", () => {
    expect(sumAll([10, -3, 5, -2])).toBe(10);
  });

  it("should handle decimals", () => {
    expect(sumAll([0.1, 0.2, 0.3])).toBeCloseTo(0.6);
  });
});

describe("average", () => {
  it("should calculate the average of numbers", () => {
    expect(average([1, 2, 3, 4])).toBe(2.5);
  });

  it("should return 0 for empty array", () => {
    expect(average([])).toBe(0);
  });

  it("should handle single element", () => {
    expect(average([10])).toBe(10);
  });

  it("should handle negative numbers", () => {
    expect(average([-10, 10])).toBe(0);
  });

  it("should handle decimals", () => {
    expect(average([1.5, 2.5])).toBe(2);
  });
});

describe("formatBytes", () => {
  it("should return '0 Bytes' for 0", () => {
    expect(formatBytes(0)).toBe("0 Bytes");
  });

  it("should format bytes", () => {
    expect(formatBytes(500)).toBe("500 Bytes");
  });

  it("should format kilobytes", () => {
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1536)).toBe("1.5 KB");
  });

  it("should format megabytes", () => {
    expect(formatBytes(1048576)).toBe("1 MB");
  });

  it("should format gigabytes", () => {
    expect(formatBytes(1073741824)).toBe("1 GB");
  });

  it("should respect decimals parameter", () => {
    expect(formatBytes(1536, 0)).toBe("2 KB");
    expect(formatBytes(1536, 1)).toBe("1.5 KB");
    expect(formatBytes(1536, 3)).toBe("1.5 KB");
  });

  it("should handle negative bytes", () => {
    expect(formatBytes(-1024)).toBe("-1 KB");
  });
});

describe("ordinal", () => {
  it("should handle 1st, 2nd, 3rd", () => {
    expect(ordinal(1)).toBe("1st");
    expect(ordinal(2)).toBe("2nd");
    expect(ordinal(3)).toBe("3rd");
  });

  it("should handle 4th through 20th", () => {
    expect(ordinal(4)).toBe("4th");
    expect(ordinal(10)).toBe("10th");
    expect(ordinal(11)).toBe("11th");
    expect(ordinal(12)).toBe("12th");
    expect(ordinal(13)).toBe("13th");
    expect(ordinal(14)).toBe("14th");
    expect(ordinal(20)).toBe("20th");
  });

  it("should handle 21st, 22nd, 23rd", () => {
    expect(ordinal(21)).toBe("21st");
    expect(ordinal(22)).toBe("22nd");
    expect(ordinal(23)).toBe("23rd");
  });

  it("should handle 100+", () => {
    expect(ordinal(100)).toBe("100th");
    expect(ordinal(101)).toBe("101st");
    expect(ordinal(111)).toBe("111th");
    expect(ordinal(112)).toBe("112th");
    expect(ordinal(113)).toBe("113th");
  });

  it("should handle 0", () => {
    expect(ordinal(0)).toBe("0th");
  });

  it("should handle negative numbers", () => {
    expect(ordinal(-1)).toBe("-1st");
    expect(ordinal(-11)).toBe("-11th");
  });
});

describe("padNumber", () => {
  it("should pad with default parameters", () => {
    expect(padNumber(1)).toBe("0001");
  });

  it("should pad with custom length", () => {
    expect(padNumber(1, 2)).toBe("01");
  });

  it("should pad with custom fill", () => {
    expect(padNumber(1, 5, "z")).toBe("zzzz1");
  });

  it("should not truncate when number exceeds length", () => {
    expect(padNumber(12345, 3)).toBe("12345");
  });

  it("should handle zero", () => {
    expect(padNumber(0)).toBe("0000");
  });

  it("should handle negative numbers", () => {
    expect(padNumber(-1, 5)).toBe("-0001");
  });

  it("should handle negative numbers with default length", () => {
    expect(padNumber(-1)).toBe("-001");
  });

  it("should handle negative number that exceeds length", () => {
    expect(padNumber(-12345, 3)).toBe("-12345");
  });

  it("should handle negative numbers with custom fill", () => {
    expect(padNumber(-42, 6, " ")).toBe("-   42");
  });
});
