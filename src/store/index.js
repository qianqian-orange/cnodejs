import TopicPool from './topicPool'
import User from './user'

export const createStoreMap = () => ({
  topicPool: new TopicPool(),
  user: new User()
})

export {
  TopicPool,
  User
}

export default {
  TopicPool,
  User
}