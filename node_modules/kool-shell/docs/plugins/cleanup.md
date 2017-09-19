# Cleanup plugin

### Features
  * The cleanup plugin is an event emitted when the process is exiting
  * Execute functions just before the process exits
  * :warning: Functions can't be asynchronous

### Example
```javascript
const koolShell = require('kool-shell')
const koolCleanup = require('kool-shell/plugins/cleanup')

const sh = koolShels().use(koolCleanup)

function cleanupAction(code) {
  if (code === 0) console.log('App is exiting without an error, cool!')
}

// Add a new function to call when exiting
sh.on('cleanup', cleanupAction)

// Remove cleanupAction from the functions to call when exiting
sh.removeListener('cleanup', cleanupAction)


```

### Usage

Just listen to the `cleanup` event with `sh.on('cleanup', callback)`.
<br>
[More infos about event emitters in Nodejs](https://nodejs.org/api/events.html)