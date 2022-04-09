/** @module */
import { DateType, parseDate } from './manipulate-dates';

export const getDate = (date?: DateType): Date => {
  return date ? parseDate(date) : new Date();
};

export const getMilliseconds = (date?: DateType): number => {
  return getDate(date).getMilliseconds();
};

export const getMillisecondsUTC = (date?: DateType): number => {
  return getDate(date).getUTCMilliseconds();
};

export const getSeconds = (date?: DateType): number => {
  return getDate(date).getSeconds();
};

export const getSecondsUTC = (date?: DateType): number => {
  return getDate(date).getUTCSeconds();
};

export const getMinutes = (date?: DateType): number => {
  return getDate(date).getMinutes();
};

export const getMinutesUTC = (date?: DateType): number => {
  return getDate(date).getUTCMinutes();
};

export const getHours = (date?: DateType): number => {
  return getDate(date).getHours();
};

export const getHoursUTC = (date?: DateType): number => {
  return getDate(date).getUTCHours();
};

export const getDay = (date?: DateType): number => {
  return getDate(date).getDate();
};

export const getDayUTC = (date?: DateType): number => {
  return getDate(date).getUTCDate();
};

export const getMonth = (date?: DateType): number => {
  return getDate(date).getMonth();
};

export const getMonthUTC = (date?: DateType): number => {
  return getDate(date).getUTCMonth();
};

export const getYear = (date?: DateType): number => {
  return getDate(date).getFullYear()
};

export const getYearUTC = (date?: DateType): number => {
  return getDate(date).getUTCFullYear()
};
