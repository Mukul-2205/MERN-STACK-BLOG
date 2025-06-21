import express from 'express'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { createBlog, deleteBlog, getOwnBlogs, updateBlog } from '../controllers/blog.controller.js'
import { singleUpload } from '../middlewares/multer.middleware.js'
const router=express.Router()

router.route('/create-blog').post(verifyJWT, createBlog)
router.route('/update-blog/:blogId').put(verifyJWT, singleUpload, updateBlog)
router.route('/get-own-blogs').get(verifyJWT, getOwnBlogs)
router.route('/delete-blog/:blogId').delete(verifyJWT,deleteBlog)
export default router