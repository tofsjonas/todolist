import React from 'react'
const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="header-time-span">
        <div className="clickable">Day</div>
        <div className="clickable current">Week</div>
        <div className="clickable">Month</div>
        <div className="clickable">Year</div>
      </div>
      <div className="header-date-picker">
        <i className="navigator clickable icon-left-open-big" />
        <div>
          <div className="title">Thursday</div>
          <div className="sub-title">March 23, 2017</div>
        </div>
        <i className="navigator clickable icon-right-open-big" />
      </div>
    </header>
  )
}
export default AppHeader
