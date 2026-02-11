# @drzioner/helpers

[![CI](https://github.com/drzioner/helpers/actions/workflows/ci.yml/badge.svg)](https://github.com/drzioner/helpers/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@drzioner/helpers.svg)](https://www.npmjs.com/package/@drzioner/helpers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Zero-dependency TypeScript utility library. Type guards, string transforms, number operations, array helpers, object utilities, date manipulation, and file operations — all with full type inference.

## Installation

```bash
pnpm add @drzioner/helpers
# or
npm install @drzioner/helpers
```

Requires Node.js >= 20.

## Modules

### [Type Guards](./docs/is.md) — `is/`

```typescript
import { isString, isNumber, isObject, isEmpty } from '@drzioner/helpers';

isString('hello');           // true (narrows to string)
isNumber(42);                // true (excludes NaN and Infinity)
isObject({ a: 1 });          // true (rejects null, arrays, Date, RegExp)
isDate(new Date('invalid')); // false (catches Invalid Date)
isEmpty({});                 // true
isEmpty([1, 2]);             // false
```

`isString` | `isNumber` | `isBoolean` | `isFunction` | `isObject` | `isArray` | `isDate` | `isRegExp` | `isNullish` | `isEmpty`

### [Number](./docs/number.md) — `number/`

```typescript
import { clamp, round, randomInt, formatBytes, average } from '@drzioner/helpers';

clamp(15, 0, 10);       // 10
round(1.255, 2);         // 1.26
randomInt(1, 100);       // 42 (inclusive range)
formatBytes(1536);       // "1.5 KB"
average([1, 2, 3, 4]);   // 2.5
```

`clamp` | `round` | `randomInt` | `inRange` | `sumAll` | `average` | `formatBytes` | `ordinal`

### [String](./docs/string.md) — `string/`

```typescript
import { camelCase, slugify, escapeHtml, truncate } from '@drzioner/helpers';

camelCase('foo-bar');         // "fooBar"
slugify('Hello World!');      // "hello-world"
escapeHtml('<script>');       // "&lt;script&gt;"
truncate('Hello World', 8);  // "Hello..."
```

`capitalize` | `camelCase` | `kebabCase` | `snakeCase` | `pascalCase` | `slugify` | `truncate` | `escapeHtml` | `unescapeHtml` | `splitWords`

### [Array](./docs/array.md) — `array/`

```typescript
import { unique, groupBy, chunk, shuffle, difference } from '@drzioner/helpers';

unique([1, 2, 2, 3]);                           // [1, 2, 3]
groupBy([{type: 'a', v: 1}, {type: 'a', v: 2}], 'type');
// { a: [{type: 'a', v: 1}, {type: 'a', v: 2}] }
chunk([1, 2, 3, 4, 5], 2);                      // [[1, 2], [3, 4], [5]]
difference([1, 2, 3], [2, 3, 4]);               // [1]
```

`unique` | `uniqueBy` | `groupBy` | `chunk` | `shuffle` | `range` | `intersection` | `difference` | `compact` | `first` | `last`

### [Object](./docs/object.md) — `object/`

```typescript
import { pick, omit, merge, get, has } from '@drzioner/helpers';

pick({ a: 1, b: 2, c: 3 }, ['a', 'c']);   // { a: 1, c: 3 }
omit({ a: 1, b: 2, c: 3 }, ['b']);         // { a: 1, c: 3 }
merge({ a: { x: 1 } }, { a: { y: 2 } });  // { a: { x: 1, y: 2 } }
get({ a: { b: 42 } }, 'a.b');              // 42
has({ a: { b: 42 } }, 'a.b');              // true
```

`pick` | `omit` | `merge` | `get` | `has`

`merge()` includes prototype pollution protection — `__proto__`, `constructor`, and `prototype` keys are blocked.

### [Dates](./docs/dates.md)

```typescript
import { manipulateDate, dateDifference, formatDate, CustomFormat } from '@drzioner/helpers';

manipulateDate({ days: -1, months: 1 }, '2022-04-09');
// 2022-05-08T00:00:00.000Z

dateDifference('2021-04-09', '2021-04-01', 'days');  // 8
formatDate('custom', new Date(), CustomFormat.YYYY_MM_DD);  // "2024-06-15"
```

### [Files](./docs/files.md) — Node.js only

```typescript
import { randomFileName, createFile } from '@drzioner/helpers';

randomFileName('photo.jpg');
// "1647828249206a64bdc57f939d47eae0...jpg"

await createFile('data.json', '{"key": "value"}', './output');
```

`createFile` includes path traversal protection.

### [Database](./docs/database.md) — Node.js only

```typescript
import { generateUID } from '@drzioner/helpers';

generateUID();
// "16478271-33403a97-d811b91d-345c8543-334d9a74-5044d5a47"
```

## API Reference

Full documentation with parameters, return types, and examples for each module:

| Module | Functions | Docs |
|--------|-----------|------|
| Type Guards | `isString`, `isNumber`, `isBoolean`, `isFunction`, `isObject`, `isArray`, `isDate`, `isRegExp`, `isNullish`, `isEmpty` | [is.md](./docs/is.md) |
| Number | `clamp`, `round`, `randomInt`, `inRange`, `sumAll`, `average`, `formatBytes`, `ordinal` | [number.md](./docs/number.md) |
| String | `capitalize`, `camelCase`, `kebabCase`, `snakeCase`, `pascalCase`, `slugify`, `truncate`, `escapeHtml`, `unescapeHtml`, `splitWords` | [string.md](./docs/string.md) |
| Array | `unique`, `uniqueBy`, `groupBy`, `chunk`, `shuffle`, `range`, `compact`, `first`, `last`, `intersection`, `difference` | [array.md](./docs/array.md) |
| Object | `pick`, `omit`, `merge`, `get`, `has` | [object.md](./docs/object.md) |
| Dates | `dateDifference`, `formatDate`, `manipulateDate`, getters, manipulators | [dates.md](./docs/dates.md) |
| Files | `randomFileName`, `createFile` | [files.md](./docs/files.md) |
| Database | `generateUID` | [database.md](./docs/database.md) |

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

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for planned phases: date redesign, async helpers, subpath exports, and the v1.0 stable API.

## License

[MIT](./LICENSE)
