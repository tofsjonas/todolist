import React, { createContext, useReducer } from 'react'
import { dateReducer } from './dateReducer'
import { getTimeSpanDates } from 'lib/dateFunctions'

var timespan = 'week'
var day = new Date()
// var year = day.getFullYear()
var month = day.getMonth()
var dayOfMonth = day.getDate()
var dayOfWeek = day.getDay()
var { startDate, endDate } = getTimeSpanDates(day, timespan)
const initialState = {
  timespan,
  startDate,
  endDate,
  day,
  month,
  dayOfMonth,
  dayOfWeek,
}

export const DateContext = createContext()
const DateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dateReducer, initialState)
  return <DateContext.Provider value={{ ...state, dispatch }}>{children}</DateContext.Provider>
}

export default DateContextProvider
