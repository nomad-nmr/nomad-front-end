import React from 'react'
import { Modal, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const LoginModal = props => {
	const [form] = Form.useForm()

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
			onOk={() => props.signInClicked(form)}
			onCancel={props.cancelClicked}>
			<Form name='basic' form={form} hideRequiredMark initialValues={{ username: 'admin' }}>
				<Form.Item
					// label='Username'
					name='username'
					rules={[
						{
							required: true,
							message: 'Please input your username!'
						}
					]}>
					<Input
						prefix={<UserOutlined className='site-form-item-icon' />}
						placeholder='Username'
					/>
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
					<Input
						prefix={<LockOutlined className='site-form-item-icon' />}
						type='password'
						placeholder='Password'
					/>
				</Form.Item>
			</Form>
		</Modal>
	)
}

export default LoginModal
