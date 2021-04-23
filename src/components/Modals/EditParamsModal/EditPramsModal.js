import React, { useEffect } from 'react'
import { Modal, Form, Input, Row, Col, Button, Space, Divider } from 'antd'

const EditParamsModal = props => {
	const [form] = Form.useForm()

	const { defaultParams, customParams, sampleKey, expNo, paramSetName } = props.inputData

	useEffect(() => {
		if (props.reset) {
			const resetFieldsArr = [...customParams, ...defaultParams].map(param => [
				props.reset.toString(),
				param.name
			])
			form.resetFields(resetFieldsArr)
		}
	}, [props.reset, customParams, defaultParams, form])

	return (
		<Modal
			title={`Edit Parameters - ${paramSetName}`}
			visible={props.visible}
			footer={null}
			onCancel={props.closeModal}>
			<Form form={form} size='small' onFinish={props.onOkHandler}>
				<Row gutter={16}>
					<Col span={10}>
						<Form.Item
							label='expt'
							name={[sampleKey + '#' + expNo, 'expt']}
							// initialValue={defaultParams[4].value}
						>
							<Input disabled />
						</Form.Item>
					</Col>
					<Col span={14}>
						<span>Experimental Time</span>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={10}>
						<Form.Item
							label='ns'
							name={[sampleKey + '#' + expNo, 'ns']}
							// initialValue={defaultParams[0].value}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={14}>
						<span>Experimental Time</span>
					</Col>
				</Row>
				{customParams &&
					customParams.map(i => {
						return (
							<Row gutter={16} key={i.name}>
								<Col span={10}>
									<Form.Item label={i.name} name={[sampleKey + '#' + expNo, i.name]}>
										<Input placeholder={i.value} />
									</Form.Item>
								</Col>
								<Col span={14}>
									<span>{i.comment}</span>
								</Col>
							</Row>
						)
					})}
				<Divider style={{ marginTop: 0 }} />
				<Row justify='center'>
					<Form.Item>
						<Space>
							<Button type='primary' size='middle' htmlType='submit'>
								OK
							</Button>
							<Button size='middle' onClick={props.closeModal}>
								Cancel
							</Button>
						</Space>
					</Form.Item>
				</Row>
			</Form>
		</Modal>
	)
}

export default EditParamsModal
