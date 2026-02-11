---
"@drzioner/helpers": minor
---

Modernize toolchain and restructure modules.

- Migrate from npm to pnpm, ESLint/Prettier to Biome, Jest to Vitest, standard-version to Changesets
- Build with tsup (dual ESM + CJS output)
- Rename `mathematics/` to `math/`, `uncategorized/` to `strings/`
- Rename `nameFileRandom` to `randomFileName`, `fillANumberWithCharacters` to `padNumber` (old names still work but are deprecated)
- Fix `MILLISECOND` constant (was 1000, now 1)
- Fix `getValueUnit()` to throw on invalid input
- Add explicit number types to math functions
- Rewrite `createFile()` with path traversal protection and auto-created parent directories
- Require Node.js >= 20
