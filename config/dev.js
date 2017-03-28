const PATHS = require('./paths');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = function(globalConfig) { return {
		entry : [
			'react-hot-loader/patch',
    		'webpack-dev-server/client?http://localhost:8080',
    		'webpack/hot/only-dev-server'
		],
		// Launch devServer
		devServer: {
			contentBase: PATHS.assets,
			historyApiFallback: true,
			inline: true,
			hot : true,
			stats: 'errors-only',
			host: process.env.HOST,
			port: process.env.PORT
		},
		// Enable source-map for Debug
		devtool: "source-map",
		module: {
			// Loaders
			rules: [
				{
					test: /\.(scss|css)$/,
					loaders: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
				}]
		},
		plugins: [
    		 new webpack.HotModuleReplacementPlugin(),
			// enable HMR globally

			new webpack.NamedModulesPlugin(),
			// prints more readable module names in the browser console on HMR updates
		]
	};
}