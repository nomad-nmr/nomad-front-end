import { message } from 'antd'
import moment from 'moment'

import { addKey, updateTableSwitch } from '../../utils/tableUtils'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
	groupsTableData: [],
	tableIsLoading: false,
	showForm: false,
	isEditing: false,
	showInactive: false,
	groupList: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_GROUPS_TABLE_START:
			return {
				...state,
				tableIsLoading: true
			}

		case actionTypes.FETCH_GROUPS_TABLE_SUCCESS:
			const newTableData = action.data.map(grp => ({
				...grp,
				createdAt: moment(grp.createdAt).format('DD MMM YYYY, h:mm')
			}))
			return {
				...state,
				groupsTableData: addKey(newTableData),
				tableIsLoading: false
			}

		case actionTypes.ADD_GROUP_SUCCESS:
			const updatedGroup = {
				...action.data,
				createdAt: moment(action.data.createdAt).format('DD MMM YYYY, h:mm')
			}
			const newGroupTable = state.groupsTableData.concat([updatedGroup])
			message.success('Group was successfully added to database')
			return {
				...state,
				groupsTableData: addKey(newGroupTable),
				tableIsLoading: false,
				showForm: false
			}

		case actionTypes.UPDATE_GROUP_SUCCESS:
			const updatedGroupTable = [...state.groupsTableData]
			const groupIndex = updatedGroupTable.findIndex(
				grp => grp._id.toString() === action.data._id.toString()
			)
			updatedGroupTable[groupIndex] = {
				...action.data,
				createdAt: moment(action.data.createdAt).format('DD MMM YYYY, h:mm')
			}
			message.success('Group was successfully updated in database')
			return {
				...state,
				groupsTableData: addKey(updatedGroupTable),
				tableIsLoading: false,
				showForm: !state.showForm
			}

		case actionTypes.ADD_GROUP_FAILED:
			return {
				...state,
				tableIsLoading: false
			}

		case actionTypes.TOGGLE_GROUP_FORM:
			return {
				...state,
				showForm: !state.showForm,
				isEditing: action.data
			}

		case actionTypes.TOGGLE_SHOW_INACTIVE_GROUPS:
			return {
				...state,
				showInactive: !state.showInactive
			}

		case actionTypes.TOGGLE_ACTIVE_GROUP_SUCCESS:
			let updatedTableData = updateTableSwitch(state.groupsTableData, 'isActive', action.data._id)
			if (!state.showInactive) {
				updatedTableData = updatedTableData.filter(i => i.isActive === true)
			}
			return {
				...state,
				groupsTableData: addKey(updatedTableData),
				tableIsLoading: false
			}

		case actionTypes.FETCH_GROUP_LIST_SUCCESS:
			return {
				...state,
				groupList: action.data
			}

		default: {
			return state
		}
	}
}

export default reducer
