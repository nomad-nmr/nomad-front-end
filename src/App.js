import React, { Component, Suspense } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { Layout, Spin, BackTop } from 'antd'
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

const { Header, Sider, Content, Footer } = Layout

export class App extends Component {
  state = {
    user: null,
    adminAccess: false,
    adminMenuCollapsed: true,
    authModalVisible: false,
    showCards: true
  }

  toggleAdminMenu = () => {
    this.setState(prevState => {
      return { adminMenuCollapsed: !prevState.adminMenuCollapsed }
    })
  }

  openAuthModal = () => {
    this.setState({ authModalVisible: true })
  }

  signInHandler = form => {
    form
      .validateFields()
      .then(values => {
        this.setState({
          user: values.username,
          adminAccess: values.username === 'admin',
          authModalVisible: false
        })
      })
      .catch(info => {
        console.log('Validation Failed', info)
      })
  }

  signOutHandler = () => {
    this.setState({ user: null, adminAccess: false, authModalVisible: false })
    this.props.history.push({ pathname: '/dashboard' })
  }

  closeModalHandler = () => {
    this.setState({ authModalVisible: false })
  }

  toggleCardsHandler = () => {
    this.setState(prevState => {
      return { showCards: !prevState.showCards }
    })
  }

  render() {
    // Lazy loading - TODO: add to other container imports to improve performance once app gets bigger
    const Users = this.state.adminAccess ? React.lazy(() => import('./containers/Users/Users')) : Error403

    const { adminAccess, adminMenuCollapsed, authModalVisible, user } = this.state

    //Logic for authentication modal. Different modal is rendered depending whether a user is logged in or not
    let authModal = null
    if (this.state.authModalVisible) {
      if (user) {
        authModal = (
          <LogoutModal
            visible={authModalVisible}
            cancelClicked={this.closeModalHandler}
            okClicked={this.signOutHandler}
          />
        )
      } else {
        authModal = (
          <LoginModal
            visible={authModalVisible}
            cancelClicked={this.closeModalHandler}
            signInClicked={this.signInHandler}
          />
        )
      }
    }

    return (
      <Layout>
        {adminAccess ? (
          <Sider
            trigger={null}
            className={classes.Sider}
            collapsible
            collapsed={this.state.adminMenuCollapsed}
          >
            <AdminMenu collapsed={adminMenuCollapsed} />
          </Sider>
        ) : null}

        <Layout>
          <Header className={classes.Header}>
            <NavBar
              currentUser={user}
              adminAccess={adminAccess}
              collapsed={adminMenuCollapsed}
              toggleClicked={this.toggleAdminMenu}
              avatarClicked={this.openAuthModal}
              cardSwitchOn={this.state.showCards}
              toggleCards={this.toggleCardsHandler}
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
              <Route exact path='/dashboard' render={() => <Dashboard showCards={this.state.showCards} />} />
              <Redirect from='/dashboard/dashboard' to='/dashboard' />
              <Redirect exact from='/' to='/dashboard' />
              <Route component={Error404} />
            </Switch>
            {authModal}
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

export default withRouter(App)
