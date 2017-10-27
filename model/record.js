import mongoose from 'mongoose'

const recordSchema = new mongoose.Schema({
  plate: {type: String, required: true},
  location: String,
  data: {type: String, required: true},
  startAt: Date,
  endAt: Date,
  event: String,
  vedio: String,
  // speed: nummber,
  // address: String,
  // note: String,
})
export default mongoose.model('recordModel', recordSchema)
