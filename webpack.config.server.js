const path = require('path')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./config/baseConfig')

const isDev = process.env.NODE_ENV === 'development'

const config = webpackMerge(baseConfig, {
  target: 'node',
  // 将打包文件中的依赖排除出去，以require的方式去引用
  externals: Object.keys(require('./package.json').dependencies),
  entry: {
    server: path.join(__dirname, 'src/server.js')
  },
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BASEURL': '"http://localhost:3000"'
    })
  ]
})

module.exports = config