const webpack           = require('webpack');
const path              = require('path');
const nodeExternals     = require('webpack-node-externals');

var nodeModulesPath     = path.resolve(__dirname, 'node_modules');
var buildPath           = path.resolve(__dirname, 'build');
var clientApp           = path.resolve(__dirname, 'client', 'client.js');

var loaders             = require('./webpack.loaders');
var webpackCopyFiles    = require('./webpack.files');

var config = {
  name: 'bart-watch-client',
  devtool: 'source-map',

  entry: {
    client: clientApp,
  },

  output: {
    path: buildPath,
    filename: "[name].js"
  },

  externals: [],

  plugins: [
    webpackCopyFiles,
  ],

  module: { loaders },
};

module.exports = config;