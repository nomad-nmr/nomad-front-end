import * as actionTypes from '../actions/actionTypes'

const initialState = {
	loading: false,
	bookedHolders: []
}

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.BOOK_HOLDERS_START:
			return { ...state, loading: true }

		case actionTypes.BOOK_HOLDERS_SUCCESS:
			return {
				...state,
				bookedHolders: state.bookedHolders.concat([payload]),
				loading: false
			}

		default:
			return state
	}
}

export default reducer
