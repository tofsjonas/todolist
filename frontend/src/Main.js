import React, { useContext } from 'react'
import { AuthContext } from './contexts/AuthContext'
import Auth from './components/Auth'
import AppHeader from './components/AppHeader'
import ListContextProvider from './contexts/ListContext'
import AppMain from './components/AppMain'
import DateContextProvider, { DateContext } from './contexts/DateContext'
const Main = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div className="main">
      {!isAuthenticated && <Auth />}
      {isAuthenticated && (
        <DateContextProvider>
          <ListContextProvider>
            <AppHeader />
            <AppMain />
          </ListContextProvider>
        </DateContextProvider>
      )}
    </div>
  )
}
export default Main
