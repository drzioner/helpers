/** @packages */
import dayjs from 'dayjs';

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
  YYYY_MM_DD_HH = 'YYYY-MM-DD:HH',
  YYYYMMDDHH = 'YYYY/MM/DD:HH',
  MM_DD_YYYY_HH = 'MM-DD-YYYY:HH',
  MMDDYYYYHH = 'MM/DD/YYYY:HH',
  DD_MM_YYYY_HH = 'DD-MM-YYYY:HH',
  DDMMYYYYHH = 'DD/MM/YYYY:HH',
  YYYY_MM_DD_HH_MM = 'YYYY-MM-DD:HH:MM',
  YYYYMMDDHHMM = 'YYYY/MM/DD:HH:MM',
  MM_DD_YYYY_HH_MM = 'MM-DD-YYYY:HH:MM',
  MMDDYYYYHHMM = 'MM/DD/YYYY:HH:MM',
  DD_MM_YYYY_HH_MM = 'DD-MM-YYYY:HH:MM',
  DDMMYYYYHHMM = 'DD/MM/YYYY:HH:MM',
  YYYY_MM_DD_HH_MM_SSZ = 'YYYY-MM-DD:HH:MM:SSZ',
  YYYYMMDDHHMMSSZ = 'YYYY/MM/DD:HH:MM:SSZ',
  MM_DD_YYYY_HH_MM_SSZ = 'MM-DD-YYYY:HH:MM:SSZ',
  MMDDYYYYHHMMSSZ = 'MM/DD/YYYY:HH:MM:SSZ',
  DD_MM_YYYY_HH_MM_SSZ = 'DD-MM-YYYY:HH:MM:SSZ',
  DDMMYYYYHHMMSSZ = 'DD/MM/YYYY:HH:MM:SSZ',
}

export const formatADate = (
  date: Date | string,
  format: FormatDate,
): string => {
  return dayjs(date).format(format);
};
