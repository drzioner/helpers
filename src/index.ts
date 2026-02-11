// array
export {
  chunk,
  compact,
  difference,
  first,
  groupBy,
  intersection,
  last,
  range,
  shuffle,
  unique,
  uniqueBy,
} from "./array/operations.js";
export type { Falsy, KeySelector } from "./array/types.js";

// database
export { generateUID } from "./database/generate-uid.js";

// dates
export { dateDifference, differenceTodayAndAnotherDate } from "./dates/difference.js";
export {
  formatDate,
  formatDayUTC,
  formatHoursUTC,
  formatMillisecondsUTC,
  formatMinutesUTC,
  formatMonthUTC,
  formatSecondsUTC,
  formatYearUTC,
  getDateFormatted,
  getFormatCustom,
  getTimeFormatted,
} from "./dates/formatters.js";
export {
  getDate,
  getDay,
  getDayUTC,
  getHours,
  getHoursUTC,
  getMilliseconds,
  getMillisecondsUTC,
  getMinutes,
  getMinutesUTC,
  getMonth,
  getMonthUTC,
  getSeconds,
  getSecondsUTC,
  getYear,
  getYearUTC,
  parseDate,
} from "./dates/getters.js";
export {
  manipulateDate,
  manipulateDays,
  manipulateDaysUTC,
  manipulateHours,
  manipulateHoursUTC,
  manipulateMilliseconds,
  manipulateMillisecondsUTC,
  manipulateMinutes,
  manipulateMinutesUTC,
  manipulateMonths,
  manipulateMonthsUTC,
  manipulateSeconds,
  manipulateSecondsUTC,
  manipulateYears,
  manipulateYearsUTC,
} from "./dates/manipulators.js";
export type {
  DateOptions,
  DateType,
  DateUnit,
  FormatDateType,
  optionsDate,
} from "./dates/types.js";
export { CustomFormat, FormatDate, FormatTime } from "./dates/types.js";

// files
export { createFile } from "./files/create-file.js";
export { nameFileRandom, randomFileName } from "./files/random-file-name.js";

// is
export {
  isArray,
  isBoolean,
  isDate,
  isEmpty,
  isFunction,
  isNullish,
  isNumber,
  isObject,
  isRegExp,
  isString,
} from "./is/guards.js";
export type { PlainObject } from "./is/types.js";

// math (deprecated — will be removed in v1.0.0)
export {
  arithmeticOperations,
  division,
  multiplication,
  subtraction,
  sum,
} from "./math/operations.js";
export type { ArithmeticOperationType } from "./math/types.js";
export { ArithmeticOperations } from "./math/types.js";

// number
export { formatBytes, ordinal } from "./number/formatters.js";
export { average, clamp, inRange, randomInt, round, sumAll } from "./number/operations.js";

// object
export { get, has, merge, omit, pick } from "./object/operations.js";
export type { AnyObject } from "./object/types.js";

// string
export { escapeHtml, slugify, truncate, unescapeHtml } from "./string/operations.js";
export {
  camelCase,
  capitalize,
  kebabCase,
  pascalCase,
  snakeCase,
  splitWords,
} from "./string/transforms.js";

// strings (deprecated — use number module for padNumber)
export { fillANumberWithCharacters, padNumber } from "./strings/pad.js";
