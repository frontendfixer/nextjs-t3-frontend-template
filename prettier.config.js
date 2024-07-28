/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  endOfLine: 'auto',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'es5', // Adds trailing commas where valid in ES5 (objects, arrays, etc.)
  singleAttributePerLine: false,
  jsxSingleQuote: true, // Use single quotes in JSX
  tailwindFunctions: ['cn'],
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
