import React, { Component, Suspense } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Spin, BackTop, Affix, Modal } from 'antd'
import axios from './axios-firebase'
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
import { closeAuthModal, signInHandler, signOutHandler } from './store/actions'

const { Header, Sider, Content, Footer } = Layout

export class App extends Component {
  state = {
    adminMenuCollapsed: true,
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
      .then(res => {
        this.setState({ statusButtons: res.data })
      })
      .catch(err =>
        Modal.error({
          title: 'Error message',
          content: `${err}`
        })
      )
  }

  toggleAdminMenu = () => {
    this.setState(prevState => {
      return { adminMenuCollapsed: !prevState.adminMenuCollapsed }
    })
  }

  toggleCardsHandler = () => {
    this.setState(prevState => {
      return { showCards: !prevState.showCards }
    })
  }

  openDrawerHandler = id => {
    const newDrawerStatus = { ...this.state.drawerStatus }
    newDrawerStatus.visible = true
    newDrawerStatus.id = id
    this.setState({ drawerStatus: newDrawerStatus })

    axios
      .get('/drawer-tables/' + id + '.json')
      .then(res => {
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
      .catch(err =>
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
    const { adminMenuCollapsed } = this.state
    const { user, adminAccess, authModalVisible, closeModal, onSignIn, onSignOut } = this.props

    // Lazy loading - TODO: add to other container imports to improve performance once app gets bigger
    const Users = adminAccess ? React.lazy(() => import('./containers/Users/Users')) : Error403

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
            {!user ? <Redirect to='/dashboard' /> : null}
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

const mapStateToProps = state => {
  return {
    user: state.user,
    adminAccess: state.adminAccess,
    authModalVisible: state.authModalVisible
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeAuthModal()),
    onSignIn: form => dispatch(signInHandler(form)),
    signOut: () => dispatch(signOutHandler())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
