import { describe, expect, it } from "vitest";
import { escapeHtml, slugify, truncate, unescapeHtml } from "./operations.js";
import {
  camelCase,
  capitalize,
  kebabCase,
  pascalCase,
  snakeCase,
  splitWords,
} from "./transforms.js";

describe("splitWords", () => {
  it("should split camelCase", () => {
    expect(splitWords("fooBar")).toEqual(["foo", "bar"]);
  });

  it("should split PascalCase", () => {
    expect(splitWords("FooBar")).toEqual(["foo", "bar"]);
  });

  it("should split kebab-case", () => {
    expect(splitWords("foo-bar")).toEqual(["foo", "bar"]);
  });

  it("should split snake_case", () => {
    expect(splitWords("foo_bar")).toEqual(["foo", "bar"]);
  });

  it("should split spaces", () => {
    expect(splitWords("foo bar")).toEqual(["foo", "bar"]);
  });

  it("should handle ACRONYMS", () => {
    expect(splitWords("HTMLParser")).toEqual(["html", "parser"]);
    expect(splitWords("parseJSON")).toEqual(["parse", "json"]);
  });

  it("should handle mixed separators", () => {
    expect(splitWords("foo-bar_baz qux")).toEqual(["foo", "bar", "baz", "qux"]);
  });

  it("should handle empty string", () => {
    expect(splitWords("")).toEqual([]);
  });
});

describe("capitalize", () => {
  it("should capitalize the first character", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("should not change already capitalized strings", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  it("should handle empty string", () => {
    expect(capitalize("")).toBe("");
  });

  it("should handle single character", () => {
    expect(capitalize("a")).toBe("A");
  });

  it("should not change the rest of the string", () => {
    expect(capitalize("hELLO")).toBe("HELLO");
  });
});

describe("camelCase", () => {
  it("should convert kebab-case", () => {
    expect(camelCase("foo-bar")).toBe("fooBar");
  });

  it("should convert snake_case", () => {
    expect(camelCase("foo_bar_baz")).toBe("fooBarBaz");
  });

  it("should convert PascalCase", () => {
    expect(camelCase("FooBar")).toBe("fooBar");
  });

  it("should convert spaces", () => {
    expect(camelCase("foo bar baz")).toBe("fooBarBaz");
  });

  it("should handle empty string", () => {
    expect(camelCase("")).toBe("");
  });

  it("should handle single word", () => {
    expect(camelCase("foo")).toBe("foo");
  });
});

describe("kebabCase", () => {
  it("should convert camelCase", () => {
    expect(kebabCase("fooBar")).toBe("foo-bar");
  });

  it("should convert PascalCase", () => {
    expect(kebabCase("FooBar")).toBe("foo-bar");
  });

  it("should convert snake_case", () => {
    expect(kebabCase("foo_bar_baz")).toBe("foo-bar-baz");
  });

  it("should convert spaces", () => {
    expect(kebabCase("foo bar")).toBe("foo-bar");
  });

  it("should handle empty string", () => {
    expect(kebabCase("")).toBe("");
  });
});

describe("snakeCase", () => {
  it("should convert camelCase", () => {
    expect(snakeCase("fooBar")).toBe("foo_bar");
  });

  it("should convert kebab-case", () => {
    expect(snakeCase("foo-bar-baz")).toBe("foo_bar_baz");
  });

  it("should convert PascalCase", () => {
    expect(snakeCase("FooBar")).toBe("foo_bar");
  });

  it("should handle empty string", () => {
    expect(snakeCase("")).toBe("");
  });
});

describe("pascalCase", () => {
  it("should convert kebab-case", () => {
    expect(pascalCase("foo-bar")).toBe("FooBar");
  });

  it("should convert snake_case", () => {
    expect(pascalCase("foo_bar_baz")).toBe("FooBarBaz");
  });

  it("should convert camelCase", () => {
    expect(pascalCase("fooBar")).toBe("FooBar");
  });

  it("should handle empty string", () => {
    expect(pascalCase("")).toBe("");
  });
});

describe("slugify", () => {
  it("should convert to slug", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });

  it("should trim whitespace", () => {
    expect(slugify("  Foo  Bar  ")).toBe("foo-bar");
  });

  it("should remove special characters", () => {
    expect(slugify("Hello, World! #2")).toBe("hello-world-2");
  });

  it("should handle underscores", () => {
    expect(slugify("foo_bar_baz")).toBe("foo-bar-baz");
  });

  it("should handle already slugified strings", () => {
    expect(slugify("hello-world")).toBe("hello-world");
  });

  it("should handle empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("should handle unicode characters with diacritics", () => {
    expect(slugify("café")).toBe("cafe");
    expect(slugify("über cool")).toBe("uber-cool");
    expect(slugify("résumé")).toBe("resume");
    expect(slugify("naïve")).toBe("naive");
  });

  it("should strip CJK characters", () => {
    expect(slugify("日本語")).toBe("");
  });
});

describe("truncate", () => {
  it("should truncate long strings", () => {
    expect(truncate("Hello World", 8)).toBe("Hello...");
  });

  it("should not truncate short strings", () => {
    expect(truncate("Hello", 10)).toBe("Hello");
  });

  it("should not truncate strings at exact length", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
  });

  it("should use custom ending", () => {
    expect(truncate("Hello World", 8, "~")).toBe("Hello W~");
  });

  it("should handle empty string", () => {
    expect(truncate("", 5)).toBe("");
  });

  it("should handle very short max length", () => {
    expect(truncate("Hello World", 3)).toBe("Hel");
  });

  it("should return sliced string when length <= end.length", () => {
    expect(truncate("Hello", 2, "...")).toBe("He");
    expect(truncate("Hello", 1, "...")).toBe("H");
  });
});

describe("escapeHtml", () => {
  it("should escape HTML characters", () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;",
    );
  });

  it("should escape ampersand", () => {
    expect(escapeHtml("foo & bar")).toBe("foo &amp; bar");
  });

  it("should escape single quotes", () => {
    expect(escapeHtml("it's")).toBe("it&#39;s");
  });

  it("should return unchanged string without special chars", () => {
    expect(escapeHtml("hello world")).toBe("hello world");
  });

  it("should handle empty string", () => {
    expect(escapeHtml("")).toBe("");
  });
});

describe("unescapeHtml", () => {
  it("should unescape HTML entities", () => {
    expect(unescapeHtml("&lt;div&gt;Hello&lt;/div&gt;")).toBe("<div>Hello</div>");
  });

  it("should unescape quotes", () => {
    expect(unescapeHtml("&quot;hello&quot;")).toBe('"hello"');
  });

  it("should unescape ampersand", () => {
    expect(unescapeHtml("foo &amp; bar")).toBe("foo & bar");
  });

  it("should unescape single quotes", () => {
    expect(unescapeHtml("it&#39;s")).toBe("it's");
  });

  it("should be the inverse of escapeHtml", () => {
    const original = "<div class=\"test\">Hello & 'World'</div>";
    expect(unescapeHtml(escapeHtml(original))).toBe(original);
  });

  it("should handle empty string", () => {
    expect(unescapeHtml("")).toBe("");
  });
});
