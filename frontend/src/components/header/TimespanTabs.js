import React, { useContext } from 'react'
import { DateContext } from 'contexts/DateContext'
import { getTimeSpanDates } from 'lib/dateFunctions'
const TimespanTabs = () => {
  const { timespan, currentDate, dispatch } = useContext(DateContext)

  const setTimespan = span => {
    const { startDate, endDate } = getTimeSpanDates(currentDate, span)
    dispatch({ type: 'SET_DATE', payload: { startDate, endDate, timespan: span } })

    // const newDates = getTimeSpanDates(currentDate, span)
    // console.log('SPACETAG: TimespanTabs.js', { ...newDates, timespan: span })
    // dispatch({ type: 'SET_DATE', payload: { ...newDates, timespan: span } })
    // const newDates = getTimeSpanDates(currentDate, span)
    // console.log('SPACETAG: TimespanTabs.js', { ...newDates, timespan: span })
    //dispatch({ type: 'SET_DATE', payload: { timespan: span } })
  }

  return (
    <div className="timespan-picker">
      <div className={'clickable' + (timespan === 'day' ? ' current' : '')} onClick={() => setTimespan('day')}>
        Day
      </div>
      <div className={'clickable' + (timespan === 'week' ? ' current' : '')} onClick={() => setTimespan('week')}>
        Week
      </div>
      <div className={'clickable' + (timespan === 'month' ? ' current' : '')} onClick={() => setTimespan('month')}>
        Month
      </div>
      <div className={'clickable' + (timespan === 'year' ? ' current' : '')} onClick={() => setTimespan('year')}>
        Year
      </div>
    </div>
  )
}
export default TimespanTabs
