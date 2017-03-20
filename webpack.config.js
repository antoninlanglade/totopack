const webpack = require('webpack');
// Paths node
const path = require('path');
// Merge config for different envs
const merge = require('webpack-merge');
// Inject bundle.js / vendor.js / manifest.js into index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Clean folders
const CleanPlugin = require('clean-webpack-plugin');
// Css bundle
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// npm lunch script (build | start ...)
const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const pkg = require('./package.json');

const PATHS = {
	app : path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build'),
	assets: path.join(__dirname, 'assets'),
	style: path.join(__dirname, 'app/main.css')
};

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
			inject : false
		}),
		new webpack.LoaderOptionsPlugin({}, {
			minimize: false,
			debug: true
		})
	],
	resolve: {
		// Alias for paths
		alias: {
			assets: PATHS.assets
		}
	}
};

// Dev & Stats configuration
if (TARGET === 'start' || !TARGET || TARGET === 'stats') {
	module.exports = merge(common, {
		// Launch devServer
		devServer: {
			contentBase: PATHS.app,
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
					test: /\.css$/,
					loaders: ['style-loader', 'css-loader'],
					include: PATHS.app
				}]
		},
		plugins: [
			// HMR for REACT
			new webpack.HotModuleReplacementPlugin()
		]
	});
}

// Build configuration
if (TARGET === 'build') {
	module.exports = merge(common, {
		entry : {
			// Exclude all librairies from app.js
			vendor: Object.keys(pkg.dependencies).filter(function (v) {
				// Exclude libs
				return true;
			})
		},
		output: {
			path: PATHS.build,
			filename: '[name].[chunkhash].js',
			chunkFilename: '[chunkhash].js'
		},
		module: {
			// Loaders
			rules: [
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
					include: PATHS.app
				}]
		},
		plugins: [
			// Clean before build
			new CleanPlugin([PATHS.build]),
			// Extract css from js
			new ExtractTextPlugin('[name].[chunkhash].css'),
			// Optimize vendor with a cache manifest
			new webpack.optimize.CommonsChunkPlugin({
				names: ['vendor', 'manifest']
			}),
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
	});
}
