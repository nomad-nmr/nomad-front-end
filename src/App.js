import React, { Component, Suspense } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { Layout, Spin, BackTop, Affix, Modal } from 'antd'
import axios from './axios-firebase'
import navbarContext from './context/navbar-context'
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
    user: null,
    adminAccess: false,
    adminMenuCollapsed: true,
    authModalVisible: false,
    showCards: true,
    statusButtons: [],
    drawerStatus: {
      visible: false,
      id: '',
      dataLoading: true,
      tableData: []
    }
  }

  componentDidMount() {
    axios
      .get('/buttons.json')
      .then((res) => {
        this.setState({ statusButtons: res.data })
      })
      .catch((err) =>
        Modal.error({
          title: 'Error message',
          content: `${err}`
        })
      )
  }

  toggleAdminMenu = () => {
    this.setState((prevState) => {
      return { adminMenuCollapsed: !prevState.adminMenuCollapsed }
    })
  }

  openAuthModal = () => {
    this.setState({ authModalVisible: true })
  }

  signInHandler = (form) => {
    form
      .validateFields()
      .then((values) => {
        this.setState({
          user: values.username,
          adminAccess: values.username === 'admin',
          authModalVisible: false
        })
      })
      .catch((info) => {})
  }

  signOutHandler = () => {
    this.setState({ user: null, adminAccess: false, authModalVisible: false })
    this.props.history.push({ pathname: '/dashboard' })
  }

  closeModalHandler = () => {
    this.setState({ authModalVisible: false })
  }

  toggleCardsHandler = () => {
    this.setState((prevState) => {
      return { showCards: !prevState.showCards }
    })
  }

  openDrawerHandler = (id) => {
    const newDrawerStatus = { ...this.state.drawerStatus }
    newDrawerStatus.visible = true
    newDrawerStatus.id = id
    this.setState({ drawerStatus: newDrawerStatus })

    axios
      .get('/drawer-tables/' + id + '.json')
      .then((res) => {
        const tableDataSource = res.data ? res.data : []
        const keysArr = [
          'Holder',
          'Status',
          'Name',
          'ExpNo',
          'Experiment',
          'Group',
          'Time',
          'Title',
          'Instrument',
          'Description'
        ]
        const tableData = []

        let highlight = false
        tableDataSource.forEach((row, index) => {
          const entries = []
          row.forEach((col, i) => {
            entries.push([keysArr[i], col.text])
          })

          // Adding property into the row object that will be used to highlight rows with the same ExpNo
          const prevRowObj = [...tableData][index - 1]

          if (prevRowObj) {
          }
          const rowObj = Object.fromEntries(entries)

          if (prevRowObj) {
            if (prevRowObj.Name !== rowObj.Name) {
              highlight = !highlight
            }
          }
          // Extracting username from dataset name
          const username = rowObj.Name.split('-')[3]

          // Adding new properties to row object and pushing it to table data array
          if (rowObj.Status !== 'Available') {
            tableData.push(
              Object.assign(rowObj, { key: index.toString(), Username: username, highlight: highlight })
            )
          }
        })

        newDrawerStatus.dataLoading = false
        newDrawerStatus.tableData = tableData
        this.setState({ drawerStatus: newDrawerStatus })
      })
      .catch((err) =>
        Modal.error({
          title: 'Error message',
          content: `${err}`
        })
      )
  }

  closeDrawerHandler = () => {
    const newDrawerStatus = { ...this.state.drawerStatus }
    newDrawerStatus.visible = false
    newDrawerStatus.tableData = []
    this.setState({ drawerStatus: newDrawerStatus })
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
          <Affix className={classes.AdminMenu}>
            <Sider
              trigger={null}
              className={classes.Sider}
              collapsible
              collapsed={this.state.adminMenuCollapsed}
            >
              <AdminMenu collapsed={adminMenuCollapsed} />
            </Sider>
          </Affix>
        ) : null}

        <Layout>
          <Affix>
            <Header className={classes.Header}>
              <navbarContext.Provider
                value={{
                  currentUser: this.state.user,
                  adminAccess: this.state.adminAccess,
                  authAvatarClicked: this.openAuthModal,
                  onSignOut: this.signOutHandler,
                  cardSwitchOn: this.state.showCards,
                  toggleCards: this.toggleCardsHandler,
                  statusButtonsData: this.state.statusButtons,
                  statusButtonClicked: this.openDrawerHandler
                }}
              >
                <NavBar
                  currentUser={user}
                  adminAccess={adminAccess}
                  collapsed={adminMenuCollapsed}
                  toggleClicked={this.toggleAdminMenu}
                  avatarClicked={this.openAuthModal}
                />
              </navbarContext.Provider>
            </Header>
          </Affix>
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
            <StatusDrawer status={this.state.drawerStatus} closeClicked={this.closeDrawerHandler} />
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
