import React from 'react'
import { Table } from 'antd'
import classes from './DrawerTable.module.css'

const DrawerTable = props => {
	// shouldComponentUpdate(nextProps, nextState) {
	//   return nextProps.drawerVisible
	// }
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
			title: 'Title',
			dataIndex: 'title',
			key: 'title'
		}
	]

	if (props.id !== 'pending') {
		columns = [
			...columns,
			{
				title: 'ExpT',
				dataIndex: 'time',
				key: 'time',
				align: 'center'
			}
		]
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
					onChange: (selectedRowKeys, selectedRows) => {
						// console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
						const selectedHolders = selectedRows.map(row => row.holder)
						console.log(selectedHolders)
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

export default React.memo(DrawerTable, (prevProps, nextProps) => prevProps.data === nextProps.data)
