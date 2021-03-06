import React, { useContext, useState, useEffect } from 'react'
import { DateContext } from 'contexts/DateContext'
import { dateAdd, getLocaleDateString, getTimeSpanDates, getNameOfDay, getNameOfMonth, getNameOfWeek } from 'lib/dateFunctions'
const DateNavigator = () => {
  const { timespan, currentDate, startDate, endDate, dispatch } = useContext(DateContext)
  const [title, setTitle] = useState('')
  const [dateDetails, setDateDetails] = useState('')

  useEffect(() => {
    switch (timespan) {
      case 'day':
        const day = getNameOfDay(currentDate)
        setTitle(day)
        break
      case 'week':
        const week = getNameOfWeek(currentDate)
        setTitle(week)
        break
      case 'month':
        const month = getNameOfMonth(currentDate)
        setTitle(month)
        break
      case 'year':
        const year = currentDate.getFullYear()
        setTitle(year)
        break
      default:
        break
    }

    const start = getLocaleDateString(startDate)
    const end = getLocaleDateString(endDate)
    const dateString = start === end ? start : start + ' - ' + end
    setDateDetails(dateString)
  }, [timespan, currentDate, startDate, endDate])

  useEffect(() => {}, [timespan])

  const stepRight = () => {
    _step('right')
  }
  const stepLeft = () => {
    _step('left')
  }

  const _step = direction => {
    var newCurrentDate = dateAdd(currentDate, direction === 'left' ? -1 : 1, timespan)
    const newDates = getTimeSpanDates(newCurrentDate, timespan)
    dispatch({ type: 'SET_DATE', payload: { ...newDates, currentDate: newCurrentDate } })
  }

  return (
    <div className="date-navigator">
      <i className="navigator clickable icon-left-open-big" onClick={stepLeft} />
      <div className="date-title">
        <div className="title">{title}</div>
        <div className="sub-title">{dateDetails}</div>
      </div>
      <i className="navigator clickable icon-right-open-big" onClick={stepRight} />
    </div>
  )
}
export default DateNavigator
