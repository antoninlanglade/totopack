# ProgressBar plugin

### Features
  * Display progress in a fancy way
  * Easily customizable (width, fill/empty symbols, percents)
  * Clear the bar on complete


### Example
```javascript
const koolShell = require('kool-shell')
const koolBar = require('kool-shell/plugins/progressbar')

const sh = koolShell().use(koolBar)

const bar = sh.progressBar({
    // stop rendering and remove the bar when filled
    onComplete(bar) {
        bar.pause()
        console.log('Done!')
    }
})

// display the bar
bar.resume()

// update progress (0: empty / 1: filled)
bar.set(0)
setTimeout(() => bar.set(0.4), 1000)
setTimeout(() => bar.set(0.8), 2000)
setTimeout(() => bar.set(1),   3000)

```

### Usage

#### `const progressBar = sh.progressBar([opts])`
Return a new progressBar instance

#### Options
* `showPercents` _(Boolean, default true):_ show or hide progress percentage
* `clearOnPause` _(Boolean, default true):_ The bar will be cleared once `pause()` is called
* `width` _(Number, default 20) :_ Set the width of the bar, in chars
* `emptySymbol` _(String, default `░`)_: Symbol used for the empty bar portion
* `fillSymbol` _(String, default `▓`)_: Symbol used for the filled bar portion
* `onComplete` _(Function)_: Function called when the bar is entirely filled

#### Methods

#### `const progressBar = sh.progressBar([opts])`
Return a new progressBar instance

* `progressBar.set(progress)`
    - Set the progress, from 0 (empty) to 1 (filled)
    - You can set a value without calling `resume()`. The bar will update its progress without being displayed in the terminal.

* `progressBar.resume()`
    - Start rendering the bar
    - Do not write in process.stdout when the bar is rendering, it will cause visual glitches.

* `progressBar.pause()`
    - Stop rendering the bar
    - if `clearOnPause` option is set to true, the bar will be removed from the terminal
