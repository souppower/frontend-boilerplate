const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({ title: 'Webpack demo' }),
    ],
  },
  parts.lintJavaScript({ include: PATHS.app }),
  parts.lintCSS({ include: PATHS.app }),
  parts.loadFonts({
    options: {
      name: '[name].[ext]',
    },
  }),
]);

const productionConfig = merge([
  parts.extractCSS({
    use: ['css-loader', parts.autoprefix()],
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.css`, { nodir: true }),
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]',
    },
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    host: '0.0.0.0',
    port: process.env.PORT,
    contentBase: PATHS.build,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};
