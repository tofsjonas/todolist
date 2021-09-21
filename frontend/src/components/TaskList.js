import React, { useState, useEffect, useContext } from 'react'
import TaskItem from './TaskItem'
import { ListContext } from 'contexts/ListContext'
import { DateContext } from '../contexts/DateContext'
const TaskList = () => {
  const { startDate, endDate } = useContext(DateContext)
  const { tasklist } = useContext(ListContext)

  const [pinned, setPinned] = useState([])
  const [normal, setNormal] = useState([])
  useEffect(() => {
    // console.log('SPACETAG: TaskList.js TASK LIST UPDATED!')
    const pinnedList = tasklist.filter((task) => task.pinned)
    // const normalList = tasklist.filter(task => !task.pinned)
    const normalList = tasklist.filter((task) => {
      if (task.pinned) return false
      if (task.when > endDate.toISOString().substr(0, 10)) return false
      if (task.when < startDate.toISOString().substr(0, 10)) return false
      return true
    })
    // console.log('SPACETAG: TaskList.js', startDate, normalList)
    setPinned(pinnedList)
    setNormal(normalList)
  }, [tasklist, startDate, endDate])

  var zIndex = 1000

  return (
    <div className="task-tasklist">
      {pinned.length > 0 && (
        <>
          {pinned.map((task) => {
            zIndex -= 2 // otherwise the dot-menu will be troublesome...
            return <TaskItem key={task._id} task={task} zIndex={zIndex} />
          })}
          <hr />
        </>
      )}
      {normal.length > 0 && (
        <>
          {normal.map((task) => {
            zIndex -= 2 // otherwise the dot-menu will be troublesome...
            return <TaskItem key={task._id} task={task} zIndex={zIndex} />
          })}
        </>
      )}
    </div>
  )
}
export default TaskList
