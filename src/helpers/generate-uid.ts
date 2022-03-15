/** @packages */
import * as crypto from 'crypto';

export const generateUID = (length = 18): string => {
  const hash = crypto.randomBytes(length);
  const encoding: BufferEncoding = 'hex';
  const hashEncoding = hash.toString(encoding);
  const today = new Date().getTime();
  const hashID = `${today}${hashEncoding}`;
  return `${hashID.slice(0, 8)}-${hashID.slice(8, 16)}-${hashID.slice(
    16,
    24,
  )}-${hashID.slice(24, 32)}-${hashID.slice(32, 40)}-${hashID.slice(40, 49)}`;
};
