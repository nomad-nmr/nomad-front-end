import React from 'react'
import { Table, Tag } from 'antd'
import TweenOne from 'rc-tween-one'
import classes from './StatusTable.module.css'

const statusTable = props => {
  const columns = [
    {
      title: 'Holder',
      dataIndex: 'Holder',
      key: 'holder',
      align: 'center'
    },
    {
      title: 'User',
      dataIndex: 'Username',
      key: 'user',
      align: 'center'
    },
    {
      title: 'Group',
      dataIndex: 'User',
      key: 'group',
      align: 'center'
    },
    {
      title: 'Dataset Name',
      dataIndex: 'Name',
      key: 'name',
      align: 'center'
    },
    {
      title: 'ExpNo',
      dataIndex: 'ExpNo',
      key: 'expno',
      align: 'center'
    },
    {
      title: 'Experiment',
      dataIndex: 'Experiment',
      key: 'exp'
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'title'
    },
    {
      title: 'ExpT',
      dataIndex: 'Time',
      key: 'time',
      align: 'center'
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'status',
      align: 'center',
      render: text => {
        let tagColor = ''
        let animationObj = null
        switch (text) {
          case 'Running':
            tagColor = 'processing'
            animationObj = {
              opacity: 0.3,
              yoyo: true,
              repeat: -1,
              duration: 500
            }
            break
          case 'Submitted':
            tagColor = 'purple'
            break
          case 'Completed':
            tagColor = 'gold'
            break
          case 'Error':
            tagColor = 'red'
            break
          default:
            tagColor = 'default'
        }
        return (
          <TweenOne animation={animationObj}>
            <Tag color={tagColor}>{text}</Tag>
          </TweenOne>
        )
      }
    }
  ]
  return (
    <Table
      columns={columns}
      dataSource={props.data}
      loading={props.loading}
      size='small'
      pagination={false}
      rowClassName={record => (record.highlight ? classes.RowHighlight : null)}
    />
  )
}

export default statusTable
