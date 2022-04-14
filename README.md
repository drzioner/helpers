# Helpers

### Collection of various helpers for javascript and typescript development

## Installation

```bash
npm i @drzioner/helpers
# or
yarn add @drzioner/helpers
```

## [Database helpers](./docs/database.md)

Example

```bash
import { generateUID } from '@drzioner/helpers';

const uid = generateUID();

console.log('uid', uid);

# uid 16478271-33403a97-d811b91d-345c8543-334d9a74-5044d5a47
```

## [Date helpers](./docs/dates.md)

Example
```bash
import { manipulateDate } from '@drzioner/helpers';

const date = manipulateDate({ days: -1, months: 1 }, '2022-04-09');

console.log('date', date);

# date 2022-05-08T00:00:00.000Z

import { dateDifference } from '@drzioner/helpers';

const diff = dateDifference('2021-04-09', '2021-04-01', 'days');

console.log('diff', diff);

# diff 8
```

## [File helpers](./docs/files.md)

Example
```bash
import { nameFileRandom } from '@drzioner/helpers';

const nameRandom = nameFileRandom('file.jpg');

console.log('nameRandom', nameRandom);

# nameRandom 1647828249206a64bdc57f939d47eae0be8dfab854314b8b5d6fc01b6449acd8787c06075e4ec.jpg
```

## [Mathematics helpers](./docs/mathematics.md)

Arithmetic operations
```bash
import { ArithmeticOperations } from '@drzioner/helpers';
const result = arithmeticOperations([2, 1, 4, 3], 'sum');

console.log('result', result);

# result 10
```

## [Uncategorized helpers](./docs/uncategorized.md)

Fill in a number with a character
```bash
import { fillANumberWithCharacters } from '@drzioner/helpers';

const number = fillANumberWithCharacters(1);

console.log('number', number);

# number 0001
```
