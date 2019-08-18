const express = require('express')
const request = require('./utils/request')
const router = express.Router()

router.get('/user/logout', (req, res, next) => {
  delete req.session.user
  res.json({
    success: true,
    message: '退出'
  })
})

router.get('/user/auth', (req, res, next) => {
  const { user } = req.session
  if (user) {
    const { accessToken, ...rest } = user
    return res.json({ success: true, ...rest })
  }
  return res.json({ success: false })
})

router.post('/login', (req, res, next) => {
  const { accessToken } = req.body
  request.post(`/accesstoken`, {
    accesstoken: accessToken
  })
    .then(result => {
      const user = {}
      if (result.data.success) {
        user.id = result.data.id
        user.loginName = result.data.loginname
        user.avatarURL = result.data.avatar_url
        req.session.user = { accessToken: accessToken, ...user }
      }
      res.status(result.status)
        .json({ success: result.data.success, ...user })
    })
    .catch(next)
})

router.get('*', (req, res, next) => {
  request
    .get(req.path, {
      params: req.query || {}
    })
    .then(result => {
      res.status(result.status)
        .json(result.data)
    })
    .catch(next)
})

module.exports = router