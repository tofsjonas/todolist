import React, { useState, useEffect, useRef, useContext } from 'react'
import DayPicker from 'react-day-picker'
import useOuterClickNotifier from 'lib/useOuterClickNotifier'
import { createListItem } from 'lib/storage'
import { ListContext } from 'contexts/ListContext'
import Spinner from './Spinner'

const AddTask = () => {
  const { dispatch } = useContext(ListContext)

  const [selectedDay, setSelectedDay] = useState(new Date())
  const [title, setTitle] = useState('A task!')
  const [savable, setSavable] = useState('')
  const [active, setActive] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const innerRef = useRef(null)
  const hideDetails = () => {
    setActive(false)
  }

  const handleDayClick = (day, { selected }) => {
    setSelectedDay(selected ? undefined : day)
  }

  useEffect(() => {
    setSavable(isSavable())
  }, [selectedDay, title])

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleSave = () => {
    setIsSaving(true)
    const item = { title, when: selectedDay.toISOString().substr(0, 10) }
    // console.log('SPACETAG: AddTask.js SAVING!')

    createListItem(item, data => {
      dispatch({ type: 'CREATE_ITEM', payload: data })
      setIsSaving(false)
      clearForm()
    })

    // console.log('SPACETAG: AddTask.js SAVING!', savable)
  }
  const clearForm = () => {
    setSelectedDay(null)
    setTitle('')
    setActive(false)
  }

  const isSavable = params => {
    if (title.trim().length === 0) return false
    if (typeof selectedDay === 'undefined') return false
    return true
  }

  const handleFocus = params => {
    setActive(true)
  }
  useOuterClickNotifier(hideDetails, innerRef)

  //

  return (
    <div className="add-task" ref={innerRef}>
      <div className="add-task-input-container">
        <i className="icon-article" />
        <input onFocus={handleFocus} type="text" placeholder="Add a task..." value={title} onChange={handleTitleChange} />
      </div>
      {isSaving && <Spinner />}
      {!isSaving && (
        <div className={'task-details' + (active ? ' active' : '')}>
          <p>{selectedDay ? selectedDay.toLocaleDateString() : 'Please select a day 👻'}</p>
          <DayPicker fromMonth={new Date()} showWeekNumbers todayButton="Go to Today" onDayClick={handleDayClick} selectedDays={selectedDay} />
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
