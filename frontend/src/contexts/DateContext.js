import React, { createContext, useReducer } from 'react'
import { dateReducer } from './dateReducer'
import { getTimeSpanDates } from 'lib/dateFunctions'

var timespan = 'week'
// var currentDate = new Date('Mon, 30 Dec 2019')
var currentDate = new Date()
var { startDate, endDate } = getTimeSpanDates(currentDate, timespan)

const initialState = {
  timespan,
  currentDate,
  startDate,
  endDate,
}

export const DateContext = createContext()
const DateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dateReducer, initialState)
  return <DateContext.Provider value={{ ...state, dispatch }}>{children}</DateContext.Provider>
}

export default DateContextProvider
