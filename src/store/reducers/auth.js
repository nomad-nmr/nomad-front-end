import * as actionTypes from '../actions/actionTypes'

const initialState = {
  user: null,
  adminAccess: false,
  authModalVisible: false
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

    case actionTypes.SIGN_IN_VALIDATION_SUCCESS:
      return {
        ...state,
        user: action.payload.username,
        adminAccess: action.payload.username === 'admin',
        authModalVisible: false
      }

    case actionTypes.SIGN_OUT:
      return {
        ...state,
        user: null,
        adminAccess: false,
        authModalVisible: false
      }

    default:
      return state
  }
}

export default reducer
