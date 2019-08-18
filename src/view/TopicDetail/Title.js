import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import { tabTranslationMap } from '../../utils/variable'

const styles = makeStyles({
  root: {
    padding: 10,
    borderBottom: '1px solid #eee'
  },
  title: {
    fontSize: '22px',
    fontWeight: 700,
    lineHeight: 1.3,
    margin: '8px 0'
  },
  description: {
    color: '#838383',
    fontSize: '12px',
    '& span::before': {
      content: '" • "',
      fontWeight: 'bolder'
    }
  },
  tab: {
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'normal',
    backgroundColor: '#80bd01',
    padding: '2px 4px',
    marginRight: 4,
    borderRadius: 3
  }
})

const Title = ({ topicDetail }) => {
  const classes = styles()
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <span className={classes.tab}>{tabTranslationMap[topicDetail.tab]}</span>
        {topicDetail.title}
      </div>
      <div className={classes.description}>
        <span>
          作者：
          {topicDetail.author.loginname}
        </span>
        <span>
          {topicDetail.visit_count}
          &nbsp;次浏览
        </span>
        <span>
          来自：
          {tabTranslationMap[topicDetail.tab]}
        </span>
      </div>
    </div>
  )
}

Title.propTypes = {
  topicDetail: PropTypes.object.isRequired
}

export default Title