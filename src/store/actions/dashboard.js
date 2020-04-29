import * as actionTypes from './actionTypes'
import axios from '../../axios-firebase'

export const toggleCards = () => {
  return {
    type: actionTypes.TOGGLE_CARDS
  }
}

export const fetchFailed = err => {
  return {
    type: actionTypes.FETCH_FAILED,
    error: err
  }
}

export const fetchStatusButtonsSuccess = payload => {
  return {
    type: actionTypes.FETCH_STATUS_BUTTONS_SUCCESS,
    data: payload
  }
}

export const fetchStatusButtons = () => {
  return dispatch => {
    axios
      .get('/buttons.json')
      .then(res => {
        dispatch(fetchStatusButtonsSuccess(res.data))
      })
      .catch(err => {
        dispatch(fetchFailed(err))
      })
  }
}

export const openDashDrawerStart = payload => ({
  type: actionTypes.OPEN_DASH_DRAWER_START,
  id: payload
})

export const openDashDrawerSuccess = payload => ({
  type: actionTypes.FETCH_DASH_DRAWER_SUCCESS,
  data: payload
})

export const openDashDrawer = id => {
  return dispatch => {
    dispatch(openDashDrawerStart(id))
    axios
      .get('/drawer-tables/' + id + '.json')
      .then(res => {
        dispatch(openDashDrawerSuccess(res))
      })
      .catch(err => {
        dispatch(fetchFailed(err + ' [fetchDrawerData failed]'))
      })
  }
}

export const closeDashDrawer = () => ({
  type: actionTypes.CLOSE_DASH_DRAWER
})

export const fetchStatusSummarySuccess = payload => ({
  type: actionTypes.FETCH_STATUS_SUMMARY_SUCCESS,
  data: payload
})

export const fetchStatusSummary = () => {
  
  return dispatch => {
    axios
      .get('/cards.json')
      .then(res => dispatch(fetchStatusSummarySuccess(res.data)))
      .catch(err => dispatch(fetchFailed(err + ' [fetchStatusSummary failed]')))
  }
}
