# Contributing to @drzioner/helpers

Thank you for your interest in contributing. This guide explains how to set up the project, make changes, and submit a pull request.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) >= 10

## Setup

```bash
git clone https://github.com/drzioner/helpers.git
cd helpers
pnpm install
```

## Project Structure

```
src/
  is/            # Type guards (isString, isNumber, isObject, isEmpty, ...)
  number/        # Numeric operations (clamp, round, randomInt, formatBytes, ...)
  string/        # String transforms (camelCase, slugify, escapeHtml, truncate, ...)
  array/         # Array utilities (unique, groupBy, chunk, shuffle, difference, ...)
  object/        # Object helpers (pick, omit, merge, get, has)
  database/      # UID generation
  dates/         # Date parsing, formatting, getters, manipulators, difference
  files/         # File creation, random file names
  math/          # Arithmetic operations
  strings/       # String padding utilities
  index.ts       # Barrel re-exports
```

Each module follows the same pattern:

- `types.ts` -- type definitions and enums
- One or more implementation files (e.g., `operations.ts`, `getters.ts`)
- `index.ts` -- explicit named re-exports
- `*.test.ts` -- colocated test file

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm test` | Run tests once |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm lint` | Check code with Biome |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm build` | Build ESM + CJS with tsup |
| `pnpm validate` | Build + publint + attw |

## Making Changes

### 1. Create a branch

```bash
git checkout -b feat/your-feature
```

### 2. Write a failing test first

Every change starts with a test. Add tests to the colocated `*.test.ts` file in the relevant module.

```bash
pnpm test src/math/math.test.ts
```

### 3. Implement the change

Write the minimal code to make your test pass. Keep functions pure and typed. This library has zero runtime dependencies -- do not add any.

### 4. Verify everything passes

```bash
pnpm lint && pnpm typecheck && pnpm test && pnpm validate
```

The pre-commit hook runs `pnpm lint && pnpm typecheck` automatically.

### 5. Add a changeset

We use [Changesets](https://github.com/changesets/changesets) to manage versions and changelogs.

```bash
pnpm changeset
```

Choose the semver bump type:

- **patch** -- bug fixes, documentation
- **minor** -- new functions, non-breaking additions
- **major** -- breaking API changes

### 6. Submit a pull request

Push your branch and open a PR against `main`. The CI pipeline runs lint, typecheck, tests (Node 20/22/24), build, and package validation. All status checks must pass before merging.

## Code Conventions

### TypeScript

- `strict: true` is enabled -- all parameters must have explicit types
- Use `es2022` features (no legacy patterns)
- Export types from `types.ts`, implementations from separate files
- Prefer `const` arrow functions for exported utilities

### Style

- [Biome](https://biomejs.dev/) handles formatting and linting
- 2-space indentation, 100-character line width
- No semicolons are enforced by default Biome rules

### Naming

- Functions: `camelCase` verbs (`padNumber`, `formatDate`, `manipulateHours`)
- Types: `PascalCase` (`DateType`, `ArithmeticOperationType`)
- Enums: `PascalCase` with `UPPER_CASE` members (`FormatDate.YYYY_MM_DD`)
- Files: `kebab-case` (`random-file-name.ts`, `generate-uid.ts`)

### Documentation

- Add JSDoc with `@param`, `@returns`, and `@example` to every exported function
- Keep descriptions to one line when possible

### Deprecation

When renaming a function, keep the old name as a deprecated alias:

```typescript
/** @deprecated Use `padNumber` instead. */
export const fillANumberWithCharacters = padNumber;
```

## Adding a New Module

1. Create `src/your-module/types.ts`, implementation files, and `index.ts`
2. Add `export * from "./your-module"` to `src/index.ts`
3. Create `src/your-module/your-module.test.ts` with full coverage
4. Add documentation in `docs/your-module.md`
5. Update `README.md` with a usage example

## Release Process

Releases are fully automated via [Changesets](https://github.com/changesets/changesets), GitHub Actions, and [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) (OIDC). No long-lived npm tokens are needed.

### How it works

1. **Add a changeset** -- when your PR includes user-facing changes, run `pnpm changeset` and commit the generated `.changeset/*.md` file.
2. **Merge to `main`** -- CI creates (or updates) a "Version Packages" PR that bumps versions and updates `CHANGELOG.md`.
3. **Merge the Version Packages PR** -- CI publishes to npm via OIDC and creates a GitHub Release automatically.

### Authentication

Publishing uses npm [Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) instead of stored tokens. GitHub Actions authenticates directly with the npm registry via OIDC -- no `NPM_TOKEN` secret required. The trusted publisher is configured per-package on npmjs.com linking the repository and workflow filename (`release.yml`).

### Pre-releases (branch `next`)

For testing unreleased changes before a stable release:

```bash
git checkout -b next main
pnpm changeset pre enter next   # enable pre-release mode
# ... make changes, add changesets, push ...
# CI publishes 0.x.0-next.0, 0.x.0-next.1, etc.
pnpm changeset pre exit         # when done, exit pre-release mode
```

### Dist-tags

| Branch | npm dist-tag | Example version | Purpose |
|--------|-------------|-----------------|---------|
| `main` | `latest` | `0.4.0` | Stable releases |
| `next` | `next` | `0.4.0-next.0` | Pre-releases for testing |

Install a specific tag: `npm install @drzioner/helpers@next`

## Questions?

Open an [issue](https://github.com/drzioner/helpers/issues) if something is unclear.
