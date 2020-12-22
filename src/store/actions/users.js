import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'
import errorHandler from './errorHandler'
import { message } from 'antd'

export const fetchUsersStart = () => {
	return {
		type: actionTypes.FETCH_USERS_TABLE_START
	}
}

export const fetchUsersSuccess = payload => {
	return {
		type: actionTypes.FETCH_USERS_TABLE_SUCCESS,
		data: payload
	}
}

export const fetchUsers = token => {
	return dispatch => {
		dispatch(fetchUsersStart())
		axios
			.get('/admin/users/?auth=' + token)
			.then(res => {
				dispatch(fetchUsersSuccess(res.data))
			})
			.catch(err => {
				dispatch(errorHandler(err))
			})
	}
}

export const toggleUserForm = payload => {
	return {
		type: actionTypes.TOGGLE_USERS_FORM,
		data: payload
	}
}

export const addUserFailed = () => {
	return {
		type: actionTypes.ADD_USER_FAILED
	}
}

export const addUser = (formData, token) => {
	return dispatch => {
		dispatch(fetchUsersStart())
		axios
			.post('/admin/users/?auth=' + token, formData)
			.then(res => {
				message.success('User was successfully adde to database')
				dispatch(fetchUsers(token))
			})
			.catch(err => {
				dispatch(errorHandler(err))
				dispatch(addUserFailed())
			})
	}
}

export const updateUser = (formData, token) => {
	return dispatch => {
		dispatch(fetchUsersStart())
		axios
			.put('/admin/users/?auth=' + token, formData)
			.then(res => {
				message.success('User database was successfully updated')
				dispatch(fetchUsers(token))
			})
			.catch(err => {
				dispatch(errorHandler(err))
				dispatch(addUserFailed())
			})
	}
}

export const toggleActiveSuccess = payload => ({
	type: actionTypes.TOGGLE_ACTIVE_SUCCESS,
	data: payload
})

export const toggleActive = (id, token) => {
	return dispatch => {
		dispatch(fetchUsersStart())
		axios
			.patch('admin/users/toggle-active/' + id + '/?auth=' + token)
			.then(res => dispatch(toggleActiveSuccess(res.data)))
			.catch(err => {
				dispatch(errorHandler(err))
				dispatch(addUserFailed())
			})
	}
}
