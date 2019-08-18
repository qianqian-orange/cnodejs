import axios from 'axios'

const baseURL = process.env.BASEURL || ''
const instance = axios.create({
  baseURL
})

export const get = (url, config = {}) => (
  new Promise((resolve, reject) => {
    instance
      .get(url, config)
      .then(resolve)
      .catch(reject)
  })
)

export const post = (url, data = {}, config = {}) => (
  new Promise((resolve, reject) => {
    instance
      .post(url, data, config)
      .then(resolve)
      .catch(reject)
  })
)

export default instance
