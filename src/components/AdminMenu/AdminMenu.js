import React from 'react'
import { Menu } from 'antd'
import Logo from './Logo/Logo'
import { withRouter } from 'react-router-dom'
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

const { SubMenu } = Menu

const adminMenu = props => {
	const handleClick = e => {
		props.history.push({ pathname: e.keyPath[0] })
	}

	return (
		<nav>
			<Logo collapsed={props.collapsed} />

			<Menu
				onClick={handleClick}
				theme='dark'
				mode='inline'
				defaultSelectedKeys={['/dashboard']}
				selectedKeys={[props.location.pathname]}>
				<Menu.Item key='/dashboard'>
					<DashboardOutlined />
					<span>Dashboard</span>
				</Menu.Item>
				<SubMenu
					key='user management'
					title={
						<span>
							<TeamOutlined />
							<span>User Management</span>
						</span>
					}>
					<Menu.Item key='/admin/users'>
						<UserOutlined />
						<span>Manage Users</span>
					</Menu.Item>
					<Menu.Item key='/admin/groups'>
						<TeamOutlined />
						<span>Manage Groups</span>
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key='usage'
					title={
						<span>
							<BarChartOutlined />
							<span>Usage Statistics</span>
						</span>
					}>
					<Menu.Item key='/admin/history'>
						<HistoryOutlined />
						<span>History Tables</span>
					</Menu.Item>
					<Menu.Item key='/admin/accounting'>
						<PoundOutlined />
						<span>Accounting</span>
					</Menu.Item>
				</SubMenu>
				<SubMenu
					key='settings'
					title={
						<span>
							<SettingOutlined />
							<span>Settings</span>
						</span>
					}>
					<Menu.Item key='/admin/instruments'>
						<DeploymentUnitOutlined />
						<span>Instruments</span>
					</Menu.Item>
					<Menu.Item key='/admin/experiments'>
						<ExperimentOutlined />
						<span>Experiments</span>
					</Menu.Item>
				</SubMenu>
			</Menu>
		</nav>
	)
}

export default withRouter(adminMenu)
