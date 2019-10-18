import React, { useState, useRef, useContext, useEffect } from 'react'
import useOuterClickNotifier from 'lib/useOuterClickNotifier'
import { ListContext } from 'contexts/ListContext'
import { updateListItem, deleteListItem } from 'lib/storage'

const TaskItemMenu = ({ task }) => {
  // useEffect(() => {
  //   console.log('SPACETAG: TaskItemMenu.js TASK CHANGED')
  // }, [task])

  const { dispatch } = useContext(ListContext)

  const innerRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => {
    setVisible(!visible)
  }

  const togglePin = e => {
    e.stopPropagation()
    const payload = { ...task, pinned: !task.pinned }
    dispatch({ type: 'UPDATE_ITEM', payload })
    setVisible(false)
    updateListItem(payload)
  }
  const addMemo = e => {
    e.stopPropagation()
    const payload = { ...task, memo: '' }
    // console.log('SPACETAG: TaskItemMenu.js', payload)
    dispatch({ type: 'UPDATE_ITEM', payload })
    setVisible(false)

    console.log('SPACETAG: TaskItemMenu.js ADDING MEMO')
  }
  const deleteTask = e => {
    e.stopPropagation()
    dispatch({ type: 'DELETE_ITEM', payload: task })
    setVisible(false)
    deleteListItem(task._id)
    // console.log('SPACETAG: TaskItemMenu.js DELETING')
  }
  useOuterClickNotifier(toggleVisible, innerRef)

  return (
    <>
      {visible && (
        <div ref={innerRef} className="dot-menu">
          <i className="icon-up-dir" />
          {!task.pinned && (
            <div className="clickable pin-to-top" onClick={togglePin}>
              <i className="icon-pinboard" />
              Pin task
            </div>
          )}
          {task.pinned && (
            <div className="clickable unpin-to-top" onClick={togglePin}>
              <i className="icon-pinboard" />
              Un-pin task
            </div>
          )}

          <div className="clickable add-memo" onClick={addMemo}>
            <i className="icon-doc-new" />
            Add a memo
          </div>
          <div className="clickable delete" onClick={deleteTask}>
            <i className="icon-trash" />
            Delete
          </div>
        </div>
      )}
      <i className="clickable icon-dot-3" style={{ zIndex: 2 }} onClick={toggleVisible} />
    </>
  )
}
export default TaskItemMenu
