const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const autoprefixer = require('autoprefixer');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const PhpManifestPlugin = require('webpack-php-manifest');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const regexImages = /\.(png|jpe?g|svg|gif)$/i;

// Optimization
const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all',
		},
	};

	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetWebpackPlugin(),
			new TerserWebpackPlugin(),
		];
	}

	return config;
};

// Style loaders
const styleLoaders = () => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hmr: isDev,
				reloadAll: true,
				publicPath: '../',
			},
		},
		{
			loader: 'css-loader',
			options: {
				sourceMap: isDev,
			},
		},
		{
			loader: 'postcss-loader',
			options: {
				plugins: [autoprefixer()],
				sourceMap: isDev,
			},
		},
		{
			loader: 'sass-loader',
			options: {
				sourceMap: isDev,
			},
		},
	];

	return loaders;
};

// File loaders
const fileLoaders = () => {
	const loaders = [
		{
			loader: 'file-loader',
			options: {
				esModule: false,
				name: '[path][name].[ext]',
			},
		},
	];

	return loaders;
};

// Babel options
const babelOptions = preset => {
	const opts = {
		presets: ['@babel/preset-env'],
	};

	if (preset) opts.presets.push(preset);

	return opts;
};

// Js loaders
const jsLoaders = () => {
	const loaders = [
		{
			loader: 'babel-loader',
			options: babelOptions(),
		},
	];

	if (isDev) {
		loaders.push('eslint-loader');
	}

	return loaders;
};

// Filename
const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].min.${ext}`);

// Plugins
const plugins = () => {
	const base = [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'src/images/**/**.*'),
				to: path.resolve(__dirname, 'dist'),
			},
		]),
		new MiniCssExtractPlugin({
			filename: `styles/${filename('css')}`,
		}),
		new ImageminPlugin({
			disable: isDev,
			test: regexImages,
			pngquant: {
				quality: '95-100',
			},
		}),
		new PhpManifestPlugin({
			// NOTE: Will write path to your 'dist' directory
			path: 'public/frontend/dist',
		}),
		new BrowserSyncPlugin(
			{
				open: 'external',
				host: 'your host',
				port: 3000,
				proxy: 'http://your-proxy',
				ghostMode: false,
				files: [
					{
						match: ['./src'],
						fn(event) {
							if (event === 'change' || event === 'add' || event === 'unlink') {
								const bs = require('browser-sync').get('bs-webpack-plugin');
								bs.reload();
							}
						},
					},
				],
			},
			{
				reload: false,
			}
		),
	];

	if (isProd) base.push(new BundleAnalyzerPlugin());

	return base;
};

// Webpack's module
module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './js/index.js'],
	},
	output: {
		filename: `js/${filename('js')}`,
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: optimization(),
	devtool: isDev ? 'source-map' : '',
	plugins: plugins(),
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: /js/,
				use: jsLoaders(),
			},
			{
				test: /\.scss$/i,
				use: styleLoaders(),
			},
			{
				test: regexImages,
				include: /images/,
				use: fileLoaders(),
			},
			{
				test: /\.(ttf|eot|woff2|woff|svg)$/i,
				include: /fonts/,
				use: fileLoaders(),
			},
		],
	},
};
