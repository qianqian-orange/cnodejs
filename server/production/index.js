const path = require('path')
const fs = require('fs')
const express = require('express')
const serverRender = require('../render')
//注意点，要取导出对象中的default属性
const bundle = require('../../dist/server')

const template = fs.readFileSync(path.join(__dirname, '../../dist/server.ejs'), 'utf8')

module.exports = function(app){
    app.use('/public/', express.static(path.join(__dirname, '../../dist')))

    app.use((req, res, next) => {
      serverRender(bundle, template, req, res, next).catch(e => console.log(e))
    })
}