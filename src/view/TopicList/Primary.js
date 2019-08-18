import React from 'react'
import {
  Typography,
  makeStyles
} from '@material-ui/core'
import moment from 'moment'
import PropTypes from 'prop-types'
import { tabTranslationMap } from '../../utils/variable'

const styles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  primary: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0 140px 0 70px'
  },
  tab: {
    color: '#fff',
    fontSize: '12px',
    backgroundColor: '#80bd01',
    padding: '2px 4px',
    margin: '0 4px',
    minWidth: 26,
    textAlign: 'center'
  },
  secondary: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    fontSize: '10px'
  },
  replyCount: {
    color: '#80bd01'
  },
  visitCount: {
    color: '#b4b4b4'
  },
  createTime: {
    color: '#778087',
    fontSize: '12px'
  },
  '@media screen and (max-width: 768px)': {
    root: {
      alignItems: 'normal'
    },
    primary: {
      padding: 0
    },
    secondary: {
      paddingTop: 22
    }
  }
}))

const Primary = ({ data }) => {
  const classes = styles()
  return (
    <div className={classes.root}>
      <div className={classes.primary}>
        <span className={classes.tab}>{tabTranslationMap[data.tab]}</span>
        <Typography noWrap>
          {data.title}
        </Typography>
      </div>
      <div className={classes.secondary}>
        <div className="count">
          <span className={classes.replyCount}>{data.reply_count}</span>
          /
          <span className={classes.visitCount}>{data.visit_count}</span>
        </div>
        <span className={classes.createTime}>{moment(data.create_at).format('YYYY-MM-DD hh:mm:ss')}</span>
      </div>
    </div>
  )
}

Primary.propTypes = {
  data: PropTypes.object.isRequired
}

export default Primary