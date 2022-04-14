/** @application */
import { fillANumberWithCharacters } from '../uncategorized';

/** @module */
import { getDate } from './get-dates';
import { DateType } from './manipulate-dates';

export declare type FormatDateType =
  | 'time'
  | 'utc'
  | 'date'
  | 'iso'
  | 'locale'
  | 'locale-time'
  | 'custom';

export enum CustomFormat {
  YYYY = 'YYYY',
  MM = 'MM',
  DD = 'DD',
  YYYY_MM = 'YYYY-MM',
  YYYYMM = 'YYYY/MM',
  MM_DD = 'MM-DD',
  MMDD = 'MM/DD',
  DD_MM = 'DD-MM',
  DDMM = 'DD/MM',
  YYYY_MM_DD = 'YYYY-MM-DD',
  YYYYMMDD = 'YYYY/MM/DD',
  MM_DD_YYYY = 'MM-DD-YYYY',
  MMDDYYYY = 'MM/DD/YYYY',
  DD_MM_YYYY = 'DD-MM-YYYY',
  DDMMYYYY = 'DD/MM/YYYY',
  YYYY_MM_DD_HH = 'YYYY-MM-DD HH',
  YYYYMMDDHH = 'YYYY/MM/DD HH',
  MM_DD_YYYY_HH = 'MM-DD-YYYY HH',
  MMDDYYYYHH = 'MM/DD/YYYY HH',
  DD_MM_YYYY_HH = 'DD-MM-YYYY HH',
  DDMMYYYYHH = 'DD/MM/YYYY HH',
  YYYY_MM_DD_HH_MM = 'YYYY-MM-DD HH:MM',
  YYYYMMDDHHMM = 'YYYY/MM/DD HH:MM',
  MM_DD_YYYY_HH_MM = 'MM-DD-YYYY HH:MM',
  MMDDYYYYHHMM = 'MM/DD/YYYY HH:MM',
  DD_MM_YYYY_HH_MM = 'DD-MM-YYYY HH:MM',
  DDMMYYYYHHMM = 'DD/MM/YYYY HH:MM',
  YYYY_MM_DD_HH_MM_SSZ = 'YYYY-MM-DD HH:MM:SSZ',
  YYYYMMDDHHMMSSZ = 'YYYY/MM/DD HH:MM:SSZ',
  MM_DD_YYYY_HH_MM_SSZ = 'MM-DD-YYYY HH:MM:SSZ',
  MMDDYYYYHHMMSSZ = 'MM/DD/YYYY HH:MM:SSZ',
  DD_MM_YYYY_HH_MM_SSZ = 'DD-MM-YYYY HH:MM:SSZ',
  DDMMYYYYHHMMSSZ = 'DD/MM/YYYY HH:MM:SSZ',
  HHMMSSZ = 'HH:MM:SSZ',
  HHMM = 'HH:MM',
  MMSSZ = 'MM:SSZ',
}

export enum FormatTime {
  TIME = 'HH:MM:SSZ',
  HOUR = 'HH',
  HOUR_WITH_MINUTES = 'HH:MM',
  MINUTES = 'MM',
  MINUTES_WITH_SECONDS = 'MM:SSZ',
  SECONDS = 'SSZ',
}

export enum FormatDate {
  YYYY = 'YYYY',
  MM = 'MM',
  DD = 'DD',
  YYYY_MM = 'YYYY-MM',
  YYYYMM = 'YYYY/MM',
  MM_DD = 'MM-DD',
  MMDD = 'MM/DD',
  DD_MM = 'DD-MM',
  DDMM = 'DD/MM',
  YYYY_MM_DD = 'YYYY-MM-DD',
  YYYYMMDD = 'YYYY/MM/DD',
  MM_DD_YYYY = 'MM-DD-YYYY',
  MMDDYYYY = 'MM/DD/YYYY',
  DD_MM_YYYY = 'DD-MM-YYYY',
  DDMMYYYY = 'DD/MM/YYYY',
}

export const formatDate = (
  formatType: FormatDateType,
  date?: DateType,
  format?: CustomFormat,
): string => {
  const dateParse = getDate(date);
  return getFormat(dateParse, formatType, format);
};

const getFormat = (
  date: Date,
  type: FormatDateType,
  format?: CustomFormat,
): string => {
  if (type === 'time') return date.toTimeString();
  if (type === 'utc') return date.toUTCString();
  if (type === 'date') return date.toDateString();
  if (type === 'iso') return date.toISOString();
  if (type === 'locale') return date.toLocaleString();
  if (type === 'locale-time') return date.toLocaleTimeString();
  if (type === 'custom') return getFormatCustom(date, format);
  return `${formatYear(date)}-${formatMonth(date)}-${formatDay(
    date,
  )} ${formatHours(date)}:${formatMinutes(date)}:${formatSeconds(date)}`;
};

