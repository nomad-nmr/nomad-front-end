import * as actionTypes from '../actions/actionTypes'
import { Modal } from 'antd'
import { addKey } from '../../utils/tableUtils'

const initialState = {
	instrumentsTableData: [],
	tableIsLoading: false,
	availableSwitchIsLoading: false,
	showForm: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_INSTRUMENTS_TABLE_START:
			return {
				...state,
				tableIsLoading: true
			}

		case actionTypes.FETCH_INSTRUMENTS_TABLE_SUCCESS:
			return {
				...state,
				instrumentsTableData: addKey(action.data),
				tableIsLoading: false
			}

		case actionTypes.TOGGLE_AVAILABLE_SWITCH_START:
			return {
				...state,
				availableSwitchIsLoading: true
			}

		case actionTypes.TOGGLE_AVAILABLE_SWITCH_SUCCESS:
			const newTableData = state.instrumentsTableData.map(i => {
				if (i._id.toString() === action.data._id.toString()) {
					return { ...i, available: action.data.available }
				} else {
					return i
				}
			})
			return {
				...state,
				instrumentsTableData: newTableData,
				availableSwitchIsLoading: false
			}

		case actionTypes.FETCH_FAILED:
			Modal.error({
				title: 'Error message',
				content: `${action.error}`
			})
			return state

		case actionTypes.TOGGLE_INSTRUMENT_FORM:
			return {
				...state,
				showForm: !state.showForm
			}

		default:
			return state
	}
}

export default reducer
