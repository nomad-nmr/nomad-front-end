import React from 'react'
import { Menu } from 'antd'
import {
	DashboardOutlined,
	TeamOutlined,
	UserOutlined,
	HistoryOutlined,
	PoundOutlined,
	SettingOutlined,
	ExperimentOutlined,
	DeploymentUnitOutlined,
	BarChartOutlined
} from '@ant-design/icons'
import logoRound from '../../assets/logo-round-small.png'
import logoWideDark from '../../assets/logo-wide-dark.png'

import classes from './AdminMenu.module.css'

const { SubMenu } = Menu

const AdminMenu = props => {
	const logo = props.collapsed ? logoRound : logoWideDark

	return (
		<nav>
			<div className={classes.Logo}>
				<img src={logo} alt='NOMAD logo round' />
			</div>

			<Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
				<Menu.Item key='1'>
					<DashboardOutlined />
					<span>Dashboard</span>
				</Menu.Item>
				<SubMenu
					key='sub1'
					title={
						<span>
							<TeamOutlined />
							<span>User Management</span>
						</span>
					}>
					<Menu.Item key='2'>
						<UserOutlined />
						<span>Users</span>
					</Menu.Item>
					<Menu.Item key='3'>
						<TeamOutlined />
						<span>Groups</span>
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key='sub2'
					title={
						<span>
							<BarChartOutlined />
							<span>Usage Statistics</span>
						</span>
					}>
					<Menu.Item key='4'>
						<HistoryOutlined />
						<span>History Tables</span>
					</Menu.Item>
					<Menu.Item key='5'>
						<PoundOutlined />
						<span>Accounting</span>
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key='sub3'
					title={
						<span>
							<SettingOutlined />
							<span>Settings</span>
						</span>
					}>
					<Menu.Item key='6'>
						<DeploymentUnitOutlined />
						<span>Instruments</span>
					</Menu.Item>
					<Menu.Item key='7'>
						<ExperimentOutlined />
						<span>Experiments</span>
					</Menu.Item>
				</SubMenu>
			</Menu>
		</nav>
	)
}

export default AdminMenu
