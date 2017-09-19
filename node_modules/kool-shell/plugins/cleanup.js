'use strict'

function cleanupPlugin (sh) {
  const api = {}

  if (typeof sh.emit === 'function') {
    process.on('SIGINT', exitHandler.bind(null, { exit: 0 }))
    process.on('uncaughtException', exitHandler.bind(null, { exit: 1 }))
    process.on('exit', (code) => { sh.emit('cleanup', code) })
  }

  return api

  function exitHandler (exitOpts) {
    exitOpts = exitOpts || {}
    if (exitOpts.exit !== undefined) process.exit(exitOpts.exit)
  }
}

module.exports = cleanupPlugin
