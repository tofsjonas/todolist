import React, { useContext, useState, useEffect } from 'react'
import { DateContext } from 'contexts/DateContext'
import { dateAdd, getLocaleDateString, getTimeSpanDates } from 'lib/dateFunctions'
const DateNavigator = () => {
  const { timespan, startDate, endDate, dispatch } = useContext(DateContext)
  const [title, setTitle] = useState('')
  const [dateDetails, setDateDetails] = useState('')

  // om timespan ändras måste även de ändras...

  useEffect(() => {
    switch (timespan) {
      case 'day':
        setTitle('Thursday')
        break
      case 'week':
        setTitle('Week 35')
        break
      case 'month':
        setTitle('January')
        break
      case 'year':
        setTitle('2017')
        break
      default:
        break
    }

    const startDateLocaleString = getLocaleDateString(startDate)
    const endDateLocaleString = getLocaleDateString(endDate)

    setDateDetails(startDateLocaleString + ' - ' + endDateLocaleString)
    // _step('left')
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
