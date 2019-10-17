import React from 'react'
import './fontello/css/fontello.css'
import AuthContextProvider from './contexts/AuthContext'
import Main from './Main'

function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <Main />
      </AuthContextProvider>
    </div>
  )
}

export default App
