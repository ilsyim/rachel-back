import { Router } from 'express'
import * as photosCtrl from '../controllers/photos.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
const router = Router()

/*---------- Public Routes ----------*/
router.get('/', photosCtrl.index)

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.post('/', checkAuth, photosCtrl.create)
router.delete('/:id', checkAuth, photosCtrl.delete)

export {
  router
}