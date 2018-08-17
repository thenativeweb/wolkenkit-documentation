'use strict';

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const flaschenpost = require('flaschenpost'),
      processenv = require('processenv'),
      webpack = require('webpack');

const logger = flaschenpost.getLogger();

const isProductionMode = processenv('NODE_ENV') === 'production';

const webpackConfiguration = {
  bail: true,
  mode: isProductionMode ? 'production' : 'development',
  context: path.join(__dirname, 'lib'),
  entry: [
    './client/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'wk-docs.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'lib'),
          path.join(__dirname, 'node_modules', 'markdown-it-anchor')
        ],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'wk-docs.css'
    })
  ]
};

const environmentConfig = {
  'process.env': {
    NEWS_URL: JSON.stringify(processenv('NEWS_URL')),
    APP_ENV: JSON.stringify('browser')
  }
};

if (isProductionMode) {
  environmentConfig['process.env'].NODE_ENV = JSON.stringify('production');
}

webpackConfiguration.plugins.push(new webpack.DefinePlugin(environmentConfig));

const compile = function (callback) {
  const compiler = webpack(webpackConfiguration);

  if (isProductionMode) {
    return compiler.run((err, stats) => {
      if (err) {
        logger.error('Failed to compile.', { err });

        return callback(err);
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        logger.error('Failed to compile.', { err: info.errors });

        return callback(info.errors);
      }

      if (stats.hasWarnings()) {
        logger.warn('Encountered warnings during compilation.', { err: info.warnings });
      }

      logger.info('Finished compiling.');
      callback(null);
    });
  }

  compiler.watch({}, (err, stats) => {
    if (err) {
      return logger.error('Failed to compile.', { err });
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      return logger.error('Failed to compile.', { err: info.errors });
    }

    if (stats.hasWarnings()) {
      logger.warn('Encountered warnings during compilation.', { err: info.warnings });
    }

    logger.info('Finished compiling.');
  });

  callback(null);
};

module.exports = compile;
