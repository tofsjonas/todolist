// const browserLanguage = navigator.language || navigator.userLanguage || 'en-GB'
const browserLanguage = 'en-GB'

//https://weeknumber.net/how-to/javascript
export const getWeekNumber = d => {
  var date = new Date(d.getTime())
  date.setHours(0, 0, 0, 0)
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7))
  // January 4 is always in week 1.
  var week1 = new Date(date.getFullYear(), 0, 4)
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
}

export const getSunday = date => {
  // var d = new Date(date)
  var dayOfMonth = date.getDate()
  var dayOfWeek = date.getDay()
  var diff = dayOfMonth - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // adjust when day is sunday
  return new Date(date.setDate(diff - 1))
}

export const getNameOfDay = date => {
  var options = { weekday: 'long' }
  return date.toLocaleDateString(browserLanguage, options)
}
export const getNameOfMonth = date => {
  var options = { month: 'long' }
  return date.toLocaleDateString(browserLanguage, options)
}

//overkill
// var namesOfWeek = {
//   'sv-SE': 'vecka',
//   'en-GB': 'week',
// }
// var namesOfDay = {
//   'sv-SE': 'dag',
//   'en-GB': 'day',
// }

export const getNameOfWeek = date => {
  var weekNumber = getWeekNumber(date)
  var weekName = 'week ' + weekNumber
  // var weekName = (namesOfWeek[browserLanguage] || namesOfWeek['en-GB']) + ' ' + weekNumber
  return weekName
}

export const getTimeSpanDates = (date, timespan) => {
  var year = date.getFullYear()
  var month = date.getMonth()
  var startDate = new Date(date)
  var endDate = new Date(date)
  switch (timespan) {
    // case 'day': // startDate == endDate
    //   break

    case 'week': // https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-week-in-javascript/26922029
      startDate.setDate(date.getDate() - date.getDay())
      endDate.setDate(date.getDate() - date.getDay() + 6)
      break
    case 'month': // https://stackoverflow.com/questions/222309/calculate-last-day-of-month-in-javascript
      startDate.setDate(1)
      endDate.setFullYear(year, month + 1, 0)
      break
    case 'year':
      startDate.setFullYear(year, 0, 1)
      endDate.setFullYear(year, 11, 31)
      break
    default:
      break
  }
  return { startDate, endDate }
}

// var pelle = getTimeSpanDates(new Date('2019-11-12'), 'week')
// console.log('SPACETAG: dateFunctions.js', pelle)
// console.log('SPACETAG: dateFunctions.js', String(new Date().getMinutes()).padStart(2, '0'))
// console.log('SPACETAG: dateFunctions.js', 'pp'.padStart(4, 'a'))

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
export const getLocaleDateString = date => {
  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
  return date.toLocaleDateString(browserLanguage, options)
}

export const dateAdd = (date, count, timespan) => {
  var tempDate = new Date(date)
  var month = date.getMonth()
  var dayOfMonth = date.getDate()
  var year = date.getFullYear()

  switch (timespan) {
    case 'day':
      tempDate.setDate(dayOfMonth + count)
      break
    case 'week':
      tempDate.setDate(dayOfMonth + count * 7)
      break
    case 'month':
      tempDate.setMonth(month + count)
      break
    case 'year':
      tempDate.setYear(year + count)
      break
    default:
      break
  }
  return tempDate
}
// var date = new Date('Fri Oct 25 2019 09:45:05 GMT+0200')
// console.log('SPACETAG: dateFunctions.js', getLocaleDateString(date))
// date = dateAdd(date, -1, 'day')
// console.log('SPACETAG: dateFunctions.js', getLocaleDateString(date))
// date = dateAdd(date, -1, 'day')
// console.log('SPACETAG: dateFunctions.js', getLocaleDateString(date))
// date = dateAdd(date, -1, 'day')
// console.log('SPACETAG: dateFunctions.js', getLocaleDateString(date))
