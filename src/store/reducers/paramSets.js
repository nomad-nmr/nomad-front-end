import * as actionTypes from '../actions/actionTypes'
import { addKey } from '../../utils/tableUtils'

const initialState = {
	paramSetsTabData: [],
	loading: false,
	instrumentId: null,
	searchValue: '',
	formVisible: false
}

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.FETCH_PARAM_SETS_START:
			return { ...state, loading: true }

		case actionTypes.FETCH_PARAM_SETS_SUCCESS:
			return { ...state, paramSetsTabData: addKey(payload), loading: false }

		case actionTypes.SET_INSTRUMENT_ID:
			return { ...state, instrumentId: payload }

		case actionTypes.SEARCH_PARAMETER_SETS:
			return { ...state, searchValue: payload }

		case actionTypes.TOGGLE_PARAMS_FORM:
			return { ...state, formVisible: !state.formVisible }

		case actionTypes.ADD_PARAMETER_SET_SUCCESS:
			console.log(payload)
			return { ...state, loading: false }
		default:
			return state
	}
}

export default reducer
