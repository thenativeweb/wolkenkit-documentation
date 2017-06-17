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
        exclude: /node_modules/,
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
  webpackConfiguration.plugins.push(new webpack.optimize.UglifyJsPlugin());
  webpackConfiguration.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }));
}

const compile = function (callback) {
  const compiler = webpack(webpackConfiguration);

  if (isProductionMode) {
    return compiler.run(err => {
      if (err) {
        logger.error('Failed to compile.', { err });

        return callback(err);
      }

      logger.info('Finished compiling.');
      callback(null);
    });
  }

  compiler.watch({}, err => {
    if (err) {
      return logger.error('Failed to compile.', { err });
    }

    logger.info('Finished compiling.');
  });

  callback(null);
};

module.exports = compile;
