import * as actionTypes from '../actions/actionTypes'
import { message } from 'antd'

const initialState = {
	user: null,
	adminAccess: false,
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
				user: action.payload.username,
				token: action.payload.token,
				adminAccess: action.payload.username === 'admin',
				authModalVisible: false,
				loading: false
			}

		case actionTypes.SIGN_IN_FAILED:
			message.error({ content: 'Signing in failed', style: { color: 'red' } })
			return {
				...state,
				loading: false
			}

		case actionTypes.SIGN_OUT_SUCCESS:
			return {
				...state,
				user: null,
				userId: null,
				token: null,
				adminAccess: false,
				authModalVisible: false
			}

		default:
			return state
	}
}

export default reducer
