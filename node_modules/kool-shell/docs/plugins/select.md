# Select plugin

![Preview](https://github.com/pqml/kool-shell/raw/master/assets/preview.gif)

### Features
  * Ask the user to select items from a list
  * `radio` option to allow only one selected item
  * default selected items

### Example
```javascript
const koolShell = require('kool-shell')
const koolSelect = require('kool-shell/plugins/select')

const sh = koolShell().use(koolSelect)

sh.select('What do you want for dinner ?', [
    'A double cheese',
    { value: 'An omelette du fromage', selected: true }
    'Some vegetables'
  ])
  .then(result => {
    if (result.length > 1) console.log('Are you sure to eat all of this?')
  })
```

### Usage

#### sh.select(label, [items], [options])
Ask `label` to the user. <br>
Display a list of `items`. With the keyboard, the user needs to choose item in this list. <br>
Return a promise that will be resolved when the user submit his selection by typing the _Enter_ key. The resolved value is an array of the selected items.

* `label` _(String)_: A statement or query to write to the console, prepended to the list.
* `items` _(Array)_: List of item the user choose from.
    - an item can be a simple string
    - you can also make an object with these parameters:
      +  `value` _(String)_: the display value of this item
      +  `selected` _(Boolean, default false)_: if true the item will be selected by default
      +  `onChosen` _(Function)_ A function that will be called when the user has submit his selection. It's like the `onSubmit` option but for individual choice. It can be a promise for asynchronous actions like another `sh.select` input.
* `options` _(Object)_
    - `radio` _(Boolean, default false)_: Allow only one selected item, like the `<radio>` input in HTML
    - `instructions` _(String)_ Change the instruction of the input (useful if you don't want the message in English)
    - `checked` _(String)_ The checked symbol added before a checked item
    - `unchecked` _(String)_ The unchecked symbol added before an unchecked item
    - `onSubmit`: _(Function)_: A function that will be called when the user has answered. You can return a simple value or a promise if you want to do asynchronous actions. The input will resolve with the return value from the onSubmit function. If you reject your onSubmit promise, `sh.select` will be rejected as well. The `onSubmit` option can be useful to avoid too much nested promises or to process the user answer before resolving `sh.select`.
