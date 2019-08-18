import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Button
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import logo from '../public/images/logo.svg'

const style = {
  root: {
    backgroundColor: '#444'
  },
  container: {
    display: 'flex',
    height: 56,
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    '& div.logo': {
      width: '22%',
      minWidth: '140px',
      maxWidth: '220px',
      maxHeight: '100%',
      '& img': {
        width: '100%',
        height: '100%',
        verticalAlign: 'middle'
      }
    },
    '& div.options': {
      '& a:active': {
        color: 'transparent'
      },
      '& button': {
        color: '#fff',
        fontSize: '16px'
      }
    }
  },
  '@media screen and (min-width: 600px)': {
    container: {
      height: 64
    }
  }
}

@inject(stores => ({
  user: stores.user
}))
@observer
class NavBar extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  }

  render() {
    const { user, classes } = this.props
    return (
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <div className={classes.container}>
            <div className="logo">
              <Link to="/topic">
                <img src={logo} alt="logo"/>
              </Link>
            </div>
            <div className="options">
              <Link to={user.loginState ? '/user/center' : '/user/login'}>
                <Button>{user.loginState ? user.loginName : '登录'}</Button>
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(style)(NavBar)