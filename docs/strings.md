## Strings

### padNumber

Pads a number with a fill character to reach the desired string length.

```typescript
import { padNumber } from '@drzioner/helpers';

padNumber(1);            // "0001"
padNumber(1, 2);         // "01"
padNumber(1, 5, 'z');    // "zzzz1"
padNumber(12345, 3);     // "12345" (no truncation)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `number` | -- | The number to pad |
| `length` | `number` | `4` | Total length of the resulting string |
| `fill` | `string` | `"0"` | Character to pad with |

> **Migration:** `fillANumberWithCharacters` is deprecated. Use `padNumber` instead.
