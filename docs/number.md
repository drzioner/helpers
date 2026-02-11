## Number

### clamp

Clamps a number between a minimum and maximum value.

```typescript
import { clamp } from '@drzioner/helpers';

clamp(15, 0, 10);   // 10
clamp(-5, 0, 10);   // 0
clamp(5, 0, 10);    // 5
```

| Parameter | Type     | Description       |
|-----------|----------|-------------------|
| `value`   | `number` | The number to clamp |
| `min`     | `number` | Minimum bound     |
| `max`     | `number` | Maximum bound     |

### round

Rounds a number to a specified number of decimal places. Uses exponential notation to handle edge cases like `1.005` and `1.255`.

```typescript
import { round } from '@drzioner/helpers';

round(1.2345, 2);  // 1.23
round(1.5);        // 2
round(1.005, 2);   // 1.01
```

| Parameter   | Type     | Default | Description                  |
|-------------|----------|---------|------------------------------|
| `value`     | `number` | --      | The number to round          |
| `precision` | `number` | `0`     | Number of decimal places     |

### randomInt

Generates a random integer between `min` and `max` (both inclusive).

```typescript
import { randomInt } from '@drzioner/helpers';

randomInt(1, 10);  // random integer between 1 and 10
randomInt(0, 1);   // 0 or 1
```

| Parameter | Type     | Description              |
|-----------|----------|--------------------------|
| `min`     | `number` | Minimum value (inclusive) |
| `max`     | `number` | Maximum value (inclusive) |

### inRange

Checks if a number is within a half-open range `[min, max)`.

```typescript
import { inRange } from '@drzioner/helpers';

inRange(5, 0, 10);    // true
inRange(0, 0, 10);    // true  (min is inclusive)
inRange(10, 0, 10);   // false (max is exclusive)
inRange(-1, 0, 10);   // false
```

| Parameter | Type     | Description              |
|-----------|----------|--------------------------|
| `value`   | `number` | The number to check      |
| `min`     | `number` | Minimum bound (inclusive) |
| `max`     | `number` | Maximum bound (exclusive) |

### sumAll

Sums an array of numbers. Returns `0` for an empty array.

```typescript
import { sumAll } from '@drzioner/helpers';

sumAll([1, 2, 3, 4]);  // 10
sumAll([]);             // 0
sumAll([-1, 1]);        // 0
```

| Parameter | Type       | Description           |
|-----------|------------|-----------------------|
| `values`  | `number[]` | Array of numbers to sum |

### average

Calculates the arithmetic mean of an array of numbers. Returns `NaN` for an empty array.

```typescript
import { average } from '@drzioner/helpers';

average([1, 2, 3, 4]);  // 2.5
average([10]);           // 10
average([]);             // NaN
```

| Parameter | Type       | Description   |
|-----------|------------|---------------|
| `values`  | `number[]` | Array of numbers |

### formatBytes

Formats a byte count into a human-readable string with automatic unit selection.

```typescript
import { formatBytes } from '@drzioner/helpers';

formatBytes(0);           // "0 Bytes"
formatBytes(1024);        // "1 KB"
formatBytes(1536);        // "1.5 KB"
formatBytes(1048576);     // "1 MB"
formatBytes(1073741824);  // "1 GB"
formatBytes(1536, 0);     // "2 KB"
```

| Parameter  | Type     | Default | Description                  |
|------------|----------|---------|------------------------------|
| `bytes`    | `number` | --      | The number of bytes          |
| `decimals` | `number` | `2`     | Number of decimal places     |

### ordinal

Returns a number with its English ordinal suffix (`st`, `nd`, `rd`, `th`).

```typescript
import { ordinal } from '@drzioner/helpers';

ordinal(1);    // "1st"
ordinal(2);    // "2nd"
ordinal(3);    // "3rd"
ordinal(4);    // "4th"
ordinal(11);   // "11th"
ordinal(12);   // "12th"
ordinal(13);   // "13th"
ordinal(21);   // "21st"
ordinal(22);   // "22nd"
ordinal(113);  // "113th"
```

| Parameter | Type     | Description            |
|-----------|----------|------------------------|
| `n`       | `number` | The number to format   |

### padNumber

Pads a number with a fill character to reach the desired string length. Handles negative numbers by preserving the sign.

```typescript
import { padNumber } from '@drzioner/helpers';

padNumber(1);            // "0001"
padNumber(1, 2);         // "01"
padNumber(1, 5, 'z');    // "zzzz1"
padNumber(-1, 5);        // "-0001"
padNumber(12345, 3);     // "12345" (no truncation)
```

| Parameter | Type     | Default | Description                          |
|-----------|----------|---------|--------------------------------------|
| `value`   | `number` | --      | The number to pad                    |
| `length`  | `number` | `4`     | Total length of the resulting string |
| `fill`    | `string` | `"0"`   | Character to pad with                |

> **Note:** Also available from the `strings` module. `fillANumberWithCharacters` is a deprecated alias.
