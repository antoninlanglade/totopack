const fs = require('fs')
const url = require('url')
const path = require('path')

const proxy = require('http-proxy-middleware')
const php = require('@pqml/node-php-server')


const WRITEABLE_MIME_TYPES = [
  'text/html',
  'text/css',
  'text/xml',
  'text/javascript',
  'application/javascript',
  'application/json'
]

const PHP_EXTS = ['.php', '.php5']

const DEF_OPTS = {
  host: '127.0.0.1',
  port: 35410,
  root: process.cwd(),
  verbose: false,
  headersRewrite: true,
  bodyRewrite: true,
  handle404: true,
  proxyOpts: {},
  phpOpts: {},
  autorestart: true,
  headers: {},
  bin: 'php',
  promptBinary: false,
  onStart() {}
}

function createMiddleware (opts) {
  opts = Object.assign({}, DEF_OPTS, opts || {})

  let proxyAddr = ''
  let proxyMiddleware = null
  const serv = php(Object.assign({}, opts, opts.phpOpts))
  serv.middleware = middleware

  serv.on('start', ({host, port}) => {
    proxyAddr = (host === 'localhost' ? '[::1]' : host) + ':' + port
    proxyMiddleware = proxy(Object.assign({
      target: 'http://' + proxyAddr,
      logLevel: opts.verbose ? 'info' : 'silent',
      autoRewrite: opts.headersRewrite,
      changeOrigin: true,
      headers: opts.headers
    }, opts.proxyOpts))
    opts.onStart()
  })

  serv.on('error', (data) => {})

  serv.start()

  return middleware

  function handle (req, res, next) {
    if (opts.bodyRewrite) {
      const _write = res.write
      res.write = function (data) {
        let contentType = res.getHeader('content-type')
        if (!contentType) return _write.call(res, data)
        contentType = contentType.trim().split(';')[0] || ''
        if (WRITEABLE_MIME_TYPES.indexOf(contentType) !== -1) {
          _write.call(res, data.toString()
            .split(proxyAddr)
            .join(req.headers.host))
        } else {
          _write.call(res, data)
        }
      }
    }
    proxyMiddleware(req, res, next)
  }

  function middleware (req, res, next) {
    // if not starter we pass to the next middleware without waiting
    if (!proxyMiddleware) return next()

    let pathname = url.parse(req.url).pathname
    const filepath = path.join(opts.root, pathname)

    fs.stat(filepath, (err, stats) => {
      // the file does not exist
      if (err) {
        if (opts.handle404) {
          return handle(req, res, next)
        } else {
          return next()
        }
      }
      // if it's a directory, check for index.php
      if (stats.isDirectory()) {
        fs.stat(path.join(filepath, 'index.php'), (err, stats) => {
          if (err || !stats.isFile()) return next()
          return handle(req, res, next)
        })
      // if it's a file, check for if it's a php file
      } else if (stats.isFile()) {
        const ext = path.extname(pathname)
        if (PHP_EXTS.indexOf(ext) === -1) return next()
        return handle(req, res, next)
      } else {
        return next()
      }
    })
  }
}

module.exports = createMiddleware
