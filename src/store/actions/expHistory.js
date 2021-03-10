import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'
import errorHandler from './errorHandler'

export const fetchHistoryStart = () => ({
	type: actionTypes.FETCH_EXP_HISTORY_START
})

export const fetchHistorySuccess = payload => ({
	type: actionTypes.FETCH_EXP_HISTORY_SUCCESS,
	payload
})

export const fetchHistory = (token, instrId, date) => {
	return dispatch => {
		dispatch(fetchHistoryStart())
		axios
			.get('/admin/history/' + instrId + '/' + date, { headers: { Authorization: 'Bearer ' + token } })
			.then(res => dispatch(fetchHistorySuccess(res.data)))
			.catch(err => {
				dispatch(errorHandler(err))
			})
	}
}

export const setExpHistoryDate = payload => ({
	type: actionTypes.SET_EXP_HISTORY_DATE,
	payload
})
