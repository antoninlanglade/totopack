/* global fetch */
import Emitter from 'tiny-emitter';
import forEach from 'lodash/forEach';
import Log from 'tools/log';

const browserLang = require('browser-locale')();

class I18n extends Emitter {
  constructor () {
    super();
    this.localize = this.localize.bind(this);
    this.locale = null;
    this.locales = [];
    this.files = ['main'];
    this.data = {};
  }

  getDefaultLocale (defaultLang) {
    const navigatorLocale = browserLang.split('-')[0].toLowerCase();
    return this.locales.indexOf(navigatorLocale) > -1 ? navigatorLocale : defaultLang;
  }

  use (config) {
    return new Promise((resolve, reject) => {
      this.locales = config.locales;
      this.locale = this.getDefaultLocale(config.defaultLang);
      this.files = this.files.concat(config.files ? config.files : []);
      Log('App', `use i18n current locale : ${this.locale}`);

      this.setLocale(this.locale)
        .then(() => resolve(config))
        .catch((err) => reject(new Error(err)));
    }).catch((err) => { throw new Error(err); });
  }

  fetchLocale (locale) {
    return new Promise((resolve, reject) => {
      // Unfetch
      if (!this.data[locale]) {
        let promises = [];
        this.data[locale] = {};
        forEach(this.files, (file) => {
          promises.push(
            fetch(`i18n/${locale}/${file}.json`)
              .then((response) => {
                return response.json();
              }).then((response) => {
                this.data[locale][file] = response;
              })
              .catch((err) => reject(new Error(err)))
          );
        });
        Promise.all(promises)
          .then(() => this.onChange())
          .then(() => resolve())
          .catch((err) => reject(new Error(err)));
      } else { // Already fetch
        this.onChange();
        resolve();
      }
    }).catch((err) => { throw new Error(err); });
  }

  setLocale (locale) {
    this.locale = locale;
    return this.fetchLocale(this.locale);
  }

  getLocale () {
    return this.locale;
  }

  onChange () {
    this.emit('change', this.locale);
  }

  localize (key, file = 'main', locale = this.locale) {
    // Existing key
    if (this.data[locale] && this.data[locale][file] && this.data[locale][file][key]) {
      return this.data[locale][file][key];
    } else { // Missing key
      Log('i18n', ` ${key} does not exist into ${this.locale} ${file}.json`, 0)
      return key;
    }
  }
}

export default new I18n();
