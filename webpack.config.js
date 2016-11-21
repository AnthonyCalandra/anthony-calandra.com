var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './hockey.anthony-calandra.com/client/index.jsx',
  output: {
    path: path.join(__dirname, 'hockey.anthony-calandra.com/public/js/build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: ['babel'],
        test: /\.jsx?$/,
        include: path.join(__dirname, 'hockey.anthony-calandra.com/client'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
        },
      }
    ]
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(fs|ipc)$"))
  ],
  stats: {
    // Nice colored output
    colors: true
  },
  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};
