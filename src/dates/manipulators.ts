import { getDate } from "./getters";
import type { DateOptions, DateType } from "./types";

// --- Factory for date manipulators ---

const createManipulator =
  (get: (d: Date) => number, set: (d: Date, v: number) => number) =>
  (value: number, date?: DateType): Date => {
    const d = getDate(date);
    return new Date(set(d, get(d) + value));
  };

/** Adds/subtracts milliseconds from a date. */
export const manipulateMilliseconds = createManipulator(
  (d) => d.getMilliseconds(),
  (d, v) => d.setMilliseconds(v),
);

/** Adds/subtracts UTC milliseconds from a date. */
export const manipulateMillisecondsUTC = createManipulator(
  (d) => d.getUTCMilliseconds(),
  (d, v) => d.setUTCMilliseconds(v),
);

/** Adds/subtracts seconds from a date. */
export const manipulateSeconds = createManipulator(
  (d) => d.getSeconds(),
  (d, v) => d.setSeconds(v),
);

/** Adds/subtracts UTC seconds from a date. */
export const manipulateSecondsUTC = createManipulator(
  (d) => d.getUTCSeconds(),
  (d, v) => d.setUTCSeconds(v),
);

/** Adds/subtracts minutes from a date. */
export const manipulateMinutes = createManipulator(
  (d) => d.getMinutes(),
  (d, v) => d.setMinutes(v),
);

/** Adds/subtracts UTC minutes from a date. */
export const manipulateMinutesUTC = createManipulator(
  (d) => d.getUTCMinutes(),
  (d, v) => d.setUTCMinutes(v),
);

/** Adds/subtracts hours from a date. */
export const manipulateHours = createManipulator(
  (d) => d.getHours(),
  (d, v) => d.setHours(v),
);

/** Adds/subtracts UTC hours from a date. */
export const manipulateHoursUTC = createManipulator(
  (d) => d.getUTCHours(),
  (d, v) => d.setUTCHours(v),
);

/** Adds/subtracts days from a date. */
export const manipulateDays = createManipulator(
  (d) => d.getDate(),
  (d, v) => d.setDate(v),
);

/** Adds/subtracts UTC days from a date. */
export const manipulateDaysUTC = createManipulator(
  (d) => d.getUTCDate(),
  (d, v) => d.setUTCDate(v),
);

/** Adds/subtracts months from a date. */
export const manipulateMonths = createManipulator(
  (d) => d.getMonth(),
  (d, v) => d.setMonth(v),
);

/** Adds/subtracts UTC months from a date. */
export const manipulateMonthsUTC = createManipulator(
  (d) => d.getUTCMonth(),
  (d, v) => d.setUTCMonth(v),
);

/** Adds/subtracts years from a date. */
export const manipulateYears = createManipulator(
  (d) => d.getFullYear(),
  (d, v) => d.setFullYear(v),
);

/** Adds/subtracts UTC years from a date. */
export const manipulateYearsUTC = createManipulator(
  (d) => d.getUTCFullYear(),
  (d, v) => d.setUTCFullYear(v),
);

/**
 * Manipulates multiple date components at once.
 *
 * @param options - Object with time units to add/subtract and optional UTC flag
 * @param date - Base date (defaults to current date)
 * @returns New Date with all manipulations applied
 *
 * @example
 * manipulateDate({ days: -1, months: 1 }, "2022-04-09")
 * // 2022-05-08T00:00:00.000Z
 *
 * manipulateDate({ hours: 5, utc: true })
 * // current date + 5 UTC hours
 */
export const manipulateDate = (options: DateOptions, date?: DateType): Date => {
  const { milliseconds, seconds, minutes, hours, days, months, years, utc } = options;
  let result = getDate(date);
  if (milliseconds) {
    result = utc
      ? manipulateMillisecondsUTC(milliseconds, result)
      : manipulateMilliseconds(milliseconds, result);
  }
  if (seconds) {
    result = utc ? manipulateSecondsUTC(seconds, result) : manipulateSeconds(seconds, result);
  }
  if (minutes) {
    result = utc ? manipulateMinutesUTC(minutes, result) : manipulateMinutes(minutes, result);
  }
  if (hours) {
    result = utc ? manipulateHoursUTC(hours, result) : manipulateHours(hours, result);
  }
  if (days) {
    result = utc ? manipulateDaysUTC(days, result) : manipulateDays(days, result);
  }
  if (months) {
    result = utc ? manipulateMonthsUTC(months, result) : manipulateMonths(months, result);
  }
  if (years) {
    result = utc ? manipulateYearsUTC(years, result) : manipulateYears(years, result);
  }
  return result;
};
