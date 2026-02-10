import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// --- Difference ---
import { dateDifference, differenceTodayAndAnotherDate } from "./difference";
// --- Formatters ---
import {
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
} from "./formatters";
// --- Getters ---
import {
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
} from "./getters";
// --- Manipulators ---
import {
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
} from "./manipulators";
import type { DateOptions, FormatDateType } from "./types";
// --- Types ---
import { CustomFormat, FormatDate, FormatTime } from "./types";

// ============================================================================
// Fixed reference dates for deterministic tests
// ============================================================================

/** 2023-06-15T10:30:45.123Z */
const REF_DATE = new Date("2023-06-15T10:30:45.123Z");
const REF_ISO = "2023-06-15T10:30:45.123Z";
const REF_TIMESTAMP = REF_DATE.getTime();

// ============================================================================
// Getters
// ============================================================================

describe("getters", () => {
  describe("parseDate", () => {
    it("should parse an ISO string", () => {
      const result = parseDate(REF_ISO);
      expect(result.getTime()).toBe(REF_TIMESTAMP);
    });

    it("should parse a numeric timestamp", () => {
      const result = parseDate(REF_TIMESTAMP);
      expect(result.getTime()).toBe(REF_TIMESTAMP);
    });

    it("should accept a Date object", () => {
      const result = parseDate(REF_DATE);
      expect(result.getTime()).toBe(REF_TIMESTAMP);
    });

    it("should return current date when called without arguments", () => {
      const before = Date.now();
      const result = parseDate();
      const after = Date.now();
      expect(result.getTime()).toBeGreaterThanOrEqual(before);
      expect(result.getTime()).toBeLessThanOrEqual(after);
    });
  });

  describe("getDate", () => {
    it("should return a Date from an ISO string", () => {
      expect(getDate(REF_ISO).getTime()).toBe(REF_TIMESTAMP);
    });

    it("should return a Date from a timestamp", () => {
      expect(getDate(REF_TIMESTAMP).getTime()).toBe(REF_TIMESTAMP);
    });

    it("should return a Date from a Date object", () => {
      expect(getDate(REF_DATE).getTime()).toBe(REF_TIMESTAMP);
    });

    it("should return current date when called without arguments", () => {
      const before = Date.now();
      const result = getDate();
      const after = Date.now();
      expect(result.getTime()).toBeGreaterThanOrEqual(before);
      expect(result.getTime()).toBeLessThanOrEqual(after);
    });
  });

  // --- Local getters ---

  describe("getMilliseconds", () => {
    it("should return local milliseconds", () => {
      expect(getMilliseconds(REF_DATE)).toBe(123);
    });

    it("should default to current date when no argument", () => {
      expect(typeof getMilliseconds()).toBe("number");
    });
  });

  describe("getSeconds", () => {
    it("should return local seconds", () => {
      expect(getSeconds(REF_DATE)).toBe(45);
    });
  });

  describe("getMinutes", () => {
    it("should return local minutes", () => {
      // Local minutes depend on timezone offset; just verify type and range
      const result = getMinutes(REF_DATE);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(59);
    });
  });

  describe("getHours", () => {
    it("should return local hours", () => {
      const result = getHours(REF_DATE);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(23);
    });
  });

  describe("getDay", () => {
    it("should return day of month (local)", () => {
      const result = getDay(REF_DATE);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(31);
    });
  });

  describe("getMonth", () => {
    it("should return local month (0-indexed)", () => {
      const result = getMonth(REF_DATE);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(11);
    });
  });

  describe("getYear", () => {
    it("should return local full year", () => {
      expect(getYear(REF_DATE)).toBe(2023);
    });
  });

  // --- UTC getters ---

  describe("getMillisecondsUTC", () => {
    it("should return UTC milliseconds", () => {
      expect(getMillisecondsUTC(REF_DATE)).toBe(123);
    });
  });

  describe("getSecondsUTC", () => {
    it("should return UTC seconds", () => {
      expect(getSecondsUTC(REF_DATE)).toBe(45);
    });
  });

  describe("getMinutesUTC", () => {
    it("should return UTC minutes", () => {
      expect(getMinutesUTC(REF_DATE)).toBe(30);
    });
  });

  describe("getHoursUTC", () => {
    it("should return UTC hours", () => {
      expect(getHoursUTC(REF_DATE)).toBe(10);
    });
  });

  describe("getDayUTC", () => {
    it("should return UTC day of month", () => {
      expect(getDayUTC(REF_DATE)).toBe(15);
    });
  });

  describe("getMonthUTC", () => {
    it("should return UTC month (0-indexed)", () => {
      expect(getMonthUTC(REF_DATE)).toBe(5); // June = 5
    });
  });

  describe("getYearUTC", () => {
    it("should return UTC full year", () => {
      expect(getYearUTC(REF_DATE)).toBe(2023);
    });
  });
});

