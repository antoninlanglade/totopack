# php-middleware
Simple php connect-like middleware using the php built-in server

<br><br>

:warning: __This is experimental and only tested on OSX__ :warning:

<br><br>

### Examples

##### Usage with express
```js
const express = require('express')
const phpMiddleware = require('php-server-middleware')

const app = express()

app.use('/', phpMiddleware())
app.listen(3000)

```

<br><br>

### API Usage
#### `const middleware = phpMiddleware([options])`
Return a connect-like middleware function and auto-start the php server used by the middleware.

#### Options
##### `host` (String)
* Default: `'127.0.0.1'`
* The host the php server will listen on
* There is an issue between `node-proxy` and the built-in php server when php serves from `localhost`. To fix this, `localhost' will be proxy as `[::1]`. Note that it can break host/port rewriting in headers/body response.

##### `port` (Number)
* Default: `'35410'`
* The base port to use for the php server

##### `root` (String)
* Default: `process.cwd()`
* The document root of the php server

##### `headersRewrite` (Boolean)
* Default: `true`
* Rewrites the location host/port on (301/302/307/308) redirects based on requested host/port.

##### `bodyRewrite` (Boolean)
* Default: `true`
* Replace all `proxyHost:proxyPort` by `requestedHost:requestedPort` from the response body
* Works only for these MIME-types:
    - text/html
    - text/css
    - text/xml
    - text/javascript
    - application/javascript
    - application/json

##### `headers` (Object)
* Default: `{}`
* Adds request headers

##### `handle404` (Boolean)
* Default: `true`
* Let php handle not-found filepaths

##### `proxyOpts` (Object)
* Default: `{}`
* [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) options

##### `phpOpts` (Object)
* Default: `{}`
* [@pqml/node-php-server](https://github.com/pqml/node-php-server) options

##### `verbose` (Boolean)
* Default: `false`
* Log additional informations

##### `quiet` (Boolean)
* Default: `false`
* If true, don't write anything to the console

##### `onStart` (Function)
* Default: `function () {}`
* The onStart function will be called when the php built-in server is ready.

##### `bin` (String)
* Default: `php`
* Absolute Path / Alias to the php binary

##### `promptBinary` (Boolean)
* Default: `false`
* If set to true and php isn't found, the middleware will ask the user a path/alias to a php binary
* Be careful to not have other log during the middleware setup when using this. You can use the `onStart` options to wait for the middleware to be ready before logging anything else
