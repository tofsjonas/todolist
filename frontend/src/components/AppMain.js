import React, { useEffect, useState, useContext } from 'react'
import TaskList from './TaskList'
import { getTaskList } from 'lib/storage'
import Spinner from './Spinner'
import { ListContext } from 'contexts/ListContext'

const AppMain = () => {
  const { tasklist, dispatch } = useContext(ListContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTaskList(tasklist => {
      dispatch({ type: 'SET_LIST', payload: tasklist })
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
      {!loading && tasklist.length > 0 && <TaskList />}
      {!loading && tasklist.length <= 0 && <div>No tasklist! Binge time! :)</div>}
    </main>
  )
}
export default AppMain
