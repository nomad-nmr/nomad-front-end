import moment from 'moment'

import * as actionTypes from '../actions/actionTypes'

import { highlightRows, addKey } from '../../utils/tableUtils'

const initialState = {
	tableData: [],
	isLoading: false,
	date: moment().format('YYYY-MM-DD')
}

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.FETCH_EXP_HISTORY_START:
			return {
				...state,
				isLoading: true
			}

		case actionTypes.FETCH_EXP_HISTORY_SUCCESS:
			const newTableData = payload.map(i => {
				return {
					...i,
					username: i.user.username,
					group: i.group.name,
					finishedAt: moment(i.finishedAt).format('H:mm')
				}
			})
			return { ...state, tableData: highlightRows(addKey(newTableData)), isLoading: false }

		case actionTypes.SET_EXP_HISTORY_DATE:
			return {
				...state,
				date: payload
			}

		default:
			return state
	}
}

export default reducer