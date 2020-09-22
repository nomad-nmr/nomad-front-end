import * as actionTypes from '../actions/actionTypes'
import { Modal } from 'antd'

const initialState = {
	instrumentsTableData: [],
	tableIsLoading: false,
	runningSwitchIsLoading: false,
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
				instrumentsTableData: action.data,
				tableIsLoading: false
			}

		case actionTypes.TOGGLE_RUNNING_SWITCH_START:
			return {
				...state,
				runningSwitchIsLoading: true
			}

		case actionTypes.TOGGLE_RUNNING_SWITCH_SUCCESS:
			return {
				...state,
				instrumentsTableData: action.data,
				runningSwitchIsLoading: false
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
