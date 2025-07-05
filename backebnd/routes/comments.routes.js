import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { createComment, deleteComment, editComment, getAllCommentsOfAPost, getAllCommentsOnMyBlogs, likeOrDislikeComment } from '../controllers/comments.controller.js'

const router=express.Router()
router.post('/:id/create',verifyJWT, createComment)
router.delete('/:id/delete',verifyJWT,deleteComment)
router.put('/:id/edit',verifyJWT, editComment)
router.route('/:id/comments/all').get(getAllCommentsOfAPost)
router.patch('/:id/like-dislike',verifyJWT, likeOrDislikeComment)
router.get('/my-blogs/comments',verifyJWT, getAllCommentsOnMyBlogs)

export default router