import React from 'react'
import { Table } from 'antd'
import classes from './DrawerTable.module.css'

const DrawerTable = props => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.drawerVisible
  // }
  const columns = [
    {
      title: 'Instrument',
      dataIndex: 'Instrument',
      key: 'instrument',
      align: 'center'
    },
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
      dataIndex: 'Group',
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
      expandable={
        props.id === 'errors'
          ? {
              expandedRowRender: record => (
                <p style={{ margin: 0, backgroundColor: '#fff1f0' }}>{record.Description}</p>
              ),
              rowExpandable: record => record.Description
            }
          : false
      }
    />
  )
}

export default React.memo(DrawerTable, (prevProps, nextProps) => prevProps.data === nextProps.data)
