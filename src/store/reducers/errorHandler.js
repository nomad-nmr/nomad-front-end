import * as actionTypes from '../actions/actionTypes'
import { Modal, message } from 'antd'
import history from '../../utils/history'

const initialState = {}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.HTTP_500_ERROR:
			history.push('/500')
			window.location.reload()
			return state

		case actionTypes.HTTP_422_ERROR:
			action.error.response.data.errors.forEach(err => {
				message.error({ content: err.msg, style: { color: 'red' } })
			})

			return state

		case actionTypes.HTTP_404_ERROR:
			history.push('/404')
			window.location.reload()
			return state

		case actionTypes.HTTP_403_ERROR:
			history.push('/403')
			window.location.reload()
			return state

		case actionTypes.HTTP_400_ERROR:
			console.log(action)
			Modal.error({
				title: action.error.message,
				content: action.error.response.data.toString()
			})
			return state

		case actionTypes.HTTP_OTHER_ERROR:
			console.log(action)
			Modal.error({
				title: action.error.message,
				content: action.error.response.data.toString()
			})
			return state

		default:
			return state
	}
}

export default reducer
