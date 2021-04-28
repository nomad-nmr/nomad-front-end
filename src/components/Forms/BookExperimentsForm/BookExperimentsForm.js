import React, { useEffect, useState } from 'react'
import { Form, Select, Input, Row, Col, Spin, Button, Divider, Space, message } from 'antd'

import solvents from '../../../misc/solvents'
import EditParamsModal from '../../Modals/EditParamsModal/EditPramsModal'

import classes from './BookExperimentsForm.module.css'

const { Option } = Select

const BookExperimentsForm = props => {
	const [form] = Form.useForm()

	const [formState, setFormState] = useState([])
	const [modalVisible, setModalVisible] = useState(false)
	//state used to generate form inputs in edit parameters modal
	const [modalInputData, setModalInputData] = useState({})
	const [resetModal, setResetModal] = useState(undefined)
	const [exptState, setExptState] = useState({})

	//Hook to create state for dynamic ExpNo part of form from inputData
	//InputData gets updated every time new holder is booked
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
		const expNo = 10 + newFormState[index].expCount
		form.resetFields([[e.target.value, 'exps', expNo]])
		const newExptState = { ...exptState }
		delete newExptState[e.target.value + '#' + expNo]
		setExptState(newExptState)
	}

	const onParamSetChange = (sampleKey, expNo, paramSetName) => {
		form.resetFields([[sampleKey, 'exps', expNo, 'params']])
		const key = sampleKey + '#' + expNo
		const paramSet = props.paramSetsData.find(paramSet => paramSet.name === paramSetName)
		const newExptState = { ...exptState, [key]: paramSet.defaultParams[4].value }
		setExptState(newExptState)
	}

	const openModalHandler = (event, key, expNo) => {
		event.preventDefault()

		const paramSetName = form.getFieldValue([key, 'exps', expNo, 'paramSet'])
		const paramsString = form.getFieldValue([key, 'exps', expNo, 'params'])
		if (paramSetName) {
			const { defaultParams, customParams } = props.paramSetsData.find(
				paramSet => paramSet.name === paramSetName
			)
			setModalInputData({
				sampleKey: key,
				paramSetName,
				expNo,
				defaultParams,
				customParams
			})
			setResetModal(paramsString ? null : key + '#' + expNo)
			setModalVisible(true)
		} else {
			message.warning('Please select experiment [Parameter Set]')
		}
	}

	const modalOkHandler = values => {
		const key = Object.keys(values)[0]
		const params = Object.values(values)[0]
		let paramsString = ''
		for (const param in params) {
			if (params[param] && param !== 'expt') {
				paramsString = paramsString + param + ',' + params[param] + ','
			}
		}
		paramsString = paramsString.substring(0, paramsString.length - 1)
		const sampleKey = key.split('#')[0]
		const expNo = key.split('#')[1]
		form.setFieldsValue({ [sampleKey]: { exps: { [expNo]: { params: paramsString } } } })

		setModalVisible(false)
	}

	const closeModalHandler = () => {
		setModalVisible(false)
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

		const key = sample.key

		return (
			<div key={key}>
				<Row gutter={16}>
					<Col span={2}>
						<Form.Item name={[key, 'instrumentName']} initialValue={sample.instrument}>
							<Input
								size='small'
								disabled
								style={{
									textAlign: 'center',
									color: '#389e0d',
									fontWeight: 600,
									backgroundColor: '#f0f5ff'
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={1}>
						<Form.Item name={[key, 'holder']} initialValue={sample.holder}>
							<Input
								size='small'
								disabled
								style={{
									textAlign: 'center',
									color: '#389e0d',
									fontWeight: 600,
									backgroundColor: '#f0f5ff'
								}}
							/>
						</Form.Item>
					</Col>
					<Col span={2}>
						<Form.Item
							name={[key, 'solvent']}
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
							name={[key, 'title']}
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
					<Col span={1}>
						<Space>
							<button className={classes.CircleButton} value={key} onClick={addExpHandler}>
								+
							</button>
							<button
								className={[classes.CircleButton, classes.CircleButtonMinus].join(' ')}
								value={key}
								onClick={removeExpHandler}>
								-
							</button>
						</Space>
					</Col>
					<Col span={10}>
						{expNoArr.map(expNo => (
							<Row key={expNo} gutter={16} align='top'>
								<Col span={1}>
									<span>{expNo}</span>
								</Col>
								<Col span={10}>
									<Form.Item
										name={[key, 'exps', expNo, 'paramSet']}
										style={{ textAlign: 'left' }}
										rules={[
											{
												required: true,
												message: 'Parameter set is required'
											}
										]}>
										<Select
											onChange={value => {
												onParamSetChange(key, expNo, value)
											}}>
											{paramSetsOptions}
										</Select>
									</Form.Item>
								</Col>
								<Col span={6}>
									<Form.Item name={[key, 'exps', expNo, 'params']}>
										<Input
											disabled
											style={{
												color: '#fa8c16',
												fontWeight: 600,
												backgroundColor: '#f0f5ff'
											}}
										/>
									</Form.Item>
								</Col>
								<Col>
									<button
										className={classes.ActionButton}
										value={key}
										onClick={e => openModalHandler(e, key, expNo)}>
										Edit
									</button>
								</Col>
								<Col span={2}>{exptState[key + '#' + expNo]}</Col>
							</Row>
						))}
					</Col>
				</Row>
				<Divider style={{ marginTop: 0 }} />
			</div>
		)
	})

	return (
		<div style={{ margin: '20px 40px' }}>
			<Row gutter={16} className={classes.Header}>
				<Col span={2}>Instrument</Col>
				<Col span={1}>Holder</Col>
				<Col span={2}>Solvent</Col>
				<Col span={6}>Title</Col>
				<Col span={1}>
					<span style={{ marginLeft: 20 }}>ExpNo</span>
				</Col>
				<Col span={3} offset={1}>
					Experiment [Parameter Set]
				</Col>
				<Col span={2} offset={1}>
					Parameters
				</Col>
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

			<EditParamsModal
				visible={modalVisible}
				closeModal={closeModalHandler}
				onOkHandler={modalOkHandler}
				inputData={modalInputData}
				reset={resetModal}
			/>
		</div>
	)
}

export default BookExperimentsForm
