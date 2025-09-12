module.exports = {
  // Basic formatting
  semi: true, // Semicolons at end
  trailingComma: 'es5', // Trailing commas where valid in ES5
  singleQuote: true, // Single quotes

  // Indentation
  tabWidth: 2, // 2 spaces
  useTabs: false, // Use spaces, not tabs

  // Line width
  printWidth: 100, // Max line length

  // Brackets and spacing
  bracketSpacing: true, // { foo: bar } not {foo: bar}
  bracketSameLine: false, // Put > on new line
  arrowParens: 'avoid', // x => x not (x) => x

  // Quotes in objects
  quoteProps: 'as-needed', // Only quote when necessary

  // End of line
  endOfLine: 'lf', // Unix line endings

  // HTML/JSX (if needed later)
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'preserve',
};
