const webpack           = require('webpack');
const path              = require('path');
const nodeExternals     = require('webpack-node-externals');

var nodeModulesPath     = path.resolve(__dirname, 'node_modules');
var buildPath           = path.resolve(__dirname, 'build');
var clientApp           = path.resolve(__dirname, 'client', 'client.js');

var loaders             = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');

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
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, 'client', 'assets', 'index.html') }]),
  ],

  module: { loaders },
};

module.exports = config;