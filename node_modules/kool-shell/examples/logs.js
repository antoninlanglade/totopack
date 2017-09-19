'use strict'

const koolShell = require('..')
const koolLog = require('../plugins/log')

const sh = koolShell()
  .use(koolLog)

sh.step(1, 3, 'Display error message')
sh.error('Error!')

sh.step(2, 3, 'Display warning message')
sh.warn('Warning!')

sh.step(3, 3, 'Display success message')
sh.success('Done!')
