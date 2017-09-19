# Exec plugin

### Features
  * Execute a promised shell commands with arguments and options
  * The child process inherits from process.stdin / process.stdout by default
  * You can also choose to mute the child process

### Example
```javascript
const koolShell = require('kool-shell')
const koolExec = require('kool-shell/plugins/exec')

const sh = koolShell().use(koolExec)

// Execute the `npm init` command
sh.exec('npm', ['init'])
```

### Usage

#### sh.exec(command, [arguments], [options])
Execute the `command` with its `arguments`. The return value is a promise. <br>
The promise will be resolve when the child process started by `sh.exec()` has exit. <br>
The promise will be rejected if the child process is closed with an error code or a SIGINT / SIGTERM / SIGHUP signal <br>
The return value through resolve / reject is an object containing `stdout`, `stderr`, `code` and `signal`


* `command` _(String)_: The command to run
* `arguments` _(Array)_: List of arguments of your command
* `options` _(Object)_
    - `silent` _(Boolean, default false)_: don't output/input anything on the console. The promise will return the output of the command when resolving.
    - `inherit`: _(Boolean, default false)_: inherit stdout and stderr streams from `process.stdout` and `process.stderr` instead of piping to them. stdin always inherits from `process.stdin` except if you set `options.silent` to true.
    - `trim`: _(Boolean, default true)_: if true, trim stdout and stderr string responses
    - All others options are [the options of child_process.spawn()](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)

#### sh.silentExec(command, [arguments], [options])
  - Alias of `sh.exec(command, arguments, { silent: true, inherit: false })`