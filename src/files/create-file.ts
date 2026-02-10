import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

/**
 * Creates a file at the specified path with the given data.
 * Validates paths to prevent directory traversal attacks.
 *
 * @param file - File name or relative path within the base directory
 * @param data - Content to write (string or binary)
 * @param path - Base directory (defaults to `process.cwd()`)
 * @throws {Error} If the resolved file path escapes the base directory
 *
 * @example
 * await createFile("config.json", '{"key": "value"}', "./output");
 *
 * // Throws on path traversal:
 * await createFile("../../etc/passwd", "data"); // Error: Path traversal detected
 */
export const createFile = async (
  file: string,
  data: string | Uint8Array,
  path?: string,
): Promise<void> => {
  const basePath = path ?? process.cwd();
  const resolvedBase = resolve(basePath);
  const resolvedFile = resolve(resolvedBase, file);

  if (!resolvedFile.startsWith(resolvedBase)) {
    throw new Error(`Path traversal detected: "${file}" resolves outside the base directory`);
  }

  await writeFile(resolvedFile, data);
};
