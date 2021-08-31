import React from 'react'
import { Tag, Badge } from 'antd'

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined
} from '@ant-design/icons'

const StatusTag = props => {
  const { text } = props
  switch (text) {
    case 'Completed':
      return (
        <Tag icon={<CheckCircleOutlined />} color='success'>
          {text}
        </Tag>
      )
    case 'Error':
      return (
        <Tag icon={<CloseCircleOutlined />} color='error'>
          {text}
        </Tag>
      )
    case 'Booked':
      return (
        <Tag icon={<DownCircleOutlined />} color='gold'>
          {text}
        </Tag>
      )
    case 'Submitted':
      return (
        <Tag icon={<ClockCircleOutlined />} color='default'>
          {text}
        </Tag>
      )
    case 'Running':
      return (
        <Tag icon={<SyncOutlined spin />} color='processing'>
          {text}
        </Tag>
      )

    default:
      return <Badge status='default' text={text} />
  }
}

export default StatusTag
