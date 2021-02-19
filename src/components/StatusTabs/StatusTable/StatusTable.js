import React from 'react'
import { Table, Badge, Tag } from 'antd'
import {
	CheckCircleOutlined,
	SyncOutlined,
	CloseCircleOutlined,
	ClockCircleOutlined
} from '@ant-design/icons'

import classes from './StatusTable.module.css'

const statusTable = props => {
	const columns = [
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
		},
		{
			title: 'ExpT',
			dataIndex: 'time',
			key: 'time',
			align: 'center'
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: text => {
				switch (text) {
					case 'Running':
						return (
							<Tag icon={<SyncOutlined spin />} color='processing'>
								{text}
							</Tag>
						)

					case 'Submitted':
						return (
							<Tag icon={<ClockCircleOutlined />} color='default'>
								{text}
							</Tag>
						)

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
		}
	]
	return (
		<Table
			columns={columns}
			dataSource={props.data}
			loading={props.loading}
			size='small'
			pagination={false}
			rowClassName={record => record.highlight || classes.RowHighlight}
		/>
	)
}

export default React.memo(statusTable, (prevProps, nextProps) => prevProps.data === nextProps.data)
