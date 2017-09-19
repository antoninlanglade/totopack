'use strict'

function exitPlugin (sh) {
  const api = {
    exit
  }

  return api

  function exit (code) {
    code = code !== undefined ? code : 0
    process.exit(code)
  }
}

module.exports = exitPlugin