export const getFormatCustom = (date: Date, format?: CustomFormat): string => {
  if (format) {
    const formats = format.split(' ');
    const dateFormat = formats[0]?.trim();
    const timeFormat = formats[1]?.trim();
    return `${getDateFormatted(date, dateFormat)} ${getTimeFormatted(
      date,
      timeFormat,
    )}`.trim();
  }
  return `${formatYear(date)}-${formatMonth(date)}-${formatDay(
    date,
  )} ${formatHours(date)}:${formatMinutes(date)}:${formatSeconds(date)}`;
};

export const getTimeFormatted = (
  date: Date,
  format?: FormatTime | string,
): string => {
  if (format === FormatTime.TIME)
    return `${formatHours(date)}:${formatMinutes(date)}:${formatSeconds(date)}.${formatMilliseconds(date)}`;
  if (format === FormatTime.HOUR) return formatHours(date);
  if (format === FormatTime.HOUR_WITH_MINUTES)
    return `${formatHours(date)}:${formatMinutes(date)}`;
  if (format === FormatTime.MINUTES) return formatMinutes(date);
  if (format === FormatTime.MINUTES_WITH_SECONDS)
    return `${formatMinutes(date)}:${formatSeconds(date)}`;
  if (format === FormatTime.SECONDS) return formatSeconds(date);
  return '';
};

export const getDateFormatted = (
  date: Date,
  format: FormatDate | string,
): string => {
  if (format === FormatDate.YYYY) return formatYear(date);
  if (format === FormatDate.MM) return formatMonth(date);
  if (format === FormatDate.DD) return formatDay(date);
  if (format === FormatDate.YYYY_MM)
    return `${formatYear(date)}-${formatMonth(date)}`;
  if (format === FormatDate.YYYYMM)
    return `${formatYear(date)}/${formatMonth(date)}`;
  if (format === FormatDate.MM_DD)
    return `${formatMonth(date)}-${formatDay(date)}`;
  if (format === FormatDate.MMDD)
    return `${formatMonth(date)}/${formatDay(date)}`;
  if (format === FormatDate.DD_MM)
    return `${formatDay(date)}-${formatMonth(date)}`;
  if (format === FormatDate.DDMM)
    return `${formatDay(date)}/${formatMonth(date)}`;
  if (format === FormatDate.YYYY_MM_DD)
    return `${formatYear(date)}-${formatMonth(date)}-${formatDay(date)}`;
  if (format === FormatDate.YYYYMMDD)
    return `${formatYear(date)}/${formatMonth(date)}/${formatDay(date)}`;
  if (format === FormatDate.MM_DD_YYYY)
    return `${formatMonth(date)}-${formatDay(date)}-${formatYear(date)}`;
  if (format === FormatDate.MMDDYYYY)
    return `${formatMonth(date)}/${formatDay(date)}/${formatYear(date)}`;
  if (format === FormatDate.DDMMYYYY)
    return `${formatDay(date)}/${formatMonth(date)}/${formatYear(date)}`;
  if (format === FormatDate.DD_MM_YYYY)
    return `${formatDay(date)}-${formatMonth(date)}-${formatYear(date)}`;
  return '';
};

const formatYear = (date: Date): string => date.getFullYear().toString();
const formatMonth = (date: Date): string =>
  fillANumberWithCharacters(date.getMonth() + 1, 2);
const formatDay = (date: Date): string =>
  fillANumberWithCharacters(date.getDate(), 2);
const formatHours = (date: Date): string =>
  fillANumberWithCharacters(date.getHours(), 2);
const formatMinutes = (date: Date): string =>
  fillANumberWithCharacters(date.getMinutes(), 2);
const formatSeconds = (date: Date): string =>
  fillANumberWithCharacters(date.getSeconds(), 2);
const formatMilliseconds = (date: Date): string =>
  date.getMilliseconds().toString();

export const formatYearUTC = (date: Date): string =>
  date.getUTCFullYear().toString();
export const formatMonthUTC = (date: Date): string =>
  fillANumberWithCharacters(date.getUTCMonth() + 1, 2);
export const formatDayUTC = (date: Date): string =>
  fillANumberWithCharacters(date.getUTCDate(), 2);
export const formatHoursUTC = (date: Date): string =>
  fillANumberWithCharacters(date.getUTCHours(), 2);
export const formatMinutesUTC = (date: Date): string =>
  fillANumberWithCharacters(date.getUTCMinutes(), 2);
export const formatSecondsUTC = (date: Date): string =>
  fillANumberWithCharacters(date.getUTCSeconds(), 2);
export const formatMillisecondsUTC = (date: Date): string =>
  date.getUTCMilliseconds().toString();
