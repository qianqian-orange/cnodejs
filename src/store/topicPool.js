import {
  observable,
  action
} from 'mobx'
import { get } from '../utils/http'

export default class TopicPool {
  @observable topics

  @observable details

  @observable loading

  @observable serverRender

  constructor(
    {
      topics = [],
      details = {},
      loading = false,
      serverRender = false
    } = {}
  ) {
    this.topics = topics
    this.loading = loading
    this.details = details
    this.serverRender = serverRender
  }

  @action getData(params) {
    if (this.serverRender) {
      this.serverRender = false
      return
    }
    this.loading = true
    this.topics = []
    get('/api/topics', {
      params
    })
      .then((res) => {
        const { data: { success, data } } = res
        if (success) {
          this.topics = data
        }
      })
      .catch((e) => {
        console.log(e)
      })
      .finally(() => {
        this.loading = false
      })
  }

  @action getTopicDetail(id) {
    if (!this.details[id]) {
      this.loading = true
      get(`/api/topic/${id}`)
        .then((res) => {
          const { data } = res
          if (data.success) {
            this.details[id] = data.data
          }
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }

  toJS() {
    return {
      topics: this.topics,
      details: this.details,
      loading: this.loading,
      serverRender: this.serverRender
    }
  }
}