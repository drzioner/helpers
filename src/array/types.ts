/** A function that extracts a key from an item. */
export type KeySelector<T> = (item: T) => string;

/** Falsy values in JavaScript. */
export type Falsy = false | 0 | 0n | "" | null | undefined;
