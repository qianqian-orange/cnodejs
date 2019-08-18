import { observable, action } from 'mobx'
import { get, post } from '../utils/http'

class User {
  @observable id

  @observable avatarURL

  @observable loginName

  @observable recentTopics

  @observable recentReplies

  @observable collections

  @observable loginState

  @observable loading

  @observable serverRender

  constructor(
    {
      id = '',
      avatarURL = '',
      loginName = '',
      recentTopics = [],
      recentReplies = [],
      collections = [],
      loading = false,
      loginState = false,
      serverRender = false
    } = {}
  ) {
    this.id = id
    this.avatarURL = avatarURL
    this.loginName = loginName
    this.recentTopics = recentTopics
    this.recentReplies = recentReplies
    this.collections = collections
    this.loading = loading
    this.loginState = loginState
    this.serverRender = serverRender
  }

  @action login(accessToken) {
    this.loading = true
    return new Promise((resolve, reject) => {
      post('/api/login', {
        accessToken
      })
        .then((res) => {
          const { success, ...rest } = res.data
          if (success) {
            Object.keys(rest)
              .forEach((key) => {
                this[key] = rest[key]
              })
            this.loginState = true
          }
          resolve(success)
        })
        .catch(reject)
        .finally(() => {
          this.loading = false
        })
    })
  }

  @action auth() {
    this.loading = true
    return new Promise((resolve, reject) => {
      get('/api/user/auth')
        .then((res) => {
          const { success, ...rest } = res.data
          if (success) {
            Object.keys(rest)
              .forEach((key) => {
                this[key] = rest[key]
              })
            this.loginState = true
          }
          resolve(success)
        })
        .catch(reject)
        .finally(() => {
          this.loading = false
        })
    })
  }

  @action getData() {
    if (this.serverRender && this.recentTopics.length > 0 && this.recentReplies.length > 0) return
    if (this.recentTopics.length === 0) {
      get(`/api/user/${this.loginName}`)
        .then((res) => {
          const { data } = res
          if (data.success) {
            this.recentTopics = data.data.recent_topics
            this.recentReplies = data.data.recent_replies
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
    if (this.recentReplies.length === 0) {
      get(`/api/topic_collect/${this.loginName}`)
        .then((res) => {
          const { data } = res
          if (data.success) {
            this.collections = data.data
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  toJS() {
    return {
      id: this.id,
      loginName: this.loginName,
      avatarURL: this.avatarURL,
      recentTopics: this.recentTopics,
      recentReplies: this.recentReplies,
      collections: this.collections,
      loginState: this.loginState,
      loading: this.loading,
      serverRender: this.serverRender
    }
  }
}

export default User