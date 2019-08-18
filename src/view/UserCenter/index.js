import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  withStyles
} from '@material-ui/core'
import UserAvatar from '../../components/userAvatar'

@inject(stores => ({
  user: stores.user
}))
@observer
class UserCenter extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const { user } = this.props
    if (!user.loginState) return
    user.getData()
  }

  handleClick(id) {
    const { history } = this.props
    history.push(`/topic/${id}`)
  }

  render() {
    const { user, classes } = this.props
    return user.loginState ? (
      <div className={classes.root}>
        <UserAvatar avatar={user.avatarURL}/>
        <Grid container justify="space-around">
          <Grid item xs={12} md={4} className={classes.card}>
            <Paper>
              <div className={classes.title}>
                新建的话题
              </div>
              <List className={classes.list}>
                {
                  user.recentTopics.map(item => (
                    <ListItem button key={item.id} onClick={() => this.handleClick(item.id)}>
                      <ListItemAvatar>
                        <Avatar alt="avatar" src={item.author.avatar_url}/>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography noWrap>{item.title}</Typography>}
                      />
                    </ListItem>
                  ))
                }
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} className={classes.card}>
            <Paper>
              <div className={classes.title}>
                回复的话题
              </div>
              <List className={classes.list}>
                {
                  user.recentReplies.map(item => (
                    <ListItem button key={item.id} onClick={() => this.handleClick(item.id)}>
                      <ListItemAvatar>
                        <Avatar alt="avatar" src={item.author.avatar_url}/>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography noWrap>{item.title}</Typography>}
                      />
                    </ListItem>
                  ))
                }
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} className={classes.card}>
            <Paper>
              <div className={classes.title}>
                收藏的话题
              </div>
              <List className={classes.list}>
                {
                  user.collections.map(item => (
                    <ListItem button key={item.id} onClick={() => this.handleClick(item.id)}>
                      <ListItemAvatar>
                        <Avatar alt="avatar" src={item.author.avatar_url}/>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography noWrap>{item.title}</Typography>}
                      />
                    </ListItem>
                  ))
                }
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    ) : null
  }
}

export default withStyles(({ palette }) => (
  {
    root: {
      paddingBottom: 20
    },
    card: {
      padding: 10
    },
    title: {
      height: 40,
      lineHeight: '40px',
      color: '#fff',
      paddingLeft: 10,
      backgroundColor: palette.secondary.main
    },
    list: {
      padding: 0
    }
  }
))(UserCenter)
