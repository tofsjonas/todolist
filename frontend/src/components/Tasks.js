import React, { useState, useEffect } from 'react'
import Task from './Task'
const Tasks = ({ tasks }) => {
  const [pinned, setPinned] = useState([])
  const [normal, setNormal] = useState([])
  useEffect(() => {
    const pinned = tasks.filter(task => task.pinned)
    const normal = tasks.filter(task => !task.pinned)
    setPinned(pinned)
    setNormal(normal)
  }, [tasks])

  var zIndex = 1000

  return (
    <div className="task-list">
      {pinned.length > 0 && (
        <>
          {pinned.map(task => {
            zIndex -= 2 // otherwise the dot-menu will be troublesome...
            return <Task key={zIndex} task={task} zIndex={zIndex} />
          })}
          <hr />
        </>
      )}
      {normal.length > 0 && (
        <>
          {normal.map(task => {
            zIndex -= 2 // otherwise the dot-menu will be troublesome...
            return <Task key={zIndex} task={task} zIndex={zIndex} />
          })}
        </>
      )}
    </div>
  )
}
export default Tasks
