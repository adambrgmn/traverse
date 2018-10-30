process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvTest = process.env.NODE_ENV === 'test';

module.exports = {
  presets: [
    isEnvTest && '@babel/preset-env',
    isEnvTest && '@babel/preset-react',
  ].filter(Boolean),
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
