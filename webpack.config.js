const webpack = require('webpack');
// Paths node
const path = require('path');
// Merge config for different envs
const merge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = require(path.join(__dirname + '/config/paths'));


// npm lunch script (build | start ...)
const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

// Default configuration
module.exports = function(globalConfig) { return {
		entry : {
			app: ['whatwg-fetch', PATHS.app+'/index.js'],
			style: PATHS.style
		},
		output : {
			path : PATHS.app,
			filename: '[name].js',
			chunkFilename: "[name].chunk.js"
		},
		module : {
			rules : [
				// Babel transpiler
				{
					test: /\.(js|jsx)$/,
					loader: 'babel-loader',
					options : {
						cacheDirectory: true,
						presets: ['react', 'es2015']
					},
					include: PATHS.app
				},
				// File Loader 
				{ 
					test: /\.(png|jpg|jpeg|gif|woff|ttf|otf)$/,
					loader: 'file-loader',
					options : {
						limit : 1
					}
				},

				{ 
					test: /\.handlebars$/, 
					loader: "handlebars-loader" 
				}
			]
		},
		plugins: [
			// Custome Index.html
			new HtmlWebpackPlugin(globalConfig.HTML_WEBPACK_PLUGIN_CONFIG)
		],
		resolve: {
			// Alias for paths
			alias: {
				assets: PATHS.assets,
				components : PATHS.components,
				abstract: PATHS.abstract,
				config : PATHS.config
			}
		}
	};
}
/*// Dev & Stats configuration
if (TARGET === 'start' || !TARGET || TARGET === 'stats') {
	
}

// Build configuration
if (TARGET === 'build') {
	module.exports = merge(common, BUILD_CONFIG);
}
*/