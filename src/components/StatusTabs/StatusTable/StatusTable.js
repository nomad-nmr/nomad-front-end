import React from 'react'
import { connect } from 'react-redux'
import { Table, Badge, Tag } from 'antd'
import {
	CheckCircleOutlined,
	SyncOutlined,
	CloseCircleOutlined,
	ClockCircleOutlined
} from '@ant-design/icons'

import { updateCheckboxStatusTab } from '../../../store/actions'

import classes from './StatusTable.module.css'

const renderStatus = text => {
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

const expandedRowRender = record => {
	const columns = [
		{
			key: 'space1',
			width: 90
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
			align: 'center'
		},
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
			align: 'left'
		},
		{
			title: 'Exp Time',
			dataIndex: 'expT',
			key: 'expT',
			align: 'center'
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: renderStatus
		}
	]
	return (
		<Table
			columns={columns}
			dataSource={record.exps}
			pagination={false}
			rowClassName={classes.RowExpansion}
		/>
	)
}

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
			title: 'Exp Count',
			key: 'expCount',
			align: 'center',
			render: record => <span>{record.exps.length}</span>
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
			render: renderStatus
		}
	]

	const rowSelection = props.username && {
		selectionType: 'checkbox',
		hideSelectAll: true,
		columnTitle: 'Select',
		selectedRowKeys: props.selectedHolders,
		getCheckboxProps: record => ({
			disabled:
				record.status === 'Running' ||
				(props.accessLvl !== 'admin' && (record.status === 'Error' || record.username !== props.username))
		}),

		onChange: selectedRowKeys => {
			props.onCheckedHandler(selectedRowKeys)
		}
	}

	return (
		<Table
			columns={columns}
			dataSource={props.data}
			loading={props.loading}
			size='small'
			expandable={{ expandedRowRender }}
			rowSelection={rowSelection}
			pagination={false}
		/>
	)
}

const mapStateToProps = state => {
	return {
		username: state.auth.username,
		accessLvl: state.auth.accessLevel,
		selectedHolders: state.dash.statusTabChecked
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onCheckedHandler: checkedHolders => dispatch(updateCheckboxStatusTab(checkedHolders))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(statusTable)
