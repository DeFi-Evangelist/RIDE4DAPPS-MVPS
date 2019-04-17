
const path = require('path');

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	entry: [
		'main.js'
	],
	output: {
		path: path.resolve(__dirname, 'assets'),
		filename: 'build.js'
	},
	module: {
		rules: [
            {
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
		]
	}
};
