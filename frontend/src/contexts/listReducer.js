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
    case 'CREATE_ITEM': {
      const item = action.payload
      const temp = [...state]
      temp.push(item)
      return temp
    }
    case 'DELETE_ITEM': {
      const deletedItem = action.payload
      return state.filter(item => item._id !== deletedItem._id)
    }
    default:
      return state
  }
}
