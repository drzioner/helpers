import { describe, expect, it } from "vitest";
import { generateUID } from "./generate-uid.js";

describe("generateUID", () => {
  it("should return a string", () => {
    const uid = generateUID();
    expect(typeof uid).toBe("string");
  });

  it("should have a total length of 54 characters", () => {
    const uid = generateUID();
    expect(uid.length).toBe(54);
  });

  it("should follow the 8-8-8-8-8-9 format separated by hyphens", () => {
    const uid = generateUID();
    const parts = uid.split("-");
    expect(parts).toHaveLength(6);
    expect(parts[0].length).toBe(8);
    expect(parts[1].length).toBe(8);
    expect(parts[2].length).toBe(8);
    expect(parts[3].length).toBe(8);
    expect(parts[4].length).toBe(8);
    expect(parts[5].length).toBe(9);
  });

  it("should contain only hex characters and hyphens", () => {
    const uid = generateUID();
    expect(uid).toMatch(/^[0-9a-f-]+$/);
  });

  it("should contain exactly 5 hyphens", () => {
    const uid = generateUID();
    const hyphens = uid.split("").filter((c) => c === "-");
    expect(hyphens).toHaveLength(5);
  });

  it("should have 49 hex characters (54 total minus 5 hyphens)", () => {
    const uid = generateUID();
    const hexChars = uid.replace(/-/g, "");
    expect(hexChars.length).toBe(49);
    expect(hexChars).toMatch(/^[0-9a-f]+$/);
  });

  it("should generate unique IDs on successive calls", () => {
    const uid1 = generateUID();
    const uid2 = generateUID();
    const uid3 = generateUID();
    expect(uid1).not.toBe(uid2);
    expect(uid2).not.toBe(uid3);
    expect(uid1).not.toBe(uid3);
  });

  it("should generate unique IDs in bulk", () => {
    const uids = new Set(Array.from({ length: 100 }, () => generateUID()));
    expect(uids.size).toBe(100);
  });

  it("should consistently produce valid format across many calls", () => {
    for (let i = 0; i < 50; i++) {
      const uid = generateUID();
      expect(uid.length).toBe(54);
      expect(uid).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{8}-[0-9a-f]{8}-[0-9a-f]{8}-[0-9a-f]{8}-[0-9a-f]{9}$/,
      );
    }
  });

  it("should start with a timestamp-based prefix", () => {
    const _before = Date.now().toString();
    const uid = generateUID();
    const firstSegment = uid.split("-")[0];
    // The first 8 chars come from Date.now(), which is a 13-digit number
    // so the first segment should be numeric (the first 8 digits of the timestamp)
    expect(firstSegment).toMatch(/^[0-9a-f]{8}$/);
    // Since Date.now() returns digits, first chars should be purely numeric
    expect(firstSegment).toMatch(/^\d{8}$/);
  });
});
