const path =  require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',  // production
  devtool: 'eval',  // hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  entry: {
    app: './client'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
    }]
  },
  // plugins: [
  //   new webpack.LoaderOptionsPlugin({ debug: true }),
  // ],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  }
}