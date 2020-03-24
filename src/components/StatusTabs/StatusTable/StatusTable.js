import React from 'react'
import { Table } from 'antd'

const StatusTable = props => {
  const columns = [
    {
      title: 'Holder',
      dataIndex: 'Holder',
      key: 'holder'
    },
    {
      title: 'User',
      dataIndex: 'Username',
      key: 'user'
    },
    {
      title: 'Group',
      dataIndex: 'Group',
      key: 'group'
    },
    {
      title: 'Dataset Name',
      dataIndex: 'Name',
      key: 'name'
    },
    {
      title: 'ExpNo',
      dataIndex: 'ExpNo',
      key: 'expno'
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
      key: 'time'
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'status'
    }
  ]
  return <Table columns={columns} dataSource={props.data} size='middle' />
}

export default StatusTable
