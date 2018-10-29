const webpack = require('webpack')
const path = require('path')
const fs = require('fs-extra')
const PATHS = require('../config/paths')

const webpackConf = require(path.resolve(PATHS.config, 'webpack.config.js'))

let compiler

const getConf = async () => {
  const conf = await webpackConf()
  compiler = webpack(conf)
}

const runCompiler = () => new Promise(resolve => {
  compiler.run((err, stats) => resolve([err, stats]))
})

const build = async () => {
  await fs.remove(PATHS.build)
  await fs.copy(PATHS.assets, PATHS.build)
  await getConf()
  const [err, stats] = await runCompiler()

  if (err || stats.compilation.errors.length > 0) {
    const errs = stats.compilation.errors.concat(err)
    console.log(`❌ Error during build`)
    console.log(errs)
    return
  }

  const d = stats.endTime - stats.startTime
  const sec = d / 1000
  console.log(`✅ Bundled in ${sec}s.`)
}

build()
