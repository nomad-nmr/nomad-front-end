import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import SearchExpsTable from '../../components/SearchComponents/SearchExpsTable'
import {
  fetchExperiments,
  openAuthModal,
  resetChecked,
  updateCheckedDatasets,
  updateCheckedExps
} from '../../store/actions'

import classes from './Search.module.css'

const Search = props => {
  const { authToken, openModal, fetchExps, tabData } = props

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!authToken) {
      openModal()
    } else {
      fetchExps(authToken)
    }
  }, [authToken, openModal, fetchExps])

  return (
    <div className={classes.Container}>
      {authToken && (
        <SearchExpsTable
          data={tabData}
          loading={props.loading}
          checkedDatasetsHandler={props.updCheckedDatasets}
          checkedExpsHandler={props.updCheckedExps}
          checked={props.checked}
          resetCheckedState={props.resetChecked}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  authToken: state.auth.token,
  tabData: state.search.tableData,
  loading: state.search.loading,
  checked: state.search.checked
})

const mapDispatchToProps = dispatch => ({
  openModal: () => dispatch(openAuthModal()),
  fetchExps: token => dispatch(fetchExperiments(token)),
  updCheckedDatasets: payload => dispatch(updateCheckedDatasets(payload)),
  updCheckedExps: payload => dispatch(updateCheckedExps(payload)),
  resetChecked: () => dispatch(resetChecked())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
