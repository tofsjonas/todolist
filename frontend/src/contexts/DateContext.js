import React, { createContext, useReducer } from 'react'
import { dateReducer } from './dateReducer'
var day = new Date()
var year = day.getFullYear()
var month = day.getMonth()
var dayOfMonth = day.getDate()
var dayOfWeek = day.getDay()

const initialState = {
  timespan: 'day',
  startDate: day,
  endDate: day,
}

export const DateContext = createContext()
const DateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dateReducer, initialState)
  return <DateContext.Provider value={{ ...state, dispatch }}>{children}</DateContext.Provider>
}

export default DateContextProvider
