import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  tableData: [],
  //checked holds state of checkboxes in search exps table
  //[{datasetName, exps: [_id]}]
  checked: []
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_EXPERIMENTS_START:
      return { ...state, loading: true }

    case actionTypes.FETCH_EXPERIMENTS_SUCCESS:
      return { ...state, tableData: payload, loading: false }

    case actionTypes.UPDATE_CHECKED_DATASETS:
      const { dataset, selected } = payload
      let checkedUpdated = []
      if (selected) {
        checkedUpdated = [...state.checked, dataset]
      } else {
        checkedUpdated = state.checked.filter(entry => entry.datasetName !== dataset.datasetName)
      }
      return { ...state, checked: checkedUpdated }

    case actionTypes.UPDATE_CHECKED_EXPS:
      let checkedNew = []
      if (payload.exps.length === 0) {
        checkedNew = state.checked.filter(entry => entry.datasetName !== payload.datasetName)
      } else {
        checkedNew = [...state.checked]
        const index = checkedNew.findIndex(entry => entry.datasetName === payload.datasetName)
        if (index < 0) {
          checkedNew.push(payload)
        } else {
          checkedNew[index] = payload
        }
      }
      return { ...state, checked: checkedNew }

    case actionTypes.RESET_CHECKED:
      return { ...state, checked: [] }

    case actionTypes.DOWNLOAD_EXPS_START:
      return { ...state, loading: true }

    case actionTypes.DOWNLOAD_EXPS_SUCCESS:
      return { ...state, loading: false, checked: [] }

    default:
      return state
  }
}

export default reducer
