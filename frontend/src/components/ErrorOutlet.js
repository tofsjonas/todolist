import React, { useContext } from 'react'
import { ErrorContext } from 'contexts/ErrorContext'
const ErrorOutlet = () => {
  const { error } = useContext(ErrorContext)
  // console.log('SPACETAG: ErrorOutlet.js', error)
  return (
    error && (
      <div role="alert">
        <h3>{error.message}</h3>
        <br /> please try again later...
      </div>
    )
  )
}
export default ErrorOutlet
