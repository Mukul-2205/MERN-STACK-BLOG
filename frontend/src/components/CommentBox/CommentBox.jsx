import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LuSend } from "react-icons/lu";
import axiosInstance from '@/utils/axiosInstance';
import { setComments } from '../../Store/commentsSlice.js';
import { setBlog } from '@/Store/blogSlice';
import { BsThreeDotsVertical } from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaHeart, FaRegHeart } from 'react-icons/fa';
function CommentBox({ selectedBlog }) {
    const { user } = useSelector(state => state.auth);
    const { blog } = useSelector(state => state.blog);
    const { comments } = useSelector(state => state.comments);
    const [content, setContent] = useState("")
    const [commentGettingEditedId, setCommentGettingEditedId] = useState(null)
    const [editedContent, setEditedContent] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        const getAllCommentsOnThisBlog = async () => {
            try {
                const res = await axiosInstance.get(`/comment/${selectedBlog._id}/comments/all`);
                const data = res.data.comments;
                dispatch(setComments(data));
            } catch (error) {
                console.log(error);
            }
        };
        getAllCommentsOnThisBlog();
    }, []);

    const handleSetContent = (e) => {
        const inputText = e.target.value
        if (inputText.trim()) {
            setContent(inputText)
        }
        else {
            setContent('')
        }
    }

    const handleCreateComment = async () => {
        try {
            const res = await axiosInstance.post(`/comment/${selectedBlog._id}/create`, { content }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            if (res.data.success) {
                let updatedCommentData
                console.log(comments);

                if (comments.length >= 1) {
                    updatedCommentData = [...comments, res.data.comment]
                } else {
                    updatedCommentData = [res.data.comment]
                }

                dispatch(setComments(updatedCommentData))

                const updatedBlogData = blog.map(p =>
                    p._id === selectedBlog._id ? { ...p, comments: updatedCommentData } : p
                )

                dispatch(setBlog(updatedBlogData))
                alert("Comment Posted")
                setContent("")
                console.log(selectedBlog, comments);

            }

        } catch (error) {
            console.log(error);
            alert("Server error while creating the comment!")
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            const res = await axiosInstance.delete(`/comment/${commentId}/delete`, null, { withCredentials: true })
            if (res.data.success) {
                const updatedCommentData = comments.filter(comment => comment._id !== commentId)
                dispatch(setComments(updatedCommentData))

                const updatedBlog = blog.map(b =>
                    b._id === selectedBlog._id ? { ...b, comments: updatedCommentData } : b
                );
                dispatch(setBlog(updatedBlog));
                alert('Comment deleted successfully!')
                console.log(blog, comments);

            }
        } catch (error) {
            console.log(error);
            alert("Server error while deleting comment")
        }
    }

    const handleSaveEditedComment = async (commentId) => {
        try {
            const res = await axiosInstance.put(`/comment/${commentId}/edit`, { content: editedContent }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            if (res.data.success) {
                const updatedCommentData = comments.map((item) =>
                    item._id === commentId ? { ...item, content: editedContent } : item
                )
                dispatch(setComments(updatedCommentData))
                setCommentGettingEditedId(null)
                setEditedContent('')
                alert("Comment edited successfully!")
            }
        } catch (error) {
            console.log(error);
            alert("Server error while editing the comment")
        }
    }

    const handleLikeAndDislike = async (commentId) => {
        try {
            const res = await axiosInstance.patch(`/comment/${commentId}/like-dislike`, null, {
                withCredentials: true
            })

            if (res.data.success) {
                const updatedComment = res.data.updatedComment

                const updatedCommentList = comments.map(item =>
                    item._id === commentId ? updatedComment : item
                )
                dispatch(setComments(updatedCommentList))

                const updatedBlog = blog.map(b =>
                    b._id === selectedBlog._id ? { ...b, comments: updatedCommentList } : b
                );
                dispatch(setBlog(updatedBlog));

                alert(res.data.message)
            }
        } catch (error) {
            console.log(error);
            alert("Server error while performing the action")
        }
    }
    return (
        <div className="mt-10 p-6 border border-white/10 rounded-xl shadow-md bg-white/5 backdrop-blur-sm w-full max-w-4xl mx-auto text-white">
            {/* Comment input */}
            <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-10 w-10 border border-white/20">
                    <AvatarImage src={user.photoUrl} />
                    <AvatarFallback>
                        {user.firstName?.[0] || 'U'}
                        {user.lastName?.[0] || ''}
                    </AvatarFallback>
                </Avatar>
                <h2 className="font-semibold text-white">
                    {user.firstName} {user.lastName}
                </h2>
            </div>

            <div className="flex items-end gap-3 mb-6">
                <textarea
                    className="flex-grow p-3 border border-white/10 bg-transparent rounded-lg resize-none text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                    rows={4}
                    placeholder="Write your comment..."
                    name='content'
                    value={content}
                    onChange={handleSetContent}
                ></textarea>
                <button
                    className="p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition cursor-pointer"
                    onClick={handleCreateComment}>
                    <LuSend size={20} className="text-white" />
                </button>
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
                {comments && comments.length > 0 ? (
                    comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="flex items-start gap-3 border border-white/10 bg-white/10 backdrop-blur-sm rounded-lg p-4"
                        >
                            <Avatar className="h-8 w-8 border border-white/20">
                                <AvatarImage src={comment.userId?.photoUrl} />
                                <AvatarFallback>
                                    {comment.userId?.firstName?.[0] || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                {commentGettingEditedId === comment?._id && user?._id === comment?.userId?._id ? (
                                    <>
                                        <textarea
                                            className="w-full mt-2 p-2 rounded-md bg-white/10 border border-white/20 text-white resize-none"
                                            rows={3}
                                            value={editedContent}
                                            onChange={(e) => setEditedContent(e.target.value)}
                                            placeholder="Edit your comment..."
                                        />
                                        <div className="mt-2 flex gap-3">
                                            <button
                                                onClick={() => handleSaveEditedComment(comment._id)}
                                                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setCommentGettingEditedId(null);
                                                    setEditedContent("");
                                                }}
                                                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (

                                    <>
                                        <p className="text-white/80 text-sm mt-1">{comment.content}</p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <button
                                                onClick={() => handleLikeAndDislike(comment._id)}
                                                className={`text-sm px-3 py-1 rounded-full border text-white transition ${comment.likes?.includes(user._id)
                                                    ? 'bg-blue-600 border-blue-700 hover:bg-blue-700'
                                                    : 'bg-white/10 border-white/20 hover:bg-white/20'
                                                    }`}
                                            >
                                                {comment.likes?.includes(user._id) ?
                                                    <FaHeart size={24} className='cursor-pointer text-red-600' /> :
                                                    <FaRegHeart className='cursor-pointer text-gray-100' size={24} />
                                                }
                                            </button>
                                            <span className="text-white/60 text-xs">{comment.likes?.length || 0} {comment.likes?.length === 1 ? 'like' : 'likes'}</span>
                                        </div>

                                    </>

                                )}
                            </div>
                            {
                                user?._id?.toString() === comment?.userId?._id?.toString() ?
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <BsThreeDotsVertical className="text-white text-lg cursor-pointer" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className='text-white bg-zinc-900 border-zinc-700'>
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className='cursor-pointer hover:bg-zinc-800'
                                                onClick={() => {
                                                    setCommentGettingEditedId(comment?._id)
                                                    setEditedContent(comment.content)
                                                }}
                                            >Edit Comment
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className='cursor-pointer hover:bg-zinc-800'
                                                onClick={() => handleDeleteComment(comment._id)}
                                            >Delete Comment
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu> : null
                            }
                        </div>
                    ))
                ) : (
                    <p className="text-white/60 italic text-center">No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
}

export default CommentBox;