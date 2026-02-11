import { getDate } from "./getters.js";
import type { DateType, DateUnit } from "./types.js";

const MILLISECOND = 1;
const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 12 * MONTH;

const getValueUnit = (unit: DateUnit): number => {
  if ("milliseconds" === unit) return MILLISECOND;
  if ("seconds" === unit) return SECOND;
  if ("minutes" === unit) return MINUTE;
  if ("hours" === unit) return HOUR;
  if ("days" === unit) return DAY;
  if ("months" === unit) return MONTH;
  if ("years" === unit) return YEAR;
  throw new Error(
    `Invalid date unit: "${unit}". Expected one of: milliseconds, seconds, minutes, hours, days, months, years`,
  );
};

/**
 * Calculates the absolute difference between two dates.
 *
 * @param firstDate - First date
 * @param secondDate - Second date
 * @param unit - Unit for the result (omit for raw milliseconds)
 * @returns Absolute difference as a floored integer
 *
 * @example
 * dateDifference("2021-04-09", "2021-04-01", "days")         // 8
 * dateDifference("2021-04-09", "2021-04-01", "milliseconds") // 691200000
 * dateDifference("2021-04-09", "2021-04-01")                 // 691200000
 */
export const dateDifference = (
  firstDate: DateType,
  secondDate: DateType,
  unit?: DateUnit,
): number => {
  const first = getDate(firstDate).getTime();
  const second = getDate(secondDate).getTime();
  const diff = Math.abs(second - first);
  return unit ? Math.floor(diff / getValueUnit(unit)) : diff;
};

/**
 * Calculates the absolute difference between today and another date.
 *
 * @param date - The date to compare with today
 * @param unit - Unit for the result (omit for raw milliseconds)
 * @returns Absolute difference as a floored integer
 *
 * @example
 * differenceTodayAndAnotherDate("2021-04-08", "months") // varies
 */
export const differenceTodayAndAnotherDate = (date: DateType, unit?: DateUnit): number => {
  const dateParse = getDate(date).getTime();
  const today = getDate().getTime();
  const diff = Math.abs(today - dateParse);
  return unit ? Math.floor(diff / getValueUnit(unit)) : diff;
};
