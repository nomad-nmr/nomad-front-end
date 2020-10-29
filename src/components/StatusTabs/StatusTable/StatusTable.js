import React from 'react'
import { Table, Badge } from 'antd'
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
							<span style={{ color: '#1890ff' }}>
								<Badge status='processing' text={text} />
							</span>
						)

					case 'Submitted':
						return <Badge status='warning' text={text} />

					case 'Completed':
						return <Badge status='success' text={text} />

					case 'Error':
						return <Badge status='error' text='Error' />

					default:
						return <Badge status='default' text={text} />
				}
			}
			// {
			// 	let tagColor = ''
			// 	let animationObj = null
			// 	switch (text) {
			// 		case 'Running':
			// 			tagColor = 'processing'
			// 			animationObj = {
			// 				opacity: 0.3,
			// 				yoyo: true,
			// 				repeat: -1,
			// 				duration: 500
			// 			}
			// 			break
			// 		case 'Submitted':
			// 			tagColor = 'purple'
			// 			break
			// 		case 'Completed':
			// 			tagColor = 'gold'
			// 			break
			// 		case 'Error':
			// 			tagColor = 'red'
			// 			break
			// 		default:
			// 			tagColor = 'default'
			// 	}
			// 	return (
			// 		<TweenOne animation={animationObj}>
			// 			<Tag color={tagColor}>{text}</Tag>
			// 		</TweenOne>
			// 	)
			// }
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
