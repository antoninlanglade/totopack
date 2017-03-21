const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./../webpack.config');
const fs = require("fs");

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path');

const PATHS = require(path.join(__dirname + '/../config/paths'));

const TinyImage = require('./tiny-image');

TinyImage();



var compiler = webpack(webpackConfig);

var server = new WebpackDevServer(compiler, {
  contentBase: PATHS.assets,
  hot: true,
  historyApiFallback: false,
  compress: true,
  clientLogLevel: "info",
  stats: { colors: true }
});
server.listen(8080, "localhost", function() {});

// server.close();