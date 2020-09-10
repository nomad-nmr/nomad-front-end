import React from 'react'
import { Form, Input, Button, InputNumber, Tooltip } from 'antd'
import axios from '../../axios-local'

import classes from './InstrumentsForm.module.css'

const layout = {
	labelCol: {
		span: 8
	},
	wrapperCol: {
		span: 16
	}
}

const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16
	}
}

const InstrumentsForm = (props) => {
	const [form] = Form.useForm()

	const onFinish = (values) => {
		axios.post('/admin/instruments/add-instrument', values).then((res) => {
			props.updateInstruments(res.data)
			form.resetFields()
		})
	}

	const onReset = () => {
		form.resetFields()
	}

	return (
		<div className={classes.Form}>
			<Form {...layout} form={form} name='instruments-settings' onFinish={onFinish}>
				<Form.Item name='name' label='Name' rules={[{ required: true }]}>
					<Input />
				</Form.Item>
				<Form.Item name='model' label='Model'>
					<Input />
				</Form.Item>
				<Form.Item name='probe' label='Probe'>
					<Input />
				</Form.Item>
				<Form.Item label='Capacity' required>
					<Form.Item name='capacity' noStyle rules={[{ type: 'number', required: true }]}>
						<InputNumber className={classes.InputNumber} />
					</Form.Item>
					<Tooltip title='Number of holder in sample changer'>
						<span className={classes.hintSpan}>Need help?</span>
					</Tooltip>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button className={classes.Button} type='primary' htmlType='submit'>
						Submit
					</Button>
					<Button className={classes.Button} htmlType='button' onClick={onReset}>
						Reset
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default InstrumentsForm
