'use strict'

const colors = require('../utils/colors')
const cursor = require('../utils/cursor')

function selectPlugin (sh) {
  const api = {
    select
  }

  return api

  function select (label, list, opts) {
    return new Promise((resolve, reject) => {
      opts = opts || {}
      opts = Object.assign({}, {
        instructions: (
          colors.gray(
            '\n (Press space to select, enter to valid.)'
          )
        )
      }, opts)

      const prefix = opts.prefix || colors.gray('[?] ')
      label = prefix + label.toString()
      list = list || []

      let simpleOutput = true
      for (let i = 0; i < list.length; i++) {
        const el = list[i]
        if (typeof el !== 'string') {
          simpleOutput = false
        } else {
          list[i] = { value: el, selected: false }
        }
      }

      const symbols = {}
      symbols.checked = opts.checked || (opts.radio ? '●' : '✔︎')
      symbols.unchecked = opts.unchecked || '◦'

      let currentEl = 1

      process.stdin.setRawMode(true)
      process.stdin.resume()
      process.stdin.on('data', onInput)

      process.stdout.write(label + '\n' + opts.instructions + '\n')
      allocateLines(list)
      renderList(list, currentEl, symbols)

      function dispose () {
        process.stdin.removeListener('data', onInput)
        process.stdin.pause()
      }

      function onInput (chunk) {
        const char = chunk.toString('utf8')
        switch (char) {
          case '\u0003': // Ctrl + C
            dispose()
            process.emit('SIGINT')
            break
          case '\u001a': // Ctrl + Z
            dispose()
            process.exit('SIGTSTP')
            break
          case '\n':
          case '\r':
          case '\u0004': // Enter
            dispose()
            process.stdout.write('\n')
            submit(list, simpleOutput, opts.onSubmit)
              .then(resolve)
              .catch(reject)
            break
          case '\u001b[A': // Up
            currentEl = currentEl > 1 ? currentEl - 1 : 1
            renderList(list, currentEl, symbols)
            break
          case '\u001b[B': // Down
            currentEl = currentEl < list.length ? currentEl + 1 : list.length
            renderList(list, currentEl, symbols)
            break
          case ' ': // Space
            if (opts.radio) {
              getSelected(list).forEach(el => { el.selected = !el.selected })
            }
            let el = list[currentEl - 1]
            el.selected = !el.selected
            renderList(list, currentEl, symbols)
            break
          default:
            break
        }
      }
    })
  }

  function submit (list, simpleOutput, onSubmit) {
    return new Promise((resolve, reject) => {
      let out = []
      list.forEach(el => {
        if (el.selected) out.push(simpleOutput ? el.value : el)
      })
      function next (index) {
        const el = out[index]
        if (!el) {
          return Promise.resolve()
          .then(() => {
            if (typeof onSubmit !== 'function') return out
            return onSubmit(out)
          })
          .then(res => { resolve(res) })
          .catch(reject)
        } else {
          if (typeof el.onChosen !== 'function') next(index + 1)
          else {
            Promise.resolve()
              .then(() => el.onChosen(el))
              .then(() => next(index + 1))
              .catch(reject)
          }
        }
      }
      next(0)
    })
  }

  function allocateLines (list) {
    let out = ''
    list.forEach(v => { out += '\n' })
    process.stdout.write(out)
  }

  function getSelected (list) {
    let selected = []
    list.forEach(el => { el.selected && selected.push(el) })
    return selected
  }

  function renderList (list, currentEl, symbols) {
    cursor.prevLine(list.length)
    for (let i = 0; i < list.length; i++) {
      cursor.clearLine()
      const el = list[i]
      const val = el.value || ''
      const selected = !!el.selected
      const current = currentEl === (i + 1)
      const out = formatElement(val, selected, current, symbols)
      process.stdout.write(out)
      cursor.nextLine()
    }
  }

  function formatElement (value, selected, current, symb) {
    let out = ''
    out += ' '
    out += selected ? colors.blue(symb.checked) : colors.gray(symb.unchecked)
    out += ' '
    out += selected ? colors.blue(value) : value
    out += current ? colors.gray('  ←') : ''
    return out
  }
}

module.exports = selectPlugin
