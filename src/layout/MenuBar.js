import React from 'react'
import {
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const styles = makeStyles(() => ({
  root: {
    backgroundColor: '#f6f6f6',
    color: '#80bd01'
  }
}))


const MenuBar = ({ tab, handleChange, tabMap }) => {
  const classes = styles()

  return (
    <Tabs
      value={tab}
      onChange={handleChange}
      className={classes.root}
      variant="scrollable"
      scrollButtons="auto"
    >
      {
        Object.keys(tabMap)
          .map(key => (
            <Tab
              key={tabMap[key].value}
              label={tabMap[key].label}
              value={tabMap[key].value}
            />
          ))
      }
    </Tabs>
  )
}

MenuBar.propTypes = {
  tab: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  tabMap: PropTypes.object.isRequired
}


export default withRouter(MenuBar)