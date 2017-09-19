# Spinner plugin

![Spinner](https://cloud.githubusercontent.com/assets/2837959/24589402/ecdd7626-17d9-11e7-92f3-4b993be13f78.gif)

### Features
  * Spin the clock while logging stuff
  * Easily customizable (title, framerate, animation...)
  * Clear the screen (or not) on complete

### Example
```javascript
const koolShell = require('kool-shell')
const koolSpinner = require('kool-shell/plugins/spinner')

const sh = koolShell().use(koolSpinner)
const spinner = sh.spinner({
  title: 'Please wait, processing : %s'
})

spinner.resume()
spinner.log('something to log')
spinner.log('something else to log')
...
spinner.pause(true)
```

### Plugin options
* `title` _(String, default '%s')_: Set the message of the spinner, `%s` being a placholder for any subsequent log
* `delay` _(int, default 100)_: Delay between each frame of the spining animation
* `frame` _(String[], default [:clock1:, ... :clock12:])_: The frames of the spinning animation

### Usage

#### `const spinner = sh.spinner([opts])`
Return a new spinner instance

* `spinner.resume()`
    - Start spinning

* `spinner.log(message)`
    - Log a message in `%s`

* `spinner.pause(clear = false)`
    - Stop spinning
    - if `clear` is true, clean the screen
