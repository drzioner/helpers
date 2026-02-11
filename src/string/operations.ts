/**
 * Converts a string into a URL-friendly slug.
 *
 * @param str - The string to slugify
 * @returns The slugified string
 *
 * @example
 * slugify("Hello World!")     // "hello-world"
 * slugify("  Foo  Bar  ")    // "foo-bar"
 * slugify("camelCase Test")  // "camelcase-test"
 */
export const slugify = (str: string): string =>
  str
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Truncates a string to a specified length and appends an ending string.
 *
 * @param str - The string to truncate
 * @param length - The maximum length (including the ending)
 * @param end - The string to append when truncated (default: "...")
 * @returns The truncated string
 *
 * @example
 * truncate("Hello World", 8)        // "Hello..."
 * truncate("Hello World", 8, "…")   // "Hello W…"
 * truncate("Hello", 10)             // "Hello"
 */
export const truncate = (str: string, length: number, end = "..."): string => {
  if (str.length <= length) return str;
  if (length <= end.length) return str.slice(0, length);
  return str.slice(0, length - end.length) + end;
};

const htmlEscapes: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const htmlUnescapes: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

/**
 * Escapes HTML special characters in a string.
 * Covers the 5 XML-significant characters: &, <, >, ", '. Other HTML entities are not processed.
 *
 * @param str - The string to escape
 * @returns The escaped string
 *
 * @example
 * escapeHtml('<script>alert("xss")</script>')
 * // "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
 */
export const escapeHtml = (str: string): string => str.replace(/[&<>"']/g, (ch) => htmlEscapes[ch]);

/**
 * Unescapes HTML entities back to their original characters.
 * Covers the 5 XML-significant entities: &amp;, &lt;, &gt;, &quot;, &#39;. Other HTML entities are not processed.
 *
 * @param str - The string to unescape
 * @returns The unescaped string
 *
 * @example
 * unescapeHtml("&lt;div&gt;Hello&lt;/div&gt;")
 * // "<div>Hello</div>"
 */
export const unescapeHtml = (str: string): string =>
  str.replace(/&(?:amp|lt|gt|quot|#39);/g, (entity) => htmlUnescapes[entity]);
