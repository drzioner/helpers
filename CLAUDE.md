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
pnpm changeset         # Create a changeset for version bump
pnpm version           # Apply changesets (bump versions + CHANGELOG)
pnpm release           # Publish to npm (used by CI)
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

## CI/CD

- **CI (`ci.yml`):** Runs on push/PR to `main` -- lint, typecheck, test (Node 18/20/22), build, publint, attw
- **Release (`release.yml`):** Runs on push to `main` and `next`. Uses `changesets/action` to open a "Version Packages" PR (when changesets exist). When no changesets remain, publishes to npm via OIDC trusted publishing (no token needed) and creates a GitHub Release
- **Auth:** npm Trusted Publishing (OIDC) -- no `NPM_TOKEN` secret, GitHub Actions authenticates directly with the npm registry
- **Pre-releases:** Push to `next` branch after `pnpm changeset pre enter next` publishes versions like `0.4.0-next.0` under the `next` dist-tag

## Rules

- Every exported function needs JSDoc with `@param`, `@returns`, `@example`
- Every change needs a test written before the implementation
- Do not add runtime dependencies
- Run `pnpm validate` before considering a change complete
- Use Changesets (`pnpm changeset`) for version bumps
- Keep functions pure when possible
- Types go in `types.ts`, not alongside implementations
