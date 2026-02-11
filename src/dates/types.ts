/** Accepted date input types. */
export type DateType = Date | string | number;

/** Time unit for date difference calculations. */
export type DateUnit =
  | "milliseconds"
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "months"
  | "years";

/** Options for composite date manipulation. */
export interface DateOptions {
  milliseconds?: number;
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
  months?: number;
  years?: number;
  utc?: boolean;
}

/**
 * @deprecated Use `DateOptions` instead. Will be removed in v2.0.0.
 */
export type optionsDate = DateOptions;

/** Date format output type. */
export type FormatDateType = "time" | "utc" | "date" | "iso" | "locale" | "locale-time" | "custom";

/** Custom date format patterns. */
export enum CustomFormat {
  YYYY = "YYYY",
  MM = "MM",
  DD = "DD",
  YYYY_MM = "YYYY-MM",
  YYYYMM = "YYYY/MM",
  MM_DD = "MM-DD",
  MMDD = "MM/DD",
  DD_MM = "DD-MM",
  DDMM = "DD/MM",
  YYYY_MM_DD = "YYYY-MM-DD",
  YYYYMMDD = "YYYY/MM/DD",
  MM_DD_YYYY = "MM-DD-YYYY",
  MMDDYYYY = "MM/DD/YYYY",
  DD_MM_YYYY = "DD-MM-YYYY",
  DDMMYYYY = "DD/MM/YYYY",
  YYYY_MM_DD_HH = "YYYY-MM-DD HH",
  YYYYMMDDHH = "YYYY/MM/DD HH",
  MM_DD_YYYY_HH = "MM-DD-YYYY HH",
  MMDDYYYYHH = "MM/DD/YYYY HH",
  DD_MM_YYYY_HH = "DD-MM-YYYY HH",
  DDMMYYYYHH = "DD/MM/YYYY HH",
  YYYY_MM_DD_HH_MM = "YYYY-MM-DD HH:MM",
  YYYYMMDDHHMM = "YYYY/MM/DD HH:MM",
  MM_DD_YYYY_HH_MM = "MM-DD-YYYY HH:MM",
  MMDDYYYYHHMM = "MM/DD/YYYY HH:MM",
  DD_MM_YYYY_HH_MM = "DD-MM-YYYY HH:MM",
  DDMMYYYYHHMM = "DD/MM/YYYY HH:MM",
  YYYY_MM_DD_HH_MM_SSZ = "YYYY-MM-DD HH:MM:SSZ",
  YYYYMMDDHHMMSSZ = "YYYY/MM/DD HH:MM:SSZ",
  MM_DD_YYYY_HH_MM_SSZ = "MM-DD-YYYY HH:MM:SSZ",
  MMDDYYYYHHMMSSZ = "MM/DD/YYYY HH:MM:SSZ",
  DD_MM_YYYY_HH_MM_SSZ = "DD-MM-YYYY HH:MM:SSZ",
  DDMMYYYYHHMMSSZ = "DD/MM/YYYY HH:MM:SSZ",
  HHMMSSZ = "HH:MM:SSZ",
  HHMM = "HH:MM",
  MMSSZ = "MM:SSZ",
}

/** Time format patterns. */
export enum FormatTime {
  TIME = "HH:MM:SSZ",
  HOUR = "HH",
  HOUR_WITH_MINUTES = "HH:MM",
  MINUTES = "MM",
  MINUTES_WITH_SECONDS = "MM:SSZ",
  SECONDS = "SSZ",
}

/** Date-only format patterns (subset of CustomFormat). */
export enum FormatDate {
  YYYY = "YYYY",
  MM = "MM",
  DD = "DD",
  YYYY_MM = "YYYY-MM",
  YYYYMM = "YYYY/MM",
  MM_DD = "MM-DD",
  MMDD = "MM/DD",
  DD_MM = "DD-MM",
  DDMM = "DD/MM",
  YYYY_MM_DD = "YYYY-MM-DD",
  YYYYMMDD = "YYYY/MM/DD",
  MM_DD_YYYY = "MM-DD-YYYY",
  MMDDYYYY = "MM/DD/YYYY",
  DD_MM_YYYY = "DD-MM-YYYY",
  DDMMYYYY = "DD/MM/YYYY",
}
