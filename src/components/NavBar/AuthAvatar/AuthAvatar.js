import React from 'react'
import { connect } from 'react-redux'
import { Avatar, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import classes from './AuthAvatar.module.css'
import { openAuthModal } from '../../../store/actions/index'

const AuthAvatar = props => {
	const assignedClasses = [classes.AuthAvatar]

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
					<span className={classes.Popover} onClick={props.onClick}>
						Sign out
					</span>
				}>
				<Avatar size='large' className={assignedClasses.join(' ')} onClick={props.onClick}>
					{props.username[0].toUpperCase()}
				</Avatar>
			</Popover>
		)
	} else {
		avatarEl = (
			<Avatar size='large' className={assignedClasses.join(' ')} onClick={props.onClick}>
				{<UserOutlined />}
			</Avatar>
		)
	}

	return avatarEl
}

const mapStateToProps = state => {
	return {
		username: state.auth.username,
		accessLevel: state.auth.accessLevel
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onClick: () => dispatch(openAuthModal())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthAvatar)
