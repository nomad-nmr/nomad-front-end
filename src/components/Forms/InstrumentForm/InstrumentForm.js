import React, { useEffect } from 'react'
import { Form, Input, Button, InputNumber, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import classes from '../Form.module.css'

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

const InstrumentsForm = props => {
	const [form] = Form.useForm()

	useEffect(() => {
		form.resetFields()
	})

	const onFinish = values => {
		// Checking whether to update or add
		if (values._id) {
			props.updateInstrumentsHandler(values, props.authToken)
		} else {
			props.addInstrumentHandler(values, props.authToken)
		}
	}

	const onReset = () => {
		form.resetFields()
		props.toggleFormHandler()
	}

	return (
		<div className={classes.Form}>
			<Form
				{...layout}
				form={form}
				ref={props.formReference}
				name='instruments-settings'
				onFinish={onFinish}>
				<Form.Item
					name='name'
					label='Name'
					rules={[{ required: true, whitespace: true, message: 'Instrument name is required' }]}>
					<Input />
				</Form.Item>
				<Form.Item name='model' label='Model'>
					<Input />
				</Form.Item>
				<Form.Item name='probe' label='Probe'>
					<Input />
				</Form.Item>
				<Form.Item label='Capacity' required>
					<Form.Item
						name='capacity'
						noStyle
						rules={[
							{ type: 'integer', required: true, message: ' Capacity of sample changer is required' }
						]}>
						<InputNumber className={classes.InputNumber} min={0} />
					</Form.Item>
					<Tooltip title='Number of holders in sample changer'>
						<QuestionCircleOutlined className={classes.Hint} />
					</Tooltip>
				</Form.Item>

				<Form.Item hidden name='_id'>
					<Input />
				</Form.Item>
				<Form.Item {...tailLayout}>
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

export default InstrumentsForm
