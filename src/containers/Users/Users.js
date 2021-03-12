import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Button, Table, Drawer, Tag, Space } from 'antd'

import UserForm from '../../components/Forms/UserForm/UserForm'
import {
	addUser,
	updateUser,
	fetchUsers,
	toggleUserForm,
	toggleActive,
	fetchGroupList,
	userTableChange
} from '../../store/actions/index'

const { CheckableTag } = Tag

const Users = props => {
	const {
		fetchUsers,
		fetchGrpList,
		authToken,
		pgn,
		filters,
		showInactive,
		grpList,
		searchUserValue,
		inactiveDaysOrder
	} = props

	const formRef = useRef({})

	const [groupFilters, setGroupFilters] = useState([])

	useEffect(() => {
		window.scrollTo(0, 0)
		const searchParams = { ...pgn, ...filters, showInactive, username: searchUserValue, inactiveDaysOrder }
		console.log(searchParams)
		fetchUsers(authToken, searchParams)
		console.log('Hu')
		//adding pgn in the dependency array results in infinite loop as pagination is state is updated after fetching data to update totalCount
		// eslint-disable-next-line
	}, [authToken, fetchUsers, filters, showInactive, searchUserValue])

	//Hook to fetch group list for form and filters
	useEffect(() => {
		fetchGrpList(authToken, showInactive)
	}, [fetchGrpList, authToken, showInactive])

	//Hook to set group filters in the local state.
	useEffect(() => {
		const grpFilters = grpList.map(grp => ({ text: grp.name, value: grp.id }))
		setGroupFilters(grpFilters)
	}, [grpList])

	const columns = [
		{
			title: 'Username',
			dataIndex: 'username'
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
			dataIndex: 'groupName',
			key: 'group',
			filters: groupFilters
		},
		{
			title: 'Access level',
			align: 'center',
			key: 'accessLevel',
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
			},
			filters: [
				{ text: 'Admin', value: 'admin' },
				{ text: 'User', value: 'user' }
			]
		},
		{
			title: 'Last login',
			dataIndex: 'lastLogin',
			align: 'center'
		},
		{
			title: 'Inactive Days',
			dataIndex: 'inactiveDays',
			align: 'center',
			sorter: (a, b) => a.inactiveDays.toString().localeCompare(b.inactiveDays.toString())
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
			<Table
				size='small'
				dataSource={props.tabData}
				columns={columns}
				loading={props.tabLoading}
				pagination={pgn}
				onChange={props.onTableChange}
			/>
			{/* <Pagination style={{ marginTop: '20px', textAlign: 'right' }} defaultCurrent={6} total={500} /> */}
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
		pgn: state.users.pagination,
		tabLoading: state.users.tableIsLoading,
		authToken: state.auth.token,
		usrDrawerVisible: state.users.showForm,
		formEditing: state.users.editing,
		showInactive: state.users.showInactive,
		//list of group names for select component
		grpList: state.groups.groupList,
		filters: state.users.filters,
		searchUserValue: state.users.searchUserValue,
		inactiveDaysOrder: state.users.inactiveDaysOrder
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchUsers: (token, searchParams) => dispatch(fetchUsers(token, searchParams)),
		//argument editing (boolean) is used to disable name input
		toggleUsrDrawer: editing => dispatch(toggleUserForm(editing)),
		addUsrHandler: (formData, token) => dispatch(addUser(formData, token)),
		updateUsrHandler: (formData, token) => dispatch(updateUser(formData, token)),
		toggleActive: (id, token) => dispatch(toggleActive(id, token)),
		fetchGrpList: (token, showInactive) => dispatch(fetchGroupList(token, showInactive)),
		onTableChange: (pagination, filters, sorter) => dispatch(userTableChange(pagination, filters, sorter))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
