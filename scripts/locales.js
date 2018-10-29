const fs = require('fs-extra');
const path = require('path');
const forEach = require('lodash/forEach');
const PATHS = require(path.join(__dirname, '/../config/paths'));

const getLocales = () => {
  return new Promise((resolve, reject) => {
    fs.readdir(path.join(PATHS.assets, 'i18n'), (err, files) => {
      if (err) reject(err);
      else {
        const langs = [];
        const regex = /^\..*/;
        forEach(files, (file) => {
          if (!regex.test(file)) langs.push(file);
        });
        resolve(langs)
      };
    });
  });
}

module.exports = getLocales;
