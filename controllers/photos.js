import { Photo } from '../models/photo.js'

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



export {
  create
}