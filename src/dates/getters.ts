import type { DateType } from "./types";

/**
 * Parses a date input into a Date object. Returns current date if no input.
 *
 * @param date - Date input (Date object, ISO string, or timestamp)
 * @returns Parsed Date object
 *
 * @example
 * parseDate("2023-06-15")       // Date(2023-06-15T00:00:00.000Z)
 * parseDate(1686787200000)      // Date from timestamp
 * parseDate()                   // new Date() (current time)
 */
export const parseDate = (date?: DateType): Date =>
  date !== undefined ? new Date(date) : new Date();

/**
 * Returns a Date object from the input, or the current date if no input.
 *
 * @param date - Optional date input
 * @returns Date object
 *
 * @example
 * getDate("2023-06-15") // Date(2023-06-15...)
 * getDate()             // current date
 */
export const getDate = (date?: DateType): Date => {
  return date ? parseDate(date) : new Date();
};

// --- Factory for date component getters ---

const createGetter =
  (extract: (d: Date) => number) =>
  (date?: DateType): number =>
    extract(getDate(date));

/** Returns the milliseconds (0-999) of the given date. */
export const getMilliseconds = createGetter((d) => d.getMilliseconds());

/** Returns the UTC milliseconds (0-999) of the given date. */
export const getMillisecondsUTC = createGetter((d) => d.getUTCMilliseconds());

/** Returns the seconds (0-59) of the given date. */
export const getSeconds = createGetter((d) => d.getSeconds());

/** Returns the UTC seconds (0-59) of the given date. */
export const getSecondsUTC = createGetter((d) => d.getUTCSeconds());

/** Returns the minutes (0-59) of the given date. */
export const getMinutes = createGetter((d) => d.getMinutes());

/** Returns the UTC minutes (0-59) of the given date. */
export const getMinutesUTC = createGetter((d) => d.getUTCMinutes());

/** Returns the hours (0-23) of the given date. */
export const getHours = createGetter((d) => d.getHours());

/** Returns the UTC hours (0-23) of the given date. */
export const getHoursUTC = createGetter((d) => d.getUTCHours());

/** Returns the day of the month (1-31) of the given date. */
export const getDay = createGetter((d) => d.getDate());

/** Returns the UTC day of the month (1-31) of the given date. */
export const getDayUTC = createGetter((d) => d.getUTCDate());

/** Returns the month (0-11) of the given date. */
export const getMonth = createGetter((d) => d.getMonth());

/** Returns the UTC month (0-11) of the given date. */
export const getMonthUTC = createGetter((d) => d.getUTCMonth());

/** Returns the full year of the given date. */
export const getYear = createGetter((d) => d.getFullYear());

/** Returns the UTC full year of the given date. */
export const getYearUTC = createGetter((d) => d.getUTCFullYear());
