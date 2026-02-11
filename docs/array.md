## Array

### unique

Returns a new array with duplicate values removed (using `Set`).

```typescript
import { unique } from '@drzioner/helpers';

unique([1, 2, 2, 3, 3]);       // [1, 2, 3]
unique(["a", "b", "a", "c"]);  // ["a", "b", "c"]
unique([]);                     // []
```

| Parameter | Type  | Description              |
|-----------|-------|--------------------------|
| `array`   | `T[]` | The array to deduplicate |

### uniqueBy

Returns a new array with duplicates removed based on a key. Accepts either a property name or a selector function.

```typescript
import { uniqueBy } from '@drzioner/helpers';

uniqueBy([{ id: 1 }, { id: 1 }, { id: 2 }], "id");
// [{ id: 1 }, { id: 2 }]

uniqueBy(
  [{ name: "Alice", age: 30 }, { name: "Bob", age: 30 }, { name: "Charlie", age: 25 }],
  (item) => String(item.age)
);
// [{ name: "Alice", age: 30 }, { name: "Charlie", age: 25 }]
```

| Parameter | Type                         | Description                          |
|-----------|------------------------------|--------------------------------------|
| `array`   | `T[]`                        | The array to deduplicate             |
| `key`     | `keyof T \| KeySelector<T>`  | Property name or selector function   |

### groupBy

Groups array elements by a key. Accepts either a property name or a selector function.

```typescript
import { groupBy } from '@drzioner/helpers';

groupBy([{ type: "a", v: 1 }, { type: "b", v: 2 }, { type: "a", v: 3 }], "type");
// { a: [{ type: "a", v: 1 }, { type: "a", v: 3 }], b: [{ type: "b", v: 2 }] }

groupBy([1, 2, 3, 4, 5], (n) => (n % 2 === 0 ? "even" : "odd"));
// { odd: [1, 3, 5], even: [2, 4] }
```

| Parameter | Type                         | Description                          |
|-----------|------------------------------|--------------------------------------|
| `array`   | `T[]`                        | The array to group                   |
| `key`     | `keyof T \| KeySelector<T>`  | Property name or selector function   |

### chunk

Splits an array into groups of the specified size. The last chunk may have fewer elements.

```typescript
import { chunk } from '@drzioner/helpers';

chunk([1, 2, 3, 4, 5], 2);  // [[1, 2], [3, 4], [5]]
chunk([1, 2, 3], 5);         // [[1, 2, 3]]
chunk([1, 2, 3], 1);         // [[1], [2], [3]]
chunk([1, 2, 3], 0);         // []
```

| Parameter | Type     | Description                                       |
|-----------|----------|---------------------------------------------------|
| `array`   | `T[]`    | The array to chunk                                |
| `size`    | `number` | Maximum size of each chunk. Must be a positive integer. |

### shuffle

Returns a new array with elements randomly shuffled using the Fisher-Yates algorithm. Does not mutate the original.

```typescript
import { shuffle } from '@drzioner/helpers';

shuffle([1, 2, 3, 4, 5]);  // [3, 1, 5, 2, 4] (random order)
```

| Parameter | Type  | Description           |
|-----------|-------|-----------------------|
| `array`   | `T[]` | The array to shuffle  |

### range

Generates an array of numbers from `start` (inclusive) to `end` (exclusive) with a given step.

```typescript
import { range } from '@drzioner/helpers';

range(0, 5);        // [0, 1, 2, 3, 4]
range(1, 10, 2);    // [1, 3, 5, 7, 9]
range(5, 0, -1);    // [5, 4, 3, 2, 1]
range(0, 1, 0.25);  // [0, 0.25, 0.5, 0.75]
range(5, 5);         // []
range(0, 5, 0);      // [] (zero step)
```

| Parameter | Type     | Default | Description                    |
|-----------|----------|---------|--------------------------------|
| `start`   | `number` | --      | Start value (inclusive)        |
| `end`     | `number` | --      | End value (exclusive)          |
| `step`    | `number` | `1`     | Increment between values       |

### compact

Returns a new array with all falsy values (`false`, `0`, `0n`, `""`, `null`, `undefined`) removed.

```typescript
import { compact } from '@drzioner/helpers';

compact([0, 1, false, 2, "", 3, null, undefined]);  // [1, 2, 3]
compact([1, "a", true, {}, []]);                     // [1, "a", true, {}, []]
compact([]);                                         // []
```

| Parameter | Type                      | Description           |
|-----------|---------------------------|-----------------------|
| `array`   | `readonly (T \| Falsy)[]` | The array to compact  |

### first

Returns the first element of an array, or `undefined` if empty.

```typescript
import { first } from '@drzioner/helpers';

first([1, 2, 3]);  // 1
first([]);          // undefined
```

| Parameter | Type  | Description        |
|-----------|-------|--------------------|
| `array`   | `T[]` | The source array   |

### last

Returns the last element of an array, or `undefined` if empty.

```typescript
import { last } from '@drzioner/helpers';

last([1, 2, 3]);  // 3
last([42]);        // 42
last([]);          // undefined
```

| Parameter | Type  | Description        |
|-----------|-------|--------------------|
| `array`   | `T[]` | The source array   |

### intersection

Returns elements that exist in both arrays.

```typescript
import { intersection } from '@drzioner/helpers';

intersection([1, 2, 3], [2, 3, 4]);           // [2, 3]
intersection(["a", "b", "c"], ["b", "c", "d"]); // ["b", "c"]
intersection([1, 2], [3, 4]);                  // []
```

| Parameter | Type  | Description        |
|-----------|-------|--------------------|
| `a`       | `T[]` | The first array    |
| `b`       | `T[]` | The second array   |

### difference

Returns elements from the first array that don't exist in the second.

```typescript
import { difference } from '@drzioner/helpers';

difference([1, 2, 3], [2, 3, 4]);  // [1]
difference([1, 2], [3, 4]);        // [1, 2]
difference([1, 2], [1, 2, 3]);     // []
```

| Parameter | Type  | Description                  |
|-----------|-------|------------------------------|
| `a`       | `T[]` | The source array             |
| `b`       | `T[]` | The array of values to exclude |
