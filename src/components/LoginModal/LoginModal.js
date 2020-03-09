import React from 'react'
import { Modal, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const LoginModal = props => {
	return (
		<div>
			<Modal okText='' visible={props.visible} onCancel={props.cancelClicked}>
				<p> TEST</p>
			</Modal>
		</div>
	)
}

export default LoginModal
