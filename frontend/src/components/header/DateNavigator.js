import React, { useContext, useState, useEffect } from 'react'
import { DateContext } from 'contexts/DateContext'
import { dateAdd, getLocaleDateString, getTimeSpanDates, getNameOfDay, getWeekNumber, getNameOfMonth } from 'lib/dateFunctions'
import { getNameOfWeek } from '../../lib/dateFunctions'
const DateNavigator = () => {
  const { timespan, startDate, endDate, dispatch } = useContext(DateContext)
  const [title, setTitle] = useState('')
  const [dateDetails, setDateDetails] = useState('')

  useEffect(() => {
    switch (timespan) {
      case 'day':
        const day = getNameOfDay(startDate)
        setTitle(day)
        break
      case 'week':
        const week = getNameOfWeek(startDate)
        setTitle(week)
        break
      case 'month':
        const month = getNameOfMonth(startDate)
        setTitle(month)
        break
      case 'year':
        const year = startDate.getFullYear()
        setTitle(year)
        break
      default:
        break
    }

    const startDateLocaleString = getLocaleDateString(startDate)
    const endDateLocaleString = getLocaleDateString(endDate)

    setDateDetails(startDateLocaleString + ' - ' + endDateLocaleString)
  }, [timespan, startDate, endDate])

  const stepRight = () => {
    _step('right')
  }
  const stepLeft = () => {
    _step('left')
  }

  const _step = direction => {
    var tempStartDate = dateAdd(startDate, direction === 'left' ? -1 : 1, timespan)

    const newDates = getTimeSpanDates(tempStartDate, timespan)

    dispatch({ type: 'SET_DATE', payload: { ...newDates } })
  }

  return (
    <div className="date-navigator">
      <i className="navigator clickable icon-left-open-big" onClick={stepLeft} />
      <div className="date-title" style={{ flex: 3 }}>
        <div className="title">{title}</div>
        <div className="sub-title">{dateDetails}</div>
      </div>
      <i className="navigator clickable icon-right-open-big" onClick={stepRight} />
    </div>
  )
}
export default DateNavigator
