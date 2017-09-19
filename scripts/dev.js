const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const phpMiddleware = require('php-server-middleware')
const WebpackDevServer = require('webpack-dev-server');
const PATHS = require(path.join(__dirname, '/../config/paths'));

// Configs
const webpackConfig = require('./../webpack.config');
let globalConfig = require(PATHS.config + '/global');
const DEV_CONFIG = require(PATHS.config + '/dev');
const config = require(path.join(PATHS.config, '/config'));

// Scripts
const getLocales = require(path.join(PATHS.scripts, 'locales'));

let compiler, server;

const launchServer = () => {
  return new Promise((resolve, reject) => {
    server = new WebpackDevServer(compiler, {
      contentBase: PATHS.assets,
      historyApiFallback: true,
      compress: true,
      clientLogLevel: 'info',
      disableHostCheck: true,
      stats: { colors: true }
    });

    server.listen(8080, '0.0.0.0', resolve);
    // server.close();
  });
}
Promise.resolve()
  .then(getLocales)
  .then((locales) => {
    globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.window.locales = locales;
    globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.window.isDev = true;
    globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.window.conf = config.dev;

    compiler = webpack(merge(DEV_CONFIG(globalConfig), webpackConfig(globalConfig)));
  })
  .then(launchServer)
