import React from 'react'
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  withStyles
} from '@material-ui/core'
import PropTypes from 'prop-types'
import {
  inject,
  observer
} from 'mobx-react'
import Loading from '../../components/loading'
import Primary from './Primary'
import { TopicPool } from '../../store'

const style = {
  root: {
    paddingTop: 0,
    '& div.item': {
      borderBottom: '1px solid #f0f0f0'
    },
    '& div.item:nth-last-of-type(1)': {
      borderBottom: 'none'
    }
  },
}

@inject(stores => ({
  topicPool: stores.topicPool
}))
@observer
class TopicList extends React.PureComponent {
  static propTypes = {
    tab: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    topicPool: PropTypes.instanceOf(TopicPool).isRequired,
  }

  componentDidMount() {
    const {
      topicPool,
      tab
    } = this.props
    topicPool.getData({
      tab
    })
  }

  componentWillReceiveProps(nextProps) {
    const { tab, topicPool } = this.props
    const { tab: nextTab } = nextProps
    if (tab !== nextTab) {
      topicPool.getData({
        tab: nextTab
      })
    }
  }

  render() {
    const {
      classes,
      topicPool,
      handleClick
    } = this.props

    return (
      <>
        <List className={classes.root}>
          {
            topicPool.topics.map(item => (
              <ListItem button className="item" key={item.id} onClick={() => handleClick(item.id)}>
                <ListItemAvatar>
                  <Avatar src={item.author.avatar_url}/>
                </ListItemAvatar>
                <ListItemText primary={<Primary data={item}/>}/>
              </ListItem>
            ))
          }
        </List>
        <Loading loading={topicPool.loading}/>
      </>
    )
  }
}

export default withStyles(style)(TopicList)