import * as actionTypes from './actionTypes'
import axios from '../../axios-local'

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
			.get('/dash/drawer-table/' + id)
			.then(res => {
				dispatch(openDashDrawerSuccess(res.data))
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
			.get('/dash/status-summary')
			.then(res => dispatch(fetchStatusSummarySuccess(res.data)))
			.catch(err => dispatch(fetchFailed(err + ' [fetchStatusSummary failed]')))
	}
}

export const fetchStatusTableStart = () => ({
	type: actionTypes.FETCH_STATUS_TABLE_START
})

export const fetchStatusTableSuccess = payload => ({
	type: actionTypes.FETCH_STATUS_TABLE_SUCCESS,
	data: payload
})

export const fetchStatusTable = tab => {
	return dispatch => {
		dispatch(fetchStatusTableStart())
		axios
			.get('/dash/status-table/' + tab)
			.then(res => dispatch(fetchStatusTableSuccess(res.data)))
			.catch(err => dispatch(fetchFailed(err + '  [fetchStatusTable failed')))
	}
}
