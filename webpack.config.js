"use strict";

const merge = require('webpack-merge');
const PATHS = require('./webpack-paths');
const loaders = require('./webpack-loaders');

const common = {
  entry: {
    app: ['babel-polyfill', PATHS.src]
  },
  output: {
    path: PATHS.dist,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      loaders.babel,
      loaders.css,
      loaders.font
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

let config;
// The switch defines the different configuration as development requires webpack-dev-server
switch(process.env.NODE_ENV) {
  case 'production':
      config = merge(
          common,
          { devtool: 'source-map' } // SourceMaps on separate file
       );
      break;
  case 'development':
      config = merge(
          common,
          { devtool: 'eval-source-map' }, // Default value
          loaders.devServer({
              host: process.env.host,
              port: 4200
          })
      );
}

// We export the config
module.exports = config;
