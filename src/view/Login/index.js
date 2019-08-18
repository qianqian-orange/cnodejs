import React from 'react'
import {
  TextField,
  Button,
  Box,
  withStyles
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import UserAvatar from '../../components/userAvatar'

const style = {
  root: {
    paddingBottom: 5
  },
  inputContainer: {
    width: 250,
    margin: '0 auto'
  },
  '@media screen and (max-width: 600px)': {
    inputContainer: {
      width: '100%'
    }
  }
}

@inject(stores => ({
  user: stores.user
}))
@observer
class Login extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      value: '',
      error: false,
      helperText: ''
    }
  }

  handleChange(event) {
    const value = event.target.value.trim()
    this.setState({
      value: event.target.value.trim()
    })
    if (value === '') {
      this.setState({
        error: true,
        helperText: '不能为空'
      })
    }
    const { error } = this.state
    if (value !== '' && error) {
      this.setState({
        error: false,
        helperText: ''
      })
    }
  }

  handleClick() {
    const { error, value } = this.state
    if (error) return
    const { user } = this.props
    user.login(value)
      .then((result) => {
        if (result) {
          const { history, location } = this.props
          history.push(location.state ? location.state.from : '/topic')
        } else {
          this.setState({
            value: '',
            error: true,
            helperText: '你的accessToken不正确'
          })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    const { classes, user } = this.props
    const { value, error, helperText } = this.state
    return (
      <div className={classes.root}>
        <UserAvatar/>
        <div className={classes.inputContainer}>
          <TextField
            label="请输入AccessToken"
            placeholder="请输入AccessToken"
            fullWidth
            type="text"
            error={error}
            value={value}
            required
            helperText={helperText}
            onChange={this.handleChange}
          />
          <Box mb={1}/>
          <Button
            color="secondary"
            variant="contained"
            onClick={this.handleClick}
            disabled={user.loading}
            fullWidth
          >
            登录
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(style)(Login)