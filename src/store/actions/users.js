import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'
import errorHandler from './errorHandler'

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

export const fetchUsers = (token, showInactive) => {
	return dispatch => {
		dispatch(fetchUsersStart())
		axios
			.get('/admin/users/?showInactive=' + showInactive, { headers: { Authorization: 'Bearer ' + token } })
			.then(res => {
				dispatch(fetchUsersSuccess(res.data))
			})
			.catch(err => {
				dispatch(errorHandler(err))
			})
	}
}

export const toggleUserForm = data => {
	return {
		type: actionTypes.TOGGLE_USERS_FORM,
		data
	}
}

export const addUserSuccess = payload => {
	return {
		type: actionTypes.ADD_USER_SUCCESS,
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
			.post('/admin/users', formData, { headers: { Authorization: 'Bearer ' + token } })
			.then(res => {
				dispatch(addUserSuccess(res.data))
			})
			.catch(err => {
				dispatch(errorHandler(err))
				dispatch(addUserFailed())
			})
	}
}

export const updateUserSuccess = payload => {
	return {
		type: actionTypes.UPDATE_USER_SUCCESS,
		data: payload
	}
}

export const updateUser = (formData, token) => {
	return dispatch => {
		dispatch(fetchUsersStart())
		axios
			.put('/admin/users', formData, { headers: { Authorization: 'Bearer ' + token } })
			.then(res => {
				dispatch(updateUserSuccess(res.data))
			})
			.catch(err => {
				dispatch(errorHandler(err))
				dispatch(addUserFailed())
			})
	}
}

export const toggleActiveSuccess = payload => ({
	type: actionTypes.TOGGLE_ACTIVE_USER_SUCCESS,
	data: payload
})

export const toggleActive = (id, token) => {
	return dispatch => {
		dispatch(fetchUsersStart())
		axios
			.patch('admin/users/toggle-active/' + id, null, { headers: { Authorization: 'Bearer ' + token } })
			.then(res => dispatch(toggleActiveSuccess(res.data)))
			.catch(err => {
				dispatch(errorHandler(err))
				dispatch(addUserFailed())
			})
	}
}

export const toggleShowInactive = () => ({
	type: actionTypes.TOGGLE_SHOW_INACTIVE_USERS
})
