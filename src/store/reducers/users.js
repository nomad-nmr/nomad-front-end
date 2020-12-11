import { addKey } from '../../utils/tableUtils'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
	usersTableData: [],
	tableIsLoading: false,
	showForm: false,
	editing: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_USERS_TABLE_START:
			return {
				...state,
				tableIsLoading: true
			}

		case actionTypes.FETCH_USERS_TABLE_SUCCESS:
			const users = action.data.map(usr => {
				usr.groupName = usr.group.groupName
				delete usr.group
				return usr
			})
			return {
				...state,
				usersTableData: addKey(users),
				tableIsLoading: false,
				showForm: false
			}

		case actionTypes.TOGGLE_USERS_FORM:
			return {
				...state,
				showForm: !state.showForm,
				editing: action.data
			}

		case actionTypes.ADD_USER_FAILED:
			return {
				...state,
				tableIsLoading: false
			}

		case actionTypes.TOGGLE_ACTIVE_SUCCESS:
			const newUsersData = state.usersTableData.map(usr => {
				if (usr._id.toString() === action.data._id.toString()) {
					usr.isActive = action.data.isActive
				}
				return usr
			})
			return {
				...state,
				usersTableData: newUsersData,
				tableIsLoading: false
			}

		default:
			return state
	}
}

export default reducer
