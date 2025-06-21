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
        if (file) {
            const fileURI = getDataURI(file)
            thumbnail = await cloudinary.uploader.upload(fileURI)
        }

        const updateData = {
            title,
            subtitle,
            description,
            category,
            author: req.user._id,
            thumbnail: thumbnail?.secure_url
        }

        blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true })

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

export const getOwnBlogs = async (req, res) => {
    try {
        const userId = req.user._id
        if (!userId) {
            return res.status(500).json({
                success: false,
                message: 'No user found / Invalid user => getOwnBlogs'
            })
        }
        const blogs = await Blog.find({ author: userId }).populate({
            path: 'author',
            select: 'firstName lastName photoUrl'
        })

        if (!blogs) {
            return res.status(404).json({
                success: false,
                message: 'No blogs found => getOwnBlogs',
                blogs: []
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Blogs fetched successfully!!',
            blogs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error occured, unable to fetch blogs => getOwnBlogs',
            blogs: []
        })
    }

}

export const deleteBlog = async (req, res) => {
    const blogId = req.params.blogId
    const authorId = req.user._id
    const blog = await Blog.findById(blogId)
    if (!blog) {
        return res.status(404).json({
            success: false,
            message: "Blog Not found"
        })
    }

    if (blog.author._id.toString() !== authorId.toString()) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised to delete the blog"
        })
    }

    await Blog.findByIdAndDelete(blogId)
    return res.status(200).json({
        success: true,
        message: "Blog deleted successfully!!"
    })
}