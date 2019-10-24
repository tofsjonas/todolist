// export function getMonday(d) {
//   d = new Date(d)
//   var day = d.getDay(),
//     diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
//   return new Date(d.setDate(diff))
// }

// export const getSunday = d => {
//   // var d = new Date(date)
//   var day = d.getDay()
//   var diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
//   return new Date(d.setDate(diff - 1))
// }

export const getSunday = date => {
  // var d = new Date(date)
  var dayOfMonth = date.getDate()
  var dayOfWeek = date.getDay()
  var diff = dayOfMonth - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // adjust when day is sunday
  return new Date(date.setDate(diff - 1))
}

export const getTimeSpanDates = (date, timespan) => {
  var year = date.getFullYear()
  var month = date.getMonth()
  var dayOfMonth = date.getDate()
  var dayOfWeek = date.getDay()
  var startDate = date
  var endDate = date
  switch (timespan) {
    // case 'day': // startDate == endDate
    //   break

    case 'week': // https://stackoverflow.com/questions/5210376/how-to-get-first-and-last-day-of-the-week-in-javascript/26922029
      startDate = new Date(date.setDate(dayOfMonth - dayOfWeek))
      endDate = new Date(date.setDate(dayOfMonth - dayOfWeek + 6))
      break
    case 'month': // https://stackoverflow.com/questions/222309/calculate-last-day-of-month-in-javascript
      startDate = new Date(date.setDate(1))
      endDate = new Date(date.setFullYear(year, month + 1, 0))
      break
    case 'year':
      startDate = new Date(date.setFullYear(year, 0, 1))
      endDate = new Date(date.setFullYear(year, 11, 31))
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
  const browserLanguage = navigator.language || navigator.userLanguage || 'en-GB'
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
const dateSub = params => {}
// var date = new Date('Fri Oct 25 2019 09:45:05 GMT+0200')
// console.log('SPACETAG: dateFunctions.js', getLocaleDateString(date))
// date = dateAdd(date, -1, 'day')
// console.log('SPACETAG: dateFunctions.js', getLocaleDateString(date))
// date = dateAdd(date, -1, 'day')
// console.log('SPACETAG: dateFunctions.js', getLocaleDateString(date))
// date = dateAdd(date, -1, 'day')
// console.log('SPACETAG: dateFunctions.js', getLocaleDateString(date))
