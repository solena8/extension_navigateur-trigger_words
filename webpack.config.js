const path = require('path');

module.exports = {
  entry: {
    popup: './src/popup.ts',
    background: './src/background.ts',
    option: './src/option.ts',
    content: './src/content.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  mode: 'development' // ou 'production' selon vos besoins
};
