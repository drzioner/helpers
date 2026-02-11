const BYTE_SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"] as const;

/**
 * Formats a byte count into a human-readable string.
 *
 * @param bytes - The number of bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns A formatted string like "1.5 KB" or "3.2 MB"
 *
 * @example
 * formatBytes(0)          // "0 Bytes"
 * formatBytes(1024)       // "1 KB"
 * formatBytes(1536)       // "1.5 KB"
 * formatBytes(1048576)    // "1 MB"
 * formatBytes(1073741824) // "1 GB"
 */
export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = Math.max(0, decimals);
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
  const value = bytes / k ** i;

  return `${Number.parseFloat(value.toFixed(dm))} ${BYTE_SIZES[i]}`;
};

/**
 * Returns the ordinal suffix for a number (e.g., "st", "nd", "rd", "th").
 *
 * @param n - The number to get the ordinal for
 * @returns The number with its ordinal suffix
 *
 * @example
 * ordinal(1)   // "1st"
 * ordinal(2)   // "2nd"
 * ordinal(3)   // "3rd"
 * ordinal(4)   // "4th"
 * ordinal(11)  // "11th"
 * ordinal(22)  // "22nd"
 * ordinal(113) // "113th"
 */
export const ordinal = (n: number): string => {
  const abs = Math.abs(n);
  const mod100 = abs % 100;

  if (mod100 >= 11 && mod100 <= 13) {
    return `${n}th`;
  }

  switch (abs % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
};
