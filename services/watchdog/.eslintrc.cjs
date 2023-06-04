/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint', 'import', 'unused-imports', 'import-newlines'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // base
    'no-trailing-spaces': 'error',
    'quote-props': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'never'],
    'eol-last': ['error', 'always'],
    'arrow-body-style': ['error', 'as-needed'],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'object-curly-spacing': ['error', 'always'],

    // @typescript-eslint
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/indent': ['error', 2, {
      ignoredNodes: ['TSTypeParameterInstantiation'] // ignore type parameters (useful when they are long)
    }],
    '@typescript-eslint/member-delimiter-style': [
      'error', {
        multiline: {
          delimiter: 'none',
          requireLast: false
        },
        singleline: {
          requireLast: false
        },
      }
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],

    // import
    'import/no-unresolved': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',

    // unused-imports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'warn',

    // import-newlines
    'import-newlines/enforce': [
      'error',
      {
        items: 1,
      },
    ],
  },
}

// module.exports = config
