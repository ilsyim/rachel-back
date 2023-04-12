import { Photo } from '../models/photo.js'
import { v2 as cloudinary } from 'cloudinary'

function create(req, res) {
  req.body.owner = req.user.profile
  Photo.create(req.body)
  .then(photo => {
    Photo.findById(photo._id)
    .populate('owner')
    .then(populatedPhoto => {
      res.json(populatedPhoto)
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.msg})
  })
}

function index(req, res) {
  Photo.find({})
  .populate('owner')
  .then(photos => {
    res.json(photos)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Photo.findById(req.params.id)
  .then(photo => {
    cloudinary.uploader.upload(imageFile, {tags: `${photo.photoTitle}`})
    .then(image => {
      console.log(image)
      photo.photo = image.url
      photo.save()
      .then(photo => {
        res.status(201).json(photo.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

function deleteOne(req, res) {
  Photo.findById(req.params.id)
  .then(photo => {
    if (photo.owner._id.equals(req.user.profile)){
      Photo.findByIdAndDelete(photo._id)
      .then(deletedPhoto => {
        res.json(deletedPhoto)
      })
    } else {
      res.status(401).json({err: "Not authorized"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function update(req, res) {
  Photo.findById(req.params.id)
  .then(photo => {
    if (photo.owner._id.equals(req.user.profile)){
      Photo.findByIdAndUpdate(req.params.id, req.body, {new:true})
      .populate('owner')
      .then(updatedPhoto => {
        res.json(updatedPhoto)
      })
    } else {
      res.status(401).json({err: "Not Authorized"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

function show(req, res) {
  Photo.findById(req.params.id)
  .then(photo => {
    res.json(photo)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}

export {
  create,
  index,
  addPhoto,
  deleteOne as delete,
  update,
  show
}