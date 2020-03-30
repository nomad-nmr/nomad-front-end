import React from 'react'
import { Avatar, Badge } from 'antd'
import { PlayCircleOutlined, DownCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import classes from './StatusButtons.module.css'

const statusButtons = props => {
  const buttonsArr = props.data.map(button => {
    let badgeBackground = ''
    let icon
    const assignedClasses = [classes.Button]

    switch (button.id) {
      case 'running':
        badgeBackground = '#1890ff'
        icon = <PlayCircleOutlined />
        assignedClasses.push(classes.Running)
        break
      case 'errors':
        badgeBackground = '#ff4d4f'
        icon = <ExclamationCircleOutlined />
        assignedClasses.push(classes.Errors)
        break
      case 'pending':
        badgeBackground = '#722ed1'
        icon = <DownCircleOutlined />
        assignedClasses.push(classes.Pending)
        break
      default:
        badgeBackground = ''
        icon = null
    }

    return (
      <Badge
        key={button.id}
        count={button.count}
        offset={[-10, 0]}
        style={{ backgroundColor: badgeBackground }}
      >
        <Avatar shape='square' size='medium' icon={icon} className={assignedClasses.join(' ')} />
      </Badge>
    )
  })
  return <div className={classes.StatusButtons}>{buttonsArr}</div>
}

export default statusButtons
