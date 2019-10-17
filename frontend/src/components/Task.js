import React, { useState, useEffect, useContext } from 'react'
import DotMenu from './DotMenu'
import { ListContext } from '../contexts/ListContext'
const Task = ({ task, zIndex }) => {
  const { dispatch } = useContext(ListContext)
  const [title, setTitle] = useState(task.title)
  const [memo, setMemo] = useState(task.memo)
  const [pinned, setPinned] = useState(task.pinned)
  const [checked, setChecked] = useState(task.checked)
  // const [localTask, setTask] = useState(task)
  // useEffect(() => {
  //   setTitle(task.title)
  //   setMemo(task.memo || '')
  //   setPinned(task.pinned)
  //   setChecked(task.checked)
  // }, [task])
  const handleBlur = params => {
    console.log('SPACETAG: Task.js', 'SAVING')
  }
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
  }

  const handleTitleChange = e => {
    // setTask({ ...task, title: e.target.value })
    setTitle(e.target.value)
  }
  const handleMemoChange = e => {
    setMemo(e.target.value)
  }
  const toggleChecked = () => {
    setChecked(!checked)
  }
  const togglePinned = () => {
    setPinned(!pinned)
  }

  return (
    <div className={'task' + (checked ? ' done' : '')} style={{ zIndex: zIndex }}>
      <div className="pin clickable" onClick={togglePinned}>
        {pinned && <i className="icon-pinboard" />}
      </div>
      <div className="check clickable" onClick={toggleChecked}>
        {checked && <i className="icon-ok" />}
      </div>
      <div className="description">
        <input type="text" maxLength="50" onKeyDown={handleKeyDown} className="title" onBlur={handleBlur} required placeholder="Rename task..." value={title} onChange={handleTitleChange} />
        {memo && <input type="text" onKeyDown={handleKeyDown} maxLength="50" onBlur={handleBlur} className="memo" placeholder="Edit memo..." value={memo} onChange={handleMemoChange} />}
      </div>
      <div className="dots">
        <DotMenu task={task} />
      </div>
    </div>
  )
}
export default Task
