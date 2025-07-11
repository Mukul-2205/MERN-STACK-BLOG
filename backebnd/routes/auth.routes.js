import express from 'express'
import { refreshAccessToken } from '../controllers/user.controller.js'

const router=express.Router()

router.post('/refresh-token', refreshAccessToken)

export default router