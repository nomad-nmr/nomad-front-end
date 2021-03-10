import React, { useEffect } from 'react'

import { Form, Input, Button, Space, Col, Row, Checkbox, Modal } from 'antd'

import { ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal

const GroupForm = props => {
	const [form] = Form.useForm()

	useEffect(() => {
		form.resetFields()
	})

	const onFinish = formData => {
		if (formData._id) {
			if (!formData.isActive) {
				confirm({
					title: 'Setting a group inactive will also set all users in the group inactive?',
					icon: <ExclamationCircleOutlined />,
					content: 'Do you want to continue',
					onOk() {
						props.updateGroupHandler(formData, props.authToken)
					},
					onCancel() {
						return
					}
				})
			} else {
				props.updateGroupHandler(formData, props.authToken)
			}
		} else {
			props.addGroupHandler(formData, props.authToken)
		}
	}

	const onReset = () => {
		form.resetFields()
		props.toggleForm()
	}

	return (
		<div style={{ margin: '25px 0' }}>
			<Form
				form={form}
				ref={props.formReference}
				layout='inline'
				onFinish={onFinish}
				initialValues={{ isActive: true }}>
				<Form.Item hidden name='_id'>
					<Input />
				</Form.Item>
				<Row gutter={24}>
					<Col span={8}>
						<Form.Item
							name='groupName'
							label='Group Name'
							rules={[{ required: true, whitespace: true, message: 'Group name is required' }]}>
							<Input disabled={props.editing} />
						</Form.Item>
					</Col>
					<Col span={11}>
						<Form.Item name='description' label='Description'>
							<Input />
						</Form.Item>
					</Col>
					<Col span={3}>
						<Form.Item name='isActive' label='Active' valuePropName='checked'>
							<Checkbox />
						</Form.Item>
					</Col>
					<Col span={2}>
						<Form.Item>
							<Space>
								<Button type='primary' htmlType='submit'>
									Submit
								</Button>
								<Button htmlType='button' onClick={onReset}>
									Reset & Close
								</Button>
							</Space>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</div>
	)
}

export default GroupForm
