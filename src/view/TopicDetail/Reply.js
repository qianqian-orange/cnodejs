import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import { markdown } from '../../utils/variable'

const styles = makeStyles({
  header: {
    fontSize: '14px',
    color: '#444',
    height: 40,
    boxSizing: 'border-box',
    padding: 10,
    backgroundColor: '#f6f6f6'
  },
  reply: {
    borderTop: '1px solid #f0f0f0',
    padding: '10px 10px 10px 45px',
    position: 'relative',
  },
  avatar: {
    position: 'absolute',
    left: '10px',
    width: 30,
    height: 30,
    backgroundColor: '#f00',
    '& img': {
      width: '100%',
      height: '100%',
      verticalAlign: 'middle'
    }
  },
  description: {
    color: '#666',
    fontSize: '12px',
    fontWeight: 700
  },
  markdown
})

const Reply = ({ topicDetail }) => {
  const classes = styles()
  return (
    <div>
      <div className={classes.header}>
        {topicDetail.replies.length}
        &nbsp;回复
      </div>
      {
        topicDetail.replies.map(item => (
          <div key={item.id} className={classes.reply}>
            <span className={classes.avatar}>
              <img src={item.author.avatar_url} alt="avatar"/>
            </span>
            <span className={classes.description}>
              {item.author.loginname}
            </span>
            {/* eslint-disable-next-line */}
            <div className={classes.markdown} dangerouslySetInnerHTML={{ __html: item.content }}/>
          </div>
        ))
      }
    </div>
  )
}

Reply.propTypes = {
  topicDetail: PropTypes.object.isRequired
}

export default Reply