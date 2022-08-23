import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  costsTableData: []
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_COSTS_START:
      return { ...state, loading: true }

    case actionTypes.FETCH_COSTS_SUCCESS:
      return { ...state, costsTableData: payload, loading: false }

    case actionTypes.RESET_COSTS_TABLE:
      return { ...state, costsTableData: [] }

    default:
      return state
  }
}

export default reducer
