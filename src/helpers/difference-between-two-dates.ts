/** @packages */
import dayjs from 'dayjs';
import { OpUnitType, QUnitType } from 'dayjs';

export const dateDifference = (
  date: Date | string,
  unit?: QUnitType | OpUnitType,
): number => {
  const dateString = dayjs().format('YYYY-MM-DD');
  const today = dayjs(dateString);
  const expiration = dayjs(date);
  return expiration.diff(today, unit);
};
