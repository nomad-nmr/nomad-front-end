import React, { Component } from 'react'
import InfoCards from '../../components/InfoCards/InfoCards'
import StatusTabs from '../../components/StatusTabs/StatusTabs'
import { Spin, Empty, Modal } from 'antd'
import axios from '../../axios-firebase'

export class Dashboard extends Component {
  state = {
    statusOverview: [],
    statusTable: [],
    cardsLoading: true,
    activeTab: '1'
  }

  getStatusOverview() {
    axios
      .get('/cards.json')
      .then(res => {
        console.log(res.data)
        this.setState({ statusOverview: res.data, cardsLoading: false })
      })
      .catch(err =>
        Modal.error({
          title: 'Error message',
          content: `${err}`
        })
      )
  }

  getStatusTable(tab) {
    axios
      .get(`/status-tables/${tab}.json`)
      .then(res => {
        console.log(res.data.table.tr)
      })
      .catch(err =>
        Modal.error({
          title: 'Error message',
          content: `${err}`
        })
      )
  }

  componentDidMount() {
    this.getStatusOverview()
    this.getStatusTable(1)
  }

  tabChangeHandler = tabId => {
    this.setState({ activeTab: tabId })
  }

  render() {
    const noData = (
      <div>
        <Empty style={{ margin: '30px' }} />
        <Spin size='large' />
      </div>
    )
    return (
      <>
        {!this.props.showCards ? null : this.state.cardsLoading ? (
          noData
        ) : (
          <InfoCards cardsData={this.state.statusOverview} clicked={this.tabChangeHandler} />
        )}
        <StatusTabs
          activeTab={this.state.activeTab}
          overview={this.state.statusOverview}
          tableData={this.state.statusTable}
          clicked={this.tabChangeHandler}
        />
      </>
    )
  }
}

export default Dashboard
