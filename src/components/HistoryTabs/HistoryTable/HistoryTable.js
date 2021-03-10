import React, { useState, useEffect } from 'react'

import { Table, Tag, Badge, Tooltip } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

import classes from './HistoryTable.module.css'

const HistoryTable = props => {
	const [usernameFilters, setUsernameFilters] = useState([])

	useEffect(() => {
		const usernameSet = new Set()
		props.data.forEach(i => {
			usernameSet.add(i.username)
		})
		const filters = []
		for (const entry of usernameSet.values()) {
			filters.push({ text: entry, value: entry })
		}
		setUsernameFilters(filters)
	}, [props.data])

	const columns = [
		{
			title: 'Holder',
			dataIndex: 'holder',
			align: 'center'
		},
		{
			title: 'User',
			dataIndex: 'username',
			align: 'center',
			render: (text, record) => {
				if (record.user.id) {
					return (
						<Tooltip title={record.user.id.fullName} color={'purple'}>
							<span>{text}</span>
						</Tooltip>
					)
				}
			},
			filters: usernameFilters,
			onFilter: (value, record) => record.username === value
		},
		{
			title: 'Group',
			dataIndex: 'group',
			align: 'center'
		},
		{
			title: 'Dataset Name',
			dataIndex: 'datasetName',
			align: 'center'
		},
		{
			title: 'ExpNo',
			dataIndex: 'expNo',
			align: 'center'
		},
		{
			title: 'Parameter Set',
			dataIndex: 'parameterSet',
			align: 'center'
		},
		{
			title: 'Title',
			dataIndex: 'title'
		},
		{
			title: 'Finished At',
			dataIndex: 'finishedAt',
			align: 'center',
			sorter: (a, b) => a.finishedAt.localeCompare(b.finishedAt)
		},
		{
			title: 'ExpT',
			dataIndex: 'expTime',
			align: 'center'
		},
		{
			title: 'Status',
			dataIndex: 'status',
			align: 'center',
			render: text => {
				switch (text) {
					case 'Completed':
						return (
							<Tag icon={<CheckCircleOutlined />} color='success'>
								{text}
							</Tag>
						)
					case 'Error':
						return (
							<Tag icon={<CloseCircleOutlined />} color='error'>
								{text}
							</Tag>
						)

					default:
						return <Badge status='default' text={text} />
				}
			}
		},
		{
			title: 'Remarks',
			dataIndex: 'remarks'
		}
	]

	const setTagColor = input => {
		switch (input) {
			case '+':
				return 'success'
			case '-':
				return 'default'
			case 'x':
				return 'error'

			default:
				return 'default'
		}
	}

	const expandElement = record => (
		<div>
			<Tag color={setTagColor(record.load)}>Load</Tag>
			<Tag color={setTagColor(record.atma)}>ATMA</Tag>
			<Tag color={setTagColor(record.spin)}>Spin</Tag>
			<Tag color={setTagColor(record.lock)}>Lock</Tag>
			<Tag color={setTagColor(record.shim)}>Shim</Tag>
			<Tag color={setTagColor(record.acq)}>Acq</Tag>
			<Tag color={setTagColor(record.proc)}>Proc</Tag>
		</div>
	)

	return (
		<div style={{ marginBottom: '40px' }}>
			<Table
				columns={columns}
				dataSource={props.data}
				loading={props.loading}
				size='small'
				pagination={false}
				rowClassName={record => record.highlight || classes.RowHighlight}
				expandable={{ expandedRowRender: expandElement }}
			/>
		</div>
	)
}

export default HistoryTable
