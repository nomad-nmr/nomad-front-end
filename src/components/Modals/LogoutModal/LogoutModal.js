import React from 'react'
import { Modal, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router-dom'

const { Text } = Typography

const LogoutModal = props => {
	const { visible, token, okClicked, cancelClicked } = props
	const history = useHistory()
	const location = useLocation()
	return (
		<Modal
			width='300px'
			title={
				<div style={{ color: '#faad14' }}>
					<ExclamationCircleOutlined /> <span style={{ marginLeft: '10px' }}>Sign out</span>{' '}
				</div>
			}
			okText='Sign out'
			visible={visible}
			onOk={() => {
				//user should stay on /batch-submit page after log out
				if (location.pathname !== '/batch-submit') {
					history.push('/')
				}
				okClicked(token)
			}}
			onCancel={cancelClicked}>
			<Text strong>Do you want to sign out?</Text>
		</Modal>
	)
}

export default LogoutModal
