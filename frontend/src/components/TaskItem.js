import React, { useState, useEffect, useContext, useRef } from 'react'
import TaskItemMenu from './TaskItemMenu'
import { ListContext } from '../contexts/ListContext'
import { updateListItem } from '../lib/storage'
const TaskItem = ({ task, zIndex }) => {
  const didMount = useRef(false)
  const { dispatch } = useContext(ListContext)
  const [title, setTitle] = useState(task.title)
  const [memo, setMemo] = useState(task.memo)
  const [pinned, setPinned] = useState(task.pinned || false)
  const [checked, setChecked] = useState(task.checked || false)
  const handleBlur = () => {
    save()
  }

  useEffect(() => {
    if (!didMount.current) return
    save()
  }, [pinned, checked])

  useEffect(() => {
    didMount.current = true
  }, [])

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
  }
  const save = () => {
    const payload = { ...task, title, memo, pinned, checked }
    console.log('SPACETAG: TaskItem.js SAVING!!!')
    dispatch({ type: 'UPDATE_ITEM', payload })
    updateListItem(payload)
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }
  const handleMemoChange = e => {
    setMemo(e.target.value)
  }
  const toggleChecked = () => {
    setChecked(!checked)
    // save()
  }
  // const togglePinned = () => {
  //   setPinned(!pinned)
  //   // save()
  // }

  return (
    <div className={'task' + (checked ? ' done' : '')} style={{ zIndex: zIndex }}>
      <div className="pin">{pinned && <i className="icon-pinboard" />}</div>
      <div className="check clickable" onClick={toggleChecked}>
        {checked && <i className="icon-ok" />}
      </div>
      <div className="description">
        <input type="text" maxLength="50" onKeyDown={handleKeyDown} className="title" onBlur={handleBlur} required placeholder="Rename task..." value={title} onChange={handleTitleChange} />
        {memo && <input type="text" onKeyDown={handleKeyDown} maxLength="50" onBlur={handleBlur} className="memo" placeholder="Edit memo..." value={memo} onChange={handleMemoChange} />}
      </div>
      <div className="dots">
        <TaskItemMenu task={task} />
      </div>
    </div>
  )
}
export default TaskItem
