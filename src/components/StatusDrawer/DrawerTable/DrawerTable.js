import React, { Component } from 'react'
import { Table } from 'antd'
import classes from './DrawerTable.module.css'

class DrawerTable extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.drawerVisible
  }

  render() {
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
        dataSource={this.props.data}
        loading={this.props.loading}
        size='small'
        pagination={false}
        rowClassName={(record) => (record.highlight ? classes.RowHighlight : null)}
        expandable={
          this.props.id === 'errors'
            ? {
                expandedRowRender: (record) => (
                  <p style={{ margin: 0, backgroundColor: '#fff1f0' }}>{record.Description}</p>
                ),
                rowExpandable: (record) => record.Description
              }
            : false
        }
      />
    )
  }
}

export default DrawerTable
