import React from 'react'
import { Button } from 'antd'

import classes from '../PageHeader.module.css'

const SearchControls = props => {
  const { searchCheckedState, toggleModal, token } = props

  let expsArr = []
  searchCheckedState.forEach(entry => {
    expsArr = [...expsArr, ...entry.exps]
  })

  const searchParams = new URLSearchParams({ expIds: expsArr, token })

  return (
    <div className={classes.ExtraContainer}>
      <a href={process.env.REACT_APP_NMRIUM_URL + '/?' + searchParams.toString()}>
        <Button className={classes.Button} type='primary' disabled={searchCheckedState.length === 0}>
          Open NMRium
        </Button>
      </a>
      <Button
        className={classes.Button}
        onClick={() => toggleModal()}
        disabled={searchCheckedState.length === 0}
      >
        Download
      </Button>
    </div>
  )
}

export default SearchControls
