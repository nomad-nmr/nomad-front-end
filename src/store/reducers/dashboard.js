import * as actionTypes from '../actions/actionTypes'
import { addKey, highlightRows, updateTableSwitch } from '../../utils/tableUtils'

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
	statusTableData: [],
	tableLoading: true
}

//Calculation of count of entries with running, pending and error status [statusButtonsData] from [statusSummaryData]
const calcButtonsCount = inputArr => {
	const statusButtonsObj = inputArr.reduce(
		(obj, i) => {
			const { running = false, errorCount = 0, pendingCount = 0 } = i.status.summary
			if (running) {
				obj.running++
			}
			obj.errors += errorCount
			//pending experiments are counted only for available instruments
			if (i.available) {
				obj.pending += pendingCount
			}

			return obj
		},
		{
			running: 0,
			errors: 0,
			pending: 0
		}
	)
	return Object.entries(statusButtonsObj)
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_CARDS:
			const newShowCards = !state.showCards
			return {
				...state,
				showCards: newShowCards
			}

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
			const updatedDrawerStatus = {
				...state.drawerStatus,
				dataLoading: false,
				tableData: addKey(tableData)
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
				statusSummaryData: addKey(action.data),
				statusButtonsData: calcButtonsCount(action.data)
			}

		case actionTypes.FETCH_STATUS_TABLE_START:
			return {
				...state,
				statusTableData: [],
				tableLoading: true
			}

		case actionTypes.FETCH_STATUS_TABLE_SUCCESS:
			return {
				...state,
				statusTableData: highlightRows(addKey(action.data)),
				tableLoading: false
			}

		case actionTypes.TOGGLE_AVAILABLE_SUCCESS_DASH:
			return {
				...state,
				statusSummaryData: updateTableSwitch(state.statusSummaryData, 'available', action.data._id),
				tableIsLoading: false
			}

		//Reducer for updating statusSummaryData through websockets
		case actionTypes.STATUS_UPDATE:
			const newStatSummary = [...state.statusSummaryData]
			const instrIndex = newStatSummary.findIndex(i => i._id === action.data.instrId)
			newStatSummary[instrIndex].status.summary = action.data.statusSummary
			return {
				...state,
				statusSummaryData: newStatSummary,
				statusButtonsData: calcButtonsCount(newStatSummary)
			}

		default:
			return state
	}
}

export default reducer
