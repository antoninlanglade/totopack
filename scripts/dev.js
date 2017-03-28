const webpack = require('webpack');
const fs = require("fs");
const path = require('path');
const merge = require('webpack-merge');
const phpMiddleware = require('php-server-middleware')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDevServer = require('webpack-dev-server');
const PATHS = require(path.join(__dirname + '/../config/paths'));
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// Configs
const webpackConfig = require('./../webpack.config');
let globalConfig = require(PATHS.config + '/global');
const DEV_CONFIG = require(PATHS.config + '/dev');

// Scripts
const tinyImage = require('./tiny-image');
const getLocales = require(path.join(PATHS.scripts, 'locales'));

let compiler, server;

launchServer = () => {
  return new Promise((resolve, reject) => {
    server = new WebpackDevServer(compiler, {
      contentBase: PATHS.assets,
      historyApiFallback: true,
      compress: true,
      clientLogLevel: "info",
      setup: function (app) {
        app.use('/api/', phpMiddleware({
          root: PATHS.assets,
          handle404: true,
          bodyRewrite: true,
          headersRewrite: true
        }));
      },
      stats: { colors: true }
    });
    server.listen(8080, "localhost", resolve);
    // server.close();
  });
}

tinyImage()
  .then(getLocales)
  .then((locales) => {
    globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.window.locales = locales;
    compiler = webpack(merge(DEV_CONFIG(globalConfig), webpackConfig(globalConfig)));
  })
  .then(launchServer)



