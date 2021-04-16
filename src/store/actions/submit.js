import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'
import errorHandler from './errorHandler'

export const bookHoldersStart = () => ({
	type: actionTypes.BOOK_HOLDERS_START
})

export const bookHoldersSuccess = payload => ({
	type: actionTypes.BOOK_HOLDERS_SUCCESS,
	payload
})

export const bookHolders = (token, formData) => {
	return dispatch => {
		dispatch(bookHoldersStart())
		axios
			.post('/submit/book-holders', formData, {
				headers: { Authorization: 'Bearer ' + token }
			})
			.then(res => {
				dispatch(bookHoldersSuccess(res.data))
			})
			.catch(err => {
				dispatch(errorHandler(err))
			})
	}
}
