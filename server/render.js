const ReactDOMServer = require('react-dom/server')
const asyncBootstrapper = require('react-async-bootstrapper')
const Helmet = require('react-helmet').default
const ejs = require('ejs')
const ServerStyleSheets = require('@material-ui/styles').ServerStyleSheets
const request = require('./utils/request')

const getStoreState = (stores) => {
  return Object.keys(stores)
    .reduce((result, key) => {
      result[key] = stores[key].toJS()
      return result
    }, {})
}

async function initialState(stores, req) {
  const { user } = req.session
  if (user) {
    stores.user.loginState = true
    stores.user.id = user.id
    stores.user.loginName = user.loginName
    stores.user.avatarURL = user.avatarURL
  }
  if (req.path === '/user/center') {
    if (user) {
      try {
        const result = await Promise.all([
          request(`/user/${user.loginName}`),
          request(`/topic_collect/${user.loginName}`)
        ])
        const [recent, collections] = result
        stores.user.serverRender = true
        if (recent.data.success) {
          stores.user.recentTopics = recent.data.data.recent_topics
          stores.user.recentReplies = recent.data.data.recent_replies
        }
        if (collections.data.success) {
          stores.user.collections = collections.data.data
        }
      } catch (e) {
        return Promise.reject(e)
      }
    }
  }
  if (req.path === '/topic') {
    const tab = req.query.tab ? req.query.tab : 'all'
    try {
      const result = await request('/topics', { params: { tab } })
      const { success, data } = result.data
      if (success) {
        stores.topicPool.serverRender = true
        stores.topicPool.topics = data
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }
  const match = req.path.match(/^\/topic\/([a-zA-Z0-9]+)$/)
  if (match) {
    const id = match[1]
    try {
      const result = await request(`/topic/${id}`)
      const { success, data } = result.data
      if(success) {
        stores.topicPool.details[id] = data
      }
    }catch (e) {
      return Promise.reject(e)
    }
  }
  return Promise.resolve()
}

module.exports = (bundle, template, req, res, next) => {
  return new Promise((resolve, reject) => {
    const context = {}
    const stores = bundle.createStoreMap()
    const result = initialState(stores, req)
    result
      .then(() => {
        const state = getStoreState(stores)
        const app = bundle.default(stores, context, req.url)
        const sheets = new ServerStyleSheets()
        const content = ReactDOMServer.renderToString(sheets.collect(app))
        if (context.url) {
          res.status(302)
            .setHeader('Location', context.url)
          return res.end()
        }
        const css = sheets.toString()
        const helmet = Helmet.rewind()
        const html = ejs.render(template, {
          appString: content,
          initialState: JSON.stringify(state),
          meta: helmet.meta.toString(),
          title: helmet.title.toString(),
          style: helmet.style.toString(),
          link: helmet.link.toString(),
          materialCSS: css
        })
        res.header('Content-Type', 'text/html; charset=utf8')
        res.send(html)
      })
      .catch(next)
  })
}