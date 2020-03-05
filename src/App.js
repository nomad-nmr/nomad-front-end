import React, { Component } from 'react'
import { Layout } from 'antd'
import classes from './App.module.css'

import AdminMenu from './components/AdminMenu/AdminMenu'
import NavBar from './components/NavBar/NavBar'

const { Header, Sider, Content, Footer } = Layout

export class App extends Component {
	state = {
		adminAccess: true,
		adminMenuCollapsed: true
	}

	toggleAdminMenu = () => {
		this.setState(prevState => {
			return { adminMenuCollapsed: !prevState.adminMenuCollapsed }
		})
	}

	render() {
		return (
			<Layout>
				{this.state.adminAccess ? (
					<Sider
						trigger={null}
						className={classes.Sider}
						collapsible
						collapsed={this.state.adminMenuCollapsed}>
						<AdminMenu collapsed={this.state.adminMenuCollapsed} />
					</Sider>
				) : null}

				<Layout>
					<Header className={classes.Header}>
						<NavBar
							collapsed={this.state.adminMenuCollapsed}
							toggleClicked={this.toggleAdminMenu}
							adminAccess={this.state.adminAccess}
						/>
					</Header>
					<Content className={classes.Content}>Content</Content>
					<Footer className={classes.Footer}>Footer</Footer>
				</Layout>
			</Layout>
		)
	}
}

export default App
