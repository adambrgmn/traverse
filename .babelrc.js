process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
