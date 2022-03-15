const path = require('path');

const SRC_DIR = path.join(__dirname, '/client');
const OUT_DIR = path.join(__dirname, '/public');

module.exports = {
  //target: 'node',
  entry: path.join(SRC_DIR, 'index.js'),
  output: {
    path: OUT_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test:/\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader'}
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: 'file-loader'
      }
    ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx']
  }
};