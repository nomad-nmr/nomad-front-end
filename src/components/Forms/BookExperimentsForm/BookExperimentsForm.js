import React, { useEffect, useState } from 'react'
import { Form, Select, Input, Row, Col, Spin, Button, Divider, Space } from 'antd'
// import { QuestionCircleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import solvents from '../../../misc/solvents'
import FormItem from 'antd/lib/form/FormItem'

const { Option } = Select

const BookExperimentsForm = props => {
	const [form] = Form.useForm()

	const [formState, setFormState] = useState([])

	useEffect(() => {
		const newFormState = []

		props.inputData.forEach(i => {
			const found = formState.find(entry => entry.key === i.key)
			if (found) {
				newFormState.push(found)
			} else {
				newFormState.push({
					key: i.key,
					expCount: 1
				})
			}
		})
		setFormState(newFormState)
		// formState can't be dependency as it gets updated in the hook. That would trigger loop.
		// eslint-disable-next-line
	}, [props.inputData])

	const addExpHandler = e => {
		e.preventDefault()
		const newFormState = [...formState]
		const index = newFormState.findIndex(i => i.key === e.target.value)
		newFormState[index].expCount++
		setFormState(newFormState)
	}

	const removeExpHandler = e => {
		e.preventDefault()
		const newFormState = [...formState]
		const index = newFormState.findIndex(i => i.key === e.target.value)
		if (newFormState[index].expCount > 1) {
			newFormState[index].expCount--
			setFormState(newFormState)
		}
	}

	//Generating form items from input data. inputData is array of objects.
	//The key property is the unique identifier created from instrument ID and holder number.
	const formItems = props.inputData.map(sample => {
		const expNoArr = []
		const found = formState.find(entry => entry.key === sample.key)
		if (found) {
			for (let i = 0; i < found.expCount; i++) {
				expNoArr.push((10 + i).toString())
			}
		}
		//Filtering paramSetsData to get array specific for the instrument
		//And generating corresponding Options for Select input
		const filteredParamSetArr = props.paramSetsData.filter(paramSet =>
			paramSet.availableOn.includes(sample.instId.toString())
		)
		const paramSetsOptions = filteredParamSetArr.map((paramSet, i) => (
			<Option value={paramSet.name} key={i}>
				{`${paramSet.description} [${paramSet.name}]`}
			</Option>
		))

		return (
			<div key={sample.key}>
				<Row gutter={16}>
					<Col span={2}>
						<Form.Item name={[sample.key, 'instrumentName']} initialValue={sample.instrument}>
							<Input size='small' disabled style={{ textAlign: 'center' }} />
						</Form.Item>
					</Col>
					<Col span={1}>
						<Form.Item name={[sample.key, 'holder']} initialValue={sample.holder}>
							<Input size='small' disabled style={{ textAlign: 'center' }} />
						</Form.Item>
					</Col>
					<Col span={2}>
						<Form.Item
							name={[sample.key, 'solvent']}
							rules={[
								{
									required: true,
									message: 'Solvent is required'
								}
							]}>
							<Select>
								{solvents.map((solvent, i) => (
									<Option value={solvent} key={i}>
										{solvent}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Col>
					<Col span={6}>
						<Form.Item
							name={[sample.key, 'title']}
							rules={[
								{
									required: true,
									whitespace: true,

									message: 'Title is required'
								},
								{ min: 5, message: 'Title must have minimum 5 characters' }
							]}>
							<Input size='small' />
						</Form.Item>
					</Col>
					<Col span={10}>
						{expNoArr.map(expNo => (
							<Row key={expNo} gutter={12}>
								<Col span={12}>
									<FormItem
										name={[sample.key, 'exps', expNo, 'paramSet']}
										style={{ textAlign: 'left' }}>
										<Select>{paramSetsOptions}</Select>
									</FormItem>
								</Col>
								<Col span={2}>
									<button
										value={sample.key}
										onClick={e => {
											e.preventDefault()
											console.log(form.getFieldValue([e.target.value, 'exps', expNo, 'paramSet']))
										}}>
										Edit
									</button>
								</Col>
							</Row>
						))}
					</Col>
					<Col span={2}>
						<Space>
							<button value={sample.key} onClick={addExpHandler}>
								Add
							</button>
							<button value={sample.key} onClick={removeExpHandler}>
								Remove
							</button>
						</Space>
					</Col>
				</Row>
				<Divider style={{ marginTop: 0 }} />
			</div>
		)
	})

	return (
		<div style={{ margin: '20px 40px' }}>
			<Row
				gutter={16}
				style={{ backgroundColor: '#d9d9d9', padding: '10px 0', fontWeight: 600, marginBottom: 15 }}>
				<Col span={2}>Instrument</Col>
				<Col span={1}>Holder</Col>
				<Col span={2}>Solvent</Col>
				<Col span={6}>Title</Col>
				<Col span={5}>Experiment [Parameter Set]</Col>
			</Row>
			{props.loading ? (
				<Spin size='large' style={{ margin: 30 }} />
			) : (
				<Form form={form} size='small' onFinish={values => console.log(values)}>
					{formItems}

					<Form.Item>
						<Button type='primary' size='middle' htmlType='submit'>
							Continue
						</Button>
					</Form.Item>
				</Form>
			)}
		</div>
	)
}

export default BookExperimentsForm
