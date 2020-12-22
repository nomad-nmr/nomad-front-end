import React, { useState, Suspense, useEffect } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	closeAuthModal,
	signInHandler,
	signOutHandler,
	authCheckState,
	postPasswdReset
} from './store/actions'

import { Layout, Spin, BackTop, Affix } from 'antd'
import classes from './App.module.css'

import AdminMenu from './components/AdminMenu/AdminMenu'
import NavBar from './components/NavBar/NavBar'
import LoginModal from './components/Modals/LoginModal/LoginModal'
import LogoutModal from './components/Modals/LogoutModal/LogoutModal'
import Dashboard from './containers/Dashboard/Dashboard'
import Groups from './containers/Groups/Groups'
import Experiments from './containers/Experiments/Experiments'
import Error500 from './components/Errors/Error500'
import Error404 from './components/Errors/Error404'
import Error403 from './components/Errors/Error403'
import Credits from './components/Credits/Credits'
import Reset from './containers/Reset/Reset'

const { Header, Sider, Content, Footer } = Layout

const App = props => {
	const [adminMenuCollapsed, setAdminMenuCollapsed] = useState(true)

	const toggleAdminMenu = () => {
		setAdminMenuCollapsed(!adminMenuCollapsed)
	}

	const { username, accessLevel, authModalVisible, closeModal, onSignIn, onSignOut, onTryAutoSignIn } = props

	useEffect(() => {
		onTryAutoSignIn()
	}, [onTryAutoSignIn])

	// Lazy loading - TODO: add to other container imports to improve performance once app gets bigger
	const Users = React.lazy(() => import('./containers/Users/Users'))
	const Instruments = React.lazy(() => import('./containers/Instruments/Instruments'))

	//Logic for authentication modal. Different modal is rendered depending whether a user is logged in or not
	let authModal = null
	if (authModalVisible) {
		if (username) {
			authModal = (
				<LogoutModal
					visible={authModalVisible}
					cancelClicked={closeModal}
					okClicked={onSignOut}
					token={props.authToken}
				/>
			)
		} else {
			authModal = (
				<LoginModal
					visible={authModalVisible}
					cancelClicked={closeModal}
					signInHandler={onSignIn}
					passwdResetHandler={props.onPasswdReset}
					loading={props.authSpin}
				/>
			)
		}
	}

	return (
		<Layout>
			{accessLevel === 'admin' ? (
				<Affix className={classes.AdminMenu}>
					<Sider trigger={null} className={classes.Sider} collapsible collapsed={adminMenuCollapsed}>
						<AdminMenu collapsed={adminMenuCollapsed} />
					</Sider>
				</Affix>
			) : null}

			<Layout>
				<Affix>
					<Header className={classes.Header}>
						<NavBar collapsed={adminMenuCollapsed} toggleClicked={toggleAdminMenu} />
					</Header>
				</Affix>
				<Content className={classes.Content}>
					<Suspense fallback={<Spin size='large' tip='Loading ...' style={{ margin: '200px' }} />}>
						<Switch>
							<Route
								path='/admin/users'
								render={() => {
									return accessLevel === 'admin' ? <Users /> : <Error403 />
								}}
							/>
							<Route path='/admin/groups' component={accessLevel === 'admin' ? Groups : Error403} />
							<Route
								path='/admin/instruments'
								render={() => {
									return accessLevel === 'admin' ? <Instruments /> : <Error403 />
								}}
							/>
							<Route
								path='/admin/experiments'
								component={accessLevel === 'admin' ? Experiments : Error403}
							/>
							<Route exact path='/dashboard' render={() => <Dashboard />} />
							<Route exact path='/reset/:token' component={Reset} />
							<Route path='/500' component={Error500} />
							<Route path='/404' component={Error404} />
							<Route path='/403' component={Error403} />
							<Redirect from='/admin/dashboard' to='/dashboard' />
							<Redirect exact from='/' to='/dashboard' />
							<Route component={Error404} />
						</Switch>
					</Suspense>
					{authModal}
					<BackTop visibilityHeight={200} style={{ marginBottom: '25px' }} />
				</Content>
				<Footer className={classes.Footer}>
					<Credits />
				</Footer>
			</Layout>
		</Layout>
	)
}

const mapStateToProps = state => {
	return {
		username: state.auth.username,
		authToken: state.auth.token,
		accessLevel: state.auth.accessLevel,
		authModalVisible: state.auth.authModalVisible,
		authSpin: state.auth.loading
	}
}

const mapDispatchToProps = dispatch => {
	return {
		closeModal: () => dispatch(closeAuthModal()),
		onSignIn: formData => dispatch(signInHandler(formData)),
		onSignOut: token => dispatch(signOutHandler(token)),
		onTryAutoSignIn: () => dispatch(authCheckState()),
		onPasswdReset: formData => dispatch(postPasswdReset(formData))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
