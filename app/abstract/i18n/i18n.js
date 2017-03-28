import Config from 'config/config';

class i18n {
	constructor() {
		this.locale = Config.defaultLang;
		this.locales = [];
		this.files = ['main'];
		this.data = {};
	}

	use(config) {
		this.locales = config.locales;
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
								return response.json()
							}).then((response) => {
								this.data[locale][file] = response;
							})
					);
				});
				Promise.all(promises)
							.then(() => resolve())
							.catch(() => reject());
			}
			// Already fetch 
			else {
				resolve();
			}
		});
	}

	setLocale(locale) {
		this.locale = locale;
		return this.fetchLocale(this.locale);
	}
	
	onChange() {

	}

	localize(key, file = "main", locale = this.locale) {
		// Existing key
		if (this.data[locale] && this.data[locale][file] && this.data[locale][file][key]) {
			return this.data[locale][file][key];
		}
		// Missing key
		else {
			console.log('[i18n] ',key,' does not exist into',this.locale,' json')
		}
	}

}


export default new i18n;