// ============================================================================
// Manipulators
// ============================================================================

describe("manipulators", () => {
  // --- Individual local manipulators ---

  describe("manipulateMilliseconds", () => {
    it("should add milliseconds", () => {
      const result = manipulateMilliseconds(100, REF_DATE);
      expect(result.getTime()).toBe(REF_TIMESTAMP + 100);
    });

    it("should subtract milliseconds (negative value)", () => {
      const result = manipulateMilliseconds(-123, REF_DATE);
      expect(result.getUTCMilliseconds()).toBe(0);
    });

    it("should default to current date when no date argument", () => {
      const before = Date.now();
      const result = manipulateMilliseconds(0);
      const after = Date.now();
      expect(result.getTime()).toBeGreaterThanOrEqual(before);
      expect(result.getTime()).toBeLessThanOrEqual(after);
    });
  });

  describe("manipulateMillisecondsUTC", () => {
    it("should add UTC milliseconds", () => {
      const result = manipulateMillisecondsUTC(200, REF_DATE);
      expect(result.getTime()).toBe(REF_TIMESTAMP + 200);
    });
  });

  describe("manipulateSeconds", () => {
    it("should add seconds", () => {
      const result = manipulateSeconds(15, REF_DATE);
      expect(result.getTime()).toBe(REF_TIMESTAMP + 15_000);
    });

    it("should subtract seconds", () => {
      const result = manipulateSeconds(-45, REF_DATE);
      expect(result.getUTCSeconds()).toBe(0);
    });
  });

  describe("manipulateSecondsUTC", () => {
    it("should add UTC seconds", () => {
      const result = manipulateSecondsUTC(10, REF_DATE);
      expect(result.getUTCSeconds()).toBe(55);
    });
  });

  describe("manipulateMinutes", () => {
    it("should add minutes", () => {
      const result = manipulateMinutes(30, REF_DATE);
      expect(result.getTime()).toBe(REF_TIMESTAMP + 30 * 60_000);
    });
  });

  describe("manipulateMinutesUTC", () => {
    it("should add UTC minutes", () => {
      const result = manipulateMinutesUTC(15, REF_DATE);
      expect(result.getUTCMinutes()).toBe(45);
    });
  });

  describe("manipulateHours", () => {
    it("should add hours", () => {
      const result = manipulateHours(2, REF_DATE);
      expect(result.getTime()).toBe(REF_TIMESTAMP + 2 * 3_600_000);
    });
  });

  describe("manipulateHoursUTC", () => {
    it("should add UTC hours", () => {
      const result = manipulateHoursUTC(3, REF_DATE);
      expect(result.getUTCHours()).toBe(13);
    });
  });

  describe("manipulateDays", () => {
    it("should add days", () => {
      const result = manipulateDays(5, REF_DATE);
      expect(result.getTime()).toBe(REF_TIMESTAMP + 5 * 86_400_000);
    });

    it("should subtract days", () => {
      const result = manipulateDays(-15, REF_DATE);
      // 15 - 15 = day 0 of June = May 31
      expect(result.getUTCDate()).toBe(31);
      expect(result.getUTCMonth()).toBe(4); // May
    });
  });

  describe("manipulateDaysUTC", () => {
    it("should add UTC days", () => {
      const result = manipulateDaysUTC(10, REF_DATE);
      expect(result.getUTCDate()).toBe(25);
    });
  });

  describe("manipulateMonths", () => {
    it("should add months", () => {
      const result = manipulateMonths(3, REF_DATE);
      // June(5) + 3 = September(8)
      expect(result.getMonth()).toBe(8);
    });

    it("should subtract months", () => {
      const result = manipulateMonths(-6, REF_DATE);
      // June(5) - 6 = December(11) of previous year
      expect(result.getMonth()).toBe(11);
      expect(result.getFullYear()).toBe(2022);
    });
  });

  describe("manipulateMonthsUTC", () => {
    it("should add UTC months", () => {
      const result = manipulateMonthsUTC(1, REF_DATE);
      expect(result.getUTCMonth()).toBe(6); // July
    });
  });

  describe("manipulateYears", () => {
    it("should add years", () => {
      const result = manipulateYears(2, REF_DATE);
      expect(result.getFullYear()).toBe(2025);
    });

    it("should subtract years", () => {
      const result = manipulateYears(-3, REF_DATE);
      expect(result.getFullYear()).toBe(2020);
    });
  });

  describe("manipulateYearsUTC", () => {
    it("should add UTC years", () => {
      const result = manipulateYearsUTC(5, REF_DATE);
      expect(result.getUTCFullYear()).toBe(2028);
    });
  });

  // --- Composite manipulateDate ---

  describe("manipulateDate", () => {
    it("should apply multiple local manipulations", () => {
      const options: DateOptions = { days: -1, months: 1 };
      const result = manipulateDate(options, "2022-04-09");
      // April 9 -> add 1 month -> May 9 -> subtract 1 day -> May 8
      expect(result.getUTCMonth()).toBe(4); // May
      expect(result.getUTCDate()).toBe(8);
    });

    it("should apply all time units at once (local)", () => {
      const options: DateOptions = {
        milliseconds: 100,
        seconds: 10,
        minutes: 5,
        hours: 2,
        days: 1,
        months: 1,
        years: 1,
      };
      const result = manipulateDate(options, REF_DATE);
      // Basic sanity: year should have advanced by 1
      expect(result.getFullYear()).toBeGreaterThanOrEqual(2024);
    });

    it("should apply all time units with utc: true", () => {
      const options: DateOptions = {
        milliseconds: 50,
        seconds: 5,
        minutes: 3,
        hours: 1,
        days: 2,
        months: 1,
        years: 1,
        utc: true,
      };
      const result = manipulateDate(options, REF_DATE);
      expect(result.getUTCFullYear()).toBe(2024);
      expect(result.getUTCMonth()).toBe(6); // July
    });

    it("should skip zero-valued fields", () => {
      const options: DateOptions = {
        milliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
        days: 0,
        months: 0,
        years: 0,
      };
      const result = manipulateDate(options, REF_DATE);
      expect(result.getTime()).toBe(REF_TIMESTAMP);
    });

    it("should default to current date when no date argument", () => {
      const before = Date.now();
      const result = manipulateDate({ days: 0 });
      const after = Date.now();
      expect(result.getTime()).toBeGreaterThanOrEqual(before);
      expect(result.getTime()).toBeLessThanOrEqual(after);
    });

    it("should handle empty options object", () => {
      const result = manipulateDate({}, REF_DATE);
      expect(result.getTime()).toBe(REF_TIMESTAMP);
    });

    it("should handle only utc flag with no numeric options", () => {
      const result = manipulateDate({ utc: true }, REF_DATE);
      expect(result.getTime()).toBe(REF_TIMESTAMP);
    });

    it("should handle negative values for all fields in UTC mode", () => {
      const options: DateOptions = {
        milliseconds: -100,
        seconds: -10,
        minutes: -5,
        hours: -1,
        days: -1,
        months: -1,
        years: -1,
        utc: true,
      };
      const result = manipulateDate(options, REF_DATE);
      expect(result.getUTCFullYear()).toBe(2022);
    });
  });
});

