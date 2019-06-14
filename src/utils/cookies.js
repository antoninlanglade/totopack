import Router from 'abstract/router/Router'
import globals from 'store/globals'
if (typeof window !== 'undefined') var cookies = require('browser-cookies')

class CookieAbstraction {
  constructor (key) {
    this.key = key
  }
  get = () => cookies ? cookies.get(this.key) : true
  set = (val, opts = {}) => cookies && cookies.set(this.key, val, opts)
  erase = () => cookies && cookies.erase(this.key)
}

const performance = new CookieAbstraction('cookie-performance')
const functional = new CookieAbstraction('cookie-functional')
const ga = new CookieAbstraction('_ga')

// function routeChangeStart (route) {
//   if (route === '/cookies') return
//   setCookies(false, true)
// }

function setCookies (func, perf) {
  // if (isListening) {
  //   Router.off('change', routeChangeStart)
  //   isListening = false
  // }
  globals.ga.set(perf)

  if (func) {
    functional.set('1')
    performance.set(perf ? '1' : '0')
  } else {
    functional.erase()
    performance.erase()
  }
}

function getGAExpire () {
  return getExpirationDateGA(ga.get())
}

function getExpirationDateGA (ga) {
  const secExpire = 60 * 60 * 24 * 30 * 13 * 1000
  try {
    const gaCreate = (Number(ga.split('.').pop())) * 1000
    const t = new Date().getTime()
    const t0 = new Date(gaCreate).getTime()
    const t1 = t0 + secExpire
    const tDiff = Math.round((t1 - t) / 1000)
    return tDiff
  } catch (e) {
    return secExpire / 1000
  }
}

// let isListening = true

if (performance.get() === '1') {
  globals.ga.set(true)
}
// } else if (performance.get() !== '1' && performance.get() !== '0') {
  // Router.on('change', routeChangeStart)
// }

export {
  setCookies,
  performance,
  functional,
  getGAExpire
}
