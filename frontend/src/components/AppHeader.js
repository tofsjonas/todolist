import React from 'react'
import TimespanTabs from './header/TimespanTabs'
import DateNavigator from './header/DateNavigator'
const AppHeader = () => {
  return (
    <header className="app-header">
      <TimespanTabs />
      <DateNavigator />
    </header>
  )
}
export default AppHeader
