var express = require('express')
import { createList, getAllLists, addListItem, deleteListItem, updateListItem, deleteList, findList } from '../controllers/listController'
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index', { title: 'JONAS' })
})
router.get('/lists', function(req, res, next) {
  getAllLists().then(lists => {
    return res.json(lists)
  })
  // .catch(err => {
  //   return res.json({ status: 'ERROR', message: err.message })
  // })
})
router.get('/getlist', function(req, res, next) {
  findList({}).then(list => {
    return res.json(list)
  })
  // .catch(err => {
  //   return res.json({ status: 'ERROR', message: err.message })
  // })
})

router.post('/createlist', function(req, res, next) {
  const { listTitle } = req.body
  createList({ title: listTitle }).then(list => {
    // return res.status(200).json(list)
    return res.json(list)
  })
  // .catch(err => {
  //   return res.json({ status: 'ERROR', message: err.message })
  // })
})

//for testing purposes only
router.get('/createlist', function(req, res, next) {
  const { listTitle } = req.body
  createList({ title: listTitle }).then(list => {
    return res.status(200).json(list)

    // return res.json({ status: 'OK', list })
  })
  // .catch(err => {
  //   return res.json({ status: 'ERROR', message: err.message })
  // })
})

router.post('/additem/:list_id', function(req, res, next) {
  const { list_id } = req.params
  const { data } = req.body

  addListItem({ list_id, data }).then(item => {
    return res.status(200).json(item)
  })
  // .catch(err => {
  //   // return res.status(404).json(item)
  //   console.log('SPACETAG: listRouter.js', err)
  //   return res.json({ status: 'ERROR', message: err.message })
  // })
})

router.put('/updateitem/:list_id/:item_id', function(req, res, next) {
  const { list_id, item_id } = req.params
  const { data } = req.body
  updateListItem({ list_id, item_id, data }).then(() => {
    return res.status(204).send()
  })

  // .catch(err => {
  // return res.status(500).send()
  //   return res.json({ status: 'ERROR', message: err.message })
  // })
})
router.delete('/deleteitem/:list_id/:item_id', function(req, res, next) {
  const { list_id, item_id } = req.params

  deleteListItem({ list_id, item_id }).then(() => {
    return res.status(204).send()
  })
  // .catch(err => {
  //   return res.json({ status: 'ERROR', message: err.message })
  // })
})

router.delete('/deletelist/:list_id', function(req, res, next) {
  const { list_id } = req.params
  deleteList({ list_id })
    .then(message => {
      return res.json({ status: 'OK', message })
    })
    .catch(err => {
      return res.json({ status: 'ERROR', message: err.message })
    })
})

export default router
