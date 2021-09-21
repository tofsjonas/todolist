import React, { useEffect, useState, useContext } from 'react'
import { getTaskList } from 'lib/storage'
import { ListContext } from 'contexts/ListContext'
import TaskList from 'components/TaskList'
import Spinner from 'components/Spinner'
import AddTask from 'components/AddTask'
import { useErrorOutlet } from 'contexts/ErrorContext'

const AppMain = () => {
  const { tasklist, dispatch } = useContext(ListContext)
  const [loading, setLoading] = useState(true)
  const setError = useErrorOutlet()

  useEffect(() => {
    // console.log('SPACETAG: AppMain.js SETTING DATA')
    getTaskList(
      (data) => {
        dispatch({ type: 'SET_LIST', payload: data })
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
    )
  }, [dispatch, setError])

  return (
    <main className="app-main">
      <AddTask />
      {loading && <Spinner />}
      {!loading && tasklist && tasklist.length > 0 && <TaskList />}
      {!loading && tasklist && tasklist.length <= 0 && <div>No tasks! Binge time! :)</div>}
    </main>
  )
}
export default AppMain
