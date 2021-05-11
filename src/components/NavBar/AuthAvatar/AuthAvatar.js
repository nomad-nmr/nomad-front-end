import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Avatar, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import classes from './AuthAvatar.module.css'

const AuthAvatar = props => {
	const assignedClasses = [classes.AuthAvatar]

	const history = useHistory()
	const { username, redirectTo } = props

	//Hook that redirects after successful login
	useEffect(() => {
		if (username && redirectTo) {
			history.push(redirectTo)
		}
	}, [username, redirectTo, history])

	let avatarEl
	if (props.username) {
		if (props.accessLevel === 'admin') {
			assignedClasses.push(classes.Admin)
		} else {
			assignedClasses.push(classes.User)
		}
		avatarEl = (
			<Popover
				placement='bottomRight'
				title={
					<>
						Signed in as <strong>{props.username}</strong>
					</>
				}
				content={
					<span className={classes.Popover} onClick={() => props.onClick('/')}>
						Sign out
					</span>
				}>
				<Avatar size='large' className={assignedClasses.join(' ')} onClick={() => props.onClick('/')}>
					{props.username[0].toUpperCase()}
				</Avatar>
			</Popover>
		)
	} else {
		avatarEl = (
			<Avatar size='large' className={assignedClasses.join(' ')} onClick={() => props.onClick(null)}>
				{<UserOutlined />}
			</Avatar>
		)
	}

	return avatarEl
}

export default AuthAvatar
