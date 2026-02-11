/**
 * Pads a number with a fill character to reach the desired string length.
 *
 * @param value - The number to pad
 * @param length - Total length of the resulting string
 * @param fill - Character to pad with
 * @returns The padded string representation of the number
 *
 * @example
 * padNumber(1)         // "0001"
 * padNumber(1, 2)      // "01"
 * padNumber(1, 5, "z") // "zzzz1"
 * padNumber(12345, 3)  // "12345" (no truncation)
 */
export const padNumber = (value: number, length = 4, fill = "0"): string => {
  if (value < 0) {
    return `-${Math.abs(value)
      .toString()
      .padStart(length - 1, fill)}`;
  }
  return value.toString().padStart(length, fill);
};

/**
 * @deprecated Use `padNumber` from the `number` module instead. Will be removed in v1.0.0.
 */
export const fillANumberWithCharacters = padNumber;
