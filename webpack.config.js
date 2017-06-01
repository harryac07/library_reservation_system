var HtmlWebpackPlugin = require('html-webpack-plugin');
var Dotenv = require('dotenv-webpack');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template : __dirname + '/public/index.html',
	filename : 'index.html',
	inject : 'body'
});

module.exports={

	entry : [
		'./public/index.js'
	],
	output:{
		path : __dirname+'/public/dist',
		filename : 'bundle.js'
	},
	module : {
		loaders : [
			{test:/\.js$/,exclude:/node_modules/,loader:'babel-loader'},
			{ test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
		]
	},
	devServer: {
	  inline: true,
	  port: 3000,
	  hot: true,
	  contentBase: "dist/"
	},
	plugins:[
		HtmlWebpackPluginConfig,
		new Dotenv({
	      path: '.env'
	    })
	]
};