// ============================================================================
// Difference
// ============================================================================

describe("difference", () => {
  describe("dateDifference", () => {
    const dateA = "2021-04-09";
    const dateB = "2021-04-01";

    // BUG-01 verification
    it("BUG-01: should return 691200000 for milliseconds between 2021-04-09 and 2021-04-01", () => {
      expect(dateDifference(dateA, dateB, "milliseconds")).toBe(691200000);
    });

    it("BUG-01: should return 691200 for seconds between 2021-04-09 and 2021-04-01", () => {
      expect(dateDifference(dateA, dateB, "seconds")).toBe(691200);
    });

    it("should return raw ms when no unit is given", () => {
      expect(dateDifference(dateA, dateB)).toBe(691200000);
    });

    it("should compute difference in minutes", () => {
      // 691200000 ms / 60000 = 11520 minutes
      expect(dateDifference(dateA, dateB, "minutes")).toBe(11520);
    });

    it("should compute difference in hours", () => {
      // 691200000 ms / 3600000 = 192 hours
      expect(dateDifference(dateA, dateB, "hours")).toBe(192);
    });

    it("should compute difference in days", () => {
      // 691200000 ms / 86400000 = 8 days
      expect(dateDifference(dateA, dateB, "days")).toBe(8);
    });

    it("should compute difference in months", () => {
      // 691200000 / (30 * 86400000) = 691200000 / 2592000000 = 0.266... => floor = 0
      expect(dateDifference(dateA, dateB, "months")).toBe(0);
    });

    it("should compute difference in years", () => {
      // 691200000 / (12 * 30 * 86400000) = very small => 0
      expect(dateDifference(dateA, dateB, "years")).toBe(0);
    });

    it("should return absolute value regardless of argument order", () => {
      expect(dateDifference(dateB, dateA, "days")).toBe(8);
    });

    it("should return 0 when dates are the same", () => {
      expect(dateDifference(dateA, dateA)).toBe(0);
      expect(dateDifference(dateA, dateA, "days")).toBe(0);
    });

    it("should accept Date objects", () => {
      const d1 = new Date("2023-01-01");
      const d2 = new Date("2023-01-02");
      expect(dateDifference(d1, d2, "days")).toBe(1);
    });

    it("should accept numeric timestamps", () => {
      const d1 = new Date("2023-01-01").getTime();
      const d2 = new Date("2023-01-02").getTime();
      expect(dateDifference(d1, d2, "hours")).toBe(24);
    });

    it("should throw for an invalid unit", () => {
      expect(() => dateDifference(dateA, dateB, "weeks" as never)).toThrowError(
        /Invalid date unit.*weeks/,
      );
    });

    it("should compute large year difference", () => {
      expect(dateDifference("2000-01-01", "2023-01-01", "years")).toBeGreaterThanOrEqual(22);
    });

    it("should floor the result (not round)", () => {
      // 1.5 days = 36 hours = 129600000 ms
      const d1 = new Date("2023-01-01T00:00:00Z");
      const d2 = new Date("2023-01-02T12:00:00Z");
      expect(dateDifference(d1, d2, "days")).toBe(1);
    });
  });

  describe("differenceTodayAndAnotherDate", () => {
    let fakeNow: Date;

    beforeEach(() => {
      fakeNow = new Date("2023-06-15T10:30:45.123Z");
      vi.useFakeTimers();
      vi.setSystemTime(fakeNow);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return raw ms difference from today", () => {
      const pastDate = "2023-06-14T10:30:45.123Z";
      expect(differenceTodayAndAnotherDate(pastDate)).toBe(86400000);
    });

    it("should compute difference in days from today", () => {
      const pastDate = "2023-06-10T10:30:45.123Z";
      // 5 days
      expect(differenceTodayAndAnotherDate(pastDate, "days")).toBe(5);
    });

    it("should compute difference in hours from today", () => {
      const pastDate = "2023-06-15T08:30:45.123Z";
      expect(differenceTodayAndAnotherDate(pastDate, "hours")).toBe(2);
    });

    it("should compute difference in seconds from today", () => {
      const pastDate = "2023-06-15T10:29:45.123Z";
      // 60 seconds
      expect(differenceTodayAndAnotherDate(pastDate, "seconds")).toBe(60);
    });

    it("should compute difference in minutes from today", () => {
      const pastDate = "2023-06-15T09:30:45.123Z";
      expect(differenceTodayAndAnotherDate(pastDate, "minutes")).toBe(60);
    });

    it("should compute difference in milliseconds from today", () => {
      const pastDate = "2023-06-15T10:30:45.000Z";
      expect(differenceTodayAndAnotherDate(pastDate, "milliseconds")).toBe(123);
    });

    it("should compute difference in months", () => {
      const pastDate = "2023-03-15T10:30:45.123Z";
      // ~92 days => ~3 months (with 30 day month)
      const result = differenceTodayAndAnotherDate(pastDate, "months");
      expect(result).toBe(3);
    });

    it("should compute difference in years", () => {
      const pastDate = "2020-06-15T10:30:45.123Z";
      const result = differenceTodayAndAnotherDate(pastDate, "years");
      // 3 years worth of days
      expect(result).toBeGreaterThanOrEqual(2);
    });

    it("should return absolute value for future dates", () => {
      const futureDate = "2023-06-20T10:30:45.123Z";
      expect(differenceTodayAndAnotherDate(futureDate, "days")).toBe(5);
    });

    it("should throw for an invalid unit", () => {
      expect(() => differenceTodayAndAnotherDate("2023-01-01", "centuries" as never)).toThrowError(
        /Invalid date unit.*centuries/,
      );
    });
  });
});

