import React from 'react'
import { withRouter } from 'react-router-dom'
import { Avatar, Tooltip, PageHeader } from 'antd'
import classes from './NavBar.module.css'

import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import logoWideLight from '../../assets/logo-wide-light.png'
import dashIcon from '../../assets/dashboard.svg'
import userIcon from '../../assets/user.svg'
import groupIcon from '../../assets/group.svg'
import magnetIcon from '../../assets/magnet.svg'
import experimentIcon from '../../assets/lab.svg'

const NavBar = props => {
	// Dynamic setting of header according to location
	let headerTitle = ''
	let avatarSrc

	switch (props.location.pathname) {
		case '/dashboard':
			headerTitle = 'Dashboard'
			avatarSrc = dashIcon

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
		<>
			<Tooltip placement='bottomLeft' title='Admin Menu Toggle'>
				<div className={classes.Toggle} onClick={props.toggleClicked}>
					{toggleButton}
				</div>
			</Tooltip>
		</>
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
		pageHeaderElement = <PageHeader className={classes.PageHeader} title={headerTitle} avatar={{ src: avatarSrc }} />
	}

	return (
		<nav className={classes.NavBar}>
			{navLeft}
			{pageHeaderElement}

			<div className={classes.AlignRight}>
				<Avatar size='large' icon={<UserOutlined />} className={classes.Avatar} onClick={props.avatarClicked} />
			</div>
		</nav>
	)
}

export default withRouter(NavBar)
