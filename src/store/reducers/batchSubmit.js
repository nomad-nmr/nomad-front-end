import * as actionTypes from '../actions/actionTypes'

const initialState = {
	addRackVisible: false,
	addSampleVisible: false,
	loading: false,
	activeRackId: null,
	racks: []
}

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actionTypes.LOADING_START:
			return { ...state, loading: true }

		case actionTypes.TOGGLE_ADD_RACK:
			return { ...state, addRackVisible: !state.addRackVisible }

		case actionTypes.TOGGLE_ADD_SAMPLE:
			return { ...state, addSampleVisible: !state.addSampleVisible }

		case actionTypes.SET_ACTIVE_RACK_ID:
			return { ...state, activeRackId: payload }

		case actionTypes.GET_RACKS_SUCCESS:
			return { ...state, racks: payload }

		case actionTypes.ADD_RACK_SUCCESS:
			const newRacksArr = [...state.racks]
			newRacksArr.push(payload)
			return { ...state, racks: newRacksArr, addRackVisible: false }

		case actionTypes.CLOSE_RACK_SUCCESS:
			const updatedRacks = [...state.racks]
			const rackIndex = updatedRacks.findIndex(rack => rack._id === payload)
			updatedRacks[rackIndex].isOpen = false
			return { ...state, racks: updatedRacks, loading: false }

		case actionTypes.DELETE_RACK_SUCCESS:
			const newRacks = state.racks.filter(rack => rack._id !== payload)
			return { ...state, racks: newRacks, loading: false, activeRackId: undefined }

		case actionTypes.ADD_SAMPLE_SUCCESS:
			console.log('Success')
			return { ...state, loading: false }
		default:
			return state
	}
}

export default reducer
