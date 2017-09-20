const webpack = require('webpack');
const webpackConfig = require('./../webpack.config');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const merge = require('webpack-merge');
const argv = process.argv.slice(2);
const path = require('path');

// Config files
const PATHS = require(path.join(__dirname, '/../config/paths'));
const BUILD_CONFIG = require(path.join(PATHS.config, '/build'));
let globalConfig = require(path.join(PATHS.config, '/global'));
const config = require(path.join(PATHS.config, '/config'));

// Scripts
const getLocales = require(path.join(PATHS.scripts, 'locales'));

// Variables
let compiler;

const launchCompiler = () => {
  return new Promise((resolve, reject) => {
    compiler.apply(new ProgressBarPlugin());
    compiler.run((err, stats) => {
      if (err) {
        reject(new Error(err));
      } else resolve();
    });
  });
}

Promise.resolve()
  .then(getLocales)
  .then((locales) => {
    globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.window.locales = locales;
    globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.window.isDev = false;

    if (process.env.NODE_ENV === 'production' && !process.env.APP_ENV) {
      globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.window.conf = config.prod;
    } else if (process.env.NODE_ENV === 'production' && process.env.APP_ENV === 'preproduction') {
      globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.window.conf = config.prep;
    }

    if (argv[0]) {
      globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.publicPath = argv[0];
      globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.window.path = argv[0];
    }

    compiler = webpack(
                merge(
                  webpackConfig(globalConfig),
                  BUILD_CONFIG(globalConfig)
                )
              );
  })
  .then(launchCompiler);
