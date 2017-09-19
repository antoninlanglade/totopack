'use strict'

function def (n) { return (typeof n !== 'number') ? 1 : n }

const ESC = '\u001b'
const s = process.stdout

const codes = {
  show () { return ESC + '[?25h' },
  hide () { return ESC + '[?25l' },
  clearLine () { return ESC + '[2K' },
  column (n) { return ESC + '[' + (n | 0) + 'G' },
  pos (r, c) { return ESC + '[' + (r | 0) + ';' + (c | 0) + 'H' },
  up (n) { return ESC + '[' + def(n) + 'A' },
  down (n) { return ESC + '[' + def(n) + 'B' },
  right (n) { return ESC + '[' + def(n) + 'C' },
  left (n) { return ESC + '[' + def(n) + 'D' },
  nextLine (n) { return ESC + '[' + def(n) + 'E' },
  prevLine (n) { return ESC + '[' + def(n) + 'F' }
}

const cursor = {
  show () {
    s.write(codes.show())
  },
  hide () {
    s.write(codes.hide())
  },
  clearLine () {
    s.write(codes.clearLine())
  },
  pos (x, y) {
    if (y === undefined) s.write(codes.column(x))
    else s.write(codes.pos(y, x))
  },
  up (n) {
    s.write(codes.up(n))
  },
  down (n) {
    s.write(codes.down(n))
  },
  left (n) {
    s.write(codes.left(n))
  },
  right (n) {
    s.write(codes.right(n))
  },
  nextLine (n) {
    s.write(codes.nextLine(n))
  },
  prevLine (n) {
    s.write(codes.prevLine(n))
  },
  // !!! these two are unsafe.
  save () {
    // ESC + 7 is a patch for terminal.app
    s.write(ESC + '[s' + ESC + '7')
  },
  restore () {
    // ESC + 8 is a patch for terminal.app
    s.write(ESC + '[u' + ESC + '8')
  }
}

module.exports = cursor
