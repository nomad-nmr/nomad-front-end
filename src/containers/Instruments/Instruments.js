import React, { useState } from 'react'
import { Table, Space, Switch, Button } from 'antd'

const Instruments = () => {
	const [instrumentSettings, setInstrumentsSettings] = useState([
		{
			key: 1,
			name: 'Alec',
			model: 'Bruker AVIII 500',
			probe: 'Prodigy',
			capacity: 60,
			running: true
		},
		{
			key: 2,
			name: 'Felix',
			model: 'Bruker AVIII HD 500',
			probe: 'BBFO+',
			capacity: 60,
			running: true
		}
	])

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
			title: 'ID',
			dataIndex: 'key',
			key: 'id'
		},
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
						onClick={() => {
							console.log(record.key)
						}}>
						Edit
					</Button>
					<Button size='small' danger>
						Delete
					</Button>
				</Space>
			)
		}
	]

	return (
		<div style={{ margin: '20px' }}>
			<Table columns={columns} dataSource={instrumentSettings} pagination={false} />
		</div>
	)
}

export default Instruments
