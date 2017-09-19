# Log plugin

### Features
  * Log infos to the console
  * 4 differents log levels: debug, info, warning, error/success
  * Prefix option to add emoji or colors to the different log levels
  * Chainable log functions

### Example
```javascript
const koolShell = require('kool-shell')
const koolLog = require('kool-shell/plugins/log')

const sh = koolShell().use(koolLog, {
  level: 'debug'
})

sh.info('Displaying an info', 'Another info')
  .success('It works! You can chain log messages')
```

### Plugin options
* `level` _(String, default 'info')_: Set the minimum message level to be display in the console. `level` have to be `debug`, `info`, `warn`, or `error`
* `quiet` _(Boolean, default false)_: If set to true, don't log anything to the console
* `color` _(Boolean, default false)_: If set to false, disable full-color log messages
* `debugPrefix` _(String)_: Value added before a debug message
* `infoPrefix` _(String)_: Value added before an info message
* `warnPrefix` _(String)_: Value added before a warning message
* `errorPrefix` _(String)_: Value added before an error message
* `successPrefix` _(String)_: Value added before a success message

### Usage

#### `sh.colors[color](message)`
This is basicaly a minimal `chalk` module. <br>
Prepend and append _color_ open/close tags to your _message_ and return the string. <br>
Available colors are : <br>
```
black, red, green, yellow, blue, magenta, cyan, white, gray
bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite
```


#### `sh.colors.openTag[color]`
Return the escape sequence for the _color_ open tag. <br>

#### `sh.colors.closeTag[color]`
Return the escape sequence for the _color_ close tag. <br>

#### `sh.debug(...msg)`
Write a debug message to process.stdout. <br>
If the plugin options `color` is set to true, the messages will be in gray. <br>
Return the kool shell api.

#### `sh.info(...msg)` or `sh.log(...msg)`
Write an info message to process.stdout. <br>
Return the kool shell api.

#### `sh.warn(...msg)`
Write a warning message to process.stdout. <br>
If the plugin options `color` is set to true, the messages will be in yellow. <br>
Return the kool shell api.

#### `sh.error(...msg)`
Write an error to process.stdout. <br>
If the plugin options `color` is set to true, the messages will be in red. <br>
Return the kool shell api.

#### `sh.success(...msg)`
Write a success message to process.stdout. <br>
If the plugin options `color` is set to true, the messages will be in green. <br>
Return the kool shell api.

#### `sh.step(currentStep, total, message)`
Log `[ currentStep / total ] message`.