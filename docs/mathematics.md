## Mathematics helpers

Arithmetic operations
```bash
import { ArithmeticOperations, arithmeticOperations } from '@drzioner/helpers';

const result = arithmeticOperations([2, 1, 4, 3], ArithmeticOperations.SUM);
#const result = arithmeticOperations([2, 1, 4, 3], 'sum');

console.log('result', result);

# result 10
```

Sum
```bash
import { sum } from '@drzioner/helpers';

const result = sum(1, 2);

console.log('result', result);

# result 3
```

Subtraction
```bash
import { subtraction } from '@drzioner/helpers';

const result = subtraction(1, 2);

console.log('result', result);

# result -1
```

Multiplication
```bash
import { multiplication } from '@drzioner/helpers';

const result = multiplication(1, 2);

console.log('result', result);

# result 2
```

Division
```bash
import { division } from '@drzioner/helpers';

const result = division(2, 1);

console.log('result', result);

# result 2
```
