## Math

### arithmeticOperations

Reduces an array of numbers with the specified operation.

```typescript
import { arithmeticOperations, ArithmeticOperations } from '@drzioner/helpers';

arithmeticOperations([2, 1, 4, 3], 'sum');                   // 10
arithmeticOperations([10, 2, 3], 'subtraction');              // 5
arithmeticOperations([2, 3, 4], 'multiplication');            // 24
arithmeticOperations([100, 2, 5], ArithmeticOperations.DIVISION); // 10
```

Operations: `sum`, `subtraction`, `multiplication`, `division`.

### Individual operations

```typescript
import { sum, subtraction, multiplication, division } from '@drzioner/helpers';

sum(1, 2);            // 3
subtraction(5, 3);    // 2
multiplication(3, 4); // 12
division(10, 2);      // 5
```
