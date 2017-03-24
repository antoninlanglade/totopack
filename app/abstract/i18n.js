
import Config from 'config/config';

class i18n {
	constructor() {
		this.locale = Config.defaultLang;
		this.locales = [];
	}

	use(config) {
		return new Promise((resolve, reject) => {
			this.locales = config.locales;
			resolve();
		});
	}

	localize(key) {

	}
}


export default new i18n;