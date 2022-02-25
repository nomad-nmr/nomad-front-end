import axios from '../../axios-instance'
import fileDownload from 'js-file-download'

import * as actionTypes from '../actions/actionTypes'
import errorHandler from './errorHandler'

export const fetchExperimentsStart = () => ({
  type: actionTypes.FETCH_EXPERIMENTS_START
})

export const fetchExperimentsSuccess = payload => ({
  type: actionTypes.FETCH_EXPERIMENTS_SUCCESS,
  payload
})

export const fetchExperiments = token => {
  return dispatch => {
    dispatch(fetchExperimentsStart())
    axios
      .get('/search/experiments', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(res => {
        dispatch(fetchExperimentsSuccess(res.data))
      })
      .catch(err => {
        dispatch(errorHandler(err))
      })
  }
}

export const updateCheckedExps = payload => ({
  type: actionTypes.UPDATE_CHECKED_EXPS,
  payload
})

export const updateCheckedDatasets = payload => ({
  type: actionTypes.UPDATE_CHECKED_DATASETS,
  payload
})

export const resetChecked = () => ({
  type: actionTypes.RESET_CHECKED
})

export const downloadExpsStart = () => ({
  type: actionTypes.DOWNLOAD_EXPS_START
})
export const downloadExpsSuccess = () => ({
  type: actionTypes.DOWNLOAD_EXPS_SUCCESS
})

export const downloadExps = (expIds, token) => {
  return dispatch => {
    dispatch(downloadExpsStart())
    axios
      .get('/data/exps/?' + new URLSearchParams({ exps: expIds }).toString(), {
        responseType: 'blob',
        headers: { Authorization: 'Bearer ' + token }
      })
      .then(res => {
        fileDownload(res.data, 'experiment.zip')
        dispatch(downloadExpsSuccess())
      })
      .catch(err => {
        dispatch(errorHandler(err))
      })
  }
}
