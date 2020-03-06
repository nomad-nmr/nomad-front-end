import React, { Component, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import classes from './App.module.css'

import AdminMenu from './components/AdminMenu/AdminMenu'
import NavBar from './components/NavBar/NavBar'
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
		adminMenuCollapsed: true
	}

	toggleAdminMenu = () => {
		this.setState(prevState => {
			return { adminMenuCollapsed: !prevState.adminMenuCollapsed }
		})
	}

	render() {
		// Lazy loading - TODO: add to other container imports to improve performance once app gets bigger
		const Users = this.state.adminAccess
			? React.lazy(() => import('./containers/Users/Users'))
			: Error403

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
					<Content className={classes.Content}>
						<Switch>
							<Redirect from='/dashboard/dashboard' to='/dashboard' />
							<Route
								path='/dashboard/users'
								render={() => (
									<Suspense
										fallback={
											<Spin size='large' tip='Loading ...' style={{ margin: '200px' }} />
										}>
										<Users />
									</Suspense>
								)}
							/>
							<Route
								path='/dashboard/groups'
								component={this.state.adminAccess ? Groups : Error403}
							/>
							<Route
								path='/dashboard/instruments'
								component={this.state.adminAccess ? Instruments : Error403}
							/>
							<Route
								path='/dashboard/experiments'
								component={this.state.adminAccess ? Experiments : Error403}
							/>
							<Route exact path='/dashboard' component={Dashboard} />
							<Redirect exact from='/' to='/dashboard' />
							<Route component={Error404} />
						</Switch>
					</Content>
					<Footer className={classes.Footer}>Footer</Footer>
				</Layout>
			</Layout>
		)
	}
}

export default App
