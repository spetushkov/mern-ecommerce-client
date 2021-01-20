module.exports = {
  plugins: ['stylelint-order'],
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-sass-guidelines',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
  ],
  rules: {
    // 'selector-class-pattern': '^[a-z]*-?[a-zA-Z0-9]*$',
    'scss/at-import-partial-extension-blacklist': null,
    'max-nesting-depth': null,
    'selector-max-compound-selectors': null,
    'no-descending-specificity': null,
    'declaration-block-no-duplicate-properties': null,
    'unit-no-unknown': null,
    'selector-no-qualifying-type': null,
  },
};
