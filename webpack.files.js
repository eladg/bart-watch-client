var CopyWebpackPlugin = require('copy-webpack-plugin');

const files = new CopyWebpackPlugin([
  { from: 'static' },
  { from: 'client/mapThree/assets', to: "assets"},
]);

module.exports = files;