import { getDate } from "./get-dates";

export declare type optionsDate = {
  milliseconds?: number;
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
  months?: number;
  years?: number;
  utc?: boolean;
};

export declare type DateType = Date | string | number;

export const parseDate = (date?: DateType): Date => new Date(date);

export const manipulateMilliseconds = (
  milliseconds: number,
  date?: DateType,
): Date => {
  const newDate = getDate(date);
  return new Date(
    newDate.setMilliseconds(newDate.getMilliseconds() + milliseconds),
  );
};

export const manipulateMillisecondsUTC = (
  milliseconds: number,
  date?: DateType,
): Date => {
  const newDate = getDate(date);
  return new Date(
    newDate.setUTCMilliseconds(newDate.getUTCMilliseconds() + milliseconds),
  );
};

export const manipulateSeconds = (seconds: number, date?: DateType): Date => {
  const newDate = getDate(date);
  return new Date(newDate.setSeconds(newDate.getSeconds() + seconds));
};

export const manipulateSecondsUTC = (
  seconds: number,
  date?: DateType,
): Date => {
  const newDate = getDate(date);
  return new Date(newDate.setUTCSeconds(newDate.getUTCSeconds() + seconds));
};

export const manipulateMinutes = (minutes: number, date?: DateType): Date => {
  const newDate = getDate(date);
  return new Date(newDate.setMinutes(newDate.getMinutes() + minutes));
};

export const manipulateMinutesUTC = (
  minutes: number,
  date?: DateType,
): Date => {
  const newDate = getDate(date);
  return new Date(newDate.setUTCMinutes(newDate.getUTCMinutes() + minutes));
};

export const manipulateHours = (hours: number, date?: DateType): Date => {
  const newDate = getDate(date);
  return new Date(newDate.setHours(newDate.getHours() + hours));
};

export const manipulateHoursUTC = (hours: number, date?: DateType): Date => {
  const newDate = getDate(date);
  return new Date(newDate.setUTCHours(newDate.getUTCHours() + hours));
};

export const manipulateDays = (days: number, date?: DateType): Date => {
  const newDate = getDate(date);
  return new Date(newDate.setDate(newDate.getDate() + days));
};

export const manipulateDaysUTC = (days: number, date?: DateType): Date => {
  const newDate = getDate(date);
  return new Date(newDate.setUTCDate(newDate.getUTCDate() + days));
};

export const manipulateMonths = (months: number, date?: DateType): Date => {
  const newDate = getDate(date);
  return new Date(newDate.setMonth(newDate.getMonth() + months));
};

export const manipulateMonthsUTC = (
  months: number,
  date?: DateType,
): Date => {
  const newDate = getDate(date);
  return new Date(newDate.setUTCMonth(newDate.getUTCMonth() + months));
};

export const manipulateYears = (years: number, date?: DateType): Date => {
  const newDate = getDate(date);
  return new Date(newDate.setFullYear(newDate.getFullYear() + years));
};

export const manipulateYearsUTC = (years: number, date?: DateType): Date => {
  const newDate = getDate(date);
  return new Date(newDate.setUTCFullYear(newDate.getUTCFullYear() + years));
};

export const manipulateDate = (
  options: optionsDate,
  date?: DateType,
): Date => {
  const { milliseconds, seconds, minutes, hours, days, months, years, utc } =
    options;
  let dateParse = getDate(date);
  if (milliseconds) {
    dateParse = utc
      ? manipulateMillisecondsUTC(milliseconds, dateParse)
      : manipulateMilliseconds(milliseconds, dateParse);
  }
  if (seconds) {
    dateParse = utc
      ? manipulateSecondsUTC(seconds, dateParse)
      : manipulateSeconds(seconds, dateParse);
  }
  if (minutes) {
    dateParse = utc
      ? manipulateMinutesUTC(minutes, dateParse)
      : manipulateMinutes(minutes, dateParse);
  }
  if (hours) {
    dateParse = utc
      ? manipulateHoursUTC(hours, dateParse)
      : manipulateHours(hours, dateParse);
  }
  if (days) {
    dateParse = utc
      ? manipulateDaysUTC(days, dateParse)
      : manipulateDays(days, dateParse);
  }
  if (months) {
    dateParse = utc
      ? manipulateMonthsUTC(months, dateParse)
      : manipulateMonths(months, dateParse);
  }
  if (years) {
    dateParse = utc
      ? manipulateYearsUTC(years, dateParse)
      : manipulateYears(years, dateParse);
  }
  return dateParse;
};
