/** @packages */
import * as crypto from 'crypto';
import { appendFile } from 'fs';
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

export const createFile = (
  file: string,
  data: string | Uint8Array,
  path?: string,
) => {
  const basePath = path ?? __dirname;
  appendFile(`${basePath}/${file}`, data, (error) => {
    if (error) throw error;
  });
};
