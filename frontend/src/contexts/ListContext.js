import React, { createContext, useReducer } from 'react'
import { listReducer } from './listReducer'
export const ListContext = createContext()

const initialState = []

const ListContextProvider = ({ children }) => {
  const [tasklist, dispatch] = useReducer(listReducer, initialState)
  return <ListContext.Provider value={{ tasklist, dispatch }}>{children}</ListContext.Provider>
}

export default ListContextProvider
