import React from 'react'
import { withRouter } from 'react-router-dom'
import { Avatar, Tooltip, PageHeader, Popover, Switch } from 'antd'
import classes from './NavBar.module.css'
import StatusButtons from './StatusButtons/StatusButtons'

import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import logoWideLight from '../../assets/logo-wide-light.png'
import dashIcon from '../../assets/dashboard.svg'
import userIcon from '../../assets/user.svg'
import groupIcon from '../../assets/group.svg'
import magnetIcon from '../../assets/magnet.svg'
import experimentIcon from '../../assets/lab.svg'

const NavBar = props => {
  // Dynamic setting of header according to location
  //After implementing Redux three new lower level components could be made - Header , Auth Avatar , Status Buttons

  let headerTitle = ''
  let avatarSrc
  let extra = null

  switch (props.location.pathname) {
    case '/dashboard':
      headerTitle = 'Dashboard'
      avatarSrc = dashIcon
      extra = (
        <div className={classes.SwitchElement}>
          <label>Cards</label>
          <Switch
            size='small'
            checked={props.cardSwitchOn}
            checkedChildren='On'
            unCheckedChildren='Off'
            onChange={props.toggleCards}
          />
        </div>
      )

      break
    case '/dashboard/users':
      headerTitle = 'Manage Users'
      avatarSrc = userIcon
      break
    case '/dashboard/groups':
      headerTitle = 'Manage Groups'
      avatarSrc = groupIcon
      break

    case '/dashboard/instruments':
      headerTitle = 'Setting Instruments'
      avatarSrc = magnetIcon
      break
    case '/dashboard/experiments':
      headerTitle = 'Setting Experiments'
      avatarSrc = experimentIcon
      break
    default:
      headerTitle = ''
      avatarSrc = ''
  }

  // Setting up components for left side of NavBar. Components dynamically change with state of admin sider menu.

  const toggleButton = props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
  const navLeft = props.adminAccess ? (
    <Tooltip placement='bottomLeft' title='Admin Menu Toggle'>
      <div className={classes.Toggle} onClick={props.toggleClicked}>
        {toggleButton}
      </div>
    </Tooltip>
  ) : (
    <div>
      <img
        src={logoWideLight}
        alt='NOMAD logo wide'
        className={classes.Logo}
        onClick={() => window.location.reload()}
      />
    </div>
  )

  //Setting Page Header not to show if user is not admin and navigates into admin menu
  let pageHeaderElement = null
  if (props.adminAccess || props.location.pathname === '/dashboard') {
    pageHeaderElement = (
      <PageHeader
        className={classes.PageHeader}
        title={headerTitle}
        avatar={{ src: avatarSrc }}
        extra={extra}
      />
    )
  }

  //Setting avatar  according to currentUser
  let authAvatar = (
    <Avatar
      size='large'
      icon={<UserOutlined />}
      className={classes.AuthAvatar}
      onClick={props.avatarClicked}
    />
  )

  if (props.currentUser) {
    const assignedClasses = [classes.Avatar]
    let avatarText = ''

    if (props.adminAccess) {
      assignedClasses.push(classes.Admin)
      avatarText = 'ADMIN'
    } else {
      assignedClasses.push(classes.User)
      avatarText = props.currentUser[0].toUpperCase()
    }

    authAvatar = (
      //Popover is just temporary solution. Use Dropdown once there is more function to put in the menu
      <Popover
        placement='bottomRight'
        title={
          <>
            Signed in as <strong>{props.currentUser}</strong>
          </>
        }
        content={
          <span className={classes.Popover} onClick={props.avatarClicked}>
            Sign out
          </span>
        }
      >
        <Avatar size='large' className={assignedClasses.join(' ')} onClick={props.avatarClicked}>
          {avatarText}
        </Avatar>
      </Popover>
    )
  }

  return (
    <nav className={classes.NavBar}>
      {navLeft}
      {pageHeaderElement}
      <div className={classes.AlignRight}>
        <StatusButtons data={props.statusButtonsData} />
        {authAvatar}
      </div>
    </nav>
  )
}

export default withRouter(NavBar)
