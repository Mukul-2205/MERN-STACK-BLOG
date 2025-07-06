import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axiosInstance from '@/utils/axiosInstance'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Comments() {
    const [allComments, setAllComments] = useState([])
    const navigate=useNavigate()
    const getAllComments = async () => {
        try {
            const res = await axiosInstance.get(`/comment/my-blogs/comments`, { withCredentials: true })
            if (res.data.success) {
                setAllComments(res.data.comments)
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        getAllComments()
    }, [])
    return (
        <>
            <div className="p-8">
                <div className="max-w-4xl mx-auto">
                    <Table>
                        <TableCaption className='text-white text-sm pb-4'>A list of comments on your blogs.</TableCaption>

                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-white px-6 py-3">Title</TableHead>
                                <TableHead className="text-white px-6 py-3">Comment</TableHead>
                                <TableHead className="text-white px-6 py-3">Author</TableHead>
                                <TableHead className="text-white px-6 py-3 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {allComments && allComments.length > 0 ? (
                                allComments.map((comment, index) => (
                                    <TableRow key={index} className="hover:bg-white/10 transition duration-200">
                                        <TableCell className="px-6 py-4 flex items-center gap-4">
                                            <p className='text-white font-medium truncate max-w-xs cursor-pointer' onClick={() => navigate(`/blog/${item._id}`)}>
                                                {comment?.postId?.title}
                                            </p>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-white capitalize">{comment?.content}</TableCell>
                                        <TableCell className="px-6 py-4 text-white">
                                            {comment?.userId?.firstName} {comment?.userId?.lastName}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-right">

                                            <button className='cursor-pointer hover:bg-zinc-800'
                                                onClick={() => navigate(`/blog/${comment.postId._id}`)}>
                                                <Eye />
                                            </button>

                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-white">
                                        No cooments found on your blogs.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                </div>
            </div>
        </>
    )
}

export default Comments