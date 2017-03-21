const webpack = require('webpack');
// Paths node
const path = require('path');
// Merge config for different envs
const merge = require('webpack-merge');
// Inject bundle.js / vendor.js / manifest.js into index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = require(path.join(__dirname + '/config/paths'));

const BUILD_CONFIG = require(PATHS.config + '/build');
const DEV_CONFIG = require(PATHS.config + '/dev');

// npm lunch script (build | start ...)
const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

// Default configuration
const common = {
	entry : {
		app: PATHS.app+'/index.js',
		style: PATHS.style
	},
	output : {
		path : PATHS.app,
		filename: '[name].js'
	},
	module : {
		rules : [
			// Babel transpiler
			{
				test: /\.(js|jsx|)$/,
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
		new HtmlWebpackPlugin({
			template: PATHS.app + '/index.hbs',
			appMountId: 'app',
			inject : false,
			baseHref : '/'
		}),
		new webpack.LoaderOptionsPlugin({}, {
			minimize: false,
			debug: true
		})
	],
	resolve: {
		// Alias for paths
		alias: {
			assets: PATHS.assets,
			components : PATHS.components,
			abstract: PATHS.abstract
		}
	}
};

// Dev & Stats configuration
if (TARGET === 'start' || !TARGET || TARGET === 'stats') {
	module.exports = merge(common, DEV_CONFIG);
}

// Build configuration
if (TARGET === 'build') {
	module.exports = merge(common, BUILD_CONFIG);
}