// ============================================================================
// Formatters
// ============================================================================

describe("formatters", () => {
  // For formatting tests we use a UTC-anchored date so UTC-based format helpers
  // produce deterministic values.
  const utcDate = new Date("2023-06-15T10:30:45.123Z");

  // --- UTC format helpers ---

  describe("formatYearUTC", () => {
    it("should return UTC year as string", () => {
      expect(formatYearUTC(utcDate)).toBe("2023");
    });
  });

  describe("formatMonthUTC", () => {
    it("should return zero-padded UTC month", () => {
      expect(formatMonthUTC(utcDate)).toBe("06");
    });

    it("should pad single-digit months", () => {
      const jan = new Date("2023-01-05T00:00:00Z");
      expect(formatMonthUTC(jan)).toBe("01");
    });

    it("should handle double-digit months", () => {
      const dec = new Date("2023-12-01T00:00:00Z");
      expect(formatMonthUTC(dec)).toBe("12");
    });
  });

  describe("formatDayUTC", () => {
    it("should return zero-padded UTC day", () => {
      expect(formatDayUTC(utcDate)).toBe("15");
    });

    it("should pad single-digit days", () => {
      const d = new Date("2023-01-03T00:00:00Z");
      expect(formatDayUTC(d)).toBe("03");
    });
  });

  describe("formatHoursUTC", () => {
    it("should return zero-padded UTC hours", () => {
      expect(formatHoursUTC(utcDate)).toBe("10");
    });

    it("should pad single-digit hours", () => {
      const d = new Date("2023-01-01T05:00:00Z");
      expect(formatHoursUTC(d)).toBe("05");
    });
  });

  describe("formatMinutesUTC", () => {
    it("should return zero-padded UTC minutes", () => {
      expect(formatMinutesUTC(utcDate)).toBe("30");
    });

    it("should pad single-digit minutes", () => {
      const d = new Date("2023-01-01T00:03:00Z");
      expect(formatMinutesUTC(d)).toBe("03");
    });
  });

  describe("formatSecondsUTC", () => {
    it("should return zero-padded UTC seconds", () => {
      expect(formatSecondsUTC(utcDate)).toBe("45");
    });

    it("should pad single-digit seconds", () => {
      const d = new Date("2023-01-01T00:00:07Z");
      expect(formatSecondsUTC(d)).toBe("07");
    });
  });

  describe("formatMillisecondsUTC", () => {
    it("should return UTC milliseconds as string", () => {
      expect(formatMillisecondsUTC(utcDate)).toBe("123");
    });

    it("should return '0' for zero milliseconds", () => {
      const d = new Date("2023-01-01T00:00:00.000Z");
      expect(formatMillisecondsUTC(d)).toBe("0");
    });
  });

  // --- formatDate (all FormatDateType values) ---

  describe("formatDate", () => {
    it('should format as "time"', () => {
      const result = formatDate("time", utcDate);
      // toTimeString() returns something like "10:30:45 GMT+0000 (UTC)"
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it('should format as "utc"', () => {
      const result = formatDate("utc", utcDate);
      // toUTCString() returns something like "Thu, 15 Jun 2023 10:30:45 GMT"
      expect(result).toContain("2023");
      expect(result).toContain("GMT");
    });

    it('should format as "date"', () => {
      const result = formatDate("date", utcDate);
      // toDateString() returns something like "Thu Jun 15 2023"
      expect(result).toContain("2023");
    });

    it('should format as "iso"', () => {
      const result = formatDate("iso", utcDate);
      expect(result).toBe("2023-06-15T10:30:45.123Z");
    });

    it('should format as "locale"', () => {
      const result = formatDate("locale", utcDate);
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it('should format as "locale-time"', () => {
      const result = formatDate("locale-time", utcDate);
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it('should format as "custom" with a CustomFormat pattern', () => {
      const result = formatDate("custom", utcDate, CustomFormat.YYYY_MM_DD);
      // local date formatting; verify structure
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it('should format as "custom" without a format (defaultFormat fallback)', () => {
      const result = formatDate("custom", utcDate);
      // defaultFormat: "YYYY-MM-DD HH:MM:SS"
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });

    it("should default to current date when no date argument", () => {
      const result = formatDate("iso");
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    });

    it("should fall back to defaultFormat for an unknown formatType", () => {
      // Cast to bypass TS check to test the fallback path
      const result = formatDate("unknown-type" as FormatDateType, utcDate);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });
  });

  // --- getFormatCustom ---

  describe("getFormatCustom", () => {
    it("should format with date-only custom format (no time part)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.YYYY_MM_DD);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it("should format with date + hours pattern", () => {
      const result = getFormatCustom(utcDate, CustomFormat.YYYY_MM_DD_HH);
      // "YYYY-MM-DD HH" -> dateFormatted + " " + hours
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}$/);
    });

    it("should format with date + HH:MM pattern", () => {
      const result = getFormatCustom(utcDate, CustomFormat.YYYY_MM_DD_HH_MM);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
    });

    it("should format with full date-time with seconds", () => {
      const result = getFormatCustom(utcDate, CustomFormat.YYYY_MM_DD_HH_MM_SSZ);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+$/);
    });

    it("should fall back to defaultFormat when no format is provided", () => {
      const result = getFormatCustom(utcDate);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    });

    it("should handle time-only custom formats (HHMMSSZ)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.HHMMSSZ);
      // format = "HH:MM:SSZ" => date part = "" (no date match), time part = undefined
      // Actually split(" ") on "HH:MM:SSZ" => ["HH:MM:SSZ"], so dateFormat = "HH:MM:SSZ", timeFormat = undefined
      // getDateFormatted returns "" for unrecognized format, getTimeFormatted returns "" for undefined
      expect(typeof result).toBe("string");
    });

    it("should handle HHMM custom format", () => {
      const result = getFormatCustom(utcDate, CustomFormat.HHMM);
      expect(typeof result).toBe("string");
    });

    it("should handle MMSSZ custom format", () => {
      const result = getFormatCustom(utcDate, CustomFormat.MMSSZ);
      expect(typeof result).toBe("string");
    });

    // Test all CustomFormat date+time variations with slash separator
    it("should format YYYYMMDD (slash)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.YYYYMMDD);
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
    });

    it("should format MMDDYYYY (slash)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.MMDDYYYY);
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    });

    it("should format DDMMYYYY (slash)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.DDMMYYYY);
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    });

    it("should format MM_DD_YYYY (dash)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.MM_DD_YYYY);
      expect(result).toMatch(/^\d{2}-\d{2}-\d{4}$/);
    });

    it("should format DD_MM_YYYY (dash)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.DD_MM_YYYY);
      expect(result).toMatch(/^\d{2}-\d{2}-\d{4}$/);
    });

    it("should format YYYYMMDDHH (slash with hour)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.YYYYMMDDHH);
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}$/);
    });

    it("should format MM_DD_YYYY_HH (dash with hour)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.MM_DD_YYYY_HH);
      expect(result).toMatch(/^\d{2}-\d{2}-\d{4} \d{2}$/);
    });

    it("should format MMDDYYYYHH (slash with hour)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.MMDDYYYYHH);
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}$/);
    });

    it("should format DD_MM_YYYY_HH (dash with hour)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.DD_MM_YYYY_HH);
      expect(result).toMatch(/^\d{2}-\d{2}-\d{4} \d{2}$/);
    });

    it("should format DDMMYYYYHH (slash with hour)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.DDMMYYYYHH);
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}$/);
    });

    it("should format YYYYMMDDHHMM (slash with hour:min)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.YYYYMMDDHHMM);
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/);
    });

    it("should format MM_DD_YYYY_HH_MM", () => {
      const result = getFormatCustom(utcDate, CustomFormat.MM_DD_YYYY_HH_MM);
      expect(result).toMatch(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/);
    });

    it("should format MMDDYYYYHHMM", () => {
      const result = getFormatCustom(utcDate, CustomFormat.MMDDYYYYHHMM);
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/);
    });

    it("should format DD_MM_YYYY_HH_MM", () => {
      const result = getFormatCustom(utcDate, CustomFormat.DD_MM_YYYY_HH_MM);
      expect(result).toMatch(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/);
    });

    it("should format DDMMYYYYHHMM", () => {
      const result = getFormatCustom(utcDate, CustomFormat.DDMMYYYYHHMM);
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/);
    });

    it("should format YYYYMMDDHHMMSSZ (slash with full time)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.YYYYMMDDHHMMSSZ);
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}\.\d+$/);
    });

    it("should format MM_DD_YYYY_HH_MM_SSZ", () => {
      const result = getFormatCustom(utcDate, CustomFormat.MM_DD_YYYY_HH_MM_SSZ);
      expect(result).toMatch(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}\.\d+$/);
    });

    it("should format MMDDYYYYHHMMSSZ", () => {
      const result = getFormatCustom(utcDate, CustomFormat.MMDDYYYYHHMMSSZ);
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}\.\d+$/);
    });

    it("should format DD_MM_YYYY_HH_MM_SSZ", () => {
      const result = getFormatCustom(utcDate, CustomFormat.DD_MM_YYYY_HH_MM_SSZ);
      expect(result).toMatch(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}\.\d+$/);
    });

    it("should format DDMMYYYYHHMMSSZ", () => {
      const result = getFormatCustom(utcDate, CustomFormat.DDMMYYYYHHMMSSZ);
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}\.\d+$/);
    });

    // Single-component custom formats
    it("should format YYYY only", () => {
      const result = getFormatCustom(utcDate, CustomFormat.YYYY);
      expect(result).toMatch(/^\d{4}$/);
    });

    it("should format MM only", () => {
      const result = getFormatCustom(utcDate, CustomFormat.MM);
      expect(result).toMatch(/^\d{2}$/);
    });

    it("should format DD only", () => {
      const result = getFormatCustom(utcDate, CustomFormat.DD);
      expect(result).toMatch(/^\d{2}$/);
    });

    it("should format YYYY_MM (dash)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.YYYY_MM);
      expect(result).toMatch(/^\d{4}-\d{2}$/);
    });

    it("should format YYYYMM (slash)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.YYYYMM);
      expect(result).toMatch(/^\d{4}\/\d{2}$/);
    });

    it("should format MM_DD (dash)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.MM_DD);
      expect(result).toMatch(/^\d{2}-\d{2}$/);
    });

    it("should format MMDD (slash)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.MMDD);
      expect(result).toMatch(/^\d{2}\/\d{2}$/);
    });

    it("should format DD_MM (dash)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.DD_MM);
      expect(result).toMatch(/^\d{2}-\d{2}$/);
    });

    it("should format DDMM (slash)", () => {
      const result = getFormatCustom(utcDate, CustomFormat.DDMM);
      expect(result).toMatch(/^\d{2}\/\d{2}$/);
    });
  });

  // --- getTimeFormatted ---

  describe("getTimeFormatted", () => {
    it("should format TIME (HH:MM:SSZ) with milliseconds", () => {
      const result = getTimeFormatted(utcDate, FormatTime.TIME);
      // "HH:MM:SS.ms" using local time
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}\.\d+$/);
    });

    it("should format HOUR", () => {
      const result = getTimeFormatted(utcDate, FormatTime.HOUR);
      expect(result).toMatch(/^\d{2}$/);
    });

    it("should format HOUR_WITH_MINUTES", () => {
      const result = getTimeFormatted(utcDate, FormatTime.HOUR_WITH_MINUTES);
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it("should format MINUTES", () => {
      const result = getTimeFormatted(utcDate, FormatTime.MINUTES);
      expect(result).toMatch(/^\d{2}$/);
    });

    it("should format MINUTES_WITH_SECONDS", () => {
      const result = getTimeFormatted(utcDate, FormatTime.MINUTES_WITH_SECONDS);
      expect(result).toMatch(/^\d{2}:\d{2}$/);
    });

    it("should format SECONDS", () => {
      const result = getTimeFormatted(utcDate, FormatTime.SECONDS);
      expect(result).toMatch(/^\d{2}$/);
    });

    it("should return empty string when no format is provided", () => {
      expect(getTimeFormatted(utcDate)).toBe("");
    });

    it("should return empty string for an unrecognized format", () => {
      expect(getTimeFormatted(utcDate, "UNKNOWN" as never)).toBe("");
    });
  });

  // --- getDateFormatted ---

  describe("getDateFormatted", () => {
    it("should format YYYY", () => {
      const result = getDateFormatted(utcDate, FormatDate.YYYY);
      expect(result).toBe(utcDate.getFullYear().toString());
    });

    it("should format MM (zero-padded)", () => {
      const result = getDateFormatted(utcDate, FormatDate.MM);
      expect(result).toMatch(/^\d{2}$/);
    });

    it("should format DD (zero-padded)", () => {
      const result = getDateFormatted(utcDate, FormatDate.DD);
      expect(result).toMatch(/^\d{2}$/);
    });

    it("should format YYYY_MM", () => {
      const result = getDateFormatted(utcDate, FormatDate.YYYY_MM);
      expect(result).toMatch(/^\d{4}-\d{2}$/);
    });

    it("should format YYYYMM (slash)", () => {
      const result = getDateFormatted(utcDate, FormatDate.YYYYMM);
      expect(result).toMatch(/^\d{4}\/\d{2}$/);
    });

    it("should format MM_DD", () => {
      const result = getDateFormatted(utcDate, FormatDate.MM_DD);
      expect(result).toMatch(/^\d{2}-\d{2}$/);
    });

    it("should format MMDD (slash)", () => {
      const result = getDateFormatted(utcDate, FormatDate.MMDD);
      expect(result).toMatch(/^\d{2}\/\d{2}$/);
    });

    it("should format DD_MM", () => {
      const result = getDateFormatted(utcDate, FormatDate.DD_MM);
      expect(result).toMatch(/^\d{2}-\d{2}$/);
    });

    it("should format DDMM (slash)", () => {
      const result = getDateFormatted(utcDate, FormatDate.DDMM);
      expect(result).toMatch(/^\d{2}\/\d{2}$/);
    });

    it("should format YYYY_MM_DD", () => {
      const result = getDateFormatted(utcDate, FormatDate.YYYY_MM_DD);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it("should format YYYYMMDD (slash)", () => {
      const result = getDateFormatted(utcDate, FormatDate.YYYYMMDD);
      expect(result).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
    });

    it("should format MM_DD_YYYY", () => {
      const result = getDateFormatted(utcDate, FormatDate.MM_DD_YYYY);
      expect(result).toMatch(/^\d{2}-\d{2}-\d{4}$/);
    });

    it("should format MMDDYYYY (slash)", () => {
      const result = getDateFormatted(utcDate, FormatDate.MMDDYYYY);
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    });

    it("should format DD_MM_YYYY", () => {
      const result = getDateFormatted(utcDate, FormatDate.DD_MM_YYYY);
      expect(result).toMatch(/^\d{2}-\d{2}-\d{4}$/);
    });

    it("should format DDMMYYYY (slash)", () => {
      const result = getDateFormatted(utcDate, FormatDate.DDMMYYYY);
      expect(result).toMatch(/^\d{2}\/\d{2}\/\d{4}$/);
    });

    it("should return empty string for unrecognized format", () => {
      expect(getDateFormatted(utcDate, "INVALID" as never)).toBe("");
    });
  });
});

