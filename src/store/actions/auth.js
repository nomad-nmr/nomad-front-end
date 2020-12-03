import * as actionTypes from './actionTypes'
import axios from '../../axios-instance'

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

export const signInStart = () => {
	return {
		type: actionTypes.SIGN_IN_START
	}
}

export const signInSuccess = data => {
	return {
		type: actionTypes.SIGN_IN_SUCCESS,
		payload: data
	}
}

export const signInFailed = () => {
	return {
		type: actionTypes.SIGN_IN_FAILED
	}
}

export const signOutSuccess = () => {
	return {
		type: actionTypes.SIGN_OUT_SUCCESS
	}
}

export const signOutFail = () => {
	localStorage.removeItem('user')
	return {
		type: actionTypes.SIGN_OUT_FAILED
	}
}

export const signOutHandler = token => {
	return dispatch => {
		axios
			.post('/auth/logout/?auth=' + token)
			.then(() => {
				localStorage.removeItem('user')
				dispatch(signOutSuccess())
			})
			.catch(error => {
				console.log(error)
				dispatch(signOutFail())
			})
	}
}

// signing out user when token expires
export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(signOutHandler())
		}, expirationTime * 1000)
	}
}

export const signInHandler = formData => {
	return dispatch => {
		dispatch(signInStart())
		axios
			.post('/auth/login', formData)
			.then(resp => {
				//storing user info in local storage
				const expirationDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000)
				const user = {
					username: resp.data.username,
					accessLevel: resp.data.accessLevel,
					token: resp.data.token,
					expirationDate
				}
				localStorage.setItem('user', JSON.stringify(user))
				dispatch(signInSuccess(resp.data))
				dispatch(checkAuthTimeout(resp.data.expiresIn))
			})
			.catch(error => {
				console.log(error)
				dispatch(signInFailed())
			})
	}
}				

export const authCheckState = () => {
	return dispatch => {
		const user = JSON.parse(localStorage.getItem('user'))
		if (user) {
			const { username, token, accessLevel, expirationDate } = user
			const expDateTime = Date.parse(expirationDate)
			if (expDateTime <= new Date().getTime()) {
				dispatch(signOutHandler())
			} else {
				dispatch(signInSuccess({ token, username, accessLevel }))
				const expiresIn = (expDateTime - new Date().getTime()) / 1000
				dispatch(checkAuthTimeout(expiresIn))
			}
		}
	}
}
