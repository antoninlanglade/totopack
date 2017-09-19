const net = require('net')
const DEFAULT_START_PORT = 2000
const DEFAULT_MAX_PORT = 65535

function getPort (s, e) {
  return new Promise((resolve, reject) => {
    const start = s !== undefined ? (s | 0) : DEFAULT_START_PORT
    const end = e !== undefined ? (e | 0) : DEFAULT_MAX_PORT

    getNextPort(start)

    function getNextPort (port) {
      if (port >= end) return reject(new Error('No ports found'))
      const c = net.connect(port, () => {
        c.destroy()
        getNextPort(port + 1)
      })
      c.on('error', () => {
        resolve(port)
      })
    }
  })
}

module.exports = getPort