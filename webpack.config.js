module.exports = {
	entry: './src/global.ts',
	output: {
		filename: 'ujsx.bundle.js',
		path: __dirname + '/dist',
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'babel-loader',
			},
		]
	},
	resolve: {
		extensions: ['.ts', '.mjs', '.js', '.json'],
	},
	devtool: 'source-map',
	mode: 'production'
};
