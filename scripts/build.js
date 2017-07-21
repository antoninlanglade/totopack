const webpack = require('webpack');
const webpackConfig = require('./../webpack.config');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const merge = require('webpack-merge');
const argv = process.argv.slice(2);
const path = require('path');

// Config files
const PATHS = require(path.join(__dirname + '/../config/paths'));
const BUILD_CONFIG = require(PATHS.config + '/build');
let globalConfig = require(PATHS.config+'/global');

// Scripts
const tinyImage = require('./tiny-image');
const getLocales = require(path.join(PATHS.scripts, 'locales'));

// Variables
let compiler;

launchDevServer = () => {
  return new Promise((resolve, reject) => {
    compiler.apply(new ProgressBarPlugin());
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      }
      else resolve();
    });
  });
}

// launch lazy images compression
tinyImage()
  .then(getLocales)
  .then((locales) => {
    globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.window.locales = locales;
    globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.window.isDev = false;

    if (argv[0]) {
      globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.publicPath = argv[0];
      globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.window.path = argv[0];
    }

    compiler = webpack(merge(webpackConfig(globalConfig), BUILD_CONFIG(globalConfig)));
  })
  .then(launchDevServer);

