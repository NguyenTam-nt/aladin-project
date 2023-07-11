module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // "react-hooks/exhaustive-deps": 1,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': 'off',
    'no-param-reassign': 'off',
    'babel/no-invalid-this': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'prettier/prettier': [
      'off',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
        semi: false,
      },
    ],
    'no-console': 'warn',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'arrow-body-style': 'off',
    'react/no-unused-prop-types': 'off',
    'react/sort-comp': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/no-array-index-key': 'off',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'react-native/no-inline-styles': 'off',
    'operator-assignment': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          // "delimiter": "none",
          requireLast: false,
        },
        overrides: {
          interface: {
            multiline: {
              delimiter: 'none',
              requireLast: true,
            },
          },
        },
      },
    ],
  },
};
