'use strict'

const koolShell = require('..')
const koolBar = require('../plugins/progressbar')
const koolLog = require('../plugins/log')

const sh = koolShell()
  .use(koolLog)
  .use(koolBar)

const UPDATE_SPEED = 200
const pb = sh.progressBar({
  onComplete (bar) {
    bar.pause()
    sh.success('Done!')
  }
})

let progress = 0
pb.resume()
setTimeout(updateBar, UPDATE_SPEED)

function updateBar () {
  if (progress <= 1) {
    progress += 0.05
    pb.set(progress)
    setTimeout(updateBar, UPDATE_SPEED)
  }
}
