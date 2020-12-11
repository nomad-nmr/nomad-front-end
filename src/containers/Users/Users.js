import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Button, Table, Drawer, Tag, Row, Col } from 'antd'

import UserForm from '../../components/Forms/UserForm/UserForm'
import { addUser, updateUser, fetchUsers, toggleUserForm, toggleActive } from '../../store/actions/index'

const { CheckableTag } = Tag

const Users = props => {
	const { fetchUsers, authToken } = props

	const formRef = useRef({})

	useEffect(() => {
		fetchUsers(authToken)
	}, [fetchUsers, authToken])

	const columns = [
		{
			title: 'Username',
			dataIndex: 'username',
			key: 'username',
			sorter: (a, b) => a.username.localeCompare(b.username)
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email'
		},
		{
			title: 'Full name',
			dataIndex: 'fullName',
			key: 'fullName'
		},
		{
			title: 'Group',
			dataIndex: 'groupName',
			key: 'groupName'
		},
		{
			title: 'Access level',
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
			}
		},
		{
			title: 'Last login',
			dataIndex: 'lastLogin',
			key: 'lastLogin'
		},
		{
			title: 'Inactive Days',
			dataIndex: 'inactiveDays',
			key: 'inactiveDays'
		},
		{
			title: 'Action',
			key: 'action',
			render: record => (
				<Row>
					<Col span={12}>
						<CheckableTag
							key={record.key}
							checked={record.isActive}
							onChange={() => props.toggleActive(record._id, authToken)}>
							{record.isActive ? 'Active' : 'Inactive'}
						</CheckableTag>
					</Col>
					<Col span={12}>
						<Button
							size='small'
							type='link'
							onClick={() => {
								props.toggleUsrDrawer(true)
								setTimeout(() => formRef.current.setFieldsValue(record), 100)
							}}>
							Edit
						</Button>
					</Col>
				</Row>
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
		formEditing: state.users.editing
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchUsers: token => dispatch(fetchUsers(token)),
		toggleUsrDrawer: editing => dispatch(toggleUserForm(editing)),
		addUsrHandler: (formData, token) => dispatch(addUser(formData, token)),
		updateUsrHandler: (formData, token) => dispatch(updateUser(formData, token)),
		toggleActive: (id, token) => dispatch(toggleActive(id, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
