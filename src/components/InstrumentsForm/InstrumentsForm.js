import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, InputNumber, Tooltip, message } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

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
		//Validation of unique name
		const nameFound = props.instrTabData.find(
			(instr) => instr.name.toLowerCase() === values.name.toLowerCase()
		)
		if (!values.key && nameFound) {
			return message.error(`Instrument name ${values.name} has been used. Please, use unique name!`)
		}
		//Validation of capacity being integer number 
		if (!Number.isInteger(values.capacity)) {
			return message.error('Capacity has to be integer number')
		}

		props.updateInstrumentsHandler(values)
		form.resetFields()
		props.toggleFormHandler()
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
				<Form.Item hidden name='key'>
					<Input />
				</Form.Item>
				<Form.Item name='name' label='Name' rules={[{ required: true, whitespace: true }]}>
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
						<InputNumber className={classes.InputNumber} min={0} />
					</Form.Item>
					<Tooltip title='Number of holder in sample changer'>
						<QuestionCircleOutlined className={classes.Hint} />
					</Tooltip>
				</Form.Item>
				<Form.Item hidden name='running'>
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

const mapStateToProps = (state) => {
	return {
		instrTabData: state.instruments.instrumentsTableData
	}
}

export default connect(mapStateToProps)(InstrumentsForm)
