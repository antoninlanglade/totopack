const webpack = require('webpack');
const webpackConfig = require('./../webpack.config');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const merge = require('webpack-merge');
const argv = process.argv.slice(2);
const path = require('path');

const PATHS = require(path.join(__dirname + '/../config/paths'));
let globalConfig = require(PATHS.config+'/global');

const tinyImage = require('./tiny-image');
const BUILD_CONFIG = require(PATHS.config + '/build');

if (argv[0]) {
	globalConfig.HTML_WEBPACK_PLUGIN_CONFIG.publicPath = argv[0];
}

const compiler = webpack(merge(webpackConfig(globalConfig), BUILD_CONFIG(globalConfig)));

launchDevServer = () => {
	return new Promise((resolve, reject) => {
		compiler.apply(new ProgressBarPlugin());
		compiler.run((err, stats) => {
			if (err) {
				reject(err);
			}
			else resolve();
		});
	});
}

// launch lazy images compression
tinyImage()
	.then(launchDevServer);

