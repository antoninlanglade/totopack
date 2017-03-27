
import Config from 'config/config';

class i18n {
	constructor() {
		this.locale = Config.defaultLang;
		this.locales = [];
	}

	use(config) {
		return new Promise((resolve, reject) => {
			this.locales = config.locales;
			this.fetchLocale(this.locale)
					.then(resolve)
					.catch(reject);
		});
	}

	fetchLocale(locale) {
		return new Promise((resolve, reject) => {
			if (!this.locales[locale]) {
				fetch('i18n/' + locale + '/main.json')
					.then((response) => {
						return response.json()
					}).then((file) => {
						this.locales[locale] = file;
						resolve();
					}).catch((err) => {
						reject(err);
					});
			}
			else {
				resolve(this.locales[locale]);
			}
		});
	}

	onChange() {

	}

	localize(key) {
		if (this.locales[this.locale] && this.locales[this.locale][key]) {
			return this.locales[this.locale][key];
		}
		else {
			console.log('[i18n] ',key,' does not exist into',this.locale,' json')
		}
	}

}


export default new i18n;