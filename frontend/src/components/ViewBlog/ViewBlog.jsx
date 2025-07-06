import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Navbar from '../Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { FaHeart, FaRegHeart } from "react-icons/fa"
import axiosInstance from '@/utils/axiosInstance'
import { setBlog } from '@/Store/blogSlice'
import CommentBox from '../CommentBox/CommentBox'

function ViewBlog() {
  const { blog } = useSelector(state => state.blog)
  const { user } = useSelector(state => state.auth)
  const { comments } = useSelector(state => state.comments)
  const dispatch = useDispatch()
  const { blogId } = useParams()

  const selectedBlog = Array.isArray(blog)
    ? blog.find(b => b?._id?.toString() === blogId?.toString())
    : null;

  const [fetchedBlog, setFetchedBlog] = useState(null)
  const blogToRender = selectedBlog || fetchedBlog

  const [liked, setLiked] = useState(false)
  const [blogLikeCount, setBlogLikeCount] = useState(0)

  useEffect(() => {
    if (!selectedBlog) {
      axiosInstance.get(`/blog/${blogId}`)
        .then(res => {
          if (res.data?.success) {
            setFetchedBlog(res.data.blog)
            setLiked(res.data.blog?.likes?.includes(user?._id) || false)
            setBlogLikeCount(res.data.blog?.likes?.length || 0)
          }
        })
        .catch(err => {
          console.error("Error fetching blog by ID:", err)
        })
    } else {
      setLiked(selectedBlog?.likes?.includes(user?._id) || false)
      setBlogLikeCount(selectedBlog?.likes?.length || 0)
    }
  }, [selectedBlog, blogId, user])

  const handleLikeAndDislike = async () => {
    try {
      const action = liked ? 'dislike' : 'like'
      const res = await axiosInstance.put(
        `/blog/${blogToRender?._id}/${action}`,
        null,
        { withCredentials: true }
      )

      if (res.data.success) {
        const updatedBlog = res.data.updatedBlog
        const likesArray = Array.isArray(updatedBlog?.likes) ? updatedBlog.likes : []
        const userIdStr = user?._id?.toString()

        setLiked(likesArray.includes(userIdStr))
        setBlogLikeCount(likesArray.length)

        const updatedBlogList = blog.map(b =>
          b._id === updatedBlog._id ? { ...updatedBlog } : b
        )
        dispatch(setBlog(updatedBlogList))
      }
    } catch (error) {
      console.log(error)
      alert(error.response?.data?.message || "Something went wrong")
    }
  }

  const numberOfComments = Array.isArray(comments)
    ? comments.filter(item => item.postId?.toString() === blogToRender?._id?.toString())
    : []

  if (!blogToRender) {
    return (
      <>
        <Navbar />
        <div className='text-white text-center pt-20 text-xl'>Loading blog...</div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-6 py-3 bg-white/5 border-b border-white/10 backdrop-blur-sm rounded">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild className='text-white font-semibold'>
                  <Link to="/home">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='text-white font-semibold' />
              <BreadcrumbItem>
                <BreadcrumbLink asChild className='text-white font-semibold hover:text-white'>
                  <Link to="/get-published-blogs">Blogs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='text-white font-semibold' />
              <BreadcrumbItem>
                <BreadcrumbPage className='text-white font-semibold'>{blogToRender?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-4xl mx-auto text-white">
          <h1 className='text-white font-bold text-5xl'>{blogToRender?.title}</h1>
          <div className='flex items-center justify-between mt-5 gap-4'>
            <div className='flex items-center'>
              <Avatar className="h-8 w-8 cursor-pointer border border-white/30 mr-2">
                <AvatarImage src={blogToRender?.author?.photoUrl} />
              </Avatar>
              <h3 className='text-white font-semibold ml-2'>
                {blogToRender?.author?.firstName} {blogToRender?.author?.lastName}
              </h3>
            </div>
            <p>
              Published at{" "}
              {blogToRender?.createdAt
                ? new Date(blogToRender.createdAt).toLocaleDateString()
                : "Unknown date"}
            </p>
          </div>

          <div className='mt-3'>
            <img
              src={blogToRender?.thumbnail}
              width={2000}
              height={500}
              className='object-cover w-full'
              alt="Blog Thumbnail"
            />
            <p className='mt-2 text-white font-light'>{blogToRender?.subtitle}</p>
          </div>

          <p className='text-2xl mt-10 font-semibold' dangerouslySetInnerHTML={{ __html: blogToRender?.description }} />
        </div>

        <div className="max-w-4xl mx-auto mt-10 h-[112px] flex items-center justify-between px-6 border-t border-white/10 bg-white/5 backdrop-blur-sm rounded text-white">
          <div className="flex items-center gap-3">
            <button
              className="px-6 py-2 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition cursor-pointer"
              onClick={handleLikeAndDislike}
            >
              {liked ? (
                <FaHeart size={24} className="cursor-pointer text-red-600" />
              ) : (
                <FaRegHeart className="cursor-pointer text-gray-100" size={24} />
              )}
            </button>
            <span className="text-white font-semibold">{blogLikeCount} {blogLikeCount === 1 ? 'Like' : 'Likes'}</span>
          </div>

          <div className="text-white font-semibold">
            {numberOfComments?.length || 0} {numberOfComments?.length <= 1 ? 'Comment' : 'Comments'}
          </div>
        </div>

        <CommentBox selectedBlog={blogToRender} />
      </div>
    </>
  )
}

export default ViewBlog
