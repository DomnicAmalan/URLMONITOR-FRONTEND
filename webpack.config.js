const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const PolyFill = '@babel/polyfill';
const webpack = require('webpack');

const dotenv = require('dotenv').config({ path: `${__dirname}/.env` });

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const dotEnvPlugin = new webpack.DefinePlugin({
  'process.env': JSON.stringify(dotenv.parsed),
});

module.exports = {
  entry: [PolyFill, './src/index'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [htmlPlugin, dotEnvPlugin],
  devServer: {
    contentBase: './dist',
    hot: true,
    inline: true,
    open:true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          esModule: false,
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    fallback: { "http": false },
    alias: {
      Assets: path.resolve(__dirname, './src/assets'),
      atoms: path.resolve(__dirname, './src/components/atoms/index'),
      hooks: path.resolve(__dirname, './src/hooks/index'),
      pages: path.resolve(__dirname, './src/pages')
    },
  },
};
