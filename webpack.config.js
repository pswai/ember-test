const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: {
    app: './app/app.js',
    vendors: ['jquery', 'ember']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendors' }),
    new webpack.LoaderOptionsPlugin({
      test: /\.hbs$/,
      options: {
        emberTemplatesLoader: {
          compiler: 'ember-source/dist/ember-template-compiler'
        }
      }
    }),
    new HtmlWebpackPlugin()
  ],
  resolve: {
    alias: {
      ember: path.resolve(__dirname, './ember')
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname, 'app'),
      exclude: path.resolve(__dirname, 'node_modules'),
      loader: 'babel-loader',
      options: {
        presets: ['es2015']
      }
    }, {
      test: /\.hbs$/,
      include: path.resolve(__dirname, 'app', 'templates'),
      loader: 'ember-templates-loader'
    }, {
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }]
  }
};
