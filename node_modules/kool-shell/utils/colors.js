const supportsColor = require('supports-color')

const colorCodes = {
  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],
  reset: [0, 0],
  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29]
}

let colors = {
  openTag: {},
  closeTag: {},
  disable () {
    refreshColorTags(false)
  },
  enable () {
    refreshColorTags(supportsColor)
  }
}

refreshColorTags(supportsColor)
for (let color in colorCodes) {
  colors[color] = function (s) {
    return colors.openTag[color] + s + colors.closeTag[color]
  }
}

function refreshColorTags (active) {
  for (let color in colorCodes) {
    colors.openTag[color] = (active)
      ? '\u001b[' + colorCodes[color][0] + 'm'
      : ''
    colors.closeTag[color] = (active)
      ? '\u001b[' + colorCodes[color][1] + 'm'
      : ''
  }
}

module.exports = colors
