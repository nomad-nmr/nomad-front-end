import React from 'react'
import { Table, Space, Divider } from 'antd'
import moment from 'moment'

import { addKey } from '../../../utils/tableUtils'

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
			dataIndex: ['user', 'username'],
			align: 'center',
			width: 75
		},
		{
			title: 'Full Name',
			dataIndex: ['user', 'fullName'],
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
			dataIndex: 'exps',
			align: 'center',
			render: value => value.length
		},
		{
			title: 'Added at',
			dataIndex: 'addedAt',
			align: 'center',
			render: value => moment(value).format('HH:mm')
		}
	]

	const expandElement = record => {
		const expElement = record.exps.map((exp, index) => (
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
			dataSource={addKey(props.data)}
			pagination={false}
			size='small'
			expandable={{ expandedRowRender: expandElement }}
		/>
	)
}

export default RackTable
