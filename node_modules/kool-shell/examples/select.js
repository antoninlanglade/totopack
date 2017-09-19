'use strict'

const koolShell = require('..')
const koolLog = require('../plugins/log')
const koolSelect = require('../plugins/select')

const sh = koolShell()
  .use(koolLog)
  .use(koolSelect)

function choose () {
  return sh.select('Choose:', ['A', 'B', 'C'], {
    onSubmit: (res) => res.length > 0 ? res : choose()
  })
}

choose()
  .then(res => sh.log('Return value: ', res))

