'use strict';

// var webpack = require('webpack');

module.exports = {
  entry: './test/Button-test.js',

  output: {
    path: './test',
    filename: '../target/spec.js',
    publicPath: '/test/'
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};
