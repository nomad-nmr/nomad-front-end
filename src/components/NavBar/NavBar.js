import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Tooltip } from 'antd'
import classes from './NavBar.module.css'
import PageHeader from './PageHeader/PageHeader'
import AuthAvatar from './AuthAvatar/AuthAvatar'

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import logoWideLight from '../../assets/logo-wide-light.png'

const NavBar = props => {
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
					onClick={() => window.location.reload()}
				/>
			</div>
		)

	//Setting Page Header not to show if user is not admin and navigates into admin menu
	let pageHeaderElement = null
	if (props.accessLevel === 'admin' || props.location.pathname === '/dashboard') {
		pageHeaderElement = <PageHeader />
	}

	return (
		<nav className={classes.NavBar}>
			{navLeft}
			{pageHeaderElement}
			<div className={classes.AlignRight}>
				<AuthAvatar />
			</div>
		</nav>
	)
}

const mapStateToProps = state => {
	return {
		accessLevel: state.auth.accessLevel
	}
}

export default connect(mapStateToProps)(withRouter(NavBar))
