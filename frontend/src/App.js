import React from 'react'
import './fontello/css/fontello.css'
import AuthContextProvider from './contexts/AuthContext'
import Main from './Main'

function App() {
  // console.log('SPACETAG: App.js', process.env.NODE_ENV)
  return (
    <div className="app">
      <AuthContextProvider>
        <Main />
      </AuthContextProvider>
    </div>
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
