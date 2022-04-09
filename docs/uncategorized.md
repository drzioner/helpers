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
