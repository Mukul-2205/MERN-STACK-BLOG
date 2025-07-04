import { Blog } from '../models/blog.models.js'
import Comments from '../models/comments.models'

export const createComment = async (req, res) => {
    try {
        const postId = req.params.id
        const userId = req.user._id
        const { content } = req.body
        const blog = await Blog.findById(postId)
        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "No Blog Found"
            })
        }

        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Text is required"
            })
        }

        const comment = await Comments.create({
            content,
            userId,
            postId
        })

        await comment.populate({
            path: 'userId',
            select: 'firstName lastName photoUrl'
        })

        blog.comments.push(userId)
        await blog.save()
        return res.status(200).json({
            message: 'Comment added',
            success: true,
            comment
        })
    } catch (error) {
        console.log(error);

    }
}

export const getAllCommentsOfAPost = async (req, res) => {
    try {
        const blogId = req.params.id
        const comments = await Comments.find({ postId: blogId }).populate({
            path: 'userId',
            select: 'firstName lastName photoUrl'
        }).sort({ crwatedAt: -1 })

        if (!comments) {
            return res.status(400).json({
                success: false,
                message: "No comments found for this blog"
            })
        }

        return res.status(200).json({
            success: true,
            comments
        })
    } catch (error) {
        console.log(error);

    }
}

export const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id
        const userId = req.user._id
        const comment = await Comments.findById(commentId)

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            })
        }

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to delete this comment"
            })
        }

        const blogId = comment.postId
        await Comments.findByIdAndDelete(commentId)
        await Blog.findByIdAndDelete(blogId, {
            $pull: { comments: commentId }
        })

        return res.status(200).json({
            success: true,
            message: 'Blog deleted successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error while deleting',
            success: false,
        })
    }
}

export const editComment = async (req, res) => {
    try {
        const userId = req.user._id
        const { content } = req.body
        const commentId = req.params.id

        const comment = await Comments.findById(commentId)
        if (!comment) {
            return res.status(400).json({
                success: false,
                message: "Comment not found"
            })
        }

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to edit this comment"
            })
        }

        comment.content = content
        comment.createdAt = new Date()

        await comment.save()

        return res.status(200).json({
            message: 'Comment edited',
            success: true,
            comment
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error while editing the comment',
            success: false

        })
    }
}

export const likeOrDislikeComment = async (req, res) => {
    try {
        const userId = req.user._id
        const commentId = req.params.id
        const comment = await Comments.findById(commentId)
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            })
        }

        const alreadyLiked = comment.likes.includes(userId)

        if (alreadyLiked) {
            comment.likes = comment.likes.filter(id => id !== userId)
            comment.numberOfLikes -= 1
        } else {
            comment.likes.push(userId)
            comment.numberOfLikes += 1
        }

        await comment.save()
        return res.status(200).json({
            message: alreadyLiked ? 'Comment Disliked' : 'Comment Liked',
            success: true,
            updatedComment: comment
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error while liking/ disliking the comment',
            success: false

        })
    }
}

export const getAllCommentsOnMyBlogs = async (req, res) => {
    try {
        const userId = req.user._id

        const myBlogs = await Blog.find({ author: userId }).select('_id')
        const blogIds = myBlogs.map(blog => blog._id)

        if (blogIds.length === 0) {
            return res.status(200).json({
                success: true,
                totalComments: 0,
                comments: [],
                message: "No blogs found for this user.",
            });
        }

        const comments = await Comments.find({ postId: { $in: blogIds } }).populate({
            path: 'userId',
            select: 'firstName lastName email'
        }).populate(
            'postId',
            'title'
        )

        return res.status(200).json({
            success: true,
            totalComments: comments.length,
            comments,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Server error while fetching the comments',
            success: false

        })
    }
}