## Dates

### Date difference

```typescript
import { dateDifference, differenceTodayAndAnotherDate } from '@drzioner/helpers';

dateDifference('2021-04-09', '2021-04-01');                 // 691200000 (raw ms)
dateDifference('2021-04-09', '2021-04-01', 'days');         // 8
dateDifference('2021-04-09', '2021-04-01', 'milliseconds'); // 691200000

differenceTodayAndAnotherDate('2021-04-08', 'months');      // varies
```

Supported units: `milliseconds`, `seconds`, `minutes`, `hours`, `days`, `months`, `years`.

### Format dates

```typescript
import { formatDate, CustomFormat } from '@drzioner/helpers';

formatDate('iso', '2021-04-08');
// "2021-04-08T00:00:00.000Z"

formatDate('locale');
// "9/4/2022, 3:40:09 p. m." (varies by locale)

formatDate('custom', new Date(), CustomFormat.DD_MM_YYYY_HH_MM_SSZ);
// "09-04-2022 15:42:03.931"
```

Format types: `iso`, `utc`, `date`, `time`, `locale`, `locale-time`, `custom`.

### Manipulate dates

```typescript
import { manipulateDate, manipulateDays } from '@drzioner/helpers';

manipulateDate({ days: -1, months: 1 }, '2022-04-09');
// 2022-05-08T00:00:00.000Z

manipulateDays(4, '2022-04-09');
// 2022-04-13T00:00:00.000Z
```

Available manipulators (each with a UTC variant):
`manipulateYears`, `manipulateMonths`, `manipulateDays`, `manipulateHours`, `manipulateMinutes`, `manipulateSeconds`, `manipulateMilliseconds`

### Get date components

```typescript
import { getDate, getHours, getYear } from '@drzioner/helpers';

getDate();              // current Date object
getDate('2022-04-05');  // 2022-04-05T00:00:00.000Z
getHours();             // current hour (0-23)
getYear('2022-04-05');  // 2022
```

Every getter has a UTC variant (e.g., `getHoursUTC`, `getYearUTC`).
