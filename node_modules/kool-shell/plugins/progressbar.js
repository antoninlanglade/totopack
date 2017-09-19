'use strict'

const colors = require('../utils/colors')
const cursor = require('../utils/cursor')

const defOpts = {
  showPercents: true,
  clearOnPause: true,
  width: 20,
  emptySymbol: colors.gray('░'),
  fillSymbol: '▓'
}

function allocateLines () {
  process.stdout.write('\n')
}

function progressBarPlugin (sh) {
  const api = {
    progressBar: progressBar
  }

  return api

  function progressBar (opts) {
    opts = Object.assign({}, defOpts, opts || {})
    let progress = 0
    let resumed = false

    const api = {
      set: set,
      resume: resume,
      pause: pause
    }

    return api

    function pause () {
      if (opts.clearOnPause && resumed) {
        cursor.prevLine()
        cursor.clearLine()
      }
      resumed = false
    }

    function resume () {
      allocateLines()
      resumed = true
      render()
    }

    function set (newProgress, message) {
      progress = Math.max(0, Math.min(1, newProgress))
      render(message)
      if (progress >= 1 && typeof opts.onComplete === 'function') {
        opts.onComplete(api)
      }
      return api
    }

    function render (message) {
      if (!resumed) return
      message = message ? ' - ' + colors.gray(message) : ''
      let bar = ''
      let filledChars = Math.floor(progress * opts.width)
      let percents = opts.showPercents
        ? colors.gray(' ' + Math.floor(progress * 100) + '%')
        : ''
      for (let i = 0; i < opts.width; i++) {
        bar += (i <= filledChars)
          ? opts.fillSymbol
          : opts.emptySymbol
      }
      const out = bar + percents + message
      cursor.prevLine()
      cursor.clearLine()
      process.stdout.write(out)
      cursor.nextLine()
    }
  }
}

module.exports = progressBarPlugin
