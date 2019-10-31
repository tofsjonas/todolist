import React, { useState, useEffect, useRef, useContext } from 'react'
import DayPicker from 'react-day-picker'
import { createListItem } from 'lib/storage'
import { ListContext } from 'contexts/ListContext'
import { DateContext } from 'contexts/DateContext'
import { useErrorOutlet } from 'contexts/ErrorContext'
import useOuterClickNotifier from 'lib/useOuterClickNotifier'
import Spinner from 'components/Spinner'

const AddTask = () => {
  const { dispatch } = useContext(ListContext)
  const { startDate } = useContext(DateContext)
  const setError = useErrorOutlet()

  const [selectedDay, setSelectedDay] = useState(new Date())
  const [title, setTitle] = useState('A task!')
  const [savable, setSavable] = useState(false)
  const [active, setActive] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const innerRef = useRef(null)

  // useEffect(() => {
  //   setSelectedDay(startDate)
  // }, [startDate])

  const hideDetails = () => {
    setActive(false)
  }

  const handleDayClick = (day, { selected }) => {
    setSelectedDay(selected ? undefined : day)
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleSave = () => {
    setIsSaving(true)
    const data = { title, when: selectedDay.toISOString().substr(0, 10) }
    createListItem(
      data,
      item => {
        dispatch({ type: 'CREATE_ITEM', payload: item })
        setIsSaving(false)
        clearForm()
      },
      err => {
        setIsSaving(false)
        setError(err)
      }
    )
  }
  const clearForm = () => {
    setSelectedDay(null)
    setTitle('')
    setActive(false)
  }

  const handleFocus = () => {
    setActive(true)
  }
  useOuterClickNotifier(hideDetails, innerRef)
  useEffect(() => {
    const isSavable = () => {
      if (title.trim().length === 0) return false
      if (typeof selectedDay === 'undefined') return false
      return true
    }
    // const savable = isSavable()
    setSavable(isSavable())
  }, [selectedDay, title])

  // fromMonth={new Date()}
  return (
    <div className={'add-task' + (active ? ' active' : '')} ref={innerRef}>
      <div className="add-task-input-container">
        <i className="icon-article" />
        <input onFocus={handleFocus} type="text" placeholder="Add a task..." value={title} onChange={handleTitleChange} />
      </div>
      {isSaving && <Spinner />}
      {!isSaving && (
        <div className="task-details">
          <p>{selectedDay ? selectedDay.toLocaleDateString() : 'Please select a day 👻'}</p>
          <DayPicker month={startDate} showWeekNumbers todayButton="Go to Today" onDayClick={handleDayClick} selectedDays={selectedDay} />
          <div className="buttons">
            <button className="cancel" onClick={clearForm}>
              Cancel
            </button>
            <button className="ok" disabled={!savable} onClick={handleSave}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AddTask
