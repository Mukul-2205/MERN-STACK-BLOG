import express from 'express'
import { register,login, logout, updateProfile } from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { singleUpload } from '../middlewares/multer.middleware.js'

const router=express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(verifyJWT ,logout)
router.route('/updateprofile').put(verifyJWT, singleUpload, updateProfile)
export default router