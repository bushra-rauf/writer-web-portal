/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to slugify
 * @returns A slugified string (lowercase, hyphen-separated, no special chars)
 *
 * @example
 * slugify("Hello World!") // "hello-world"
 * slugify("The Writer's Guide") // "the-writers-guide"
 * slugify("Book Title   123") // "book-title-123"
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()           // Convert to lowercase
    .trim()                  // Remove leading/trailing spaces
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/[\s_]/g, '-')   // Replace spaces and underscores with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
}
