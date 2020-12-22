import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'
import errorHandler from './errorHandler'
import { message } from 'antd'

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

export const addInstrumentFailed = payload => {
	return {
		type: actionTypes.ADD_INSTRUMENT_FAILED,
		data: payload
	}
}

export const fetchInstruments = token => {
	return dispatch => {
		dispatch(fetchInstrumentsStart())
		axios
			.get('/admin/instruments/?auth=' + token)
			.then(res => {
				dispatch(fetchInstrumentsSuccess(res.data))
			})
			.catch(err => {
				dispatch(errorHandler(err))
			})
	}
}

export const addInstrument = (formData, token) => {
	return dispatch => {
		dispatch(fetchInstrumentsStart())
		axios
			.post('/admin/instruments/?auth=' + token, formData)
			.then(res => {
				message.success('Instrument was successfully added to database')
				dispatch(fetchInstrumentsSuccess(res.data))
			})
			.catch(err => {
				dispatch(errorHandler(err))
			})
	}
}

export const updateInstruments = (formData, token) => {
	return dispatch => {
		dispatch(fetchInstrumentsStart())
		axios
			.put('/admin/instruments/?auth=' + token, formData)
			.then(res => {
				message.success('Instrument was successfully updated in database')
				dispatch(fetchInstrumentsSuccess(res.data))
			})
			.catch(err => {
				dispatch(errorHandler(err))
			})
	}
}

export const deleteInstrument = (id, token) => {
	return dispatch => {
		dispatch(fetchInstrumentsStart())
		axios
			.delete(`/admin/instruments/${id}/?auth=` + token)
			.then(res => {
				dispatch(fetchInstrumentsSuccess(res.data))
			})
			.catch(err => {
				dispatch(errorHandler(err))
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

export const toggleAvailableStatus = (id, token) => {
	return dispatch => {
		dispatch(toggleAvailableSwitchStart())
		axios
			.patch(`/admin/instruments/toggle-available/${id}/?auth=` + token)
			.then(res => {
				dispatch(toggleAvailableSwitchSuccess(res.data))
			})
			.catch(err => {
				dispatch(errorHandler(err))
			})
	}
}

export const toggleShowForm = () => {
	return {
		type: actionTypes.TOGGLE_INSTRUMENT_FORM
	}
}
