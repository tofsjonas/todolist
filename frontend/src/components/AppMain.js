import React, { useEffect, useState, useContext } from 'react'
import TaskList from './TaskList'
import { getTaskList } from 'lib/storage'
import Spinner from './Spinner'
import { ListContext } from 'contexts/ListContext'
import AddTask from './AddTask'

const AppMain = () => {
  const { tasklist, dispatch } = useContext(ListContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('SPACETAG: AppMain.js SETTING DATA')
    getTaskList(data => {
      dispatch({ type: 'SET_LIST', payload: data })
      setLoading(false)
    })
  }, [])

  return (
    <main className="app-main">
      <AddTask />
      {loading && <Spinner />}
      {!loading && tasklist.length > 0 && <TaskList />}
      {!loading && tasklist.length <= 0 && <div>No tasks! Binge time! :)</div>}
    </main>
  )
}
export default AppMain
