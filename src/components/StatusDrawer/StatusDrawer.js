import React, { useState } from 'react'
import { Drawer, Button, Space } from 'antd'
import DrawerTable from './DrawerTable/DrawerTable'

const statusDrawer = props => {
	const { id, visible, tableData, dataLoading } = props.status

	//   const [selectedExps , setSelectedExps  ]

	let title = ''
	let buttons = null
	const headerClass = {
		textAlign: 'center',
		backgroundColor: '',
		borderBottom: '2px solid'
	}
	switch (id) {
		case 'errors':
			title = 'Errors'
			headerClass.backgroundColor = '#ffccc7'
			headerClass.borderBottom += '#f5222d'
			break
		case 'running':
			title = 'Running Experiments'
			headerClass.backgroundColor = '#bae7ff'
			headerClass.borderBottom += '#1890ff'
			break
		case 'pending':
			title = 'Pending Experiments'
			headerClass.backgroundColor = '#ffffb8'
			headerClass.borderBottom += '#fadb14'
			buttons = (
				<Space size='large'>
					<Button type='primary'>Submit</Button>
					<Button>Cancel</Button>
				</Space>
			)
			break
		default:
			title = ''
	}

	return (
		<Drawer
			title={title}
			placement='top'
			closable={true}
			mask={true}
			keyboard
			height='auto'
			// getContainer={false}
			visible={visible}
			// style={{ position: 'absolute' }}
			onClose={props.closeClicked}
			headerStyle={headerClass}>
			<DrawerTable id={id} data={tableData} loading={dataLoading} drawerVisible={visible} />
			<div style={{ textAlign: 'center', marginTop: 20 }}>{buttons}</div>
		</Drawer>
	)
}

export default statusDrawer
