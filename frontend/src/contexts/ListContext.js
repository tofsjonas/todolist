import React, { createContext, useReducer } from 'react'
import { listReducer } from './listReducer'
export const ListContext = createContext()

const ListContextProvider = ({ children }) => {
  const [tasklist, dispatch] = useReducer(listReducer)
  return <ListContext.Provider value={{ tasklist, dispatch }}>{children}</ListContext.Provider>
}

export default ListContextProvider
