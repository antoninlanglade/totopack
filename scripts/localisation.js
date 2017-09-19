const fs = require('fs')
const path = require('path')
const GoogleSpreadsheet = require('google-spreadsheet')

const spreadsheetKey = '1t-4IYXbUGPvtLyx6KY887CtrLS3J4fVA75EiqJWeIDk'
const keyColumn = 'key'
const contentOffset = 4

const args = process.argv.slice(2);
const outputDir = (args[0] || path.join(__dirname, '..', 'assets', 'i18n'))

const nonBrKey = [];

let langs;
require('./locales')().then((locs) => {
  langs = locs;
  extractLocs({
    spreadsheetKey,
    keyColumn,
    contentOffset,
    languages: langs,
    outputDir,
    transform,
    globalTransform,
    outputPrefix: '',
    pretty: true,
    expand: true,
    deepLevelMax: 1000
  });
});

function globalTransform (obj, lang) {
  return obj
}

function transform (key, val, lang) {
  // trim
  val = val + ''
  val = val.trim()
  // convert : \n to <br/>
  // val = val.replace(/(.*)\n$/g, '$1')
  if (!~nonBrKey.indexOf(key)) val = val.replace(/\n/g, '<br>')
  // convert : … to ...
  val = val.replace(/…/g, '...')
  return val
}

function extractLocs (opts = {}) {
  opts = Object.assign({}, {
    spreadsheetKey: '',
    keyColumn: 'key',
    contentOffset: 1,
    languages: ['en'],
    outputDir: process.cwd(),
    outputPrefix: '',
    pretty: true,
    expand: false,
    deepLevelMax: 1,
    noUndef: true,
    transform (val) { return val },
    globalTransform (obj) { return obj }
  }, opts)

  Promise.resolve()
    .then(() => loadWorksheet(opts.spreadsheetKey))
    .then(sheet => getLocs(sheet, opts))
    .then(locs => writeLocs(locs, opts))
    .catch(err => { throw err })
}

function loadWorksheet (key) {
  return new Promise((resolve, reject) => {
    const doc = new GoogleSpreadsheet(key)
    doc.getInfo((err, info) => {
      if (err) return reject(err)
      const sheet = info.worksheets[0]
      resolve(sheet)
    })
  })
}

function getLocs (sheet, opts) {
  return new Promise((resolve, reject) => {
    sheet.getRows({ offset: opts.contentOffset }, (err, rows) => {
      if (err) return reject(err)
      const out = {}
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        const key = row.key
        if (!key) continue
        opts.languages.forEach(lang => {
          if (!opts.noUndef && !row[lang]) return
          if (!out[lang]) out[lang] = {}
          out[lang][key] = opts.transform(key, row[lang] + '', lang)
        })
      }
      resolve(out)
    })
  })
}

function writeLocs (locs, opts) {
  return new Promise((resolve, reject) => {
    let promises = []
    for (let lang in locs) {
      let loc = opts.expand ? expandObject(locs[lang], opts.deepLevelMax) : locs[lang]
      loc = opts.globalTransform(loc, lang)
      const content = opts.pretty
        ? JSON.stringify(loc, null, 2)
        : JSON.stringify(loc)

      const outputPath = path.join(opts.outputDir, lang, 'loc.json')
      promises.push(writeLoc(outputPath, content, lang))
    }
    Promise.all(promises)
      .then(resolve)
      .catch(reject)
  })
}

function writeLoc (filePath, content, lang) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, err => {
      if (err) return reject(err)
      console.log(' ', lang, '->', filePath)
      resolve()
    })
  })
}

function expandObject (obj, deepLevelMax) {
  let objOut = {}
  for (let key in obj) {
    const value = obj[key]
    const keys = key.split('.')
    let deepLevel = 0
    let pointer = objOut
    for (let i = 0; i < keys.length; i++) {
      const subkey = keys[i]
      const last = !keys[i + 1]
      if (!pointer[subkey] && !last && deepLevel < deepLevelMax) pointer[subkey] = {}
      if (last) {
        pointer[subkey] = value
      } else if (deepLevel >= deepLevelMax) {
        const copyKeys = keys.slice(0)
        const remainingKey = copyKeys.splice(i).join('.')
        pointer[remainingKey] = value
        break
      } else {
        pointer = pointer[subkey]
      }
      deepLevel++
    }
  }
  return objOut
}
