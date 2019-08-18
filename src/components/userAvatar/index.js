import React from 'react'
import { Avatar, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import bg from '../../public/images/bg.jpg'
import baselinePerson from '../../public/images/baseline-person.svg'

const styles = makeStyles({
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 250,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `url(${bg})`
  },
  avatar: {
    width: 70,
    height: 70,
    backgroundColor: '#e1e1e1'
  }
})

const UserAvatar = ({ avatar }) => {
  const classes = styles()
  return (
    <div className={classes.avatarContainer}>
      <Avatar className={classes.avatar} src={avatar}/>
    </div>
  )
}

UserAvatar.defaultProps = {
  avatar: baselinePerson
}

UserAvatar.propTypes = {
  avatar: PropTypes.string
}

export default UserAvatar