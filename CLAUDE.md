# CLAUDE.md

Project context for AI assistants working on this codebase.

## Project

`@drzioner/helpers` -- zero-dependency TypeScript utility library for dates, math, files, and strings.

## Tech Stack

- **Runtime:** Node.js >= 18
- **Language:** TypeScript 5.x with `strict: true`
- **Build:** tsup (dual ESM + CJS output)
- **Test:** Vitest with `@vitest/coverage-v8`
- **Lint/Format:** Biome
- **Package Manager:** pnpm
- **Versioning:** Changesets
- **CI:** GitHub Actions

## Commands

```bash
pnpm test              # Run tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report
pnpm lint              # Biome check
pnpm lint:fix          # Biome auto-fix
pnpm typecheck         # tsc --noEmit
pnpm build             # Build with tsup
pnpm validate          # Build + publint + attw
```

## Architecture

```
src/
  database/       # generateUID
  dates/          # getters, manipulators, difference, formatters
  files/          # createFile, randomFileName
  math/           # sum, subtraction, multiplication, division, arithmeticOperations
  strings/        # padNumber
  index.ts        # Barrel re-exports
```

Each module has:
- `types.ts` for type definitions
- Implementation files with one responsibility each
- `index.ts` with explicit named exports
- Colocated `*.test.ts` file

## Key Patterns

- **Factory functions** in `dates/getters.ts` and `dates/manipulators.ts` reduce duplication
- **Deprecated aliases** preserve backward compatibility (e.g., `nameFileRandom` -> `randomFileName`)
- **Path traversal protection** in `createFile()` validates resolved paths
- **No runtime dependencies** -- only Node.js builtins (`crypto`, `fs/promises`, `path`)

## Rules

- Every exported function needs JSDoc with `@param`, `@returns`, `@example`
- Every change needs a test written before the implementation
- Do not add runtime dependencies
- Run `pnpm validate` before considering a change complete
- Use Changesets (`pnpm changeset`) for version bumps
- Keep functions pure when possible
- Types go in `types.ts`, not alongside implementations
