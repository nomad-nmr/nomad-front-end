import React, { useContext } from 'react'
import TrafficLightContext from '../../context/trafficLights-context'
import { Tooltip, Avatar } from 'antd'
import classes from './TrafficLights.module.css'

const TrafficLights = props => {
	const trafficLightsArr = []
	const { errors, running, availableHolders } = useContext(TrafficLightContext)

	if (errors) {
		trafficLightsArr.push(
			<Tooltip key='errors' placement='right' title='Errors'>
				<Avatar size='small' style={{ marginBottom: '3px' }} className={classes.Errors}>
					{errors}
				</Avatar>
			</Tooltip>
		)
	}

	if (running) {
		trafficLightsArr.push(
			<Tooltip key='running' placement='right' title='Running Experiment'>
				<Avatar size='small' style={{ marginBottom: '3px' }} className={classes.Running} />
			</Tooltip>
		)
	}

	if (availableHolders) {
		trafficLightsArr.push(
			<Tooltip key='availableHolders' placement='right' title='Available Holders'>
				<Avatar size='small' className={classes.Available}>
					{availableHolders}
				</Avatar>
			</Tooltip>
		)
	}

	return <>{trafficLightsArr}</>
}

export default TrafficLights
