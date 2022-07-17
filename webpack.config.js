const path = require('path');
const Terser = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'keyboard',
      template: './index.html',
      inject: 'body',
      favicon: './globe.png',
    }),
    // inject css to html
    new MiniCssExtractPlugin({ filename: 'style.css' }),
  ],
  optimization: {
    minimizer: [new Terser()],
  },
};
