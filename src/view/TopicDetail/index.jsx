import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import Title from './Title'
import Content from './Content'
import Reply from './Reply'

@inject(stores => ({
  topicPool: stores.topicPool
}))
@observer
class TopicDetail extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object.isRequired,
    topicPool: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { match: { params: { id } }, topicPool } = this.props
    topicPool.getTopicDetail(id)
  }

  render() {
    const { match: { params: { id } }, topicPool } = this.props
    const topicDetail = topicPool.details[id]
    return topicDetail ? (
      <>
        <Helmet>
          <title>话题详情</title>
        </Helmet>
        <Title topicDetail={topicDetail}/>
        <Content topicDetail={topicDetail}/>
        <Reply topicDetail={topicDetail}/>
      </>
    ) : null
  }
}

export default TopicDetail