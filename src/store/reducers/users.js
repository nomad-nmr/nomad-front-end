import { addKey, updatedTableSwitch } from '../../utils/tableUtils'
import * as actionTypes from '../actions/actionTypes'
import { message } from 'antd'

const initialState = {
	usersTableData: [],
	tableIsLoading: false,
	showForm: false,
	editing: false,
	showInactive: false
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

		case actionTypes.ADD_USER_SUCCESS:
			const updatedUsersTable = state.usersTableData.concat([action.data])
			message.success('User was successfully adde to database')
			return {
				...state,
				usersTableData: addKey(updatedUsersTable),
				tableIsLoading: false,
				showForm: false
			}

		case actionTypes.ADD_USER_FAILED:
			return {
				...state,
				tableIsLoading: false
			}

		case actionTypes.UPDATE_USER_SUCCESS:
			const newUsersTable = [...state.usersTableData]
			const userIndex = newUsersTable.findIndex(usr => usr._id.toString() === action.data._id.toString())
			newUsersTable[userIndex] = action.data
			message.success('User database was successfully updated')

			return {
				...state,
				usersTableData: addKey(newUsersTable),
				tableIsLoading: false,
				showForm: false
			}

		case actionTypes.TOGGLE_ACTIVE_SUCCESS:
			let updatedTableData = updatedTableSwitch(state.usersTableData, 'isActive', action.data._id)
			if (!state.showInactive) {
				updatedTableData = updatedTableData.filter(i => i.isActive === true)
			}
			return {
				...state,
				usersTableData: addKey(updatedTableData),
				tableIsLoading: false
			}

		case actionTypes.TOGGLE_SHOW_INACTIVE:
			return {
				...state,
				showInactive: !state.showInactive
			}

		default:
			return state
	}
}

export default reducer
