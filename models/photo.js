import mongoose from 'mongoose'
// import { Profile } from './profile'
const Schema = mongoose.Schema

const photoSchema = new Schema({
  photoTitle: {type: String, required: true},
  photoEvent: {type: String, required: true},
  photoDate: {type: Date, required: true},
  photo: {type: String},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
  essay: {type: String}
}, {
  timestamps: true
})

const Photo = mongoose.model('Photo', photoSchema)

export {
  Photo
}