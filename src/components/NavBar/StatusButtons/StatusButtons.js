import React from 'react'
import { Avatar, Badge, Tooltip } from 'antd'
import { CaretRightOutlined, DownOutlined, ExclamationOutlined } from '@ant-design/icons'
import classes from './StatusButtons.module.css'

const statusButtons = props => {
  const buttonsArr = props.data.map(button => {
    let badgeBackground = ''
    let icon
    let tooltipText = ''
    const assignedClasses = [classes.Button]

    if (button.count !== 0) {
      assignedClasses.push(classes.Active)
    }

    switch (button.id) {
      case 'running':
        badgeBackground = '#1890ff'
        icon = <CaretRightOutlined />
        assignedClasses.push(classes.Running)
        tooltipText = 'Running Experiments'
        break
      case 'errors':
        badgeBackground = '#ff4d4f'
        icon = <ExclamationOutlined />
        assignedClasses.push(classes.Errors)
        tooltipText = 'Errors'
        break
      case 'pending':
        badgeBackground = '#722ed1'
        icon = <DownOutlined />
        assignedClasses.push(classes.Pending)
        tooltipText = 'Pending Experiments'
        break
      default:
        badgeBackground = ''
        icon = null
    }

    return (
      <Tooltip key={button.id} placement='bottom' title={tooltipText}>
        <Badge count={button.count} offset={[-12, 2]} style={{ backgroundColor: badgeBackground }}>
          <Avatar
            shape='square'
            size='medium'
            icon={icon}
            className={assignedClasses.join(' ')}
            onClick={button.count !== 0 ? () => props.click(button.id) : null}
          />
        </Badge>
      </Tooltip>
    )
  })
  return <div className={classes.StatusButtons}>{buttonsArr}</div>
}

export default statusButtons
