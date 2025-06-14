import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const verifyJWT=async(req,res,next)=>{

    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            return res.status(400).json(
                {
                    status: 401,
                    success: false,
                    message: "Unauthorized request"
                }
            )
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
        if(!user){
            return res.status(401).json(
                {
                    success: false,
                    message: "Invalid access token"
                }
            )
        }
        req.user=user;
        next()
    } catch (error) {
        console.log("error in auth middleware");
        
        return res.status(400).json(
            {
                success: false,
                message: error?.message
            }
        )
    }
}