module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'prettier', // Add this to avoid conflicts
  ],
  plugins: ['prettier'], // Add this
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Prettier integration
    'prettier/prettier': 'error',

    // Code quality
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^(req|res|next|_)$',
        varsIgnorePattern: '^_',
      },
    ],
    'prefer-const': 'error',
    'no-var': 'error',

    // Best practices
    eqeqeq: ['error', 'always'],
    'no-duplicate-imports': 'error',
    'no-unreachable': 'error',
    'consistent-return': 'off',

    // Relaxed rules for Node.js/Express
    'no-process-exit': 'off',
    'global-require': 'off',
    'class-methods-use-this': 'off',

    // Async/await
    'require-await': 'warn',
    'no-return-await': 'error',

    // Objects and arrays
    'object-shorthand': 'error',
    'prefer-destructuring': [
      'warn',
      {
        array: false,
        object: true,
      },
    ],
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '*.min.js'],
};
