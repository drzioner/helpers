import * as crypto from "node:crypto";

/**
 * Generates a unique identifier string composed of a timestamp prefix and
 * cryptographically random hex bytes, formatted in 6 hyphen-separated groups.
 *
 * Format: `xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxxx` (8-8-8-8-8-9)
 *
 * @returns A 54-character unique identifier string
 *
 * @example
 * generateUID() // "16478271-33403a97-d811b91d-345c8543-334d9a74-5044d5a47"
 */
export const generateUID = (): string => {
  const length = 18;
  const hash = crypto.randomBytes(length);
  const encoding: BufferEncoding = "hex";
  const hashEncoding = hash.toString(encoding);
  const today = Date.now();
  const hashID = `${today}${hashEncoding}`;
  return `${hashID.slice(0, 8)}-${hashID.slice(8, 16)}-${hashID.slice(16, 24)}-${hashID.slice(24, 32)}-${hashID.slice(32, 40)}-${hashID.slice(40, 49)}`;
};
