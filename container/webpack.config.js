const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');
const { DuplicatesPlugin } = require("inspectpack/plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	devtool: 'source-map',
	context: path.resolve(__dirname, ''),
	entry: {
		container: './src/container.js'
	},
	target: 'nwjs',
	node: {
		__dirname: true,
		__filename: true
	},
	output: {
		publicPath: 'src/',
		filename: '[name]-bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /pdf\.worker\.js$/,
				type: 'asset/inline',
				generator: {
					dataUrl: content => {
						return content.toString();
					}
				}
			},
			{
				test: /\.css$/i,
				oneOf: [
					{ assert: { type: "css" }, loader: "css-loader", options: { exportType: 'css-style-sheet' } },
					{ use: ["style-loader", "css-loader"] }
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				type: 'asset/resource',
				generator: {
					filename: './images/[name][ext]'
				}
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				type: 'asset/resource',
				generator: {
					filename: './fonts/[name][ext]'
				}
			},
			{
				test: /\.node$/,
				use: 'node-loader'
			}
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: 'src/index.html' },
				{ from: 'src/pdf', to: 'pdf' }
			],
		}),
		new DuplicatesPlugin({
			verbose: true
		})
	],
	resolve: {
		modules: [
			path.resolve(__dirname, 'src'),
			'node_modules',
		]
	},
	optimization: {
		usedExports: true,
		minimize: false,
		minimizer: [
			new TerserPlugin({
				extractComments: false
			}),
		],
	}
};