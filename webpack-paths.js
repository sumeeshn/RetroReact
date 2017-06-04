"use strict";

const path = require("path");
// Webpack path which we use in entire webpack config
module.exports = {
  src: path.join(__dirname, 'client/src'),
  dist: path.join(__dirname, 'client/dist'),
  css: path.join(__dirname, 'client/dist/css')
}
