import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import MenuBar from '../../layout/MenuBar'
import TopicList from '../TopicList'
import { resolveSearchParams } from '../../utils/url'
import { tabMap } from '../../utils/variable'

function getTab(search) {
  if (search.tab) {
    return tabMap[search.tab] ? search.tab : 'all'
  }
  return 'all'
}

const Topic = ({ location, history }) => {
  const search = resolveSearchParams(location.search)
  const [tab, setTab] = useState(getTab(search))

  function handleChange(event, value) {
    setTab(value)
    history.push({
      pathname: '/topic',
      search: `tab=${value}`
    })
  }

  function handleClick(id) {
    history.push(`/topic/${id}`)
  }

  return (
    <>
      <Helmet>
        <title>话题列表</title>
      </Helmet>
      <MenuBar tab={tab} handleChange={handleChange} tabMap={tabMap}/>
      <TopicList tab={tab} handleClick={handleClick}/>
    </>
  )
}

Topic.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default Topic