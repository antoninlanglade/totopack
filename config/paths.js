const path = require('path');

module.exports = {
	app: path.join(__dirname, '../app'),
	build: path.join(__dirname, '../build'),
	assets: path.join(__dirname, '../assets'),
	style: path.join(__dirname, '../app/main.scss'),
	components: path.join(__dirname, '../app/components'),
	config: __dirname,
	abstract: path.join(__dirname, '../app/abstract')
};