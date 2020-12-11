import React from 'react'
import { Modal, Form, Input, Spin, Button, Space } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const loginModal = props => {
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
			keyboard
			onCancel={props.cancelClicked}
			footer={null}>
			<Spin tip='Loading ...' spinning={props.loading}>
				<Form
					id='loginForm'
					name='basic'
					form={form}
					onFinish={values => props.signInClicked(values)}
					hideRequiredMark>
					<Form.Item
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
					<Form.Item style={{ textAlign: 'center' }}>
						<Space size='large'>
							<Button type='primary' htmlType='submit'>
								Submit
							</Button>
							<Button htmlType='button' onClick={props.cancelClicked}>
								Cancel
							</Button>
						</Space>
					</Form.Item>
				</Form>
				{/* <p>Reset</p> */}
			</Spin>
		</Modal>
	)
}

export default loginModal
