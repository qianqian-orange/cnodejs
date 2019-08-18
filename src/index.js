import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import App from './view/App'
import { TopicPool, User } from './store'

const initialState = window.__INITIAL__STATE__ || {} // eslint-disable-line

console.log(1)

const Main = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])

  return (
    <Provider topicPool={new TopicPool(initialState.topicPool)} user={new User(initialState.user)}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  )
}
ReactDOM.hydrate(<Main/>, document.querySelector('#app'))
