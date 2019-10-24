export const dateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMESPAN':
      return { ...state, ...action.payload }
    case 'SET_DATE':
      return { ...state, ...action.payload }
    default:
      return state
  }
}
