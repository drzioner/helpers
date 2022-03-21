# Helpers

### Collection of various helpers for javascript and typescript development

## Database helpers

Generate UID

```bash
import { generateUID } from '@drzioner/helpers';

const uid = generateUID();

console.log('uid', uid);

# uid 16478271-33403a97-d811b91d-345c8543-334d9a74-5044d5a47
```

## Date helpers

Difference between two dates
```bash
import { differenceBetweenTwoDates } from '@drzioner/helpers';

const diff = differenceBetweenTwoDates('2021-03-12', '2021-03-10');

console.log('diff', diff);

# diff -172800000

const diff = differenceBetweenTwoDates('2021-03-10', '2021-03-12', 'days');

console.log('diff', diff);

# diff 2
```
Difference between today and another date
```bash
import { differenceBetweenTwoDates } from '@drzioner/helpers';

const diff = differenceBetweenTodayAndAnotherDate('2021-03-12');

console.log('diff', diff);

# diff -32227200000

const diff = differenceBetweenTodayAndAnotherDate('2022-03-25', 'days');

console.log('diff', diff);

# diff 5
```

Format a date
```bash
import { formatADate, FormatDate } from '@drzioner/helpers';

const dateFormat = formatADate(new Date(), FormatDate.DD_MM_YYYY);

console.log('dateFormat', dateFormat);

# dateFormat 20-03-2022
```

## File helpers

```bash
import { nameFileRandom } from '@drzioner/helpers';

const nameRandom = nameFileRandom('file.jpg');

console.log('nameRandom', nameRandom);

# nameRandom 1647828249206a64bdc57f939d47eae0be8dfab854314b8b5d6fc01b6449acd8787c06075e4ec.jpg

const nameRandom = nameFileRandom('file.jpg', 8, 'png');

console.log('nameRandom', nameRandom);

# nameRandom 164782829087589b6a0c9d92d12b2png
```

## Mathematics helpers

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

Arithmetic operations
```bash
import { ArithmeticOperations, arithmeticOperations } from '@drzioner/helpers';

const result = arithmeticOperations([2, 1, 4, 3], ArithmeticOperations.SUM);

console.log('result', result);

# result 10
```

## Uncategorized helpers

Fill in a number with a character
```bash
import { fillInANumberWithACharacter } from '@drzioner/helpers';

const number = fillInANumberWithACharacter(1);

console.log('number', number);

# number 0001

const number = fillInANumberWithACharacter(1, 5, 'z');

console.log('number', number);

# number zzzz1
```
