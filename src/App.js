import React, { Component, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import classes from './App.module.css'

import AdminMenu from './components/AdminMenu/AdminMenu'
import NavBar from './components/NavBar/NavBar'
import LoginModal from './components/LoginModal/LoginModal'
import Dashboard from './containers/Dashboard/Dashboard'
import Groups from './containers/Groups/Groups'
import Instruments from './containers/Instruments/Instruments'
import Experiments from './containers/Experiments/Experiments'
import Error404 from './components/Errors/Error404'
import Error403 from './components/Errors/Error403'

const { Header, Sider, Content, Footer } = Layout

export class App extends Component {
	state = {
		adminAccess: true,
		adminMenuCollapsed: true,
		loginModalVisible: false
	}

	toggleAdminMenu = () => {
		this.setState(prevState => {
			return { adminMenuCollapsed: !prevState.adminMenuCollapsed }
		})
	}

	loginAccessHandler = () => {
		this.setState({ loginModalVisible: true })
	}

	cancelLoginHandler = () => {
		this.setState({ loginModalVisible: false })
	}

	render() {
		// Lazy loading - TODO: add to other container imports to improve performance once app gets bigger
		const Users = this.state.adminAccess ? React.lazy(() => import('./containers/Users/Users')) : Error403

		const { adminAccess, adminMenuCollapsed, loginModalVisible } = this.state

		return (
			<Layout>
				{adminAccess ? (
					<Sider trigger={null} className={classes.Sider} collapsible collapsed={this.state.adminMenuCollapsed}>
						<AdminMenu collapsed={adminMenuCollapsed} />
					</Sider>
				) : null}

				<Layout>
					<Header className={classes.Header}>
						<NavBar
							adminAccess={adminAccess}
							collapsed={adminMenuCollapsed}
							toggleClicked={this.toggleAdminMenu}
							avatarClicked={this.loginAccessHandler}
						/>
					</Header>
					<Content className={classes.Content}>
						<Switch>
							<Route
								path='/dashboard/users'
								render={() => (
									<Suspense fallback={<Spin size='large' tip='Loading ...' style={{ margin: '200px' }} />}>
										<Users />
									</Suspense>
								)}
							/>
							<Route path='/dashboard/groups' component={adminAccess ? Groups : Error403} />
							<Route path='/dashboard/instruments' component={adminAccess ? Instruments : Error403} />
							<Route path='/dashboard/experiments' component={adminAccess ? Experiments : Error403} />
							<Route exact path='/dashboard' component={Dashboard} />
							<Redirect from='/dashboard/dashboard' to='/dashboard' />
							<Redirect exact from='/' to='/dashboard' />
							<Route component={Error404} />
						</Switch>
						{loginModalVisible ? (
							<LoginModal visible={loginModalVisible} cancelClicked={this.cancelLoginHandler} />
						) : null}
					</Content>
					<Footer className={classes.Footer}>Footer</Footer>
				</Layout>
			</Layout>
		)
	}
}

export default App
