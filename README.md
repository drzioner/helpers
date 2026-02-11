# @drzioner/helpers

[![CI](https://github.com/drzioner/helpers/actions/workflows/ci.yml/badge.svg)](https://github.com/drzioner/helpers/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@drzioner/helpers.svg)](https://www.npmjs.com/package/@drzioner/helpers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Zero-dependency TypeScript utility library for dates, math, files, and strings.

## Requirements

- Node.js >= 18

## Installation

```bash
pnpm add @drzioner/helpers
# or
npm install @drzioner/helpers
```

## Modules

### [Database](./docs/database.md)

```typescript
import { generateUID } from '@drzioner/helpers';

const uid = generateUID();
// "16478271-33403a97-d811b91d-345c8543-334d9a74-5044d5a47"
```

### [Dates](./docs/dates.md)

```typescript
import { manipulateDate, dateDifference, formatDate, CustomFormat } from '@drzioner/helpers';

const date = manipulateDate({ days: -1, months: 1 }, '2022-04-09');
// 2022-05-08T00:00:00.000Z

const diff = dateDifference('2021-04-09', '2021-04-01', 'days');
// 8

const formatted = formatDate('custom', new Date(), CustomFormat.YYYY_MM_DD);
// "2024-06-15"
```

### [Files](./docs/files.md)

```typescript
import { randomFileName, createFile } from '@drzioner/helpers';

const name = randomFileName('photo.jpg');
// "1647828249206a64bdc57f939d47eae0...jpg"

await createFile('data.json', '{"key": "value"}', './output');
```

### [Math](./docs/math.md)

```typescript
import { arithmeticOperations, sum } from '@drzioner/helpers';

arithmeticOperations([2, 1, 4, 3], 'sum'); // 10
sum(3, 4);                                  // 7
```

### [Strings](./docs/strings.md)

```typescript
import { padNumber } from '@drzioner/helpers';

padNumber(1);            // "0001"
padNumber(1, 2);         // "01"
padNumber(1, 5, 'z');    // "zzzz1"
```

## API Reference

### Database

| Function | Description |
|----------|-------------|
| `generateUID()` | Generate a unique identifier string |

### Dates

| Function | Description |
|----------|-------------|
| `dateDifference(first, second, unit?)` | Absolute difference between two dates |
| `differenceTodayAndAnotherDate(date, unit?)` | Difference between today and a date |
| `formatDate(type, date?, format?)` | Format a date as string |
| `getDate(date?)` | Parse to `Date` object |
| `getYear(date?)` / `getYearUTC(date?)` | Get year (local/UTC) |
| `getMonth(date?)` / `getMonthUTC(date?)` | Get month (local/UTC) |
| `getDay(date?)` / `getDayUTC(date?)` | Get day (local/UTC) |
| `getHours(date?)` / `getHoursUTC(date?)` | Get hours (local/UTC) |
| `getMinutes(date?)` / `getMinutesUTC(date?)` | Get minutes (local/UTC) |
| `getSeconds(date?)` / `getSecondsUTC(date?)` | Get seconds (local/UTC) |
| `getMilliseconds(date?)` / `getMillisecondsUTC(date?)` | Get milliseconds (local/UTC) |
| `manipulateDate(options, date?)` | Modify multiple date components at once |
| `manipulateYears(value, date?)` | Add/subtract years (local) |
| `manipulateMonths(value, date?)` | Add/subtract months (local) |
| `manipulateDays(value, date?)` | Add/subtract days (local) |
| `manipulateHours(value, date?)` | Add/subtract hours (local) |
| `manipulateMinutes(value, date?)` | Add/subtract minutes (local) |
| `manipulateSeconds(value, date?)` | Add/subtract seconds (local) |
| `manipulateMilliseconds(value, date?)` | Add/subtract milliseconds (local) |

UTC variants exist for all manipulators (`manipulateYearsUTC`, etc.).

### Files

| Function | Description |
|----------|-------------|
| `randomFileName(originalName, length?, extension?, encoding?)` | Generate unique file name |
| `createFile(file, data, path?)` | Write file with path traversal protection |

### Math

| Function | Description |
|----------|-------------|
| `arithmeticOperations(values, operation)` | Reduce array with arithmetic operation |
| `sum(a, b)` | Add two numbers |
| `subtraction(a, b)` | Subtract second from first |
| `multiplication(a, b)` | Multiply two numbers |
| `division(a, b)` | Divide first by second |

### Strings

| Function | Description |
|----------|-------------|
| `padNumber(value, length?, fill?)` | Pad a number with fill characters |

## Development

```bash
pnpm test              # Run tests
pnpm test:coverage     # Tests with coverage
pnpm build             # Build ESM + CJS
pnpm lint              # Lint with Biome
pnpm typecheck         # TypeScript type checking
pnpm validate          # Build + publint + attw
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full development guide.

## License

[MIT](./LICENSE)
