import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true
        },
        lastName:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        bio:{
            type: String,
            default: ""
        },
        photoUrl:{
            type: String,
            default: ""
        },
        refreshToken:{
            type: String,
            default:""
        }
    }
)

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            firstName:this.firstName,
            lastName:this.lastName,
            email:this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}


export const User = mongoose.model("User",userSchema);