var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/public_dev');
var APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: APP_DIR + "/client/index.js",
  output: {
    path: BUILD_DIR,
    filename: 'js/bundle.js'
  },
  module: {
    loaders: [
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      }
    ]
  },
  devServer: {
    contentBase: BUILD_DIR,
    compress: true,
    port: 3000
  }
};