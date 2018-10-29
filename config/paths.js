const path = require('path');

module.exports = {
  config: __dirname,
  root: path.join(__dirname, '../'),
  src: path.join(__dirname, '../src'),
  build: path.join(__dirname, '../build'),
  assets: path.join(__dirname, '../assets'),
  nodeModules: path.join(__dirname, '../node_modules'),
  scripts: path.join(__dirname, '../scripts')
}
