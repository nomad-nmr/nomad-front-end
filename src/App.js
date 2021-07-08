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
	const Groups = React.lazy(() => import('./containers/Groups/Groups'))
	const Message = React.lazy(() => import('./containers/Message/Message'))
	const ExpHistory = React.lazy(() => import('./containers/ExpHistory/ExpHistory'))
	const ParameterSets = React.lazy(() => import('./containers/ParameterSets/ParameterSets'))
	const Submit = React.lazy(() => import('./containers/Submit/Submit'))
	const BatchSubmit = React.lazy(() => import('./containers/BatchSubmit/BatchSubmit'))

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
					redirect={props.followPath}
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
									return accessLevel === 'admin' ? <Users /> : <Redirect to='/dashboard' />
								}}
							/>
							<Route
								path='/admin/groups'
								render={() => {
									return accessLevel === 'admin' ? <Groups /> : <Redirect to='/dashboard' />
								}}
							/>
							<Route
								path='/admin/message'
								render={() => {
									return accessLevel === 'admin' ? <Message /> : <Redirect to='/dashboard' />
								}}
							/>
							<Route
								path='/admin/instruments'
								render={() => {
									return accessLevel === 'admin' ? <Instruments /> : <Redirect to='/dashboard' />
								}}
							/>
							<Route
								path='/admin/history'
								render={() => {
									return accessLevel === 'admin' ? <ExpHistory /> : <Redirect to='/dashboard' />
								}}
							/>
							<Route
								path='/admin/parameter-sets'
								render={() => {
									return accessLevel === 'admin' ? <ParameterSets /> : <Redirect to='/dashboard' />
								}}
							/>
							<Route exact path='/dashboard' render={() => <Dashboard />} />
							<Route exact path='/reset/:token' component={Reset} />
							<Route
								exact
								path='/submit'
								render={() => {
									return username &&
										process.env.REACT_APP_SUBMIT_ON === 'true' &&
										accessLevel !== 'user-b' ? (
										<Submit />
									) : (
										<Redirect to='/dashboard' />
									)
								}}
							/>
							<Route
								exact
								path='/batch-submit'
								render={() =>
									process.env.REACT_APP_BATCH_SUBMIT_ON === 'true' ? (
										<BatchSubmit />
									) : (
										<Redirect to='/dashboard' />
									)
								}
							/>
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
		authSpin: state.auth.loading,
		followPath: state.auth.followTo
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
