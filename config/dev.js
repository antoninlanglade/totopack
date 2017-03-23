const PATHS = require('./paths');
const webpack = require('webpack');

module.exports = function(globalConfig) { return {
		// Launch devServer
		devServer: {
			contentBase: PATHS.assets,
			historyApiFallback: true,
			hot: true,
			inline: true,
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
					loaders: ['style-loader', 'css-loader', 'sass-loader'],
					include: PATHS.app
				}]
		},
		plugins: [
			// HMR for REACT
			new webpack.HotModuleReplacementPlugin()
		]
	};
}