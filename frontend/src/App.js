import React from 'react'
import './fontello/css/fontello.css'
import AuthContextProvider from './contexts/AuthContext'
import Main from './Main'
import { ErrorDisplayBoundary } from 'contexts/ErrorContext'
import ErrorOutlet from './components/ErrorOutlet'

function App() {
  // console.log('SPACETAG: App.js', process.env.NODE_ENV)
  return (
    <ErrorDisplayBoundary>
      <AuthContextProvider>
        <ErrorOutlet />
        <div className="app">
          <Main />
        </div>
      </AuthContextProvider>
    </ErrorDisplayBoundary>
  )
  // try {
  //   } catch (error) {
  //     alert('Something went wrong, please try again later.\n\n' + error.message)

  //     // if (process.env.NODE_ENV === 'development') {
  //     //   throw error
  //     // } else {
  //     //   alert('Something went wrong, please try again later.\n\n' + error.message)
  //     // }
  //   }
}

export default App
