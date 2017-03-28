const pkg = require('./../package.json');
const PATHS = require('./paths');

const webpack = require('webpack');
// Clean folders
const CleanPlugin = require('clean-webpack-plugin');
// Css bundle
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Copy files
const CopyWebpackPlugin = require('copy-webpack-plugin');



module.exports = function (globalConfig) { return {
		output: {
			path: PATHS.build,
			filename: '[name].[chunkhash].js',
			chunkFilename: '[chunkhash].js',
		},
		module: {
			// Loaders
			rules: [
				{
					test: /\.(scss|css)$/,
					loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' })
				}]
		},
		plugins: [
			
			// Clean before build
			new CleanPlugin(['build'], {
				root : PATHS.root
			}),

			// Copy static files
			new CopyWebpackPlugin([
				{ from: PATHS.assets, to: PATHS.build },
			]),
			// Extract css from js
			new ExtractTextPlugin('[name].[chunkhash].css'),
			
			// NODE Production for size optimization
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify("production")
				}
			}),
			
			// Uglify JS
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				}
			})
		]
	}
}
