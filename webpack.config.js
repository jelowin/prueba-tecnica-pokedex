const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, argv) => {
	const { mode } = argv;
	const isProduction = mode === 'production';

	return {
		// entry: 'src/index.js',
		output: {
			filename: isProduction ? '[name].[contenthash].js' : '[name].js',
			// path.resolve para obtener la ruta absoluta
			//__dirname te permite saber en que ruta se encuentra el webpack.config.js
			path: path.resolve(__dirname, 'build'),
			sourceMapFilename: '[name].[chunkhash:8].map',
			chunkFilename: '[id].[chunkhash].js'
		},
		plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' })],
		optimization: {
			runtimeChunk: true
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-react',
								{
									runtime: 'automatic'
								}
							]
						]
					}
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: isProduction
										? '[hash:base64]'
										: '[path][name]__[local]'
								}
							}
						}
					]
				}
			]
		},
		devServer: {
			open: true,
			compress: true
		},
		devtool: 'source-map'
	};
};
