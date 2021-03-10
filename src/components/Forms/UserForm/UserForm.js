import React from 'react'
import { Form, Input, Button, Select, Checkbox } from 'antd'

import classes from '../Form.module.css'

const { Option } = Select

const layout = {
	labelCol: {
		span: 6
	},
	wrapperCol: {
		span: 18
	}
}

const tailLayout = {
	wrapperCol: {
		offset: 4,
		span: 20
	}
}

const UserForm = props => {
	const [form] = Form.useForm()

	const onReset = () => {
		form.resetFields()
		props.toggleDrawer()
	}

	const onFinish = values => {
		// Checking whether to update or add
		if (values._id) {
			props.updateUsrHandler(values, props.authToken)
			form.resetFields()
		} else {
			props.addUsrHandler(values, props.authToken)
			form.resetFields()
		}
	}

	const groupSelectOptions = props.groupList.map(grp => {
		return (
			<Option key={grp.id} value={grp.name}>
				{grp.name}
			</Option>
		)
	})

	return (
		<div className={classes.formInDrawer}>
			<Form
				{...layout}
				form={form}
				ref={props.formReference}
				initialValues={{ accessLevel: 'user', isActive: true, groupName: 'default' }}
				onFinish={onFinish}>
				<Form.Item
					name='username'
					label='Username'
					rules={[{ required: true, whitespace: true, message: 'Username is required' }]}>
					<Input disabled={props.editing} style={{ width: '60%' }} />
				</Form.Item>
				<Form.Item
					name='email'
					label='Email'
					rules={[
						{ required: true, whitespace: true, message: 'Email is required' },
						{ type: 'email', message: 'The input is not valid E-mail' }
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					name='fullName'
					label='Full Name'
					rules={[{ required: true, whitespace: true, message: "User's full Name is required" }]}>
					<Input />
				</Form.Item>
				<Form.Item name='groupName' label='Group'>
					<Select style={{ width: '60%' }}>{groupSelectOptions}</Select>
				</Form.Item>
				<Form.Item name='accessLevel' label='Access Level'>
					<Select style={{ width: '60%' }}>
						<Option value='admin'>admin</Option>
						<Option value='user'>user</Option>
					</Select>
				</Form.Item>
				<Form.Item name='isActive' label='Active' valuePropName='checked'>
					<Checkbox />
				</Form.Item>
				<Form.Item hidden name='_id'>
					<Input />
				</Form.Item>
				<Form.Item {...tailLayout} style>
					<Button className={classes.Button} type='primary' htmlType='submit'>
						Submit
					</Button>
					<Button className={classes.Button} htmlType='button' onClick={onReset}>
						Reset & Close
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default UserForm
