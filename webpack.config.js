const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = {
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
};

const productionConfig = () => commonConfig;

const developmentConfig = () => {
  const config = {
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre',
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
          },
        },
      ],
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        eslint: {
          failOnWarning: false,
          failOnError: true,
        },
      }),
    ],
    devServer: {
      open: true,
      historyApiFallback: true,
      stats: 'errors-only',
      host: '0.0.0.0',
      port: process.env.PORT,
      overlay: {
        errors: true,
        warnings: true,
      },
    },
  };

  return Object.assign(
    {},
    commonConfig,
    config
  );
};

module.exports = (env) => {
  if (env === 'production') {
    return productionConfig();
  }
  return developmentConfig();
};
