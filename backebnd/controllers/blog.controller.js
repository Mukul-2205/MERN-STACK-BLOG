import { Blog } from "../models/blog.models.js";
import cloudinary from "../utils/cloudinary.js";
import getDataURI from "../utils/dataURI.js";


export const createBlog = async (req, res) => {
    try {
        const { title } = req.body
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            })
        }

        const blog = await Blog.create({
            title,
            author: req.user._id
        })
        return res.status(201).json({
            success: true,
            blog,
            message: "Blog Created Successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create blog"
        })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId
        const { title, subtitle, description, category } = req.body
        const file = req.file

        let blog = await Blog.findById(blogId).populate('author')
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }

        let thumbnail;
        if(file){
            const fileURI=getDataURI(file)
            thumbnail = await cloudinary.uploader.upload(fileURI)
        }

        const updateData={
            title,
            subtitle,
            description,
            category,
            author: req.user._id,
            thumbnail: thumbnail?.secure_url
        }

        blog=await Blog.findByIdAndUpdate(blogId, updateData,{new: true})

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: " Failed to update Blog"
        })
    }
}

