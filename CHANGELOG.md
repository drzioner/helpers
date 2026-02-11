# Changelog

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
