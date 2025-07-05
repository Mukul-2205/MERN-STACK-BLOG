import mongoose from 'mongoose'

const commentsSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        numberOfLikes: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const Comments = mongoose.model('Comments', commentsSchema)
export default Comments