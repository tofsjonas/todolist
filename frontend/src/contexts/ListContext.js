import React, { createContext, useReducer } from 'react'
import { listReducer } from './listReducer'
export const ListContext = createContext()

const initialState = []

const ListContextProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(listReducer, initialState)
  return <ListContext.Provider value={{ tasks, dispatch }}>{children}</ListContext.Provider>
}

export default ListContextProvider