// ============================================================================
// Types (compile-time + runtime enum checks)
// ============================================================================

describe("types", () => {
  it("DateOptions should accept the utc flag", () => {
    const opts: DateOptions = { days: 1, utc: true };
    expect(opts.utc).toBe(true);
  });

  it("CustomFormat enum should have expected keys", () => {
    expect(CustomFormat.YYYY).toBe("YYYY");
    expect(CustomFormat.YYYY_MM_DD).toBe("YYYY-MM-DD");
    expect(CustomFormat.YYYYMMDD).toBe("YYYY/MM/DD");
    expect(CustomFormat.HHMMSSZ).toBe("HH:MM:SSZ");
    expect(CustomFormat.HHMM).toBe("HH:MM");
    expect(CustomFormat.MMSSZ).toBe("MM:SSZ");
  });

  it("FormatTime enum should have expected keys", () => {
    expect(FormatTime.TIME).toBe("HH:MM:SSZ");
    expect(FormatTime.HOUR).toBe("HH");
    expect(FormatTime.HOUR_WITH_MINUTES).toBe("HH:MM");
    expect(FormatTime.MINUTES).toBe("MM");
    expect(FormatTime.MINUTES_WITH_SECONDS).toBe("MM:SSZ");
    expect(FormatTime.SECONDS).toBe("SSZ");
  });

  it("FormatDate enum should have expected keys", () => {
    expect(FormatDate.YYYY).toBe("YYYY");
    expect(FormatDate.MM).toBe("MM");
    expect(FormatDate.DD).toBe("DD");
    expect(FormatDate.YYYY_MM_DD).toBe("YYYY-MM-DD");
    expect(FormatDate.DDMMYYYY).toBe("DD/MM/YYYY");
  });
});
