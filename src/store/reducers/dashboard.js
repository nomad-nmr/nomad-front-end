import * as actionTypes from '../actions/actionTypes'
import { Modal } from 'antd'
import { drawerDataHandler } from '../utility'

const initialState = {
  showCards: true,
  statusButtonsData: [],
  drawerStatus: {
    visible: false,
    id: '',
    dataLoading: true,
    tableData: []
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_CARDS:
      const newShowCards = !state.showCards
      return {
        ...state,
        showCards: newShowCards
      }

    case actionTypes.FETCH_STATUS_BUTTONS_SUCCESS:
      return {
        ...state,
        statusButtonsData: action.data
      }

    case actionTypes.FETCH_FAILED:
      Modal.error({
        title: 'Error message',
        content: `${action.error}`
      })
      return state

    case actionTypes.OPEN_DASH_DRAWER_START:
      const newDrawerStatus = {
        ...state.drawerStatus,
        visible: true,
        id: action.id
      }
      return {
        ...state,
        drawerStatus: newDrawerStatus
      }

    case actionTypes.FETCH_DASH_DRAWER_SUCCESS:
      const updatedDrawerStatus = {
        ...state.drawerStatus,
        dataLoading: false,
        tableData: drawerDataHandler(action.data)
      }
      return {
        ...state,
        drawerStatus: updatedDrawerStatus
      }
    case actionTypes.CLOSE_DASH_DRAWER:
      const newStatus = {
        ...state.drawerStatus,
        visible: false,
        tableData: []
      }
      return {
        ...state,
        drawerStatus: newStatus
      }

    default:
      return state
  }
}

export default reducer
