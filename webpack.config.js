const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  	mode: 'development',
  	entry: {
  		main: './src/index.js',
    },
  	output: {
    	path: path.resolve(__dirname, 'dist'),
    	filename: '[name].js'
  	},
  	module: {
    rules: [
	  {
	    test: /\.(scss|css)$/,
	    use: [
	      {
	        // Adds CSS to the DOM by injecting a `<style>` tag
	        loader: 'style-loader'
	      },
	      {
	        // Interprets `@import` and `url()` like `import/require()` and will resolve them
	        loader: 'css-loader'
	      },
	      {
	        // Loader for webpack to process CSS with PostCSS
	        loader: 'postcss-loader',
	        options: {
	          plugins: function () {
	            return [
	              require('autoprefixer')
	            ];
	          }
	        }
	      },
	      {
	        // Loads a SASS/SCSS file and compiles it to CSS
	        loader: 'sass-loader'
	      },
	    ]
	  },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
	]
	},
  	plugins: [
	  	new CopyWebpackPlugin([
	  		{ from: './src/gitab.html'},
	  		{ from: './src/manifest.json'},
	  		{ from: './src/options.html'}
  		]),
  		new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
       	})
	]
};