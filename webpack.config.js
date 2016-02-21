module.exports = {
  entry: './public/src/js/app.js',
  output: {
    filename: './public/dist/js/app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  }
};
