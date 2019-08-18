const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./config/baseConfig')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, 'src/index.js'),
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'mobx',
      'mobx-react',
      'axios'
    ]
  },
  output: {
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: '!!ejs-compiled-loader!' + path.join(__dirname, 'src/server.template.ejs'),
      filename: 'server.ejs'
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8000,
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    overlay: {
      errors: true
    },
    open: false,
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
})

if (!isDev) {
  config.output.filename = '[name].[chunkhash].js'
}

module.exports = config