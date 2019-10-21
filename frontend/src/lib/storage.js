import axios from 'axios'
var loc = window.location
const serverUrl = loc.hostname === 'localhost' ? 'http://localhost:3002/todo' : loc.protocol + '//' + loc.host

const uniqueId = () => {
  return (
    'i' +
    Date.now() +
    Math.random()
      .toString()
      .slice(2, 12)
  )
}

const initialState = [
  { _id: '123450', title: 'todostuff 1', when: '2018-02-08' },
  { _id: '123451', title: 'todostuff 2', memo: 'pelle svanslös', when: '2019-10-05' },
  { _id: '123452', title: 'todostuff 3', when: '2018-10-08', pinned: true },
  { _id: '123453', title: 'todostuff 4', when: '2019-11-08', memo: 'Gurgel!' },
  { _id: '123454', title: 'todostuff 5', when: '2019-10-08', checked: true },
  { _id: '123455', title: 'todostuff 6', memo: 'maja gräddnos', when: '2019-10-08' },
  { _id: '123456', title: 'todostuff 7', when: '2019-10-08', pinned: true },
  { _id: '123457', title: 'todostuff 8', when: '2019-10-04' },
  { _id: '123458', title: 'todostuff 9', when: '2019-10-01' },
]

// var data = JSON.stringify(initialState)
// localStorage.setItem('tasklist', data)

export const getTaskList = callback => {
  var localData = localStorage.getItem('tasklist') || []
  var parsedData = JSON.parse(localData)
  setTimeout(() => {
    callback(parsedData)
  }, 200)
}

export const createListItem = (item, callback) => {
  var localData = localStorage.getItem('tasklist') || []
  var parsedData = JSON.parse(localData)
  item._id = uniqueId()
  parsedData.unshift(item)
  localStorage.setItem('tasklist', JSON.stringify(parsedData))
  setTimeout(() => {
    callback(item)
  }, 200)
}

export const deleteListItem = (_id, callback) => {
  var localData = localStorage.getItem('tasklist') || []
  var parsedData = JSON.parse(localData)
  const newData = parsedData.filter(item => item._id !== _id)
  localStorage.setItem('tasklist', JSON.stringify(newData))
}

export const updateListItem = (item, callback) => {
  var localData = localStorage.getItem('tasklist') || []
  var parsedData = JSON.parse(localData)

  const newData = parsedData.map(storedItem => {
    return item._id === storedItem._id ? item : storedItem
  })
  localStorage.setItem('tasklist', JSON.stringify(newData))
}
