import React, { useContext } from 'react'
import TrafficLightContext from '../../context/trafficLights-context'
import { Tooltip, Avatar } from 'antd'
import classes from './TrafficLights.module.css'

const TrafficLights = props => {
  const trafficLightsArr = []
  const { errors, running, availableHolders } = useContext(TrafficLightContext)
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
        <Avatar size='small' style={assignedStyle} className={classes.Running} />
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
