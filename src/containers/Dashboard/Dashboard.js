import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchStatusButtons, fetchStatusSummary, fetchStatusTable } from '../../store/actions'
import Animate from 'rc-animate'

import InfoCards from '../../components/InfoCards/InfoCards'
import StatusTabs from '../../components/StatusTabs/StatusTabs'
import './Dashboard.css'

const Dashboard = (props) => {
	const [activeTab, setActiveTab] = useState('1')
	const { fetchButtons, fetchStatusSum, fetchStatusTable } = props

	useEffect(() => {
		fetchButtons()
		fetchStatusSum()
		fetchStatusTable(1)
	}, [fetchStatusSum, fetchStatusTable, fetchButtons])

	const tabChangeHandler = (tabId) => {
		fetchStatusTable(tabId)
		setActiveTab(tabId)
	}

	return (
		<Fragment>
			<Animate transitionName='fade-cards'>
				{props.showCards ? (
					<InfoCards cardsData={props.statusSummary} clicked={tabChangeHandler} />
				) : null}
			</Animate>
			<StatusTabs
				activeTab={activeTab}
				summaryData={props.statusSummary}
				tableData={props.statusTable}
				clicked={tabChangeHandler}
				tableLoading={props.tableLoading}
			/>
		</Fragment>
	)
}

const mapStateToProps = (state) => {
	return {
		showCards: state.dash.showCards,
		statusSummary: state.dash.statusSummaryData,
		statusTable: state.dash.statusTableData,
		tableLoading: state.dash.tableLoading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchButtons: () => dispatch(fetchStatusButtons()),
		fetchStatusSum: () => dispatch(fetchStatusSummary()),
		fetchStatusTable: (id) => dispatch(fetchStatusTable(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
