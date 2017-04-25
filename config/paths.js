const path = require('path');

module.exports = {

	root: path.join(__dirname, '../'),
	app: path.join(__dirname, '../app'),
	build: path.join(__dirname, '../build'),
	assets: path.join(__dirname, '../assets'),
	config: __dirname,
	scripts: path.join(__dirname, '../scripts'),

	style: path.join(__dirname, '../app/main.scss'),
	components: path.join(__dirname, '../app/components'),
	abstract: path.join(__dirname, '../app/abstract'),
	tools: path.join(__dirname, '../app/tools')
	
};