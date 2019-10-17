import axios from 'axios'
var loc = window.location
const serverUrl = loc.hostname === 'localhost' ? 'http://localhost:3002/todo' : loc.protocol + '//' + loc.host

export const getTaskList = callback => {
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
  setTimeout(() => {
    callback(initialState)
  }, 550)
}

export const createListItem = (vals, callback) => {}
export const updateListItem = (item, callback) => {}
