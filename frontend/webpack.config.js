var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,

  entry: './src/index',

  output: {
    path: path.resolve('./build/'),
    filename: "[name]-[hash].js",
  },

  plugins: [
    new BundleTracker({filename: '../webpack-stats.json'}),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
  }

};
