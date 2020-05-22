import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStatusButtons, fetchStatusSummary, fetchStatusTable } from '../../store/actions'

import InfoCards from '../../components/InfoCards/InfoCards'
import StatusTabs from '../../components/StatusTabs/StatusTabs'
import { Spin, Empty } from 'antd'

class Dashboard extends Component {
  state = {
    activeTab: '1'
  }

  componentDidMount() {
    this.props.fetchButtons()
    this.props.fetchStatusSum()
    this.props.fetchStatusTable(1)
  }

  tabChangeHandler = tabId => {
    this.props.fetchStatusTable(tabId)
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
          tableData={this.props.statusTable}
          clicked={this.tabChangeHandler}
          tableLoading={this.props.tableLoading}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    showCards: state.dash.showCards,
    statusSummary: state.dash.statusSummaryData,
    statusTable: state.dash.statusTableData,
    tableLoading: state.dash.tableLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchButtons: () => dispatch(fetchStatusButtons()),
    fetchStatusSum: () => dispatch(fetchStatusSummary()),
    fetchStatusTable: id => dispatch(fetchStatusTable(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
