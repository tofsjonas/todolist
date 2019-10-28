import { ListModel, ListItemModel } from '../models/ListModel'

// export const createList = async () => {
//   let promise = new Promise((resolve, reject) => {
//     var list = new ListModel()
//     list.save((err, list) => {
//       if (err) reject(err)
//       resolve(list)
//     })
//   })
//   let result = await promise
//   return result
// }
export const createList = async () => {
  let promise = new Promise((resolve, reject) => {
    var list = new ListModel()
    list.save((err, list) => {
      if (err) reject(err)
      list.items.push(new ListItemModel({ title: 'Example task', when: new Date('2018-09-07') }))
      list.items.push(new ListItemModel({ title: 'Example task', when: new Date('2018-11-24') }))
      list.items.push(new ListItemModel({ title: 'Example task', when: new Date('2019-02-21') }))
      list.items.push(new ListItemModel({ title: 'Example task', when: new Date('2019-10-01') }))
      list.items.push(new ListItemModel({ title: 'Example task', when: new Date('2019-11-01') }))
      list.items.push(new ListItemModel({ title: 'Example task', when: new Date('2019-11-02') }))
      list.items.push(new ListItemModel({ title: 'Example task', when: new Date('2019-11-03') }))
      list.items.push(new ListItemModel({ title: 'Example task', when: new Date('2019-11-04') }))
      list.items.push(new ListItemModel({ title: 'Example task', when: new Date('2019-11-05') }))
      list.items.push(new ListItemModel({ title: 'Example task', when: new Date('2019-12-01') }))
      list.items.push(new ListItemModel({ title: 'Example task', when: new Date('2020-01-01') }))
      list.items.push(new ListItemModel({ title: 'Example task', when: new Date('2020-01-12') }))
      list.items.push(new ListItemModel({ title: 'Example task', when: new Date('2020-02-01') }))
      list.save((err, list) => {
        resolve(list)
      })

      // resolve(list)
    })
  })
  let result = await promise
  return result
}
export const getAllLists = async () => {
  let promise = new Promise((resolve, reject) => {
    ListModel.find((err, list) => {
      if (err) reject(err)
      resolve(list)
    }).sort({ createdAt: 'desc' })
  })
  let result = await promise
  return result
}
export const getList = async ({ list_id }) => {
  let promise = new Promise((resolve, reject) => {
    ListModel.findOne({ _id: list_id }, (err, list) => {
      if (err) reject(err)
      resolve(list)
    })
  })
  let result = await promise
  return result
}
export const updateList = async ({ list_id, data }) => {
  let promise = new Promise((resolve, reject) => {
    ListModel.findOneAndUpdate({ _id: list_id }, { ...data }, { new: true }, (err, list) => {
      if (err) reject(err)
      resolve(list)
    })
  })
  let result = await promise
  return result
}
export const deleteList = async ({ list_id }) => {
  let promise = new Promise((resolve, reject) => {
    ListModel.findByIdAndDelete(list_id, (err, list) => {
      if (err) reject(err)
      resolve('DELETE LIST OK')
    })
  })
  let result = await promise
  return result
}
export const addListItem = async ({ list_id, data }) => {
  let promise = new Promise((resolve, reject) => {
    ListModel.findById(list_id, (err, list) => {
      if (err) reject(err)
      // TODO use mongoose function to set title?
      list.items.push(new ListItemModel({ ...data }))
      // list.items.unshift(new ListItemModel())

      list.save((err, list) => {
        if (err) reject(err)
        const items = list.items
        resolve(items[items.length - 1])
      })
    })
  })
  let result = await promise
  return result
}
export const updateListItem = async ({ list_id, item_id, data }) => {
  let promise = new Promise((resolve, reject) => {
    ListModel.findOne({ _id: list_id }, (err, list) => {
      if (err) reject(err)
      for (const i in data) {
        // console.log('SPACETAG: listController.js', i, data[i])
        list.items.id(item_id)[i] = data[i]
      }
      list.save()
      // console.log('SPACETAG: listController.js', list.items.id(item_id))
      resolve(list.items.id(item_id))
    })
  })
  let result = await promise
  return result
}
export const deleteListItem = async ({ list_id, item_id }) => {
  let promise = new Promise((resolve, reject) => {
    ListModel.findOneAndUpdate({ _id: list_id }, { $pull: { items: { _id: item_id } } }, (err, res) => {
      if (err) reject(err)
      resolve('DELETE LIST ITEM OK')
    })
  })
  let result = await promise
  return result
}

// // mindre användbart om man kör async, kan mycket väl returnera i fel ordning...
// export const toggleListItem = async ({ list_id, item_id }) => {
//   let promise = new Promise((resolve, reject) => {
//     ListModel.findOne({ _id: list_id }, (err, list) => {
//       if (err) reject(err)
//       const newVal = !list.items.id(item_id).done
//       list.items.id(item_id).done = !list.items.id(item_id).done
//       list.save()
//       resolve(list.items.id(item_id))
//     })

//     // just cant get xor to work
//     // ListModel.findOneAndUpdate(
//     //   { _id: list_id, 'items._id': item_id },
//     //   {
//     //     $bit: {
//     //       // ['items.$.done']: { xor: 1 },
//     //       'items.$.done': { xor: 1 },
//     //     },
//     //   },
//   })
//   let result = await promise
//   return result
// }

// export const updateListItemtitle = async ({ list_id, item_id, title }) => {
//   let promise = new Promise((resolve, reject) => {
//     ListModel.findOneAndUpdate({ _id: list_id, 'items._id': item_id }, { 'items.$.title': title }, { new: true }, (err, list) => {
//       if (err) reject(err)
//       const item = list.items.id(item_id)
//       resolve(item)
//     })
//   })
//   let result = await promise
//   return result
// }
