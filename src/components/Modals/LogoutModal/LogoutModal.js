import React from 'react'
import { Modal, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'

const { Text } = Typography

const LogoutModal = props => {
	const { visible, token, okClicked, cancelClicked } = props
	const history = useHistory()
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
				history.push('/')
				okClicked(token)
			}}
			onCancel={cancelClicked}>
			<Text strong>Do you want to sign out?</Text>
		</Modal>
	)
}

export default LogoutModal
