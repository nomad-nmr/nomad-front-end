import React from 'react'
import { Table } from 'antd'

const AccountsTable = props => {
  // const dataTest = [
  //   {
  //     name: 'Tomas Lebl [tl12]',
  //     costsPerInstrument: [
  //       { instrument: 'Alec', expCount: 10, expT: '0:25:14', cost: 25 },
  //       { instrument: 'Felix', expCount: 20, expT: '0:50:14', cost: 51 },
  //       { instrument: 'Felix', expCount: 20, expT: '0:50:14', cost: 51 },
  //       { instrument: 'Felix', expCount: 20, expT: '0:50:14', cost: 51 },
  //       { instrument: 'Felix', expCount: 20, expT: '0:50:14', cost: 51 },
  //       { instrument: 'Felix', expCount: 20, expT: '0:50:14', cost: 51 }
  //     ],
  //     totalCost: '76'
  //   }
  // ]

  const columns = [
    {
      title: 'User',
      width: 35,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      align: 'center'
    }
  ]

  //Getting dynamic table headers from the first data object
  props.data[0].costsPerInstrument.forEach((cost, index) => {
    columns.push({
      title: cost.instrument,
      children: [
        {
          title: 'Exp Count',
          dataIndex: 'expCount' + index,
          align: 'center',
          width: 20
        },
        {
          title: 'Exp Time',
          dataIndex: 'expTime' + index,
          align: 'center',
          width: 20
        },
        {
          title: 'Cost [£]',
          dataIndex: 'cost' + index,
          align: 'center',
          width: 20
        }
      ]
    })
  })
  //adding total column header
  columns.push({
    title: 'Total Cost [£]',
    dataIndex: 'totalCost',
    align: 'center',
    fixed: 'right',
    width: 20
  })

  const data = props.data.map((entry, key) => {
    const newEntry = {
      name: entry.name,
      totalCost: entry.totalCost,
      key
    }
    entry.costsPerInstrument.forEach((instr, index) => {
      newEntry['expCount' + index] = instr.expCount
      newEntry['expTime' + index] = instr.expT
      newEntry['cost' + index] = instr.cost
    })
    return newEntry
  })

  return (
    <Table
      style={{ margin: '0 50px 0 50px' }}
      columns={columns}
      dataSource={data}
      bordered={true}
      size='small'
      pagination={false}
      scroll={{
        x: true
      }}
    />
  )
}

export default AccountsTable
