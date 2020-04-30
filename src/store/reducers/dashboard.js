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
  },
  statusSummaryData: [],
  cardsLoading: true,
  statusTableData: [],
  tableLoading: true
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
      const tableData = action.data ? action.data : []
      const keysArr = [
        'Holder',
        'Status',
        'Name',
        'ExpNo',
        'Experiment',
        'Group',
        'Time',
        'Title',
        'Instrument',
        'Description'
      ]
      const updatedDrawerStatus = {
        ...state.drawerStatus,
        dataLoading: false,
        tableData: drawerDataHandler(tableData, keysArr, 'drawer')
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

    case actionTypes.FETCH_STATUS_SUMMARY_SUCCESS:
      return {
        ...state,
        cardsLoading: false,
        statusSummaryData: action.data
      }

    case actionTypes.FETCH_STATUS_TABLE_START:
      return {
        ...state,
        statusTableData: [],
        tableLoading: true
      }

    case actionTypes.FETCH_STATUS_TABLE_SUCCESS:
      const tableDataSource = action.data.table.tr ? action.data.table.tr : []
      const keysArray = tableDataSource.splice(0, 1)[0].td.map(entry => entry.text)
      return {
        ...state,
        statusTableData: drawerDataHandler(tableDataSource, keysArray),
        tableLoading: false
      }

    default:
      return state
  }
}

export default reducer
