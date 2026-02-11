## String

### splitWords

Splits a string into an array of lowercase words. Detects word boundaries by spaces, hyphens, underscores, camelCase, PascalCase, and ACRONYM transitions.

```typescript
import { splitWords } from '@drzioner/helpers';

splitWords("fooBar");        // ["foo", "bar"]
splitWords("FooBar");        // ["foo", "bar"]
splitWords("foo-bar_baz");   // ["foo", "bar", "baz"]
splitWords("HTMLParser");    // ["html", "parser"]
splitWords("parseJSON");     // ["parse", "json"]
splitWords("");              // []
```

| Parameter | Type     | Description           |
|-----------|----------|-----------------------|
| `str`     | `string` | The string to split   |

### capitalize

Capitalizes the first character of a string. The rest of the string is unchanged.

```typescript
import { capitalize } from '@drzioner/helpers';

capitalize("hello");   // "Hello"
capitalize("HELLO");   // "HELLO"
capitalize("");        // ""
```

| Parameter | Type     | Description              |
|-----------|----------|--------------------------|
| `str`     | `string` | The string to capitalize |

### camelCase

Converts a string to camelCase.

```typescript
import { camelCase } from '@drzioner/helpers';

camelCase("foo-bar");       // "fooBar"
camelCase("foo_bar_baz");   // "fooBarBaz"
camelCase("FooBar");        // "fooBar"
camelCase("foo bar baz");   // "fooBarBaz"
```

| Parameter | Type     | Description            |
|-----------|----------|------------------------|
| `str`     | `string` | The string to convert  |

### kebabCase

Converts a string to kebab-case.

```typescript
import { kebabCase } from '@drzioner/helpers';

kebabCase("fooBar");       // "foo-bar"
kebabCase("FooBar");       // "foo-bar"
kebabCase("foo_bar_baz");  // "foo-bar-baz"
kebabCase("foo bar");      // "foo-bar"
```

| Parameter | Type     | Description            |
|-----------|----------|------------------------|
| `str`     | `string` | The string to convert  |

### snakeCase

Converts a string to snake_case.

```typescript
import { snakeCase } from '@drzioner/helpers';

snakeCase("fooBar");       // "foo_bar"
snakeCase("foo-bar-baz");  // "foo_bar_baz"
snakeCase("FooBar");       // "foo_bar"
```

| Parameter | Type     | Description            |
|-----------|----------|------------------------|
| `str`     | `string` | The string to convert  |

### pascalCase

Converts a string to PascalCase.

```typescript
import { pascalCase } from '@drzioner/helpers';

pascalCase("foo-bar");      // "FooBar"
pascalCase("foo_bar_baz");  // "FooBarBaz"
pascalCase("fooBar");       // "FooBar"
```

| Parameter | Type     | Description            |
|-----------|----------|------------------------|
| `str`     | `string` | The string to convert  |

### slugify

Converts a string into a URL-friendly slug. Handles Unicode characters by normalizing diacritics (e.g., `café` becomes `cafe`).

```typescript
import { slugify } from '@drzioner/helpers';

slugify("Hello World!");   // "hello-world"
slugify("  Foo  Bar  ");  // "foo-bar"
slugify("foo_bar_baz");   // "foo-bar-baz"
slugify("café");           // "cafe"
slugify("über cool");      // "uber-cool"
slugify("résumé");         // "resume"
```

| Parameter | Type     | Description           |
|-----------|----------|-----------------------|
| `str`     | `string` | The string to slugify |

### truncate

Truncates a string to a maximum length. Appends an ending string (`"..."` by default) when truncated. If the max length is shorter than the ending, only slices the string without appending.

```typescript
import { truncate } from '@drzioner/helpers';

truncate("Hello World", 8);        // "Hello..."
truncate("Hello World", 8, "~");   // "Hello W~"
truncate("Hello", 10);             // "Hello" (no truncation)
truncate("Hello", 5);              // "Hello" (exact length)
truncate("Hello", 2, "...");       // "He"
```

| Parameter | Type     | Default | Description                            |
|-----------|----------|---------|----------------------------------------|
| `str`     | `string` | --      | The string to truncate                 |
| `length`  | `number` | --      | Maximum length of the result           |
| `end`     | `string` | `"..."` | String to append when truncated        |

### escapeHtml

Escapes the 5 XML-significant characters (`&`, `<`, `>`, `"`, `'`) in a string. Use this to safely insert user content into HTML.

```typescript
import { escapeHtml } from '@drzioner/helpers';

escapeHtml('<script>alert("xss")</script>');
// "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"

escapeHtml("foo & bar");   // "foo &amp; bar"
escapeHtml("it's");        // "it&#39;s"
```

| Parameter | Type     | Description          |
|-----------|----------|----------------------|
| `str`     | `string` | The string to escape |

### unescapeHtml

Reverses `escapeHtml` by converting the 5 XML entities back to their original characters.

```typescript
import { unescapeHtml } from '@drzioner/helpers';

unescapeHtml("&lt;div&gt;Hello&lt;/div&gt;");  // "<div>Hello</div>"
unescapeHtml("foo &amp; bar");                  // "foo & bar"
unescapeHtml("it&#39;s");                       // "it's"
```

| Parameter | Type     | Description            |
|-----------|----------|------------------------|
| `str`     | `string` | The string to unescape |
