const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const session = require('express-session')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: 'cnodejs',
  resave: false,
  saveUninitialized: false
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use((req, res, next) => {
  const { path, query, session: { user } } = req

  next()
})

app.use('/api', require('./router'))

const isDev = process.env.NODE_ENV === 'development'

if (isDev) {
  const server = require('./development')
  server(app)
} else {
  const server = require('./production')
  server(app)
}

app.use((err, req, res, next) => {
  if (err.response) {
    return res.json(err.response.data)
  }
  res.json({
    success: 'false',
    message: 'please try again later'
  })
})

app.listen(3000, () => {
  console.log('server started at port 3000')
})
