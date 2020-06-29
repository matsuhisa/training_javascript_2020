const webpack = require('webpack');

module.exports = {
  entry: [
    './source/javascripts/site.js'
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build/javascripts'
  },

  mode: "development",

  rules: [
    { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
  ]
};