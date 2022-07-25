/* eslint-disable */

const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { categoryBgColors } = require('./src/js/constants/colors');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	// 파일을 읽어들이는 진입점 설정
	mode: isProduction ? 'production' : 'development',
	entry: './src/js/index.js',
	watch: !isProduction,

	// 결과물 반환 옵션
	output: {
		// 기본은 path dist, filename main.js
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		clean: true,
		// 기존 빌드 결과 제거
	},

	devtool: 'eval-cheap-source-map',

	resolve: {
		modules: ['node_modules'],
		alias: {
			'@styles': path.resolve(__dirname, 'src/styles'),
		},
		extensions: ['.js'],
	},

	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
				],
				exclude: /node_modules/,
				// 순서 중요, 뒤에서부터 로드
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							additionalData: Object.entries(categoryBgColors)
								.map(([key, value]) => `$color-${key}: ${value};`)
								.join(''),
						},
					},
				],
			},
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				type: 'asset/resource',
			},
		],
	},

	// 번들링 후 결과물의 처리 방식
	plugins: [
		new HtmlPlugin({
			template: './index.html',
			inject: false,
		}),
		new MiniCssExtractPlugin({ filename: 'css/style.css' }),
	],
};
