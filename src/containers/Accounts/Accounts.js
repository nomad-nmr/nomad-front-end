import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Empty } from 'antd'

import AccountsForm from '../../components/AccountsComponents/AccountsForm'
import AccountsTable from '../../components/AccountsComponents/AccountsTable'

import { fetchCosts, fetchGroupList, resetCostsTable } from '../../store/actions'

import classes from './Accounts.module.css'

const Accounts = props => {
  const { fetchGrpList, authToken, grpList, tableData, resetTable } = props

  useEffect(() => {
    fetchGrpList(authToken, false)
    return () => {
      resetTable()
    }
  }, [authToken, fetchGrpList, resetTable])

  const onFormSubmit = values => {
    const { dateRange } = values
    if (dateRange) {
      values.dateRange = dateRange.map(date => date.format('YYYY-MM-DD'))
    }
    props.fetchCostsData(authToken, values)
  }
  return (
    <div>
      <div className={classes.Form}>
        <AccountsForm groupList={grpList} submitHandler={onFormSubmit} loading={props.loading} />
      </div>
      {tableData.length > 0 ? <AccountsTable data={tableData} /> : <Empty />}
    </div>
  )
}

const mapStateToProps = state => ({
  authToken: state.auth.token,
  grpList: state.groups.groupList,
  loading: state.accounts.loading,
  tableData: state.accounts.costsTableData
})

const mapDispatchToProps = dispatch => ({
  fetchGrpList: (token, showInactive) => dispatch(fetchGroupList(token, showInactive)),
  fetchCostsData: (token, searchParams) => dispatch(fetchCosts(token, searchParams)),
  resetTable: () => dispatch(resetCostsTable())
})

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)
