const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
		globalObject: 'this',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, 'src'),
				use: ['style-loader', 'css-loader', 'postcss-loader'],
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
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
		alias: {
			'@types': path.resolve(__dirname, 'src/types/'),
		},
		plugins: [
			new TsConfigPathsPlugin({
				configFile: path.resolve(__dirname, 'tsconfig.json'),
				extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
			}),
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			publicPath: '/',
		}),
		new ForkTsCheckerWebpackPlugin({
			issue: {
				exclude: [{ severity: 'error' }],
			},
		}),
	],
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		port: 3000,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true,
		proxy: [
			{
				context: ['/'],
				target: 'http://localhost:8888',
			},
		],
	},
};
