import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchStatusSummary, fetchStatusTable, closeDashDrawer } from '../../store/actions'
import Animate from 'rc-animate'

import InfoCards from '../../components/InfoCards/InfoCards'
import StatusTabs from '../../components/StatusTabs/StatusTabs'
import StatusDrawer from '../../components/StatusDrawer/StatusDrawer'
import './Dashboard.css'

const Dashboard = props => {
	const [activeTab, setActiveTab] = useState('0')
	const { fetchButtons, fetchStatusSum, fetchStatusTable } = props

	useEffect(() => {
		fetchStatusSum()
		fetchStatusTable('0')
	}, [fetchButtons, fetchStatusSum, fetchStatusTable])

	const tabChangeHandler = key => {
		fetchStatusTable(key)
		setActiveTab(key)
		fetchStatusSum()
	}

	return (
		<Fragment>
			<Animate transitionName='fade-cards'>
				{props.showCards ? (
					<InfoCards cardsData={props.statusSummary} clicked={tabChangeHandler} />
				) : null}
			</Animate>
			<div style={{ marginBottom: '120px' }}>
				<StatusTabs
					activeTab={activeTab}
					summaryData={props.statusSummary}
					tableData={props.statusTable}
					clicked={tabChangeHandler}
					tableLoading={props.tableLoading}
				/>
			</div>
			<StatusDrawer status={props.drawerStatus} closeClicked={props.onCloseDrawer} />
		</Fragment>
	)
}

const mapStateToProps = state => {
	return {
		showCards: state.dash.showCards,
		statusSummary: state.dash.statusSummaryData,
		statusTable: state.dash.statusTableData,
		tableLoading: state.dash.tableLoading,
		drawerStatus: state.dash.drawerStatus
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchStatusSum: () => dispatch(fetchStatusSummary()),
		onCloseDrawer: () => dispatch(closeDashDrawer()),
		fetchStatusTable: key => dispatch(fetchStatusTable(key))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
