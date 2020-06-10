import React, { Component, Suspense } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { closeAuthModal, signInHandler, signOutHandler, closeDashDrawer } from './store/actions'

import { Layout, Spin, BackTop, Affix } from 'antd'
import classes from './App.module.css'

import AdminMenu from './components/AdminMenu/AdminMenu'
import NavBar from './components/NavBar/NavBar'
import LoginModal from './components/Modals/LoginModal/LoginModal'
import LogoutModal from './components/Modals/LogoutModal/LogoutModal'
import Dashboard from './containers/Dashboard/Dashboard'
import Groups from './containers/Groups/Groups'
import Instruments from './containers/Instruments/Instruments'
import Experiments from './containers/Experiments/Experiments'
import Error404 from './components/Errors/Error404'
import Error403 from './components/Errors/Error403'
import Credits from './components/Credits/Credits'
import StatusDrawer from './components/StatusDrawer/StatusDrawer'

const { Header, Sider, Content, Footer } = Layout

export class App extends Component {
  state = {
    adminMenuCollapsed: true
  }

  toggleAdminMenu = () => {
    this.setState(prevState => {
      return { adminMenuCollapsed: !prevState.adminMenuCollapsed }
    })
  }

  closeDrawerHandler = () => {
    const newDrawerStatus = { ...this.state.drawerStatus }
    newDrawerStatus.visible = false
    newDrawerStatus.tableData = []
    this.setState({ drawerStatus: newDrawerStatus })
  }

  render() {
    const { adminMenuCollapsed } = this.state
    const { user, adminAccess, authModalVisible, closeModal, onSignIn, onSignOut } = this.props

    // Lazy loading - TODO: add to other container imports to improve performance once app gets bigger
    const Users = React.lazy(() => import('./containers/Users/Users'))

    //Logic for authentication modal. Different modal is rendered depending whether a user is logged in or not
    let authModal = null
    if (authModalVisible) {
      if (user) {
        authModal = (
          <LogoutModal visible={authModalVisible} cancelClicked={closeModal} okClicked={onSignOut} />
        )
      } else {
        authModal = (
          <LoginModal visible={authModalVisible} cancelClicked={closeModal} signInClicked={onSignIn} />
        )
      }
    }

    return (
      <Layout>
        {adminAccess ? (
          <Affix className={classes.AdminMenu}>
            <Sider trigger={null} className={classes.Sider} collapsible collapsed={adminMenuCollapsed}>
              <AdminMenu collapsed={adminMenuCollapsed} />
            </Sider>
          </Affix>
        ) : null}

        <Layout>
          <Affix>
            <Header className={classes.Header}>
              <NavBar collapsed={adminMenuCollapsed} toggleClicked={this.toggleAdminMenu} />
            </Header>
          </Affix>
          <Content className={classes.Content}>
            <Suspense fallback={<Spin size='large' tip='Loading ...' style={{ margin: '200px' }} />}>
              {/*{!user ? <Redirect to='/dashboard' /> : null*/}
              <Switch>
                <Route
                  path='/dashboard/users'
                  render={() => {
                    return adminAccess ? <Users /> : <Error403 />
                  }}
                />
                <Route path='/dashboard/groups' component={adminAccess ? Groups : Error403} />
                <Route path='/dashboard/instruments' component={adminAccess ? Instruments : Error403} />
                <Route path='/dashboard/experiments' component={adminAccess ? Experiments : Error403} />
                <Route exact path='/dashboard' render={() => <Dashboard />} />
                <Redirect from='/dashboard/dashboard' to='/dashboard' />
                <Redirect exact from='/' to='/dashboard' />
                <Route component={Error404} />
              </Switch>
            </Suspense>
            {authModal}
            <StatusDrawer status={this.props.drawerStatus} closeClicked={this.props.onCloseDrawer} />
            <BackTop visibilityHeight={200} />
          </Content>
          <Footer className={classes.Footer}>
            <Credits />
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    adminAccess: state.auth.adminAccess,
    authModalVisible: state.auth.authModalVisible,
    drawerStatus: state.dash.drawerStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeAuthModal()),
    onSignIn: form => dispatch(signInHandler(form)),
    onSignOut: () => dispatch(signOutHandler()),
    onCloseDrawer: () => dispatch(closeDashDrawer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
