---
"@drzioner/helpers": minor
---

Add 5 new utility modules with 47 functions for type guards, numbers, strings, arrays, and objects.

### New modules

- **`is/`** — 10 type guards (`isString`, `isNumber`, `isObject`, `isArray`, `isDate`, `isRegExp`, `isBoolean`, `isFunction`, `isNullish`, `isEmpty`) with TypeScript `value is T` narrowing
- **`number/`** — 8 functions (`clamp`, `round`, `randomInt`, `inRange`, `sumAll`, `average`, `formatBytes`, `ordinal`)
- **`string/`** — 10 functions (`capitalize`, `camelCase`, `kebabCase`, `snakeCase`, `pascalCase`, `slugify`, `truncate`, `escapeHtml`, `unescapeHtml`, `splitWords`)
- **`array/`** — 11 functions (`unique`, `uniqueBy`, `groupBy`, `chunk`, `shuffle`, `range`, `compact`, `first`, `last`, `intersection`, `difference`)
- **`object/`** — 5 functions (`pick`, `omit`, `merge`, `get`, `has`) with prototype pollution protection in `merge()`

### Breaking changes

- `isNumber()` now excludes `Infinity` and `-Infinity` (uses `Number.isFinite()`)
- `average([])` now returns `NaN` instead of `0`

### Bug fixes

- `round(1.255, 2)` now correctly returns `1.26` (replaced `Number.EPSILON` trick with exponential notation)
- `omit()` rewritten to avoid `delete` operator (fixes V8 hidden class deoptimization)

### Performance

- `isEmpty()` uses `for...in` early return instead of `Object.keys().length` allocation
- `splitWords()` regexes pre-compiled at module level (affects `camelCase`, `kebabCase`, `snakeCase`, `pascalCase`)
- `formatBytes()` sizes array hoisted to module-level constant
- `treeshake: true` added to tsup build config

### Deprecations

- `first()` — use `array.at(0)` or `array[0]`
- `last()` — use `array.at(-1)` or `array[array.length - 1]`
- `compact()` — use `array.filter(Boolean)`
