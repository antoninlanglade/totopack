const webpack = require('webpack');
const fs = require("fs");
const path = require('path');
const merge = require('webpack-merge');
const phpMiddleware = require('php-server-middleware')
// Inject bundle.js / vendor.js / manifest.js into index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');

const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./../webpack.config');
const PATHS = require(path.join(__dirname + '/../config/paths'));
let globalConfig = require(PATHS.config + '/global');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const DEV_CONFIG = require(PATHS.config + '/dev');

const tinyImage = require('./tiny-image');

tinyImage();

var compiler = webpack(merge(webpackConfig(globalConfig), DEV_CONFIG(globalConfig)));

var server = new WebpackDevServer(compiler, {
  contentBase: PATHS.assets,
  hot: true,
  historyApiFallback: true,
  compress: true,
  clientLogLevel: "info",
  setup: function (app) {
    /*app.use('/api/', phpMiddleware({
      root: PATHS.assets,
      handle404: true,
      bodyRewrite: true,
      headersRewrite: true
    }));*/
  },
  stats: { colors: true }
});
server.listen(8080, "localhost", function() {});

// server.close();