import React, { useContext } from 'react'
import { AuthContext } from 'contexts/AuthContext'
import Auth from 'components/Auth'
import AppHeader from 'components/AppHeader'
import ListContextProvider from 'contexts/ListContext'
import AppMain from 'components/AppMain'
import DateContextProvider from 'contexts/DateContext'
import ErrorOutlet from 'components/ErrorOutlet'
const Main = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div className="main">
      {!isAuthenticated && <Auth />}
      {isAuthenticated && (
        <DateContextProvider>
          <ListContextProvider>
            <ErrorOutlet />
            <AppHeader />
            <AppMain />
          </ListContextProvider>
        </DateContextProvider>
      )}
    </div>
  )
}
export default Main
