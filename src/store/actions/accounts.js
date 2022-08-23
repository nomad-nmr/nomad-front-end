import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'
import errorHandler from './errorHandler'

export const fetchCostsStart = () => ({
  type: actionTypes.FETCH_COSTS_START
})

export const fetchCostsSuccess = payload => ({
  type: actionTypes.FETCH_COSTS_SUCCESS,
  payload
})

export const fetchCosts = (token, searchParams) => {
  return dispatch => {
    dispatch(fetchCostsStart())
    axios
      .get('admin/accounts/costs/?' + new URLSearchParams(searchParams).toString(), {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(res => {
        dispatch(fetchCostsSuccess(res.data))
      })
      .catch(err => {
        dispatch(errorHandler(err))
      })
  }
}

export const resetCostsTable = () => ({
  type: actionTypes.RESET_COSTS_TABLE
})
