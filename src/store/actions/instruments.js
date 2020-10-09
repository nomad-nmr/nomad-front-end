import * as actionTypes from './actionTypes'
import axios from '../../axios-local'

export const fetchFailed = err => {
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

//This function is called every time a request to server is successful. Server returns array of table data and whole table gets re-rendered
export const fetchInstrumentsSuccess = payload => {
	return {
		type: actionTypes.FETCH_INSTRUMENTS_TABLE_SUCCESS,
		data: payload
	}
}

export const fetchInstruments = () => {
	return dispatch => {
		dispatch(fetchInstrumentsStart())
		axios
			.get('/admin/instruments/')
			.then(res => {
				dispatch(fetchInstrumentsSuccess(res.data))
			})
			.catch(err => {
				dispatch(fetchFailed(err))
			})
	}
}

export const addInstrument = formData => {
	return dispatch => {
		dispatch(fetchInstrumentsStart())
		axios
			.post('/admin/instruments/', formData)
			.then(res => {
				dispatch(fetchInstrumentsSuccess(res.data))
			})
			.catch(err => {
				dispatch(fetchFailed(err))
			})
	}
}

export const updateInstruments = formData => {
	return dispatch => {
		dispatch(fetchInstrumentsStart())
		axios
			.put('/admin/instruments/', formData)
			.then(res => {
				dispatch(fetchInstrumentsSuccess(res.data))
			})
			.catch(err => {
				dispatch(fetchFailed(err))
			})
	}
}

export const deleteInstrument = id => {
	return dispatch => {
		dispatch(fetchInstrumentsStart())
		axios
			.delete(`/admin/instruments/${id}`)
			.then(res => {
				dispatch(fetchInstrumentsSuccess(res.data))
			})
			.catch(err => {
				dispatch(fetchFailed(err))
			})
	}
}

export const toggleAvailableSwitchStart = () => {
	return {
		type: actionTypes.TOGGLE_AVAILABLE_SWITCH_START
	}
}

export const toggleAvailableSwitchSuccess = payload => {
	return {
		type: actionTypes.TOGGLE_AVAILABLE_SWITCH_SUCCESS,
		data: payload
	}
}

export const toggleAvailableStatus = id => {
	return dispatch => {
		dispatch(toggleAvailableSwitchStart())
		axios
			.patch(`/admin/instruments/toggle-available/${id}`)
			.then(res => {
				dispatch(toggleAvailableSwitchSuccess(res.data))
			})
			.catch(err => {
				dispatch(fetchFailed(err))
			})
	}
}

export const toggleShowForm = () => {
	return {
		type: actionTypes.TOGGLE_INSTRUMENT_FORM
	}
}
