/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
	mode: 'production',
	// devtool: 'hidden-nosources-module-',
	plugins: [new CleanWebpackPlugin()],
});
