import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Button, Table, Drawer, Tag, Space } from 'antd'

import UserForm from '../../components/Forms/UserForm/UserForm'
import {
	addUser,
	updateUser,
	fetchUsers,
	toggleUserForm,
	toggleActive,
	fetchGroupList
} from '../../store/actions/index'

const { CheckableTag } = Tag

const Users = props => {
	const { fetchUsers, fetchGrpList, authToken, showInactive } = props

	const formRef = useRef({})

	useEffect(() => {
		window.scrollTo(0, 0)
		fetchUsers(authToken, showInactive)
		fetchGrpList(authToken)
	}, [fetchUsers, fetchGrpList, authToken, showInactive])

	const columns = [
		{
			title: 'Username',
			dataIndex: 'username',
			sorter: (a, b) => a.username.localeCompare(b.username)
		},
		{
			title: 'Email',
			dataIndex: 'email'
		},
		{
			title: 'Full name',
			dataIndex: 'fullName'
		},
		{
			title: 'Group',
			dataIndex: 'groupName'
		},
		{
			title: 'Access level',
			align: 'center',
			render: record => {
				let tagColor = null
				switch (record.accessLevel) {
					case 'admin':
						tagColor = 'red'
						break

					case 'user':
						tagColor = 'blue'
						break

					default:
						break
				}
				return <Tag color={tagColor}>{record.accessLevel}</Tag>
			}
		},
		{
			title: 'Last login',
			dataIndex: 'lastLogin',
			align: 'center'
		},
		{
			title: 'Inactive Days',
			dataIndex: 'inactiveDays',
			align: 'center'
		},
		{
			title: 'Actions',
			align: 'center',
			render: record => (
				<Space>
					<CheckableTag
						key={record.key}
						checked={record.isActive}
						onChange={() => props.toggleActive(record._id, authToken)}>
						{record.isActive ? 'Active' : 'Inactive'}
					</CheckableTag>

					<Button
						size='small'
						type='link'
						onClick={() => {
							props.toggleUsrDrawer(true)
							setTimeout(() => formRef.current.setFieldsValue(record), 200)
						}}>
						Edit
					</Button>
				</Space>
			)
		}
	]

	return (
		<div style={{ margin: '30px 20px' }}>
			<Table size='small' dataSource={props.tabData} columns={columns} loading={props.tabLoading} />
			<Drawer
				width='400'
				visible={props.usrDrawerVisible}
				placement='right'
				onClose={() => {
					props.toggleUsrDrawer(false)
					formRef.current.resetFields()
				}}>
				<UserForm
					formReference={formRef}
					toggleDrawer={props.toggleUsrDrawer}
					authToken={props.authToken}
					addUsrHandler={props.addUsrHandler}
					updateUsrHandler={props.updateUsrHandler}
					editing={props.formEditing}
					groupList={props.grpList}
				/>
			</Drawer>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		tabData: state.users.usersTableData,
		tabLoading: state.users.tableIsLoading,
		authToken: state.auth.token,
		usrDrawerVisible: state.users.showForm,
		formEditing: state.users.editing,
		showInactive: state.users.showInactive,
		//list of group names for select component
		grpList: state.groups.groupList
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchUsers: (token, showInactive) => dispatch(fetchUsers(token, showInactive)),
		//argument editing (boolean) is used to disable name input
		toggleUsrDrawer: editing => dispatch(toggleUserForm(editing)),
		addUsrHandler: (formData, token) => dispatch(addUser(formData, token)),
		updateUsrHandler: (formData, token) => dispatch(updateUser(formData, token)),
		toggleActive: (id, token) => dispatch(toggleActive(id, token)),
		fetchGrpList: token => dispatch(fetchGroupList(token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
