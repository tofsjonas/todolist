//fake auth handler
import React, { createContext } from 'react'
export const AuthContext = createContext()
const AuthContextProvider = ({ children }) => {
  return <AuthContext.Provider value={{ isAuthenticated: true, userId: '1234' }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
