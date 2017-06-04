"use strict";

const webpack = require('webpack');
const PATHS = require('./webpack-paths');

exports.devServer = (options) => {
  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host, // in dev - localhost:3000
      port: options.port, // 4200
      contentBase: './client/dist'
    },
    // Enable multi-pass compilation for enhanced performance
    plugins: [ // Hot module
        new webpack.HotModuleReplacementPlugin({
            multistep: true
        })
    ]
  };
}

// css loaders
exports.css = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
  include: PATHS.css
};

// File loaders
exports.font = {
  test: /\.ttf$/,
  use: ['file-loader']
};

// Babel loaders
exports.babel = {
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: ['babel-loader']
};
