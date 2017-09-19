/* global fetch */
import Config from 'config/config';
import Signal from 'signals';
import forEach from 'lodash/forEach';
import Log from 'tools/Log';

const browserLang = require('browser-locale')();

class I18n extends Signal {
  constructor () {
    super();
    this.localize = this.localize.bind(this);
    this.locale = null;
    this.locales = [];
    this.files = ['main'];
    this.data = {};
  }

  getDefaultLocale () {
    const navigatorLocale = browserLang.split('-')[0];
    return this.locales.indexOf(navigatorLocale) > -1 ? navigatorLocale : Config.defaultLang;
  }

  use (config) {
    return new Promise((resolve, reject) => {
      this.locales = config.locales;
      this.locale = this.getDefaultLocale();
      this.files = this.files.concat(config.files ? config.files : []);
      Log('App', 'use i18n');

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
    this.dispatch(this.locale);
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
