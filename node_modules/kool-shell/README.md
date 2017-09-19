# kool-shell
#### :microphone::tv::notes: A minimal module to deal with shell
[![Build Status](https://ci.appveyor.com/api/projects/status/blsw86geesww5453?svg=true)](https://ci.appveyor.com/project/pqml/kool-shell)
[![Build Status](https://secure.travis-ci.org/pqml/kool-shell.svg)](https://travis-ci.org/pqml/kool-shell)

<br>

![Spinner](https://cloud.githubusercontent.com/assets/2837959/24589402/ecdd7626-17d9-11e7-92f3-4b993be13f78.gif)


<br>

## Features

* 1 dependency (support-color)
* Native promises from Nodejs
* Shell commands with silent & inherited stdio
* Ansi Colors + Auto-detects color support
* Log methods with 4 log levels
* User input with hidden input option
* List input with multiple or single choice
* Awesome emoji-based spinner
* Progressbar
* Create and add your own kool-shell plugins easily
* Cool emojis!

<br>

## Requirements
* Node > 4
* npm > 2
* ANSI/VT100 compatible terminal

<br>

## Installation

```sh
npm install --save kool-shell
```

<br>

## Usage

kool-shell does nothing by itself; you need to add plugins to it. I did this to make kool-shell easy to test and improve, and for possible project-specific features.

#### Create a new kool-shell instance
```js
const koolShell = require('kool-shell')
const sh = koolShell()
```

#### Add a plugin with `sh.use(plugin, [options])`
You can specify options for your plugin.

```js
const koolLog = require('kool-shell/plugins/log')
sh.use(koolLog, { colors: false })
```

<br>

## Plugins Usage

#### Native plugins documentation

* [kool-shell/plugins/exec](docs/plugins/exec.md) - _Execute a promised shell command_
* [kool-shell/plugins/input](docs/plugins/input.md) - _User prompt with hidden input option_
* [kool-shell/plugins/select](docs/plugins/select.md) - _Select/Radio input_
* [kool-shell/plugins/log](docs/plugins/log.md) - _Log functions_
* [kool-shell/plugins/cleanup](docs/plugins/cleanup.md) - _Do some actions before exiting your app_
* [kool-shell/plugins/exit](docs/plugins/exit.md) - _Simple alias of `process.exit(code)`_
* [kool-shell/plugins/progressbar](docs/plugins/progressbar.md) - _Display a cool progressbar_
* [kool-shell/plugins/spinner](docs/plugins/spinner.md) - _Display a cool spinner_

<br>

#### Where are the native plugins?

Native plugins are in `kool-shell/plugins`. <br>
Example for require one:
```js
const koolExec = require('kool-shell/plugins/exec')
```

<br>

#### Create a kool-shell plugin

###### Template
```javascript
module.exports = myPlugin (sh, opts) {
  var api = {
    sayHello
  }

  return api

  function sayHello() {
    console.log('hello.')
  }
}

```

Two arguments will be passed when your plugin is used trough `sh.use()`:
* `sh` is the kool-shell instance used
* `opts` is the options object passed trough `sh.use(plugin, options)`

<br>

__Your plugin need to return an object.__ When your plugin is used, the returned object will be merged into the api object of the kool-shell instance.

> :warning:  Method/Property will be overiden if a new one has the same name. Namespace your plugin api if you use common method names

<br>

## To do
- Test all native plugins

<br>

## License
MIT.
