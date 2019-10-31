import axios from 'axios'
var loc = window.location
const serverUrl = loc.hostname === 'localhost' ? 'http://localhost:3002/todo' : loc.protocol + '//' + loc.host + '/todo'

export const getTaskList = (success, fail) => {
  axios
    .get(serverUrl + '/getlist', { crossdomain: true })
    .then(response => {
      if (response.status === 200) {
        const list = response.data
        localStorage.setItem('listId', list._id)
        success(list.items)
      } else fail(new Error('Unknown error'))
    })
    .catch(err => {
      fail(err)
    })
}

export const createListItem = (data, success, fail) => {
  const listId = localStorage.getItem('listId') || ''
  if (listId.length === 0) {
    fail(new Error('No list id in local storage'))
    return
  }
  const url = serverUrl + '/additem/' + listId
  axios
    .post(url, { data }, { crossdomain: true })
    .then(response => {
      if (response.status === 200) {
        const item = response.data
        success(item)
      } else {
        fail(new Error('Unknown error'))
      }
    })
    .catch(error => {
      fail(error)
    })
}

export const deleteListItem = (_id, fail) => {
  var listId = localStorage.getItem('listId') || ''
  if (listId.length === 0) {
    fail(new Error('No list id in local storage'))
    return
  }
  axios
    .delete(serverUrl + '/deleteitem/' + listId + '/' + _id, { crossdomain: true })
    .then(function(response) {
      if (response.status !== 204) {
        fail(new Error('Unknown error'))
      }
    })
    .catch(function(error) {
      fail(error)
    })
}

export const updateListItem = (data, fail) => {
  var listId = localStorage.getItem('listId') || ''
  if (listId.length === 0) {
    fail(new Error('No list id in local storage'))
  }
  const url = serverUrl + '/updateitem/' + listId + '/' + data._id + ''
  axios
    .put(url, { data }, { crossdomain: true })
    .then(response => {
      if (response.status !== 204) {
        // console.log('SPACETAG: storage.axios.js', response)
        fail(new Error('Unknown error'))
      }
    })
    .catch(error => {
      fail(error)
    })
}
