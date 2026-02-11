## Is (Type Guards)

Type guard functions that narrow `unknown` values to specific types at runtime. Each function returns `true` only for the described type, and TypeScript will narrow the type automatically after the check.

### isString

Checks if a value is a string.

```typescript
import { isString } from '@drzioner/helpers';

isString("hello");     // true
isString("");          // true
isString(123);         // false
isString(null);        // false
```

### isNumber

Checks if a value is a finite number. Excludes `NaN`, `Infinity`, and `-Infinity`.

```typescript
import { isNumber } from '@drzioner/helpers';

isNumber(42);         // true
isNumber(3.14);       // true
isNumber(Infinity);   // false
isNumber(NaN);        // false
isNumber("42");       // false
```

### isBoolean

Checks if a value is a boolean.

```typescript
import { isBoolean } from '@drzioner/helpers';

isBoolean(true);    // true
isBoolean(false);   // true
isBoolean(0);       // false
isBoolean("true");  // false
```

### isFunction

Checks if a value is a function.

```typescript
import { isFunction } from '@drzioner/helpers';

isFunction(() => {});       // true
isFunction(console.log);    // true
isFunction(class Foo {});   // true
isFunction("hello");        // false
```

### isObject

Checks if a value is a **plain object** (created by `{}`, `Object.create(null)`, or `new Object()`). Returns `false` for arrays, `Date`, `RegExp`, `Map`, `Set`, `Error`, class instances, and all other non-plain objects.

```typescript
import { isObject } from '@drzioner/helpers';

isObject({ a: 1 });           // true
isObject(Object.create(null)); // true
isObject([1, 2]);              // false
isObject(null);                // false
isObject(new Date());          // false
isObject(new Error("x"));     // false
isObject(new URL("https://x.com")); // false
```

### isArray

Checks if a value is an array.

```typescript
import { isArray } from '@drzioner/helpers';

isArray([1, 2, 3]);   // true
isArray([]);           // true
isArray("hello");      // false
isArray({ length: 3 });// false
```

### isDate

Checks if a value is a valid `Date` instance. Returns `false` for `Invalid Date`.

```typescript
import { isDate } from '@drzioner/helpers';

isDate(new Date());              // true
isDate(new Date("2023-01-01"));  // true
isDate(new Date("invalid"));    // false
isDate("2023-01-01");            // false
```

### isRegExp

Checks if a value is a `RegExp` instance.

```typescript
import { isRegExp } from '@drzioner/helpers';

isRegExp(/abc/);            // true
isRegExp(new RegExp("a"));  // true
isRegExp("/abc/");          // false
```

### isNullish

Checks if a value is `null` or `undefined`.

```typescript
import { isNullish } from '@drzioner/helpers';

isNullish(null);       // true
isNullish(undefined);  // true
isNullish(0);          // false
isNullish("");         // false
isNullish(false);      // false
```

### isEmpty

Checks if a value is empty. Works with multiple types:

| Type | Considered empty when |
|------|----------------------|
| `null` / `undefined` | Always |
| `string` | Length is 0 |
| `Array` | Length is 0 |
| `Map` / `Set` | Size is 0 |
| Plain object | Has no own keys |
| `Date`, `RegExp`, `Error`, etc. | Never (non-plain objects are not "empty") |
| `number`, `boolean` | Never |

```typescript
import { isEmpty } from '@drzioner/helpers';

isEmpty(null);         // true
isEmpty(undefined);    // true
isEmpty("");           // true
isEmpty([]);           // true
isEmpty({});           // true
isEmpty(new Map());    // true
isEmpty(new Set());    // true

isEmpty("hello");      // false
isEmpty([1]);          // false
isEmpty({ a: 1 });    // false
isEmpty(0);            // false
isEmpty(false);        // false
isEmpty(new Date());   // false
isEmpty(new Error()); // false
```
