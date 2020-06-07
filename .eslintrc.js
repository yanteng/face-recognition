module.exports = {
  env: {
    commonjs: true,
  },
  root: true,
  overrides: [
    {
      files: ['*.js'],
      parser: 'babel-eslint',
      extends: [
        'airbnb-base',
      ],
    },
    {
      files: ['*.ts', '*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
    },
  ],
};
