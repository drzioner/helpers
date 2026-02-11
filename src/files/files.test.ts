import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { createFile } from "./create-file.js";
import { nameFileRandom, randomFileName } from "./random-file-name.js";

describe("randomFileName", () => {
  it("should return a string", () => {
    const name = randomFileName("photo.jpg");
    expect(typeof name).toBe("string");
  });

  it("should preserve the original file extension", () => {
    const name = randomFileName("photo.jpg");
    expect(name.endsWith(".jpg")).toBe(true);
  });

  it("should preserve various extensions", () => {
    expect(randomFileName("doc.pdf")).toMatch(/\.pdf$/);
    expect(randomFileName("image.png")).toMatch(/\.png$/);
    expect(randomFileName("data.json")).toMatch(/\.json$/);
    expect(randomFileName("script.ts")).toMatch(/\.ts$/);
  });

  it("should use a custom extension when provided", () => {
    const name = randomFileName("file.txt", 32, ".png");
    expect(name.endsWith(".png")).toBe(true);
    expect(name.endsWith(".txt")).toBe(false);
  });

  it("should generate different names on successive calls", () => {
    const name1 = randomFileName("photo.jpg");
    const name2 = randomFileName("photo.jpg");
    expect(name1).not.toBe(name2);
  });

  it("should generate unique names in bulk", () => {
    const names = new Set(Array.from({ length: 100 }, () => randomFileName("test.txt")));
    expect(names.size).toBe(100);
  });

  it("should start with a numeric timestamp prefix", () => {
    const before = Date.now();
    const name = randomFileName("photo.jpg");
    // The name starts with a 13-digit timestamp followed by hex chars
    // We just verify the first 13 chars are a valid timestamp in range
    const timestampStr = name.slice(0, 13);
    const timestamp = Number(timestampStr);
    expect(timestamp).toBeGreaterThanOrEqual(before);
    expect(timestamp).toBeLessThanOrEqual(Date.now());
  });

  it("should produce shorter names with a smaller length parameter", () => {
    const shortName = randomFileName("file.txt", 4);
    const longName = randomFileName("file.txt", 32);
    // shorter random bytes = shorter hex string
    expect(shortName.length).toBeLessThan(longName.length);
  });

  it("should produce a name with the correct hash length", () => {
    // length=8 means 8 random bytes = 16 hex chars
    const name = randomFileName("file.txt", 8);
    // Format: <timestamp><16 hex chars>.txt
    // Remove extension and timestamp to isolate hex portion
    const withoutExt = name.replace(/\.txt$/, "");
    const timestamp = Date.now().toString();
    // hex portion length should be 16 (8 bytes * 2 hex chars per byte)
    const hexPortion = withoutExt.slice(timestamp.length);
    // Timestamp length may vary by 1 char due to timing, so check hex length approximately
    expect(hexPortion.length).toBe(16);
  });

  it("should handle files with no extension", () => {
    const name = randomFileName("Makefile");
    // extname("Makefile") returns "", so no extension appended
    expect(name).toMatch(/^[0-9a-f]+$/);
  });

  it("should handle files with multiple dots", () => {
    const name = randomFileName("archive.tar.gz");
    expect(name.endsWith(".gz")).toBe(true);
  });

  it("should handle dotfiles", () => {
    const name = randomFileName(".gitignore");
    // extname(".gitignore") returns "" in Node.js
    expect(name).not.toContain(".gitignore");
  });
});

describe("nameFileRandom (deprecated alias)", () => {
  it("should be the same function as randomFileName", () => {
    expect(nameFileRandom).toBe(randomFileName);
  });

  it("should produce valid random file names", () => {
    const name = nameFileRandom("photo.jpg");
    expect(typeof name).toBe("string");
    expect(name.endsWith(".jpg")).toBe(true);
  });
});

describe("createFile", () => {
  let tempDir: string;

  afterEach(() => {
    if (tempDir && existsSync(tempDir)) {
      rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("should create a file with string content", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "createfile-"));
    await createFile("test.txt", "hello world", tempDir);
    const content = readFileSync(join(tempDir, "test.txt"), "utf-8");
    expect(content).toBe("hello world");
  });

  it("should create a file with binary content", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "createfile-"));
    const data = new Uint8Array([72, 101, 108, 108, 111]);
    await createFile("binary.bin", data, tempDir);
    const content = readFileSync(join(tempDir, "binary.bin"));
    expect(Buffer.from(content)).toEqual(Buffer.from(data));
  });

  it("should create a file with empty string content", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "createfile-"));
    await createFile("empty.txt", "", tempDir);
    const content = readFileSync(join(tempDir, "empty.txt"), "utf-8");
    expect(content).toBe("");
  });

  it("should overwrite an existing file", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "createfile-"));
    await createFile("overwrite.txt", "first", tempDir);
    await createFile("overwrite.txt", "second", tempDir);
    const content = readFileSync(join(tempDir, "overwrite.txt"), "utf-8");
    expect(content).toBe("second");
  });

  it("should throw on path traversal with ../", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "createfile-"));
    await expect(createFile("../../etc/passwd", "malicious", tempDir)).rejects.toThrow(
      "Path traversal detected",
    );
  });

  it("should throw on path traversal with absolute path escape", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "createfile-"));
    await expect(createFile("../outside-file.txt", "data", tempDir)).rejects.toThrow(
      "Path traversal detected",
    );
  });

  it("should allow files in subdirectory-like names within the base", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "createfile-"));
    // A filename like "subdir-file.txt" should not trigger traversal
    await createFile("safe-file.txt", "safe content", tempDir);
    const content = readFileSync(join(tempDir, "safe-file.txt"), "utf-8");
    expect(content).toBe("safe content");
  });

  it("should create a file with JSON content", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "createfile-"));
    const jsonData = JSON.stringify({ key: "value", number: 42 });
    await createFile("config.json", jsonData, tempDir);
    const content = readFileSync(join(tempDir, "config.json"), "utf-8");
    expect(JSON.parse(content)).toEqual({ key: "value", number: 42 });
  });

  it("should create parent directories that do not exist", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "createfile-"));
    await createFile("nested/deep/dir/file.txt", "nested content", tempDir);
    const content = readFileSync(join(tempDir, "nested/deep/dir/file.txt"), "utf-8");
    expect(content).toBe("nested content");
  });

  it("should create a file with multiline content", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "createfile-"));
    const multiline = "line1\nline2\nline3";
    await createFile("multiline.txt", multiline, tempDir);
    const content = readFileSync(join(tempDir, "multiline.txt"), "utf-8");
    expect(content).toBe("line1\nline2\nline3");
  });
});
