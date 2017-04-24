import Config from 'config/config';
import Signal from 'signals';
const browserLang = require('browser-locale')();

class i18n extends Signal {
	constructor() {
		super();
		this.localize = this.localize.bind(this);
		this.locale = null;
		this.locales = [];
		this.files = ['main'];
		this.data = {};
	}

	getDefaultLocale() {
		const navigatorLocale = browserLang.split('-')[0];
		return this.locales.indexOf(navigatorLocale) > -1 ? navigatorLocale : Config.defaultLang;
	}

	use(config) {
		this.locales = config.locales;
		this.locale = this.getDefaultLocale();
		
		this.files = this.files.concat(config.files ? config.files : []);
		return	this.setLocale(this.locale);
	}

	fetchLocale(locale) {
		return new Promise((resolve, reject) => {
			// Unfetch
			if (!this.data[locale]) {
				let promises = [];
				this.data[locale] = {};
				_.forEach(this.files, (file) => {
					promises.push(
						fetch('i18n/' + locale + '/' + file + ".json")
							.then((response) => {
								return response.json();
							}).then((response) => {
								this.data[locale][file] = response;
								this.onChange();
							})
					);
				});
				Promise.all(promises)
							.then(() => resolve())
							.catch(() => reject());
			}
			// Already fetch 
			else {
				this.onChange();
				resolve();
			}
		});
	}

	setLocale(locale) {
		this.locale = locale;
		return this.fetchLocale(this.locale);
	}
	
	onChange() {
		this.dispatch(this.locale);
	}

	localize(key, file = "main", locale = this.locale) {
		
		// Existing key
		if (this.data[locale] && this.data[locale][file] && this.data[locale][file][key]) {
			return this.data[locale][file][key];
		}
		// Missing key
		else {
			console.log('[i18n] ',key,' does not exist into',this.locale, file,'.json')
		}
	}

}


export default new i18n;