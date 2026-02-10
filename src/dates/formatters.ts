import { padNumber } from "../strings/pad.js";
import { getDate } from "./getters.js";
import type { DateType, FormatDateType } from "./types.js";
import { type CustomFormat, FormatDate, FormatTime } from "./types.js";

// --- Internal format helpers ---

const formatYear = (date: Date): string => date.getFullYear().toString();
const formatMonth = (date: Date): string => padNumber(date.getMonth() + 1, 2);
const formatDay = (date: Date): string => padNumber(date.getDate(), 2);
const formatHours = (date: Date): string => padNumber(date.getHours(), 2);
const formatMinutes = (date: Date): string => padNumber(date.getMinutes(), 2);
const formatSeconds = (date: Date): string => padNumber(date.getSeconds(), 2);
const formatMilliseconds = (date: Date): string => date.getMilliseconds().toString();

const defaultFormat = (date: Date): string =>
  `${formatYear(date)}-${formatMonth(date)}-${formatDay(date)} ${formatHours(date)}:${formatMinutes(date)}:${formatSeconds(date)}`;

// --- UTC format helpers (exported) ---

/** Formats the UTC year. */
export const formatYearUTC = (date: Date): string => date.getUTCFullYear().toString();

/** Formats the UTC month (zero-padded). */
export const formatMonthUTC = (date: Date): string => padNumber(date.getUTCMonth() + 1, 2);

/** Formats the UTC day (zero-padded). */
export const formatDayUTC = (date: Date): string => padNumber(date.getUTCDate(), 2);

/** Formats the UTC hours (zero-padded). */
export const formatHoursUTC = (date: Date): string => padNumber(date.getUTCHours(), 2);

/** Formats the UTC minutes (zero-padded). */
export const formatMinutesUTC = (date: Date): string => padNumber(date.getUTCMinutes(), 2);

/** Formats the UTC seconds (zero-padded). */
export const formatSecondsUTC = (date: Date): string => padNumber(date.getUTCSeconds(), 2);

/** Formats the UTC milliseconds. */
export const formatMillisecondsUTC = (date: Date): string => date.getUTCMilliseconds().toString();

// --- Public API ---

/**
 * Formats a date according to the specified format type.
 *
 * @param formatType - Output format type
 * @param date - Date to format (defaults to current date)
 * @param format - Custom format pattern (required when formatType is "custom")
 * @returns Formatted date string
 *
 * @example
 * formatDate("iso", "2021-04-08")       // "2021-04-08T00:00:00.000Z"
 * formatDate("custom", new Date(), CustomFormat.YYYY_MM_DD) // "2023-06-15"
 */
export const formatDate = (
  formatType: FormatDateType,
  date?: DateType,
  format?: CustomFormat,
): string => {
  const dateParse = getDate(date);
  return getFormat(dateParse, formatType, format);
};

const getFormat = (date: Date, type: FormatDateType, format?: CustomFormat): string => {
  if (type === "time") return date.toTimeString();
  if (type === "utc") return date.toUTCString();
  if (type === "date") return date.toDateString();
  if (type === "iso") return date.toISOString();
  if (type === "locale") return date.toLocaleString();
  if (type === "locale-time") return date.toLocaleTimeString();
  if (type === "custom") return getFormatCustom(date, format);
  return defaultFormat(date);
};

/**
 * Formats a date using a custom format pattern.
 *
 * @param date - Date to format
 * @param format - Custom format pattern
 * @returns Formatted date string
 */
export const getFormatCustom = (date: Date, format?: CustomFormat): string => {
  if (format) {
    const formats = format.split(" ");
    const dateFormat = formats[0]?.trim();
    const timeFormat = formats[1]?.trim();
    return `${getDateFormatted(date, dateFormat)} ${getTimeFormatted(date, timeFormat)}`.trim();
  }
  return defaultFormat(date);
};

/**
 * Formats the time portion of a date.
 *
 * @param date - Date to extract time from
 * @param format - Time format pattern
 * @returns Formatted time string
 */
export const getTimeFormatted = (date: Date, format?: FormatTime | string): string => {
  if (format === FormatTime.TIME)
    return `${formatHours(date)}:${formatMinutes(date)}:${formatSeconds(date)}.${formatMilliseconds(date)}`;
  if (format === FormatTime.HOUR) return formatHours(date);
  if (format === FormatTime.HOUR_WITH_MINUTES) return `${formatHours(date)}:${formatMinutes(date)}`;
  if (format === FormatTime.MINUTES) return formatMinutes(date);
  if (format === FormatTime.MINUTES_WITH_SECONDS)
    return `${formatMinutes(date)}:${formatSeconds(date)}`;
  if (format === FormatTime.SECONDS) return formatSeconds(date);
  return "";
};

/**
 * Formats the date portion of a date.
 *
 * @param date - Date to extract date from
 * @param format - Date format pattern
 * @returns Formatted date string
 */
export const getDateFormatted = (date: Date, format: FormatDate | string): string => {
  if (format === FormatDate.YYYY) return formatYear(date);
  if (format === FormatDate.MM) return formatMonth(date);
  if (format === FormatDate.DD) return formatDay(date);
  if (format === FormatDate.YYYY_MM) return `${formatYear(date)}-${formatMonth(date)}`;
  if (format === FormatDate.YYYYMM) return `${formatYear(date)}/${formatMonth(date)}`;
  if (format === FormatDate.MM_DD) return `${formatMonth(date)}-${formatDay(date)}`;
  if (format === FormatDate.MMDD) return `${formatMonth(date)}/${formatDay(date)}`;
  if (format === FormatDate.DD_MM) return `${formatDay(date)}-${formatMonth(date)}`;
  if (format === FormatDate.DDMM) return `${formatDay(date)}/${formatMonth(date)}`;
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
  return "";
};
