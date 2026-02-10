/**
 * Options for padding a number with characters.
 */
export interface PadNumberOptions {
  /** Total length of the resulting string. @default 4 */
  length?: number;
  /** Character to pad with. @default "0" */
  fill?: string;
}
