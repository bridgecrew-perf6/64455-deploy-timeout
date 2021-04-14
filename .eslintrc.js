const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules)
	.reduce((acc, rule) => { acc[`jsx-a11y/${rule}`] = 'off'; return acc }, {})

module.exports = {
  "extends": "@ijsto",
  "globals": {
    "UIkit": "readonly"
  },
  "rules": {
    ...a11yOff, // disable for now
    "import/no-unresolved": ["error", { "ignore": ["^@"] }],
    "jsx-a11y/anchor-is-valid": "off",
    "no-param-reassign": "warn",
    "no-shadow": "warn",
    "no-use-before-define": [1, "nofunc"],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    ],
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "sort-keys": "off"
  }
}
