const webpack = require('webpack');
const webpackConfig = require('./../webpack.config');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const TinyImage = require('./tiny-image');

TinyImage();

const compiler = webpack(webpackConfig);

compiler.apply(new ProgressBarPlugin());

compiler.run((err, stats) => {
	if (err) {
		console.log(err)
	}
});