import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'
import errorHandler from './errorHandler'

export const fetchGroupsStart = () => {
	return {
		type: actionTypes.FETCH_GROUPS_TABLE_START
	}
}

export const fetchGroupsSuccess = data => {
	return {
		type: actionTypes.FETCH_GROUPS_TABLE_SUCCESS,
		data
	}
}

export const fetchGroupsTable = token => {
	return dispatch => {
		dispatch(fetchGroupsStart())
		axios
			.get('/admin/groups/', { headers: { Authorization: 'Bearer ' + token } })
			.then(res => {
				dispatch(fetchGroupsSuccess(res.data))
			})
			.catch(err => {
				dispatch(errorHandler(err))
			})
	}
}
