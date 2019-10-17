import React, { useEffect, useState } from 'react'
import Task from './Task'
import Tasks from './Tasks'
import { getTaskList } from '../lib/remoteFunctions'
import Spinner from './Spinner'

const AppMain = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTaskList(list => {
      setTasks(list)
      setLoading(false)
    })
  }, [])

  return (
    <main className="app-main">
      <div className="add-task">
        <i className="icon-article" />
        <input type="text" placeholder="Add a task..." />
      </div>
      {loading && <Spinner />}
      {!loading && tasks.length > 0 && <Tasks tasks={tasks} />}
      {!loading && tasks.length <= 0 && <div>No tasks :(</div>}
    </main>
  )
}
export default AppMain
