import cloudinary from '../utils/cloudinary.js';
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt'
import getDataURI from '../utils/dataURI.js';
import jwt from 'jsonwebtoken'


const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        console.log(error);
        throw new Error("Failed to generate tokens: ", error.message)
    }
}

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            })
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be of length 8 or more"
            })
        }

        const emailAlreadyExists = await User.findOne({ email })
        if (emailAlreadyExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Failed to register"
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json(
            {
                success: false,
                message: "All fields are required"
            }
        )
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json(
            {
                success: false,
                message: "User does not exists. Signup instead?"
            }
        )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json(
            {
                success: false,
                message: "Invalid credentials. Try again."
            }
        )
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            {
                success: true,
                message: `Welcome ${user.firstName} ${user.lastName} !!`,
                user: loggedInUser,
                refreshToken,
                accessToken
            }
        )

}

export const logout = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("accessToken", options)
        .cookie("refreshToken", options)
        .json(
            {
                success: true,
                message: "Logged out successfully"
            }
        )

}


export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id
        const { firstName, lastName, email, bio } = req.body
        const file = req.file

        const fileURI = getDataURI(file)
        const cloudResponse = await cloudinary.uploader.upload(fileURI)

        const user = await User.findById(userId).select('-password')
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        if (firstName) user.firstName = firstName
        if (lastName) user.lastName = lastName
        if (email) user.email = email
        if (bio) user.bio = bio
        if (file) user.photoUrl = cloudResponse.secure_url

        await user.save()

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user

        })
    } catch (error) {
        console.log(error);
    }

}



export const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized request"
        })
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token"
            })
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is expired or used"
            })
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user?._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json({
                success: true,
                accessToken,
                refreshToken: newRefreshToken,
                message: "Access token refreshed"
            })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error?.message || "Invalid refresh token"
        })
    }


}