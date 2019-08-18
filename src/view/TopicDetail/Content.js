import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import { markdown } from '../../utils/variable'

const styles = makeStyles({
  root: Object.assign({
    padding: '10px 20px'
  }, markdown)
})

const Content = ({ topicDetail }) => {
  const classes = styles()
  return (
    <>
      {/* eslint-disable-next-line */}
      <div className={classes.root} dangerouslySetInnerHTML={{ __html: topicDetail.content }}/>
    </>
  )
}

Content.propTypes = {
  topicDetail: PropTypes.object.isRequired
}

export default Content