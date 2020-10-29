import React from 'react'
import TweenOne from 'rc-tween-one'
// import AnimateFlash from './AnimateFlash'
import { Tooltip, Avatar } from 'antd'
import classes from './TrafficLights.module.css'

const TrafficLights = props => {
	const trafficLightsArr = []

	const { errors, running, availableHolders } = props.data.status.summary

	const tooltipPlace = props.type === 'horizontal' ? 'top' : 'right'
	const assignedStyle = props.type === 'horizontal' ? { marginLeft: '5px' } : { marginTop: '3px' }

	if (errors) {
		trafficLightsArr.push(
			<Tooltip key='errors' placement={tooltipPlace} title='Errors'>
				<Avatar size='small' style={assignedStyle} className={classes.Errors}>
					{errors}
				</Avatar>
			</Tooltip>
		)
	}

	if (running) {
		trafficLightsArr.push(
			<Tooltip key='running' placement={tooltipPlace} title='Running Experiment'>
				<TweenOne
					animation={{
						opacity: 1,
						scale: 1,
						yoyo: true,
						repeat: -1,
						duration: 500
					}}
					style={{ opacity: 0.5, transform: 'scale(0.8)' }}>
					<Avatar size='small' style={assignedStyle} className={classes.Running} />
				</TweenOne>
			</Tooltip>
		)
	}

	if (availableHolders) {
		trafficLightsArr.push(
			<Tooltip key='availableHolders' placement={tooltipPlace} title='Available Holders'>
				<Avatar size='small' style={assignedStyle} className={classes.Available}>
					{availableHolders}
				</Avatar>
			</Tooltip>
		)
	}

	return (
		<div className={props.type === 'horizontal' ? classes.Horizontal : classes.Vertical}>
			{trafficLightsArr}
		</div>
	)
}

export default TrafficLights
