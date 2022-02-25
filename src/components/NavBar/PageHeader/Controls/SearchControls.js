import React from 'react'
import { Button } from 'antd'

import classes from '../PageHeader.module.css'

const SearchControls = props => {
  const { searchCheckedState, downloadExpsReq, token } = props

  const getExpsArr = () => {
    let expsArr = []
    searchCheckedState.forEach(entry => {
      expsArr = [...expsArr, ...entry.exps]
    })
    return expsArr
  }

  const downloadHandler = () => downloadExpsReq(getExpsArr(), token)

  return (
    <div className={classes.ExtraContainer}>
      <Button
        className={classes.Button}
        type='primary'
        onClick={() => console.log('NMRium')}
        disabled={searchCheckedState.length === 0}
      >
        Open NMRium
      </Button>
      <Button
        className={classes.Button}
        onClick={() => downloadHandler()}
        disabled={searchCheckedState.length === 0}
      >
        Download
      </Button>
    </div>
  )
}

export default SearchControls
