import React from 'react'
import { Table, Space, Divider } from 'antd'

const RackTable = props => {
	const columns = [
		{
			title: 'Slot',
			dataIndex: 'slot',
			align: 'center',
			width: 75
		},
		{
			title: 'Username',
			dataIndex: 'username',
			align: 'center',
			width: 75
		},
		{
			title: 'Full Name',
			dataIndex: 'fullName',
			align: 'center'
		},
		{
			title: 'Solvent',
			dataIndex: 'solvent',
			align: 'center'
		},
		{
			title: 'Title',
			dataIndex: 'title',
			align: 'center'
		},
		{
			title: 'Exp Count',
			dataIndex: 'experiments',
			align: 'center',
			render: value => value.length
		}
	]

	const expandElement = record => {
		const expElement = record.experiments.map((exp, index) => (
			<div key={index}>
				{index !== 0 && <Divider type='vertical' />}
				{exp}
			</div>
		))
		return (
			<Space>
				<span style={{ fontWeight: 600 }}>Experiments [Parameter Sets] : </span>
				{expElement}
			</Space>
		)
	}

	return (
		<Table
			columns={columns}
			dataSource={props.data}
			pagination={false}
			size='small'
			expandable={{ expandedRowRender: expandElement }}
		/>
	)
}

export default RackTable
