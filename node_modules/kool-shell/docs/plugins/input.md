# Input plugin

### Features
  * Prompt / Ask a question to the user
  * Hide the input characters for sensible infos

### Example
```javascript
const koolShell = require('kool-shell')
const koolInput = require('kool-shell/plugins/exec')

const sh = koolShell().use(koolInput)

function yesNoQuestion(answer) {
  return answer === '' || answer.match(^y(es)?$/i)
}

sh.input('Do you like omelette du fromage? (Yes)', { 
    onSubmit: yesNoQuestion 
  })
  .then(omeletteLover => {
    if (omeletteLover) console.log('Nice. I like it too.')
  })
```

### Usage

#### sh.input(label, [options])
Ask `label` to the user. <br>
Resume the process.stdin input stream and wait for the user answer. <br>
Return a promise that will be resolved with the answer, when the user has answered.

* `label` _(String)_: A statement or query to write to the console, prepended to the prompt.
* `options` _(Object)_
    - `hidden` _(Boolean, default false)_: Hide the user input with the `*` char. This is useful for sensible data like passwords.
    - `onSubmit`: _(Function)_: A function that will be called when the user has answered. You can return a simple value or a promise if you want to do asynchronous actions. The input will resolve with the return value from the onSubmit function. If you reject your onSubmit promise, `sh.input` will be rejected as well. The `onSubmit` option can be useful to avoid too much nested promises or to process the user answer before resolving `sh.input`.
