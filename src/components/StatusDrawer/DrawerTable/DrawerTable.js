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
			align: 'center'
		},
		{
			title: 'Holder',
			dataIndex: 'holder',
			key: 'holder',
			align: 'center'
		},
		{
			title: 'User',
			dataIndex: 'username',
			key: 'user',
			align: 'center'
		},
		{
			title: 'Group',
			dataIndex: 'group',
			key: 'group',
			align: 'center'
		},
		{
			title: 'Dataset Name',
			dataIndex: 'datasetName',
			key: 'name',
			align: 'center'
		},
		{
			title: 'ExpNo',
			dataIndex: 'expNo',
			key: 'expno',
			align: 'center'
		},
		{
			title: 'Experiment',
			dataIndex: 'experiment',
			key: 'exp'
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

	return (
		<Table
			columns={columns}
			dataSource={props.data}
			loading={props.loading}
			size='small'
			pagination={false}
			rowClassName={record => (record.highlight ? classes.RowHighlight : null)}
			expandable={{
				expandedRowRender: record => (
					<p style={{ margin: 0, backgroundColor: '#fff1f0' }}>{record.description}</p>
				),
				rowExpandable: () => props.id === 'errors'
			}}
		/>
	)
}

export default React.memo(DrawerTable, (prevProps, nextProps) => prevProps.data === nextProps.data)
