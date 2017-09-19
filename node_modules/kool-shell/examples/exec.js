'use strict'

const koolShell = require('..')
const koolLog = require('../plugins/log')
const koolExec = require('../plugins/exec')

const sh = koolShell()
  .use(koolLog)
  .use(koolExec)

sh.silentExec('git', ['config', 'user.name'])
  .then(res => sh.log('Return value: ', res))

