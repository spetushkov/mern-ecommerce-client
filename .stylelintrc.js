module.exports = {
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-sass-guidelines',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  rules: {
    'color-named': 'always-where-possible',
    'selector-class-pattern': '^[a-z]*-?[a-zA-Z0-9]*$',
  },
};
