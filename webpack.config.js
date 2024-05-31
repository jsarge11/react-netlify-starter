const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
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
				test: /\.js/,
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
		extensions: ['.js', '.json', '.ts', '.tsx'],
		plugins: [
			new TsConfigPathsPlugin({
				extensions: ['.js', '.json', '.ts', '.tsx'],
			}),
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			// favicon: 'src/favicon.ico',
			template: 'src/index.html',
			publicPath: '/',
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
