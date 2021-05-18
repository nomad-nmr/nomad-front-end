import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'antd'

import classes from './DrawerTable.module.css'
import { updatePendingChecked } from '../../../store/actions'

const DrawerTable = props => {
	let columns = [
		{
			title: 'Instrument',
			dataIndex: 'instrument',
			key: 'instrument',
			align: 'center',
			width: 200
		},
		{
			title: 'Holder',
			dataIndex: 'holder',
			key: 'holder',
			align: 'center',
			width: 100
		},
		{
			title: 'User',
			dataIndex: 'username',
			key: 'user',
			align: 'center',
			width: 100
		},
		{
			title: 'Group',
			dataIndex: 'group',
			key: 'group',
			align: 'center',
			width: 100
		},
		{
			title: 'Dataset Name',
			dataIndex: 'datasetName',
			key: 'name',
			align: 'center',
			width: 250
		},
		{
			title: 'Exp Count',
			dataIndex: 'expCount',
			key: 'expCount',
			align: 'center',
			width: 100
		},
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title'
		}
	]

	if (props.id !== 'pending') {
		columns = [
			...columns,
			{
				title: 'ExpNo',
				dataIndex: 'expNo',
				key: 'expno',
				align: 'center',
				width: 100
			},
			{
				title: 'Parameter Set',
				dataIndex: 'parameterSet',
				key: 'exp',
				width: 200
			},
			{
				title: 'ExpT',
				dataIndex: 'time',
				key: 'time',
				align: 'center'
			}
		]
		//removing expCount
		columns.splice(5, 1)
	}

	const expandConfig =
		props.id === 'errors'
			? {
					expandedRowRender: record => (
						<p style={{ margin: 0, backgroundColor: '#fff1f0' }}>{record.description}</p>
					),
					rowExpandable: () => props.id === 'errors'
			  }
			: null

	const rowSelectConfig =
		props.id === 'pending'
			? {
					selectionType: 'checkbox',
					hideSelectAll: true,
					selectedRowKeys: props.selectedHolders.map(i => i.key),
					getCheckboxProps: record => {
						if (props.username) {
							return {
								disabled: props.accessLvl !== 'admin' && record.username !== props.username
							}
						}
					},
					onChange: (selectedRowKeys, selectedRows) => {
						const holdersArr = selectedRows.map(row => ({
							holder: row.holder,
							instrId: row.instrId,
							username: row.username,
							key: row.key
						}))
						props.onCheckedHandler(holdersArr)
					}
			  }
			: null

	return (
		<Table
			columns={columns}
			dataSource={props.data}
			loading={props.loading}
			size='small'
			pagination={false}
			scroll={{ y: 300 }}
			rowClassName={record => (record.highlight ? classes.RowHighlight : null)}
			expandable={expandConfig}
			rowSelection={rowSelectConfig}
		/>
	)
}

const mapStateToProps = state => {
	return {
		username: state.auth.username,
		accessLvl: state.auth.accessLevel,
		selectedHolders: state.dash.drawerState.pendingChecked
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onCheckedHandler: checkedHolders => dispatch(updatePendingChecked(checkedHolders))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerTable)
