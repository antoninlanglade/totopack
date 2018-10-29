const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server');
const path = require('path')
const PATHS = require('../config/paths')
const webpackConf = require(path.resolve(PATHS.config, 'webpack.config.js'))

const launchServer = (compiler) => {
  return new Promise((resolve, reject) => {
    let server = new WebpackDevServer(compiler, {
      contentBase: PATHS.assets,
      historyApiFallback: true,
      compress: true,
      clientLogLevel: 'warning',
      hot: true,
      inline: true,
      stats: { colors: true },
      publicPath: '/'
    })

    server.listen(3000, '0.0.0.0', () => {
      console.log(`🖥  Dev server launched`)
      resolve()
    });
  });
}

const dev = async () => {
  const conf = await webpackConf()
  const compiler = webpack(conf)
  await launchServer(compiler)
}

dev()
