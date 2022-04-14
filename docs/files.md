## File helpers

Name file random

```bash
import { nameFileRandom } from '@drzioner/helpers';

const nameRandom = nameFileRandom('file.jpg');

console.log('nameRandom', nameRandom);

# nameRandom 1647828249206a64bdc57f939d47eae0be8dfab854314b8b5d6fc01b6449acd8787c06075e4ec.jpg

const nameRandom = nameFileRandom('file.jpg', 8, '.png');

console.log('nameRandom', nameRandom);

# nameRandom 164782829087589b6a0c9d92d12b2.png
```

Create file

```bash
import { createFile } from '@drzioner/helpers';

createFile('file.json', JSON.stringify({data1:1,data2:'2'}, null, 2), 'path/folder');

# file created in path/folder/file.json
# file.json
# {
#   data1: 1,
#   data2: '2' 
# }
#
```
