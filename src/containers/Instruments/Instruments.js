import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
	fetchInstruments,
	updateInstruments,
	deleteInstrument,
	toggleRunningStatus
} from '../../store/actions/index'
import { Table, Space, Switch, Button, Popconfirm } from 'antd'
import InstrumentsForm from '../../components/InstrumentsForm/InstrumentsForm'

const Instruments = (props) => {
	const { fetchInstr } = props
	const formRef = useRef({})

	useEffect(() => {
		fetchInstr()
	}, [fetchInstr])

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Model',
			dataIndex: 'model',
			key: 'model'
		},
		{
			title: 'Probe',
			dataIndex: 'probe',
			key: 'probe'
		},
		{
			title: 'Capacity',
			dataIndex: 'capacity',
			key: 'capacity'
		},
		{
			title: 'Action',
			key: 'action',
			render: (record) => (
				<Space size='middle'>
					<Switch
						checked={record.running}
						checkedChildren='On'
						unCheckedChildren='Off'
						size='small'
						loading={props.switchIsLoading}
						onChange={() => props.toggleRunning(record.key)}
					/>
					<Button
						size='small'
						type='link'
						onClick={() => {
							formRef.current.setFieldsValue(record)
						}}>
						Edit
					</Button>
					<Popconfirm title='Sure to delete?' onConfirm={() => props.deleteInstrument(record.key)}>
						<Button size='small' type='link' danger>
							Delete
						</Button>
					</Popconfirm>
				</Space>
			)
		}
	]

	return (
		<div style={{ margin: '20px' }}>
			<InstrumentsForm
				updateInstrumentsHandler={props.updateInstr}
				formReference={formRef}
				toggleEditHandler={props.toggleEdit}
			/>
			<Table
				columns={columns}
				dataSource={props.instrTabData}
				pagination={false}
				loading={props.tableLoad}
			/>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		instrTabData: state.instruments.instrumentsTableData,
		tableLoad: state.instruments.tableIsLoading,
		switchIsLoading: state.instruments.runningSwitchIsLoading
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchInstr: () => dispatch(fetchInstruments()),
		updateInstr: (payload) => dispatch(updateInstruments(payload)),
		deleteInstrument: (payload) => dispatch(deleteInstrument(payload)),
		toggleRunning: (payload) => dispatch(toggleRunningStatus(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Instruments)
