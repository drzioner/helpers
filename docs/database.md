## Database

### generateUID

Generates a unique identifier string with a timestamp prefix and cryptographically random hex bytes. Format:
`xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxxx`

```typescript
import { generateUID } from '@drzioner/helpers';

const uid = generateUID();
// "16478271-33403a97-d811b91d-345c8543-334d9a74-5044d5a47"
```
