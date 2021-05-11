import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {
	fetchInstruments,
	updateInstruments,
	toggleActiveInstr,
	toggleAvailableInTable,
	toggleShowForm,
	addInstrument
} from '../../store/actions/index'
import { Table, Space, Switch, Button, Tag, Tooltip, message, Avatar } from 'antd'
import Animate from 'rc-animate'
import InstrumentForm from '../../components/Forms/InstrumentForm/InstrumentForm'
import { CopyTwoTone } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import './Instruments.css'

const { CheckableTag } = Tag

const Instruments = props => {
	const { fetchInstr, authToken, showInactive } = props
	const formRef = useRef({})

	useEffect(() => {
		window.scrollTo(0, 0)
		fetchInstr(authToken, showInactive)
	}, [fetchInstr, authToken, showInactive])

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name'
		},
		{
			title: 'Model',
			dataIndex: 'model'
		},
		{
			title: 'Probe',
			dataIndex: 'probe'
		},
		{
			title: 'Capacity',
			dataIndex: 'capacity',
			align: 'center'
		},
		{
			title: 'Connected',
			dataIndex: 'connected',
			align: 'center',
			render: record => <Avatar size='small' style={{ backgroundColor: record ? '#389e0d' : '#cf1322' }} />
		},
		{
			title: 'Available',
			align: 'center',
			render: record => (
				<Switch
					checked={record.available}
					checkedChildren='On'
					unCheckedChildren='Off'
					size='small'
					onChange={() => props.toggleAvailable(record._id, props.authToken)}
				/>
			)
		},
		{
			title: 'Actions',
			align: 'center',
			render: record => (
				<Space>
					<Button
						size='small'
						type='link'
						onClick={() => {
							if (!props.formVisible) {
								props.toggleForm(true)
							}
							setTimeout(() => formRef.current.setFieldsValue(record), 100)
						}}>
						Edit
					</Button>
					<CheckableTag
						key={record.key}
						checked={record.isActive}
						onChange={() => {
							props.toggleActive(record._id, props.authToken)
						}}>
						{record.isActive ? 'Active' : 'Inactive'}
					</CheckableTag>
				</Space>
			)
		}
	]

	const form = (
		<InstrumentForm
			updateInstrumentsHandler={props.updateInstr}
			addInstrumentHandler={props.addInstr}
			formReference={formRef}
			toggleEditHandler={props.toggleEdit}
			toggleFormHandler={props.toggleForm}
			authToken={props.authToken}
			editing={props.editing}
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
		formVisible: state.instruments.showForm,
		authToken: state.auth.token,
		showInactive: state.instruments.showInactive,
		editing: state.instruments.editing
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchInstr: (token, showInactive) => dispatch(fetchInstruments(token, showInactive)),
		addInstr: (payload, token) => dispatch(addInstrument(payload, token)),
		updateInstr: (payload, token) => dispatch(updateInstruments(payload, token)),
		toggleAvailable: (payload, token) => dispatch(toggleAvailableInTable(payload, token)),
		toggleActive: (payload, token) => dispatch(toggleActiveInstr(payload, token)),
		toggleForm: editing => dispatch(toggleShowForm(editing))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Instruments)
