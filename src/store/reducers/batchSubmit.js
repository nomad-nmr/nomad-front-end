import * as actionTypes from '../actions/actionTypes'

const initialState = {
	addRackVisible: false,
	closeRackLoading: false,
	deleteRackLoading: false,
	activeRackId: null,
	racks: []
}

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.TOGGLE_ADD_RACK:
			return { ...state, addRackVisible: !state.addRackVisible }

		case actionTypes.SET_ACTIVE_RACK_ID:
			return { ...state, activeRackId: payload }

		case actionTypes.GET_RACKS_SUCCESS:
			return { ...state, racks: payload }

		case actionTypes.ADD_RACK_SUCCESS:
			const newRacksArr = [...state.racks]
			newRacksArr.push(payload)
			return { ...state, racks: newRacksArr, addRackVisible: false }

		case actionTypes.CLOSE_RACK_START:
			return { ...state, closeRackLoading: true }

		case actionTypes.CLOSE_RACK_SUCCESS:
			const updatedRacks = [...state.racks]
			const rackIndex = updatedRacks.findIndex(rack => rack._id === payload)
			updatedRacks[rackIndex].isOpen = false
			return { ...state, racks: updatedRacks, closeRackLoading: false }

		case actionTypes.DELETE_RACK_START:
			return { ...state, deleteRackLoading: true }

		case actionTypes.DELETE_RACK_SUCCESS:
			const newRacks = state.racks.filter(rack => rack._id !== payload)
			return { ...state, racks: newRacks, deleteRackLoading: false, activeRackId: undefined }

		default:
			return state
	}
}

export default reducer
