## Date helpers

Difference dates
```bash
import { dateDifference } from '@drzioner/helpers';

const diff = dateDifference('2021-04-09', '2021-04-01');

console.log('diff', diff);

# diff 691200000

const diff = dateDifference('2021-04-09', '2021-04-01', 'days');

console.log('diff', diff);

# diff 8

import { differenceTodayAndAnotherDate } from '@drzioner/helpers';

const diff = differenceTodayAndAnotherDate('2022-04-08');

console.log('diff', diff);

# diff 160556129

const diff = differenceTodayAndAnotherDate('2021-04-08', 'months');

console.log('diff', diff);

# diff 12
```
Format dates
```bash
import { formatDate } from '@drzioner/helpers';

const date = formatDate('iso', '2021-04-08');

console.log('date', date);

# date 2021-04-08T00:00:00.000Z

const date = formatDate('locale');

console.log('date', date);

# date 9/4/2022, 3:40:09 p. m.

import { CustomFormat, formatDate } from '@drzioner/helpers';

const date = formatDate('custom', new Date(), CustomFormat.DD_MM_YYYY_HH_MM_SSZ);

console.log('date', date);

# date 09-04-2022 15:42:03.931

```
Manipulate dates
```bash
import { manipulateDate } from '@drzioner/helpers';

const date = manipulateDate({ days: -1, months: 1 }, '2022-04-09');

console.log('date', date);

# date 2022-05-08T00:00:00.000Z

import { manipulateDays } from '@drzioner/helpers';

const date = manipulateDays(4, '2022-04-09');

console.log('date', date);

# date 2022-04-13T00:00:00.000Z
```

Get dates
```bash
import { getDate } from '@drzioner/helpers';

const date = getDate();

console.log('date', date);

# date 2022-04-09T20:54:14.850Z

const date = getDate('2022-04-05');

console.log('date', date);

# date 2022-04-05T00:00:00.000Z

import { getHours } from '@drzioner/helpers';

const date = getHours();

console.log('date', date);

# date 15
```
