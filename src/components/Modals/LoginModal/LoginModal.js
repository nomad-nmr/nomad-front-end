import React from 'react'
import { Modal, Form, Input, Spin } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const loginModal = props => {
	const [form] = Form.useForm()

	const validateForm = form => {
		form
			.validateFields()
			.then(data => {
				props.signInClicked(data)
			})
			.catch(err => console.log(err))
	}

	return (
		<Modal
			width='300px'
			okText='Sign in'
			title={
				<div style={{ color: '#096dd9' }}>
					<UserOutlined /> <span style={{ marginLeft: '10px' }}>Sign in</span>{' '}
				</div>
			}
			visible={props.visible}
			onOk={() => validateForm(form)}
			onCancel={props.cancelClicked}>
			<Spin tip='Loading ...' spinning={props.loading}>
				<Form name='basic' form={form} hideRequiredMark>
					{/* Initial values of the form can be set as follows initialValues={{ username: 'admin' }}  */}
					<Form.Item
						// label='Username'
						name='username'
						rules={[
							{
								required: true,
								message: 'Please input your username!'
							}
						]}>
						<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
					</Form.Item>

					<Form.Item
						// label='Password'
						name='password'
						rules={[
							{
								required: true,
								message: 'Please input your password!'
							}
						]}>
						<Input.Password
							prefix={<LockOutlined className='site-form-item-icon' />}
							type='password'
							placeholder='Password'
						/>
					</Form.Item>
				</Form>
			</Spin>
		</Modal>
	)
}

export default loginModal
