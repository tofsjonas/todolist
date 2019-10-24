import React, { useState, useEffect, useContext } from 'react'
import TaskItem from './TaskItem'
import { ListContext } from 'contexts/ListContext'
const TaskList = () => {
  const { tasklist } = useContext(ListContext)

  const [pinned, setPinned] = useState([])
  const [normal, setNormal] = useState([])
  useEffect(() => {
    // console.log('SPACETAG: TaskList.js TASK LIST UPDATED!')
    const pinnedList = tasklist.filter(task => task.pinned)
    const normalList = tasklist.filter(task => !task.pinned)
    setPinned(pinnedList)
    setNormal(normalList)
  }, [tasklist])

  var zIndex = 1000

  return (
    <div className="task-tasklist">
      {pinned.length > 0 && (
        <>
          {pinned.map(task => {
            zIndex -= 2 // otherwise the dot-menu will be troublesome...
            return <TaskItem key={task._id} task={task} zIndex={zIndex} />
          })}
          <hr />
        </>
      )}
      {normal.length > 0 && (
        <>
          {normal.map(task => {
            zIndex -= 2 // otherwise the dot-menu will be troublesome...
            return <TaskItem key={task._id} task={task} zIndex={zIndex} />
          })}
        </>
      )}
    </div>
  )
}
export default TaskList
