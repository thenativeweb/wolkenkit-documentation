'use strict';

const path = require('path');

const autoprefixer = require('autoprefixer'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      flaschenpost = require('flaschenpost'),
      processenv = require('processenv'),
      webpack = require('webpack');

const logger = flaschenpost.getLogger();

const isProductionMode = processenv('NODE_ENV') === 'production';

const webpackConfiguration = {
  bail: true,
  devtool: isProductionMode ? undefined : 'eval',
  context: path.join(__dirname, 'src'),
  entry: [
    './client/index.jsx',
    './theme/wk-docs.less'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'wk-docs.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'node_modules', 'markdown-it-anchor')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({ loader: [ 'css-loader', 'less-loader' ], fallbackLoader: 'style-loader' })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('wk-docs.css'),

    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          autoprefixer
        ]
      }
    })
  ]
};

if (isProductionMode) {
  webpackConfiguration.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }));
  webpackConfiguration.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

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
