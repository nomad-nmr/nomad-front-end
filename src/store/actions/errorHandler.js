import * as actionTypes from './actionTypes'

const execute403Handler = () => {
	return {
		type: actionTypes.HTTP_403_ERROR
	}
}

const execute404Handler = () => {
	return {
		type: actionTypes.HTTP_404_ERROR
	}
}
const execute422Handler = error => {
	return {
		type: actionTypes.HTTP_422_ERROR,
		error: error
	}
}

const execute500Handler = () => {
	return {
		type: actionTypes.HTTP_500_ERROR
	}
}

const executeOtherErrorHandler = error => {
	return {
		type: actionTypes.HTTP_OTHER_ERROR,
		error: error
	}
}

const handleHTTPError = error => {
	if (!error.response) {
		console.log(error)
	}
	switch (error.response.status) {
		case 403:
			return execute403Handler()

		case 404:
			return execute404Handler()

		case 422:
			return execute422Handler(error)

		case 500:
			return execute500Handler()

		default:
			return executeOtherErrorHandler(error)
	}
}

export default handleHTTPError
