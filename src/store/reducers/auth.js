import * as actionTypes from '../actions/actionTypes'

const initialState = {
	username: null,
	accessLevel: null,
	token: null,
	authModalVisible: false,
	loading: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.OPEN_AUTH_MODAL:
			return {
				...state,
				authModalVisible: true
			}

		case actionTypes.CLOSE_AUTH_MODAL:
			return {
				...state,
				authModalVisible: false
			}

		case actionTypes.SIGN_IN_START:
			return {
				...state,
				loading: true
			}

		case actionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				username: action.payload.username,
				token: action.payload.token,
				accessLevel: action.payload.accessLevel,
				authModalVisible: false,
				loading: false
			}

		case actionTypes.SIGN_IN_FAILED:
			return {
				...state,
				loading: false
			}

		case actionTypes.SIGN_OUT_FAILED:
			return {
				...state,
				username: null,
				token: null,
				accessLevel: false,
				authModalVisible: false
			}

		case actionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,
				username: null,
				userId: null,
				token: null,
				accessLevel: false,
				authModalVisible: false
			}

		default:
			return state
	}
}

export default reducer
