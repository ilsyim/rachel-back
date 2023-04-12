import { Router } from 'express'
import * as photosCtrl from '../controllers/photos.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()

/*---------- Public Routes ----------*/
router.get('/', photosCtrl.index)
router.get('/:id', photosCtrl.show)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, photosCtrl.create)
router.delete('/:id', checkAuth, photosCtrl.delete)
router.put('/:id', checkAuth, photosCtrl.update)
router.put('/:id/add-photo', checkAuth, photosCtrl.addPhoto)

export {
  router
}