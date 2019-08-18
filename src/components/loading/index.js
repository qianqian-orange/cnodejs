import React from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const styles = makeStyles({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0'
  }
})

const Loading = ({ loading }) => {
  const classes = styles()
  return loading ? (
    <div className={classes.loading}>
      <CircularProgress/>
    </div>
  ) : null
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default Loading