const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce(
  (acc, rule) => {
    acc[`jsx-a11y/${rule}`] = 'off';
    return acc;
  },
  {}
);

const strict = process.env.STRICT === 'true';

module.exports = {
  parser: 'babel-eslint',
  extends: ['@ijsto', 'plugin:react/recommended', 'airbnb/hooks'],
  globals: {
    UIkit: 'readonly',
  },
  plugins: ['unused-imports', 'react-hooks'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  rules: {
    ...a11yOff, // disable for now
    'no-restricted-exports': 'off',
    'import/no-unresolved': ['off', { ignore: ['^@'] }],
    'import/no-cycle': [0, { ignoreExternal: true }],
    'import/no-named-default': 'off',
    'import/extensions': 'off',
    'arrow-body-style': ['off', 'never'],
    'node/callback-return': 'off',
    'consistent-return': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-else-return': 'off',
    'no-param-reassign': strict ? 'warn' : 'off',
    'no-shadow': strict ? 'warn' : 'off',
    'no-use-before-define': [1, 'nofunc'],
    'prefer-const': 'off',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/no-unescaped-entities': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'sort-keys': 'off',
    // unused-imports related:
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  ignorePatterns: ['**/dist/*.js', '**/build/*.js'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    es6: true,
  },
};
