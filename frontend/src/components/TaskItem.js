import React, { useState, useEffect, useContext, useRef } from 'react'
import TaskItemMenu from './TaskItemMenu'
import { ListContext } from 'contexts/ListContext'
import { updateListItem } from 'lib/storage'
const TaskItem = ({ task, zIndex }) => {
  const { dispatch } = useContext(ListContext)
  const [title, setTitle] = useState(' ')
  const [memo, setMemo] = useState()
  const [checked, setChecked] = useState(false)
  const handleBlur = () => {
    save()
  }

  useEffect(() => {
    setTitle(task.title)
    setMemo(task.memo)
    setChecked(task.checked || false)
  }, [task])

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.target.blur()
    }
  }
  const save = () => {
    const payload = { ...task, checked, memo, title }
    if (!memo) {
      delete payload.memo
    }

    // eslint-disable-next-line eqeqeq
    if (JSON.stringify(task) != JSON.stringify(payload)) {
      dispatch({ type: 'UPDATE_ITEM', payload })
      updateListItem(payload)
      // console.log('SPACETAG: TaskItem.js SAVING!!!')
    }
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }
  const handleMemoChange = e => {
    setMemo(e.target.value)
  }
  const toggleChecked = () => {
    setChecked(!checked)
  }

  return (
    <div className={'task' + (checked ? ' done' : '')} style={{ zIndex: zIndex }}>
      <div className="pin">{task.pinned && <i className="icon-pinboard" />}</div>
      <div className="check clickable" onClick={toggleChecked}>
        {checked && <i className="icon-ok" />}
      </div>
      <div className="description">
        <input type="text" onKeyDown={handleKeyDown} maxLength="50" onBlur={handleBlur} value={title} placeholder="Rename task..." onChange={handleTitleChange} className="title" required />
        {typeof memo !== 'undefined' && <input type="text" onKeyDown={handleKeyDown} maxLength="50" onBlur={handleBlur} className={'memo' + (typeof memo !== 'undefined' ? ' active' : '')} placeholder="Add a memo..." value={memo || ''} onChange={handleMemoChange} />}
      </div>
      <div className="dots">
        <TaskItemMenu task={task} />
      </div>
    </div>
  )
}
export default TaskItem
//         <input type="text" onKeyDown={handleKeyDown} maxLength="50" onBlur={handleBlur} value={memo} placeholder="Edit memo..." onChange={handleMemoChange} className={'memo' + (memo.length > 0 ? ' active' : '')} />

//        <input type="text" onKeyDown={handleKeyDown} maxLength="50" onBlur={handleBlur} className={'memo' + (typeof memo !== 'undefined' ? ' active' : '')} placeholder="Edit memo..." value={memo} onChange={handleMemoChange} />

// {typeof memo !== 'undefined' && <input type="text" onKeyDown={handleKeyDown} maxLength="50" onBlur={handleBlur} className="memo" placeholder="Edit memo..." value={memo} onChange={handleMemoChange} />}
