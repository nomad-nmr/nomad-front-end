import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStatusButtons, fetchStatusSummary } from '../../store/actions'

import InfoCards from '../../components/InfoCards/InfoCards'
import StatusTabs from '../../components/StatusTabs/StatusTabs'
import { Spin, Empty, Modal } from 'antd'
import axios from '../../axios-firebase'

class Dashboard extends Component {
  state = {
    statusTable: [],

    tableLoading: true,
    activeTab: '1'
  }

  getStatusTable(tab) {
    this.setState({ statusTable: [] })
    axios
      .get(`/status-tables/${tab}.json`)
      .then(res => {
        //Extracting row object keys from Status table headers and creating entries array for row object
        const tableDataSource = res.data.table.tr ? res.data.table.tr : []
        const keysArr = tableDataSource.splice(0, 1)[0].td.map(entry => entry.text)
        const tableData = []
        let highlight = false
        tableDataSource.forEach((row, index) => {
          const entries = []
          row.td.forEach((col, i) => {
            entries.push([keysArr[i], col.text])
          })

          // Adding property into the row object that will be used to highlight rows with the same ExpNo
          const prevRowObj = [...tableData][index - 1]
          if (prevRowObj) {
          }
          const rowObj = Object.fromEntries(entries)

          if (prevRowObj) {
            if (prevRowObj.Holder !== rowObj.Holder) {
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

        this.setState({ statusTable: tableData, tableLoading: false })
      })
      .catch(err =>
        Modal.error({
          title: 'Error message',
          content: `${err}`
        })
      )
  }

  componentDidMount() {
    this.props.fetchButtons()
    this.props.fetchStatusSum()
    this.getStatusTable(1)
  }

  tabChangeHandler = tabId => {
    this.setState({ tableLoading: true })
    this.getStatusTable(tabId)
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
          <InfoCards cardsData={this.props.statusSummary} clicked={this.tabChangeHandler} />
        )}
        <StatusTabs
          activeTab={this.state.activeTab}
          summaryData={this.props.statusSummary}
          tableData={this.state.statusTable}
          clicked={this.tabChangeHandler}
          tableLoading={this.state.tableLoading}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    showCards: state.dash.showCards,
    statusSummary: state.dash.statusSummaryData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchButtons: () => dispatch(fetchStatusButtons()),
    fetchStatusSum: () => dispatch(fetchStatusSummary())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
