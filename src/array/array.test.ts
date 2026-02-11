import { describe, expect, it } from "vitest";
import {
  chunk,
  compact,
  difference,
  first,
  groupBy,
  intersection,
  last,
  range,
  shuffle,
  unique,
  uniqueBy,
} from "./operations.js";

describe("unique", () => {
  it("should remove duplicates", () => {
    expect(unique([1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
  });

  it("should handle empty array", () => {
    expect(unique([])).toEqual([]);
  });

  it("should handle strings", () => {
    expect(unique(["a", "b", "a", "c"])).toEqual(["a", "b", "c"]);
  });

  it("should handle already unique array", () => {
    expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
  });
});

describe("uniqueBy", () => {
  it("should deduplicate by property name", () => {
    const input = [{ id: 1 }, { id: 1 }, { id: 2 }];
    expect(uniqueBy(input, "id")).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("should deduplicate by selector function", () => {
    const input = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 30 },
      { name: "Charlie", age: 25 },
    ];
    expect(uniqueBy(input, (item) => String(item.age))).toEqual([
      { name: "Alice", age: 30 },
      { name: "Charlie", age: 25 },
    ]);
  });

  it("should handle empty array", () => {
    expect(uniqueBy([], "id")).toEqual([]);
  });
});

describe("groupBy", () => {
  it("should group by property name", () => {
    const input = [
      { type: "a", v: 1 },
      { type: "b", v: 2 },
      { type: "a", v: 3 },
    ];
    expect(groupBy(input, "type")).toEqual({
      a: [
        { type: "a", v: 1 },
        { type: "a", v: 3 },
      ],
      b: [{ type: "b", v: 2 }],
    });
  });

  it("should group by selector function", () => {
    const input = [1, 2, 3, 4, 5];
    expect(groupBy(input, (n) => (n % 2 === 0 ? "even" : "odd"))).toEqual({
      odd: [1, 3, 5],
      even: [2, 4],
    });
  });

  it("should handle empty array", () => {
    expect(groupBy([], "key")).toEqual({});
  });
});

describe("chunk", () => {
  it("should split array into chunks", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("should handle array smaller than chunk size", () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  it("should handle exact multiple", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it("should handle empty array", () => {
    expect(chunk([], 3)).toEqual([]);
  });

  it("should return empty array for size <= 0", () => {
    expect(chunk([1, 2, 3], 0)).toEqual([]);
    expect(chunk([1, 2, 3], -1)).toEqual([]);
  });

  it("should handle chunk size of 1", () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });
});

describe("shuffle", () => {
  it("should return a new array", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result).not.toBe(arr);
  });

  it("should contain all original elements", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result.sort()).toEqual(arr.sort());
  });

  it("should handle empty array", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("should handle single element", () => {
    expect(shuffle([1])).toEqual([1]);
  });

  it("should not mutate original array", () => {
    const arr = [1, 2, 3];
    shuffle(arr);
    expect(arr).toEqual([1, 2, 3]);
  });
});

describe("range", () => {
  it("should generate a range of numbers", () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
  });

  it("should handle custom step", () => {
    expect(range(1, 10, 2)).toEqual([1, 3, 5, 7, 9]);
  });

  it("should handle negative step", () => {
    expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
  });

  it("should return empty array for invalid range", () => {
    expect(range(5, 0)).toEqual([]);
  });

  it("should return empty array for zero step", () => {
    expect(range(0, 5, 0)).toEqual([]);
  });

  it("should handle same start and end", () => {
    expect(range(5, 5)).toEqual([]);
  });

  it("should handle decimal steps without floating point drift", () => {
    expect(range(0, 1, 0.25)).toEqual([0, 0.25, 0.5, 0.75]);
  });
});

describe("compact", () => {
  it("should remove falsy values", () => {
    expect(compact([0, 1, false, 2, "", 3, null, undefined])).toEqual([1, 2, 3]);
  });

  it("should handle empty array", () => {
    expect(compact([])).toEqual([]);
  });

  it("should keep truthy values", () => {
    expect(compact([1, "a", true, {}, []])).toEqual([1, "a", true, {}, []]);
  });
});

describe("first", () => {
  it("should return the first element", () => {
    expect(first([1, 2, 3])).toBe(1);
  });

  it("should return undefined for empty array", () => {
    expect(first([])).toBeUndefined();
  });

  it("should work with strings", () => {
    expect(first(["a", "b"])).toBe("a");
  });
});

describe("last", () => {
  it("should return the last element", () => {
    expect(last([1, 2, 3])).toBe(3);
  });

  it("should return undefined for empty array", () => {
    expect(last([])).toBeUndefined();
  });

  it("should work with single element", () => {
    expect(last([42])).toBe(42);
  });
});

describe("intersection", () => {
  it("should return common elements", () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  it("should return empty array for no overlap", () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
  });

  it("should handle empty arrays", () => {
    expect(intersection([], [1, 2])).toEqual([]);
    expect(intersection([1, 2], [])).toEqual([]);
  });

  it("should work with strings", () => {
    expect(intersection(["a", "b", "c"], ["b", "c", "d"])).toEqual(["b", "c"]);
  });
});

describe("difference", () => {
  it("should return elements only in first array", () => {
    expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
  });

  it("should return all elements when no overlap", () => {
    expect(difference([1, 2], [3, 4])).toEqual([1, 2]);
  });

  it("should return empty when all overlap", () => {
    expect(difference([1, 2], [1, 2, 3])).toEqual([]);
  });

  it("should handle empty arrays", () => {
    expect(difference([], [1, 2])).toEqual([]);
    expect(difference([1, 2], [])).toEqual([1, 2]);
  });
});
