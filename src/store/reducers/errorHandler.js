import * as actionTypes from '../actions/actionTypes'
import { useHistory } from 'react-router-dom'
import { Modal } from 'antd'

const initialState = {}

const reducer = (state = initialState, action) => {
	const browserHistory = useHistory()
	switch (action.type) {
		case actionTypes.HTTP_403_ERROR:
			browserHistory.push('/403')
			return state

		case actionTypes.HTTP_OTHER_ERROR:
			Modal.error({
				title: 'Error message',
				content: action.error.toString()
			})
			break
		default:
			return state
	}
}

export default reducer
