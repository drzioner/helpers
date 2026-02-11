## Files

### randomFileName

Generates a unique file name with a timestamp prefix and random hex hash.

```typescript
import { randomFileName } from '@drzioner/helpers';

randomFileName('photo.jpg');
// "1647828249206a64bdc57f939d47eae0be8dfab854314b8b5d6fc01b6449acd8787c06075e4ec.jpg"

randomFileName('file.jpg', 8, '.png');
// "164782829087589b6a0c9d92d12b2.png"
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `originalName` | `string` | -- | Original file name (extension is extracted) |
| `length` | `number` | `32` | Number of random bytes for the hash |
| `extension` | `string` | -- | Override the file extension |
| `encoding` | `BufferEncoding` | `"hex"` | Encoding for the random bytes |

> **Migration:** `nameFileRandom` is deprecated. Use `randomFileName` instead.

### createFile

Writes a file with path traversal protection.

```typescript
import { createFile } from '@drzioner/helpers';

await createFile('config.json', '{"key": "value"}', './output');
// writes ./output/config.json

await createFile('../../etc/passwd', 'data');
// throws Error: Path traversal detected
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `file` | `string` | -- | File name or relative path within base directory |
| `data` | `string \| Uint8Array` | -- | Content to write |
| `path` | `string` | `process.cwd()` | Base directory |
