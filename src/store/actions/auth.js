import * as actionTypes from './actionTypes'

export const openAuthModal = () => {
  return {
    type: actionTypes.OPEN_AUTH_MODAL
  }
}

export const closeAuthModal = () => {
  return {
    type: actionTypes.CLOSE_AUTH_MODAL
  }
}

export const signInValidationSuccess = data => {
  return {
    type: actionTypes.SIGN_IN_VALIDATION_SUCCESS,
    payload: data
  }
}

export const signInHandler = form => {
  return dispatch => {
    form
      .validateFields()
      .then(resp => {
        dispatch(signInValidationSuccess(resp))
      })
      .catch(info => {
        console.log('[Validation]', info)
      })
  }
}

export const signOutHandler = () => {
  return {
    type: actionTypes.SIGN_OUT
  }
}
