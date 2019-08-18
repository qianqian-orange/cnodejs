import React from 'react'
import { StaticRouter } from 'react-router-dom'
import {
  Provider,
  useStaticRendering
} from 'mobx-react'
import App from './view/App'
import { createStoreMap } from './store'

// 让mobx在服务端渲染的时候不会重复数据变换
useStaticRendering(true)

export default (stores, context, url) => (
  <Provider {...stores}>
    <StaticRouter context={context} location={url}>
      <App/>
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
