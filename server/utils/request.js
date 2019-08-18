const axios = require('axios')
const baseURL = 'https://cnodejs.org/api/v1'

module.exports = axios.create({
  baseURL
})
