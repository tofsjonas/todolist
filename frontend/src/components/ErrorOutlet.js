import React, { useContext } from 'react'
import { ErrorContext } from 'contexts/ErrorContext'
const ErrorOutlet = () => {
  const { error, setError } = useContext(ErrorContext)
  // console.log('SPACETAG: ErrorOutlet.js', error)

  const resetError = params => {
    setError(null)
  }

  return (
    error && (
      <div className="error-outlet">
        <div>
          <h3>{error.message}</h3>
          please try again later...
          <br />
          <br />
          <button onClick={resetError}>OK</button>
        </div>
      </div>
    )
  )
}
export default ErrorOutlet
