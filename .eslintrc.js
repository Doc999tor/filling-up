module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": ["standard", "standard-react"],
  "globals": {
    ReactRouterDOM: false,
    PropTypes: false,
    ReactDOM: false,
    config: false,
    Swiper: false,
    moment: false,
    React: false,
    FB: false
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [2,2],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-unused-vars": [
      "warn",
      {
        "varsIgnorePattern": "config",
        "args": "after-used",
        "vars": "all"
      }
    ],
    "arrow-parens": ["error", "as-needed"],
    "camelcase": "off",
    "vars-on-top": 1,
    "no-console": 1
  }
};
