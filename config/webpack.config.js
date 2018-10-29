const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PATHS = require('./paths')
const {IS_DEV} = require('./env')
const getLocales = require(path.join(PATHS.scripts, 'locales'));
const JS_ENTRY = path.resolve(PATHS.src, 'index.js')
const Visualizer = require('webpack-visualizer-plugin')

const dev = {
  entry: [
    JS_ENTRY,
    'webpack-dev-server/client?http://localhost:3000/',
    'webpack/hot/dev-server'
  ],
  mode: 'development',
  devtool: 'eval-source-map',
  rules: [],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

const prod = {
  entry: [JS_ENTRY],
  mode: 'production',
  devtool: 'source-map',
  rules: [],
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new Visualizer()
  ]
}

const current = IS_DEV ? dev : prod

const config = {
  entry: current.entry,
  mode: current.mode,
  devtool: current.devtool,
  output: {
    path: PATHS.build,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: [PATHS.nodeModules],
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        loader: 'file-loader',
        options: {
          limit: 1,
          name: 'assets/[name].[ext]'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ].concat(current.rules)
  },
  resolve: {
    modules: [PATHS.config, PATHS.src, PATHS.assets, PATHS.nodeModules]
  },
  target: 'web',
  stats: 'errors-only',
  plugins: [].concat(current.plugins)
}

module.exports = async function () {
  const params = {
    minify: { minifyCSS: true },
    inject: false,
    template: path.resolve(PATHS.src, 'index.hbs')
  }

  const locales = await getLocales()
  params.window = { locales, isDev: IS_DEV, path: '/' }

  if (!IS_DEV) {
    const argv = process.argv.slice(2)
    params.window['path'] = argv[0]
  }

  config.plugins.push(
    new HtmlWebpackPlugin(params)
  )
  return config
}
