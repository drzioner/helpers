import { describe, expect, it } from "vitest";
import { arithmeticOperations, division, multiplication, subtraction, sum } from "./operations.js";
import type { ArithmeticOperationType } from "./types.js";
import { ArithmeticOperations } from "./types.js";

describe("sum", () => {
  it("should add two positive numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("should add negative numbers", () => {
    expect(sum(-2, -3)).toBe(-5);
  });

  it("should add a positive and a negative number", () => {
    expect(sum(5, -3)).toBe(2);
  });

  it("should return 0 when adding 0 and 0", () => {
    expect(sum(0, 0)).toBe(0);
  });

  it("should handle adding zero to a number", () => {
    expect(sum(7, 0)).toBe(7);
    expect(sum(0, 7)).toBe(7);
  });

  it("should handle large numbers", () => {
    expect(sum(1_000_000, 2_000_000)).toBe(3_000_000);
  });

  it("should handle decimal numbers", () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

describe("subtraction", () => {
  it("should subtract two positive numbers", () => {
    expect(subtraction(5, 3)).toBe(2);
  });

  it("should return a negative result when subtracting a larger number", () => {
    expect(subtraction(3, 5)).toBe(-2);
  });

  it("should handle negative numbers", () => {
    expect(subtraction(-5, -3)).toBe(-2);
  });

  it("should handle subtracting zero", () => {
    expect(subtraction(5, 0)).toBe(5);
  });

  it("should return 0 when subtracting a number from itself", () => {
    expect(subtraction(5, 5)).toBe(0);
  });

  it("should handle subtracting from zero", () => {
    expect(subtraction(0, 5)).toBe(-5);
  });
});

describe("division", () => {
  it("should divide two positive numbers", () => {
    expect(division(10, 2)).toBe(5);
  });

  it("should handle division resulting in a decimal", () => {
    expect(division(7, 2)).toBe(3.5);
  });

  it("should handle dividing negative numbers", () => {
    expect(division(-10, 2)).toBe(-5);
    expect(division(10, -2)).toBe(-5);
    expect(division(-10, -2)).toBe(5);
  });

  it("should return 0 when dividing 0 by a number", () => {
    expect(division(0, 5)).toBe(0);
  });

  it("should return Infinity when dividing by zero", () => {
    expect(division(10, 0)).toBe(Infinity);
  });

  it("should return -Infinity when dividing a negative number by zero", () => {
    expect(division(-10, 0)).toBe(-Infinity);
  });

  it("should return NaN when dividing 0 by 0", () => {
    expect(division(0, 0)).toBeNaN();
  });

  it("should handle dividing 1 by a number", () => {
    expect(division(1, 3)).toBeCloseTo(0.3333, 4);
  });
});

describe("multiplication", () => {
  it("should multiply two positive numbers", () => {
    expect(multiplication(3, 4)).toBe(12);
  });

  it("should return 0 when multiplying by zero", () => {
    expect(multiplication(5, 0)).toBe(0);
    expect(multiplication(0, 5)).toBe(0);
  });

  it("should handle negative numbers", () => {
    expect(multiplication(-3, 4)).toBe(-12);
    expect(multiplication(3, -4)).toBe(-12);
    expect(multiplication(-3, -4)).toBe(12);
  });

  it("should handle multiplying by 1", () => {
    expect(multiplication(7, 1)).toBe(7);
    expect(multiplication(1, 7)).toBe(7);
  });

  it("should handle decimal numbers", () => {
    expect(multiplication(0.5, 4)).toBe(2);
  });

  it("should handle large numbers", () => {
    expect(multiplication(1000, 1000)).toBe(1_000_000);
  });
});

describe("ArithmeticOperations enum", () => {
  it("should have the correct SUM value", () => {
    expect(ArithmeticOperations.SUM).toBe("sum");
  });

  it("should have the correct SUBTRACTION value", () => {
    expect(ArithmeticOperations.SUBTRACTION).toBe("subtraction");
  });

  it("should have the correct DIVISION value", () => {
    expect(ArithmeticOperations.DIVISION).toBe("division");
  });

  it("should have the correct MULTIPLICATION value", () => {
    expect(ArithmeticOperations.MULTIPLICATION).toBe("multiplication");
  });

  it("should be usable as ArithmeticOperationType", () => {
    const op: ArithmeticOperationType = ArithmeticOperations.SUM;
    expect(op).toBe("sum");
  });
});

describe("arithmeticOperations", () => {
  describe("sum operation", () => {
    it("should sum an array of numbers", () => {
      expect(arithmeticOperations([2, 1, 4, 3], "sum")).toBe(10);
    });

    it("should sum using the enum value", () => {
      expect(arithmeticOperations([2, 1, 4, 3], ArithmeticOperations.SUM)).toBe(10);
    });

    it("should return the single element for a single-element array", () => {
      expect(arithmeticOperations([5], "sum")).toBe(5);
    });

    it("should handle negative numbers", () => {
      expect(arithmeticOperations([-1, -2, -3], "sum")).toBe(-6);
    });

    it("should handle mixed positive and negative numbers", () => {
      expect(arithmeticOperations([10, -3, 5, -2], "sum")).toBe(10);
    });
  });

  describe("subtraction operation", () => {
    it("should subtract an array of numbers sequentially", () => {
      expect(arithmeticOperations([10, 2, 3], "subtraction")).toBe(5);
    });

    it("should subtract using the enum value", () => {
      expect(arithmeticOperations([10, 2, 3], ArithmeticOperations.SUBTRACTION)).toBe(5);
    });

    it("should return the single element for a single-element array", () => {
      expect(arithmeticOperations([5], "subtraction")).toBe(5);
    });

    it("should handle subtracting negative numbers", () => {
      expect(arithmeticOperations([10, -5], "subtraction")).toBe(15);
    });
  });

  describe("multiplication operation", () => {
    it("should multiply an array of numbers", () => {
      expect(arithmeticOperations([2, 3, 4], "multiplication")).toBe(24);
    });

    it("should multiply using the enum value", () => {
      expect(arithmeticOperations([2, 3, 4], ArithmeticOperations.MULTIPLICATION)).toBe(24);
    });

    it("should return the single element for a single-element array", () => {
      expect(arithmeticOperations([7], "multiplication")).toBe(7);
    });

    it("should return 0 when array contains zero", () => {
      expect(arithmeticOperations([5, 0, 3], "multiplication")).toBe(0);
    });

    it("should handle negative numbers", () => {
      expect(arithmeticOperations([-2, 3], "multiplication")).toBe(-6);
      expect(arithmeticOperations([-2, -3], "multiplication")).toBe(6);
    });
  });

  describe("division operation", () => {
    it("should divide an array of numbers sequentially", () => {
      expect(arithmeticOperations([100, 2, 5], "division")).toBe(10);
    });

    it("should divide using the enum value", () => {
      expect(arithmeticOperations([100, 2, 5], ArithmeticOperations.DIVISION)).toBe(10);
    });

    it("should return the single element for a single-element array", () => {
      expect(arithmeticOperations([7], "division")).toBe(7);
    });

    it("should return Infinity when dividing by zero", () => {
      expect(arithmeticOperations([10, 0], "division")).toBe(Infinity);
    });

    it("should handle decimal results", () => {
      expect(arithmeticOperations([7, 2], "division")).toBe(3.5);
    });
  });

  describe("empty array", () => {
    it("should return 0 for sum with empty array", () => {
      expect(arithmeticOperations([], "sum")).toBe(0);
    });

    it("should return 0 for subtraction with empty array", () => {
      expect(arithmeticOperations([], "subtraction")).toBe(0);
    });

    it("should return 0 for multiplication with empty array", () => {
      expect(arithmeticOperations([], "multiplication")).toBe(0);
    });

    it("should return 0 for division with empty array", () => {
      expect(arithmeticOperations([], "division")).toBe(0);
    });
  });
});
