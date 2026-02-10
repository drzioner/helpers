import * as crypto from "node:crypto";
import { extname } from "node:path";

/**
 * Generates a random file name with a timestamp prefix, random hex hash,
 * and the original file's extension.
 *
 * @param originalName - Original file name (used to extract extension)
 * @param length - Number of random bytes for the hash portion
 * @param extension - Override the file extension
 * @param encoding - Encoding for the random bytes
 * @returns A unique file name string
 *
 * @example
 * randomFileName("photo.jpg")
 * // "1647828249206a64bdc57f939d47eae0be8dfab854314b8b5d6fc01b6449acd8787c06075e4ec.jpg"
 *
 * randomFileName("file.txt", 8, ".png")
 * // "164782829087589b6a0c9d92d12b2.png"
 */
export const randomFileName = (
  originalName: string,
  length = 32,
  extension?: string,
  encoding: BufferEncoding = "hex",
): string => {
  const hash = crypto.randomBytes(length);
  const name = hash.toString(encoding);
  const today = new Date();
  return `${today.getTime()}${name}${extension ?? extname(originalName)}`;
};

/**
 * @deprecated Use `randomFileName` instead. Will be removed in v2.0.0.
 */
export const nameFileRandom = randomFileName;
