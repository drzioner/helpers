import { describe, expect, it } from "vitest";
import { fillANumberWithCharacters, padNumber } from "./pad.js";

describe("padNumber", () => {
  it("should pad 1 to '0001' with default parameters", () => {
    expect(padNumber(1)).toBe("0001");
  });

  it("should pad 1 to '01' with length 2", () => {
    expect(padNumber(1, 2)).toBe("01");
  });

  it("should pad 1 to 'zzzz1' with length 5 and fill 'z'", () => {
    expect(padNumber(1, 5, "z")).toBe("zzzz1");
  });

  it("should not truncate when number exceeds the specified length", () => {
    expect(padNumber(12345, 3)).toBe("12345");
  });

  it("should return the number as-is when length equals digit count", () => {
    expect(padNumber(1234, 4)).toBe("1234");
  });

  it("should handle zero", () => {
    expect(padNumber(0)).toBe("0000");
  });

  it("should handle zero with custom length", () => {
    expect(padNumber(0, 6)).toBe("000000");
  });

  it("should handle large numbers", () => {
    expect(padNumber(999999, 4)).toBe("999999");
  });

  it("should pad with custom character", () => {
    expect(padNumber(42, 6, "*")).toBe("****42");
  });

  it("should pad with space character", () => {
    expect(padNumber(7, 4, " ")).toBe("   7");
  });

  it("should handle single digit with default length", () => {
    expect(padNumber(9)).toBe("0009");
  });

  it("should handle two digits with default length", () => {
    expect(padNumber(99)).toBe("0099");
  });

  it("should handle three digits with default length", () => {
    expect(padNumber(999)).toBe("0999");
  });

  it("should handle four digits with default length", () => {
    expect(padNumber(9999)).toBe("9999");
  });

  it("should handle length of 1", () => {
    expect(padNumber(5, 1)).toBe("5");
  });

  it("should handle length of 1 with multi-digit number", () => {
    expect(padNumber(42, 1)).toBe("42");
  });

  it("should handle negative numbers", () => {
    // padStart pads the string representation including the minus sign
    expect(padNumber(-1, 5)).toBe("000-1");
  });

  it("should pad with dash character", () => {
    expect(padNumber(1, 6, "-")).toBe("-----1");
  });

  it("should handle very large padding length", () => {
    expect(padNumber(1, 10)).toBe("0000000001");
  });

  it("should return a string type", () => {
    const result = padNumber(1);
    expect(typeof result).toBe("string");
  });
});

describe("fillANumberWithCharacters (deprecated alias)", () => {
  it("should be the same function as padNumber", () => {
    expect(fillANumberWithCharacters).toBe(padNumber);
  });

  it("should produce identical results to padNumber", () => {
    expect(fillANumberWithCharacters(1)).toBe(padNumber(1));
    expect(fillANumberWithCharacters(1, 2)).toBe(padNumber(1, 2));
    expect(fillANumberWithCharacters(1, 5, "z")).toBe(padNumber(1, 5, "z"));
  });

  it("should pad 1 to '0001' with default parameters", () => {
    expect(fillANumberWithCharacters(1)).toBe("0001");
  });

  it("should pad with custom length and fill", () => {
    expect(fillANumberWithCharacters(42, 6, "*")).toBe("****42");
  });
});
