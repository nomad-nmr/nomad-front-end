import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'

import { Table } from 'antd'
import { fetchGroupsTable } from '../../store/actions'

const Groups = props => {
	const { fetchGroups, authToken } = props

	useEffect(() => {
		fetchGroups(authToken)
		console.log(props.tableData)
	}, [fetchGroups, authToken])

	// const columns = []

	return (
		<Fragment>
			<h1 style={{ margin: '50px' }}>Groups</h1>
		</Fragment>
	)
}

const mapStateToProps = state => {
	return {
		authToken: state.auth.token,
		tableData: state.groups.groupsTableData
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchGroups: token => dispatch(fetchGroupsTable(token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
