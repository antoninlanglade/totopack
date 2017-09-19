const DEF_OPTS = {
  interval: 3000,
  maxRetries: 5
}

function callStable (fn, unstableFn, opts) {
  opts = Object.assign({}, DEF_OPTS, opts || {})
  let lastNow = 0
  let retries = 0

  return newCall

  function newCall (force) {
    const now = Date.now()
    retries = (now - lastNow) <= opts.interval ? retries + 1 : 0
    lastNow = now
    if (retries >= opts.maxRetries && !force) return unstableFn()
    else return fn()
  }
}

module.exports = callStable