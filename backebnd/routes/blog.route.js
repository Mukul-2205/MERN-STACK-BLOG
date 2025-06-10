import express from 'express'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { createBlog, updateBlog } from '../controllers/blog.controller.js'
import { singleUpload } from '../middlewares/multer.middleware.js'
const router=express.Router()

router.route('/create-blog').post(verifyJWT, createBlog)
router.route('/:blogId').put(verifyJWT, singleUpload, updateBlog)

export default router