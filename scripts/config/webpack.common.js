/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { isDev, PROJECT_PATH } = require('../constant');

const getCssLoaders = (importLoaders) => [
	'style-loader',
	{
		loader: 'css-loader',
		options: {
			// 开启css module，不开启无法使用import style from './style/index.less';
			modules: true,
			sourceMap: isDev,
			importLoaders,
		},
	},
	{
		loader: 'postcss-loader',
		options: {
			// ident: 'postcss',
			postcssOptions: {
				plugins: [
					// 修复一些和 flex 布局相关的 bug
					require('postcss-flexbugs-fixes'),
					require('postcss-preset-env')({
						autoprefixer: {
							grid: true,
							flexbox: 'no-2009',
						},
						stage: 3,
					}),
					require('postcss-normalize'),
				],
			},
			sourceMap: isDev,
		},
	},
];

module.exports = {
	entry: {
		app: path.resolve(PROJECT_PATH, './src/index.tsx'),
	},
	output: {
		filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
		path: path.resolve(PROJECT_PATH, './dist'),
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
		alias: {
			'@src': path.resolve(PROJECT_PATH, './src'),
			'@components': path.resolve(PROJECT_PATH, './src/components'),
			"@utils": path.resolve(PROJECT_PATH, './src/utils'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(PROJECT_PATH, './public/index.html'),
			filename: 'index.html',
			cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
			minify: isDev
				? false
				: {
						removeAttributeQuotes: true,
						collapseWhitespace: true,
						removeComments: true,
						collapseBooleanAttributes: true,
						collapseInlineTagWhitespace: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
						minifyCSS: true,
						minifyJS: true,
						minifyURLs: true,
						useShortDoctype: true,
					},
		}),
	],
	module: {
		rules: [
			{
				test: /\.(tsx?|js)$/,
				loader: 'babel-loader',
				options: { cacheDirectory: true },
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: getCssLoaders(1),
			},

			{
				test: /\.less$/,
				use: [
					...getCssLoaders(2),
					{
						loader: 'less-loader',
						options: {
							sourceMap: isDev,
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					...getCssLoaders(2),
					{
						loader: 'sass-loader',
						options: {
							sourceMap: isDev,
						},
					},
				],
			},
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10 * 1024,
							name: '[name].[contenthash:8].[ext]',
							outputPath: 'assets/images',
						},
					},
				],
			},
			{
				test: /\.(ttf|woff|woff2|eot|otf)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[contenthash:8].[ext]',
							outputPath: 'assets/fonts',
						},
					},
				],
			},
		],
	},
};
