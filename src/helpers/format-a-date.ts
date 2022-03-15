/** @packages */
import dayjs from 'dayjs';

export enum FormatDate {
  YYYY_MM_DD = 'YYYY-MM-DD',
  YYYYMMDD = 'YYYY/MM/DD',
  MM_DD_YYYY = 'MM-DD-YYYY',
  MMDDYYYY = 'MM/DD/YYYY',
  DD_MM_YYYY = 'DD-MM-YYYY',
  DDMMYYYY = 'DD/MM/YYYY',
}

export const formatADate = (
  date: Date | string,
  format: FormatDate,
): string => {
  return dayjs(date).format(format);
};
