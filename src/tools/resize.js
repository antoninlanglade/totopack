import globals from 'store/globals'

function resize (e) {
  globals.size.set({ w: window.innerWidth, h: window.innerHeight })
}

function listen () {
  window.addEventListener('resize', resize)
  resize()
}

function use () {
  listen()
  return Promise.resolve()
}

function unlisten () {
  window.removeEventListener('resize', resize)
}

export default {
  unlisten,
  resize,
  use
}
