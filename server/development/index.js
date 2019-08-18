const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const proxy = require('http-proxy-middleware')
const path = require('path')
const NativeModule = require('module')
const vm = require('vm')
const webpackConfig = require('../../webpack.config.server')
const serverRender = require('../render')

let serverBundle = void 0

const mfs = new MemoryFs()
const compiler = webpack(webpackConfig)
compiler.outputFileSystem = mfs

compiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.log(warn))
  const bundlePath = path.join(webpackConfig.output.path, webpackConfig.output.filename)
  const bundle = mfs.readFileSync(bundlePath, 'utf8')
  const m = getModuleFromString(bundle, 'server.js')
  serverBundle = m.exports
})

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModule.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  })
  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8000/public/server.ejs')
      .then(res => {
        resolve(res.data)
      })
      .catch(e => {
        reject(e)
      })
  })
}

module.exports = function (app) {
  app.use('/public/', proxy({
    target: 'http://localhost:8000'
  }))

  app.use((req, res, next) => {
    if (!serverBundle) {
      return res.send('please refresh later')
    }
    getTemplate()
      .then(template => {
        return serverRender(serverBundle, template, req, res, next)
      })
      .catch(e => {
        console.log(e)
      })
  })
}