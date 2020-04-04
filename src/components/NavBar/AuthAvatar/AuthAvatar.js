import React, { useContext } from 'react'
import { Avatar, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import classes from './AuthAvatar.module.css'
import NavbarContext from '../../../context/navbar-context'

const AuthAvatar = (props) => {
  const { currentUser, authAvatarClicked, adminAccess, onSignOut } = useContext(NavbarContext)
  let avatarText = ''
  const assignedClasses = [classes.AuthAvatar]

  let avatarEl
  if (currentUser) {
    if (adminAccess) {
      assignedClasses.push(classes.Admin)
      avatarText = 'ADMIN'
    } else {
      assignedClasses.push(classes.User)
      avatarText = currentUser[0].toUpperCase()
    }
    avatarEl = (
      <Popover
        placement='bottomRight'
        title={
          <>
            Signed in as <strong>{currentUser}</strong>
          </>
        }
        content={
          <span className={classes.Popover} onClick={onSignOut}>
            Sign out
          </span>
        }
      >
        <Avatar size='large' className={assignedClasses.join(' ')} onClick={authAvatarClicked}>
          {avatarText}
        </Avatar>
      </Popover>
    )
  } else {
    avatarEl = (
      <Avatar size='large' className={assignedClasses.join(' ')} onClick={authAvatarClicked}>
        {<UserOutlined />}
      </Avatar>
    )
  }

  return <>{avatarEl}</>
}

export default AuthAvatar
