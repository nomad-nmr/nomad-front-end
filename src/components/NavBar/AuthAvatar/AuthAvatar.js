import React from 'react'
import { connect } from 'react-redux'
import { Avatar, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import classes from './AuthAvatar.module.css'
import { openAuthModal, signOutHandler } from '../../../store/actions/index'

const AuthAvatar = props => {
  let avatarText = ''
  const assignedClasses = [classes.AuthAvatar]

  let avatarEl
  if (props.user) {
    if (props.adminAccess) {
      assignedClasses.push(classes.Admin)
      avatarText = 'ADMIN'
    } else {
      assignedClasses.push(classes.User)
      avatarText = props.user[0].toUpperCase()
    }
    avatarEl = (
      <Popover
        placement='bottomRight'
        title={
          <>
            Signed in as <strong>{props.user}</strong>
          </>
        }
        content={
          <span className={classes.Popover} onClick={props.onSignOut}>
            Sign out
          </span>
        }
      >
        <Avatar size='large' className={assignedClasses.join(' ')} onClick={props.onClick}>
          {avatarText}
        </Avatar>
      </Popover>
    )
  } else {
    avatarEl = (
      <Avatar size='large' className={assignedClasses.join(' ')} onClick={props.onClick}>
        {<UserOutlined />}
      </Avatar>
    )
  }

  return avatarEl
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    adminAccess: state.auth.adminAccess
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => dispatch(openAuthModal()),
    onSignOut: () => dispatch(signOutHandler())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthAvatar)
