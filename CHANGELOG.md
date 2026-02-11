# Changelog

## 0.4.0

### Minor Changes

- [#14](https://github.com/drzioner/helpers/pull/14) [`b5e1bcb`](https://github.com/drzioner/helpers/commit/b5e1bcb5c79ae697e187ce63aab85d3ea672f160) Thanks [@drzioner](https://github.com/drzioner)! - Add 5 new utility modules with 47 functions for type guards, numbers, strings, arrays, and objects.

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

## 0.3.0

### Minor Changes

- [#12](https://github.com/drzioner/helpers/pull/12) [`26a964e`](https://github.com/drzioner/helpers/commit/26a964ecb8c654fff97f12f48ca97eb943571a8e) Thanks [@drzioner](https://github.com/drzioner)! - Modernize toolchain and restructure modules.

  - Migrate from npm to pnpm, ESLint/Prettier to Biome, Jest to Vitest, standard-version to Changesets
  - Build with tsup (dual ESM + CJS output)
  - Rename `mathematics/` to `math/`, `uncategorized/` to `strings/`
  - Rename `nameFileRandom` to `randomFileName`, `fillANumberWithCharacters` to `padNumber` (old names still work but are deprecated)
  - Fix `MILLISECOND` constant (was 1000, now 1)
  - Fix `getValueUnit()` to throw on invalid input
  - Add explicit number types to math functions
  - Rewrite `createFile()` with path traversal protection and auto-created parent directories
  - Require Node.js >= 20

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.6](https://github.com/drzioner/helpers/compare/v0.2.5...v0.2.6) (2022-04-14)

### Improvements

- **helpers:** improved project weights and some improvements in the math, date and file helpers ([fb71d65](https://github.com/drzioner/helpers/commit/fb71d651501bb43b3d30716ebf3f8274411f789c))

### [0.2.5](https://github.com/drzioner/helpers/compare/v0.2.4...v0.2.5) (2022-04-14)
