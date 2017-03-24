const fs = require('fs-extra');
const path = require('path');
const PATHS = require(path.join(__dirname + '/../config/paths'));

getLocales = () => {
	return new Promise((resolve, reject) => {
		fs.readdir(path.join(PATHS.assets, 'i18n'), (err, files) => {
			if (err) reject(err);
			else resolve(files);
		});
	});
}

module.exports = getLocales;