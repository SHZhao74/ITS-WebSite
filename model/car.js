import mongoose from 'mongoose'

const CarSchema = new mongoose.Schema({
  driver: {type: String, required: true},
  plate: {type: String, required: true},
  status: String,
  location: String,
  speed: Number,
  address: String,
  note: String,
})
export default mongoose.model('CarModel', CarSchema)
