import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchStatusSummary, fetchStatusTable } from '../../store/actions'
import Animate from 'rc-animate'

import InfoCards from '../../components/InfoCards/InfoCards'
import StatusTabs from '../../components/StatusTabs/StatusTabs'
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
		</Fragment>
	)
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
		fetchStatusSum: () => dispatch(fetchStatusSummary()),
		fetchStatusTable: key => dispatch(fetchStatusTable(key))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
