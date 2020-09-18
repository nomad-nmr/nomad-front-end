import * as actionTypes from './actionTypes'
import axios from '../../axios-local'

export const fetchFailed = (err) => {
	return {
		type: actionTypes.FETCH_FAILED,
		error: err
	}
}

export const fetchInstrumentsStart = () => {
	return {
		type: actionTypes.FETCH_INSTRUMENTS_TABLE_START
	}
}

export const fetchInstrumentsSuccess = (payload) => {
	return {
		type: actionTypes.FETCH_INSTRUMENTS_TABLE_SUCCESS,
		data: payload
	}
}

export const fetchInstruments = () => {
	return (dispatch) => {
		dispatch(fetchInstrumentsStart())
		axios
			.get('/admin/instruments/get-instruments')
			.then((res) => {
				dispatch(fetchInstrumentsSuccess(res.data))
			})
			.catch((err) => {
				dispatch(fetchFailed(err))
			})
	}
}

export const updateInstruments = (formData) => {
	return (dispatch) => {
		dispatch(fetchInstrumentsStart())
		axios
			.post('/admin/instruments/update-instruments', formData)
			.then((res) => {
				dispatch(fetchInstrumentsSuccess(res.data))
			})
			.catch((err) => {
				dispatch(fetchFailed(err))
			})
	}
}

export const deleteInstrument = (key) => {
	return (dispatch) => {
		dispatch(fetchInstrumentsStart())
		axios
			.post('/admin/instruments/delete-instrument', { id: key })
			.then((res) => {
				dispatch(fetchInstrumentsSuccess(res.data))
			})
			.catch((err) => {
				dispatch(fetchFailed(err))
			})
	}
}

export const toggleRunningSwitchStart = () => {
	return {
		type: actionTypes.TOGGLE_RUNNING_SWITCH_START
	}
}

export const toggleRunningSwitchSuccess = (payload) => {
	return {
		type: actionTypes.TOGGLE_RUNNING_SWITCH_SUCCESS,
		data: payload
	}
}

export const toggleRunningStatus = (key) => {
	return (dispatch) => {
		dispatch(toggleRunningSwitchStart())
		axios
			.post('/admin/instruments/toggle-running', { id: key })
			.then((res) => {
				dispatch(toggleRunningSwitchSuccess(res.data))
			})
			.catch((err) => {
				dispatch(fetchFailed(err))
			})
	}
}
