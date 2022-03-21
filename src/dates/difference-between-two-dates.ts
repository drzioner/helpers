/** @packages */
import dayjs from 'dayjs';
import { OpUnitType, QUnitType, UnitTypeLong, UnitTypeLongPlural } from 'dayjs';

export const differenceBetweenTwoDates = (
  firstDate: Date | string,
  secondDate: Date | string,
  unit?: QUnitType | OpUnitType | UnitTypeLong | UnitTypeLongPlural,
): number => {
  const today = dayjs(firstDate);
  const expiration = dayjs(secondDate);
  return unit ? expiration.diff(today, unit) : expiration.diff(today);
};

export const differenceBetweenTodayAndAnotherDate = (
  date: Date | string,
  unit?: QUnitType | OpUnitType | UnitTypeLong | UnitTypeLongPlural,
): number => {
  const dateString = dayjs().format('YYYY-MM-DD');
  const today = dayjs(dateString);
  const expiration = dayjs(date);
  return unit ? expiration.diff(today, unit) : expiration.diff(today);
};
