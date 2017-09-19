// Paths node
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = require(path.join(__dirname, '/config/paths'));

// npm lunch script (build | start ...)
const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

// Default configuration
module.exports = function (globalConfig) {
  return {
    entry: [
      'whatwg-fetch',
      PATHS.app + '/index.js'
    ],
    output: {
      path: PATHS.app,
      filename: '[name].js',
      chunkFilename: '[name].chunk.js'
    },
    module: {
      rules: [
        // Babel transpiler
        {
          test: /\.(js|jsx)$/,
          loaders: 'babel-loader',
          options: {
            cacheDirectory: true
          },
          include: PATHS.app
        },
        // File Loader
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          loader: 'file-loader',
          options: {
            limit: 1
          }
        },

        {
          test: /\.handlebars$/,
          loader: 'handlebars-loader'
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        }
      ]
    },
    plugins: [
      // Custome Index.html
      new HtmlWebpackPlugin(globalConfig.HTML_WEBPACK_PLUGIN_CONFIG)
    ],
    resolve: {
      // Alias for paths
      alias: {
        app: PATHS.app,
        assets: PATHS.assets,
        components: PATHS.components,
        abstract: PATHS.abstract,
        config: PATHS.config,
        tools: PATHS.tools,
        utils: PATHS.utils,
        signal: PATHS.signal
      }
    }
  };
}
