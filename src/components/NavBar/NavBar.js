import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { Tooltip } from 'antd'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import logoWideLight from '../../assets/logo-wide-light.png'

import PageHeader from './PageHeader/PageHeader'
import AuthAvatar from './AuthAvatar/AuthAvatar'
import MainMenu from './MainMenu/MainMenu'

import { openAuthModal, toggleAddSample } from '../../store/actions'

import classes from './NavBar.module.css'

const NavBar = props => {
  const location = useLocation()
  const navigate = useNavigate()

  // Setting up components for left side of NavBar. Components dynamically change with state of admin sider menu.
  const toggleButton = props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
  const navLeft =
    props.accessLevel === 'admin' ? (
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
          onClick={() => {
            if (props.accessLevel) {
              if (props.accessLevel.includes('admin') || location.pathname !== '/batch-submit') {
                navigate('/dashboard')
              }
            }
          }}
        />
      </div>
    )

  let menuElement = null

  if (props.accessLevel === 'admin' || location.pathname === '/dashboard') {
    menuElement = (
      <MainMenu
        openAuthModal={props.openModalHandler}
        username={props.username}
        accessLevel={props.accessLevel}
      />
    )
  }

  return (
    <nav className={classes.NavBar}>
      {navLeft}
      <PageHeader />
      <div className={classes.MainMenu}>
        {menuElement}
        <div className={!menuElement ? classes.Avatar : undefined}>
          <AuthAvatar
            onClick={props.openModalHandler}
            username={props.username}
            accessLevel={props.accessLevel}
            redirectTo={props.followPath}
            toggleAddSample={props.tglAddSample}
          />
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    accessLevel: state.auth.accessLevel,
    followPath: state.auth.followTo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tglAddSample: () => dispatch(toggleAddSample()),
    openModalHandler: path => dispatch(openAuthModal(path))
    //openModalHandler takes path as an argument to be used for redirecting after successful login
    // redirecting using openModalHandler became problematic with React Router 6

    //Redirecting is done by useEffect hook in AuthAvatar which gets rerendered after successful login
    //tglAddSample is still in use with batch submission
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
