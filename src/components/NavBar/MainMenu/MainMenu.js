import React from 'react'
import { useHistory } from 'react-router-dom'
import { Menu } from 'antd'

import { DownloadOutlined, DeliveredProcedureOutlined, SearchOutlined } from '@ant-design/icons'

import classes from './MainMenu.module.css'

const MainMenu = props => {
	const history = useHistory()

	const handleClick = e => {
		if (!props.username && e.keyPath[0] !== '/batch-submit') {
			props.openAuthModal(e.keyPath[0])
		} else {
			history.push({ pathname: e.keyPath[0] })
		}
	}

	return (
		<Menu mode='horizontal' onClick={handleClick} selectable={false} style={{ marginRight: 30 }}>
			<Menu.Item key='/submit' icon={<DownloadOutlined style={{ fontSize: 20 }} />}>
				<span className={classes.MenuItem}>Book New Job</span>
			</Menu.Item>
			<Menu.Item
				key='/batch-submit'
				disabled
				icon={<DeliveredProcedureOutlined style={{ fontSize: 20 }} />}>
				<span className={classes.MenuItem}>Batch Submit</span>
			</Menu.Item>
			<Menu.Item key='/search' disabled icon={<SearchOutlined style={{ fontSize: 20 }} />}>
				<span className={classes.MenuItem}>Search</span>
			</Menu.Item>
		</Menu>
	)
}

export default MainMenu
