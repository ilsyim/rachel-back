import mongoose from 'mongoose'

const Schema = mongoose.Schema

const photoSchema = new Schema({
  photoTitle: {type: String, required: true},
  photoEvent: {type: String, required: true},
  photoDate: {type: Date, required: true},
  photo: {type: String},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
}, {
  timestamps: true
})

const Photo = mongoose.model('Photo', photoSchema)

export {
  Photo
}