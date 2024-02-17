const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
		globalObject: 'this',
	},
	module: {
		rules: [
			{
				test: /\.js/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(ts|tsx)$/,
				loader: 'ts-loader',
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.json', '.ts', '.tsx'],
		plugins: [
			new TsConfigPathsPlugin({
				extensions: ['.js', '.json', '.ts', '.tsx'],
			}),
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: 'src/favicon.ico',
			template: 'src/index.html',
			publicPath: '/',
		}),
	],
	devServer: {
		static: path.resolve(__dirname, 'dist'),
	},
};
