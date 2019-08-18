import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

export default (Com) => {
  class Authorization extends React.PureComponent {
    static propTypes = {
      user: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired
    }

    componentDidMount() {
      const { user, history, location } = this.props
      if (user.loginState) return
      user.auth()
        .then((success) => {
          if (success) return
          history.replace({
            pathname: '/user/login',
            state: {
              from: location.pathname
            }
          })
        })
        .catch((e) => {
          console.log(e)
        })
    }

    render() {
      const { user, ...rest } = this.props
      return user.loginState ? <Com {...rest}/> : null
    }
  }

  return inject(stores => ({
    user: stores.user
  }))(observer(Authorization))
}