import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
	fetchInstruments,
	updateInstruments,
	deleteInstrument,
	toggleAvailableStatus,
	toggleShowForm,
	addInstrument
} from '../../store/actions/index'
import { Table, Space, Switch, Button, Popconfirm, Tooltip, message } from 'antd'
import Animate from 'rc-animate'
import InstrumentsForm from '../../components/InstrumentsForm/InstrumentsForm'
import { CopyTwoTone } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import './Instruments.css'

const Instruments = props => {
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
			title: 'Available',
			key: 'available',
			render: record => (
				<Switch
					checked={record.available}
					checkedChildren='On'
					unCheckedChildren='Off'
					size='small'
					loading={props.switchIsLoading}
					onChange={() => props.toggleAvailable(record._id)}
				/>
			)
		},
		{
			title: 'Action',
			key: 'action',
			render: record => (
				<Space size='middle'>
					<Button
						size='small'
						type='link'
						onClick={() => {
							if (!props.formVisible) {
								props.toggleForm()
							}
							setTimeout(() => formRef.current.setFieldsValue(record), 100)
						}}>
						Edit
					</Button>
					<Popconfirm title='Sure to delete?' onConfirm={() => props.deleteInstrument(record._id)}>
						<Button size='small' type='link' danger>
							Delete
						</Button>
					</Popconfirm>
				</Space>
			)
		}
	]

	const form = (
		<InstrumentsForm
			updateInstrumentsHandler={props.updateInstr}
			addInstrumentHandler={props.addInstr}
			formReference={formRef}
			toggleEditHandler={props.toggleEdit}
			toggleFormHandler={props.toggleForm}
		/>
	)

	return (
		<div style={{ margin: '30px 20px' }}>
			<Animate transitionName='fade-form'>{props.formVisible && form}</Animate>
			<Table
				columns={columns}
				dataSource={props.instrTabData}
				pagination={false}
				loading={props.tableLoad}
				expandable={{
					expandedRowRender: record => (
						<p style={{ margin: 0 }}>
							<span style={{ fontWeight: 'bold', marginRight: '5px' }}>Instrument ID:</span>
							{record._id}
							<Tooltip title='Copy to Clipboard'>
								<CopyToClipboard
									text={record._id}
									onCopy={() => message.success('Instrument ID copied to clipboard')}>
									<CopyTwoTone style={{ marginLeft: '5px', fontSize: '15px' }} />
								</CopyToClipboard>
							</Tooltip>
						</p>
					)
				}}
			/>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		instrTabData: state.instruments.instrumentsTableData,
		tableLoad: state.instruments.tableIsLoading,
		switchIsLoading: state.instruments.availableSwitchIsLoading,
		formVisible: state.instruments.showForm
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchInstr: () => dispatch(fetchInstruments()),
		addInstr: payload => dispatch(addInstrument(payload)),
		updateInstr: payload => dispatch(updateInstruments(payload)),
		deleteInstrument: payload => dispatch(deleteInstrument(payload)),
		toggleAvailable: payload => dispatch(toggleAvailableStatus(payload)),
		toggleForm: () => dispatch(toggleShowForm())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Instruments)
