export const listReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LIST': {
      return action.payload
    }
    case 'UPDATE_ITEM': {
      const updatedItem = action.payload
      return state.map(item => {
        return item._id === updatedItem._id ? updatedItem : item
      })
    }
    default:
      return state
  }
}
