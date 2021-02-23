import { addKey } from '../../utils/tableUtils'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
	groupsTableData: [],
	tableIsLoading: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_GROUPS_TABLE_START:
			return {
				...state,
				tableIsLoading: true
			}

		case actionTypes.FETCH_GROUPS_TABLE_SUCCESS:
			return {
				...state,
				groupsTableData: addKey(action.data),
				tableIsLoading: false
			}

		default: {
			return state
		}
	}
}

export default reducer
