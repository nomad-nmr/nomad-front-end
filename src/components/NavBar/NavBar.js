import React from 'react'
import { Avatar, Tooltip } from 'antd'
import classes from './NavBar.module.css'
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import logoWideLight from '../../assets/logo-wide-light.png'

const NavBar = props => {
	// Setting up components for left side of NavBar. Components dynamically change with state of admin sider menu.

	const toggle = props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
	const navLeft = props.adminAccess ? (
		<Tooltip placement='bottomLeft' title='Admin Menu Toggle'>
			<div className={classes.Toggle} onClick={props.toggleClicked}>
				{toggle}
			</div>
		</Tooltip>
	) : (
		<div>
			<img src={logoWideLight} alt='NOMAD logo wide' className={classes.Logo} />
		</div>
	)

	return (
		<nav className={classes.NavBar}>
			{navLeft}
			<div className={classes.AlignRight}>
				<Avatar size='large' icon={<UserOutlined />} className={classes.Avatar} />
			</div>
		</nav>
	)
}

export default NavBar
