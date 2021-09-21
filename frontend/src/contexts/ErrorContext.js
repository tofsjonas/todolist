import React, { useContext, useState, useMemo } from 'react'

//https://realfiction.net/2019/03/11/use-reacts-context-to-display-an-error-message-somewhere-else

export const ErrorContext = React.createContext()

export function ErrorDisplayBoundary({ children }) {
  const [error, setError] = useState(null)
  // Is it really worth it?
  const ctx = useMemo(() => ({ error, setError }), [error])

  return <ErrorContext.Provider value={ctx}>{children}</ErrorContext.Provider>
}

// might as well skip this, no?
// const setError = useErrorOutlet()
// const {setError} = useContext(ErrorContext)
// no difference, yes?

export function useErrorOutlet() {
  const errorCtx = useContext(ErrorContext)
  return errorCtx.setError
}
