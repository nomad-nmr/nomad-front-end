import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { fetchInstrumentList, fetchHistory } from '../../store/actions'

import HistoryTabs from '../../components/HistoryTabs/HistoryTabs'

const ExpHistory = props => {
	const { getInstrList, authToken, fetchHist, instrList, expHistoryDate } = props

	const [activeTab, setActiveTab] = useState('0')

	useEffect(() => {
		window.scrollTo(0, 0)
		getInstrList(authToken)
	}, [getInstrList, authToken])

	useEffect(() => {
		if (instrList.length > 0) {
			fetchHist(authToken, instrList[activeTab].id, expHistoryDate)
		}
	}, [fetchHist, authToken, activeTab, instrList, expHistoryDate])

	const tabChangeHandler = key => {
		setActiveTab(key)
	}

	return (
		<HistoryTabs
			tabsData={props.instrList}
			tableData={props.expHistoryData}
			activeTab={activeTab}
			tabClicked={tabChangeHandler}
			loading={props.loading}
		/>
	)
}

const mapStateToProps = state => {
	return {
		instrList: state.instruments.instrumentList,
		authToken: state.auth.token,
		expHistoryData: state.expHistory.tableData,
		loading: state.expHistory.isLoading,
		expHistoryDate: state.expHistory.date
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getInstrList: token => dispatch(fetchInstrumentList(token)),
		fetchHist: (token, instrId, date) => dispatch(fetchHistory(token, instrId, date))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpHistory)
