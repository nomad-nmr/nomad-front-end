import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Table, Tag, Space, Button } from 'antd'
import Animate from 'rc-animate'

import GroupForm from '../../components/Forms/GroupForm/GroupForm'

import {
	fetchGroups,
	addGroup,
	updateGroup,
	toggleGroupForm,
	toggleActiveGroup
} from '../../store/actions/index'

import './Groups.css'

const { CheckableTag } = Tag

const Groups = props => {
	const { fetchGrps, authToken, showInactive } = props

	const formRef = useRef({})

	useEffect(() => {
		fetchGrps(authToken, showInactive)
	}, [fetchGrps, authToken, showInactive])

	const columns = [
		{
			title: 'Group Name',
			dataIndex: 'groupName',
			sorter: (a, b) => a.groupName.localeCompare(b.groupName)
		},
		{
			title: 'Description',
			dataIndex: 'description'
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt'
		},
		{
			title: 'Active/Total Users',
			align: 'center',
			render: record => (
				<div>
					{record.activeUserCount}/{record.totalUserCount}
				</div>
			)
		},
		{
			title: 'Actions',
			align: 'center',
			render: record => (
				<Space>
					<CheckableTag
						key={record.key}
						checked={record.isActive}
						onChange={() => {
							props.toggleActive(record._id, authToken)
						}}>
						{record.isActive ? 'Active' : 'Inactive'}
					</CheckableTag>

					<Button
						size='small'
						type='link'
						onClick={() => {
							if (!props.showForm) {
								props.toggleGrpForm(true)
							}
							setTimeout(() => formRef.current.setFieldsValue(record), 100)
						}}>
						Edit
					</Button>
				</Space>
			)
		}
	]

	const form = (
		<GroupForm
			formReference={formRef}
			addGroupHandler={props.addGrp}
			updateGroupHandler={props.updateGrp}
			authToken={props.authToken}
			editing={props.formEditing}
			toggleForm={props.toggleGrpForm}
		/>
	)

	return (
		<div style={{ margin: '30px 50px' }}>
			<Animate transitionName='fade-form'>{props.showForm && form}</Animate>
			<Table
				size='small'
				dataSource={props.tableData}
				columns={columns}
				loading={props.tabLoading}
				pagination={false}
			/>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		authToken: state.auth.token,
		tableData: state.groups.groupsTableData,
		tabLoading: state.groups.tableIsLoading,
		showForm: state.groups.showForm,
		formEditing: state.groups.isEditing,
		showInactive: state.groups.showInactive
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchGrps: (token, showInactive) => dispatch(fetchGroups(token, showInactive)),
		addGrp: (data, token) => dispatch(addGroup(data, token)),
		updateGrp: (data, token) => dispatch(updateGroup(data, token)),
		toggleGrpForm: editing => dispatch(toggleGroupForm(editing)),
		toggleActive: (groupId, token) => dispatch(toggleActiveGroup(groupId, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups)
