import React, { createContext, useReducer } from 'react'
import { dateReducer } from './dateReducer'

// var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var today = new Date()

// calculate week start/week end

const initialState = {
  currentTimespan: 'week',
  startDate: today,
  endDate: today,
  // year: today.getFullYear(),
  // month: today.getMonth(),
  // week: today.getWeek(),
  // day: today,
}

export const DateContext = createContext()
const DateContextProvider = ({ children }) => {
  const [timespan, dispatch] = useReducer(dateReducer, initialState)
  return <DateContext.Provider value={{ timespan, dispatch }}>{children}</DateContext.Provider>
}

export default DateContextProvider
