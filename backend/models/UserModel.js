import { Schema, model } from 'mongoose'

// keep them in one schema
// https://docs.mongodb.com/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/

const userSchema = new Schema(
  {
    title: { type: String, required: true, default: 'todo list' },
    items: [listItemSchema],
  },
  { timestamps: true }
)

export const UserModel = model('UserModel', userSchema)
// export default List

// custom ids, fast då kan man lika gärna lägga till ett "key"-fält, så slipper man mucka med mongoose
// var Post = new mongoose.Schema({
//   _id: Number,
//   title: String,
//   content: String,
//   tags: [ String ]
// }, { _id: false });
