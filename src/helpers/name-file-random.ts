/** @packages */
import * as crypto from 'crypto';
import { extname } from 'path';

export const nameFileRandom = (
  originalName: string,
  length = 32,
  extension?: string,
  encoding: BufferEncoding = 'hex',
): string => {
  const hash = crypto.randomBytes(length);
  const name = hash.toString(encoding);
  const today = new Date();
  return `${today.getTime()}${name}${extension ?? extname(originalName)}`;
};
