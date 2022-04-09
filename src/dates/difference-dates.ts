/** @module */
import { getDate, getMonth } from './get-dates';
import { DateType } from './manipulate-dates';

export declare type DateUnit =
  | 'milliseconds'
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'months'
  | 'years';

const MILLISECOND = 1000;
const SECOND = 1 * MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 12 * MONTH;

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

const getValueUnit = (unit: DateUnit): number => {
  if ('milliseconds' === unit) return MILLISECOND;
  if ('seconds' === unit) return SECOND;
  if ('minutes' === unit) return MINUTE;
  if ('hours' === unit) return HOUR;
  if ('days' === unit) return DAY;
  if ('months' === unit) return MONTH;
  if ('years' === unit) return YEAR;
};

export const differenceTodayAndAnotherDate = (date: DateType, unit?: DateUnit): number => {
  const dateParse = getDate(date).getTime();
  const today = getDate().getTime();
  const diff = Math.abs(today - dateParse);
  return unit ? Math.floor(diff / getValueUnit(unit)) : diff;
};
