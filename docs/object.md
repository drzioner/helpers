## Object

### pick

Creates a new object with only the specified keys.

```typescript
import { pick } from '@drzioner/helpers';

pick({ a: 1, b: 2, c: 3 }, ["a", "c"]);  // { a: 1, c: 3 }
pick({ a: 1, b: 2 }, []);                 // {}
pick({ a: 1 }, ["a", "b"]);               // { a: 1 } (missing keys ignored)
```

| Parameter | Type   | Description        |
|-----------|--------|--------------------|
| `obj`     | `T`    | The source object  |
| `keys`    | `K[]`  | The keys to keep   |

### omit

Creates a new object without the specified keys. Does not mutate the original.

```typescript
import { omit } from '@drzioner/helpers';

omit({ a: 1, b: 2, c: 3 }, ["b"]);     // { a: 1, c: 3 }
omit({ a: 1, b: 2 }, ["a", "b"]);       // {}
omit({ a: 1, b: 2 }, []);               // { a: 1, b: 2 }
```

| Parameter | Type   | Description          |
|-----------|--------|----------------------|
| `obj`     | `T`    | The source object    |
| `keys`    | `K[]`  | The keys to exclude  |

### merge

Deep merges multiple source objects into a target object. Arrays are replaced, not merged. Only plain objects are recursively merged. Protected against prototype pollution (`__proto__`, `constructor`, `prototype` keys are skipped).

```typescript
import { merge } from '@drzioner/helpers';

merge({ a: 1, b: { x: 1 } }, { b: { y: 2 }, c: 3 });
// { a: 1, b: { x: 1, y: 2 }, c: 3 }

merge({ a: [1, 2] }, { a: [3, 4] });
// { a: [3, 4] }  (arrays are replaced)

merge({ a: 1 }, { b: 2 }, { c: 3 });
// { a: 1, b: 2, c: 3 }  (multiple sources)

merge({ a: { b: { c: 1 } } }, { a: { b: { d: 2 } } });
// { a: { b: { c: 1, d: 2 } } }  (deeply nested)
```

| Parameter  | Type   | Description                       |
|------------|--------|-----------------------------------|
| `target`   | `T`    | The target object                 |
| `sources`  | `T[]`  | One or more source objects to merge |

### get

Gets the value at a dot-separated path of an object. Returns a default value if the path doesn't exist. Uses dot notation only (`"a.0.b"` for array access). Bracket notation (`"a[0].b"`) is not supported.

```typescript
import { get } from '@drzioner/helpers';

get({ a: { b: { c: 42 } } }, "a.b.c");           // 42
get({ a: { b: 1 } }, "a.c", "default");           // "default"
get({ a: [{ b: 1 }] }, "a.0.b");                  // 1
get({ a: 1 }, "b");                                // undefined
get({ a: null }, "a.b", "fallback");               // "fallback"
```

| Parameter      | Type      | Default     | Description                       |
|----------------|-----------|-------------|-----------------------------------|
| `obj`          | `unknown` | --          | The source object                 |
| `path`         | `string`  | --          | Dot-separated path (e.g., "a.b.c") |
| `defaultValue` | `unknown` | `undefined` | Value returned if path doesn't exist |

### has

Checks if a dot-separated path exists in an object. Uses dot notation only (`"a.0.b"` for array access). Bracket notation (`"a[0].b"`) is not supported.

```typescript
import { has } from '@drzioner/helpers';

has({ a: { b: 1 } }, "a.b");    // true
has({ a: { b: 1 } }, "a.c");    // false
has({ a: null }, "a");           // true
has({ a: null }, "a.b");        // false
has({ a: [1, 2] }, "a.0");      // true
has({ a: [1, 2] }, "a.5");      // false
```

| Parameter | Type      | Description                         |
|-----------|-----------|-------------------------------------|
| `obj`     | `unknown` | The source object                   |
| `path`    | `string`  | Dot-separated path (e.g., "a.b.c")  |
