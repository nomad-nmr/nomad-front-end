import React, { useState, useEffect } from 'react'
import { Table, Space, Switch, Button, Popconfirm } from 'antd'
import axios from '../../axios-local'

import InstrumentsForm from '../../components/InstrumentsForm/InstrumentsForm'

const Instruments = () => {
	const [instrumentSettings, setInstrumentsSettings] = useState([])

	useEffect(
		() =>
			axios
				.get('/admin/instruments/get-instruments')
				.then((res) => {
					setInstrumentsSettings(res.data)
				})
				.catch((err) => {
					console.log(err)
				}),
		[]
	)

	const runningSwitchHandler = (id) => {
		const newSettings = [...instrumentSettings]
		newSettings.forEach((element) => {
			if (element.key === id) {
				element.running = !element.running
			}
		})
		setInstrumentsSettings(newSettings)
	}

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
						onChange={() => runningSwitchHandler(record.key)}
					/>
					<Button
						size='small'
						type='link'
						onClick={() => {
							console.log(record.key)
						}}>
						Edit
					</Button>
					<Popconfirm title='Sure to delete?' onConfirm={() => console.log(record.key)}>
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
			<InstrumentsForm updateInstruments={setInstrumentsSettings} />
			<Table columns={columns} dataSource={instrumentSettings} pagination={false} />
		</div>
	)
}

export default Instruments
