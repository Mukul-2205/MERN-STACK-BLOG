import React, { useState } from 'react'
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
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import axiosInstance from '@/utils/axiosInstance'
import { setBlog } from '@/Store/blogSlice'
function ViewBlog() {
  const params = useParams()
  const blogId = params.blogId
  const { blog } = useSelector(state => state.blog)
  const { user } = useSelector(state => state.auth)
  const selectedBlog = blog.find((blog) => blog._id === blogId)
  const [liked, setLiked] = useState(selectedBlog?.likes?.includes(user?._id) || false)
  const [blogLikeCount, setBlogLikeCount] = useState(selectedBlog?.likes?.length || 0)
  const dispatch = useDispatch()

  console.log(selectedBlog)
const handleLikeAndDislike = async () => {
    try {
      const action = liked ? 'dislike' : 'like';
      const res = await axiosInstance.put(
        `/blog/${selectedBlog?._id}/${action}`,
        null,
        { withCredentials: true }
      );

      if (res.data.success) {
        // Update state based on the returned blog data
        const updatedBlog = res.data.updatedBlog;
        
        // Ensure likes exists and is an array
        const likesArray = Array.isArray(updatedBlog?.likes) ? updatedBlog.likes : [];
        const userIdStr = user?._id?.toString();

        // Update the local state
        setLiked(likesArray.some(id => id?.toString() === userIdStr));
        setBlogLikeCount(likesArray.length);

        // Update the Redux store
        const updatedBlogData = blog.map(b =>
          b._id === updatedBlog._id ? { 
            ...updatedBlog, 
            likes: likesArray 
          } : b
        );
        dispatch(setBlog(updatedBlogData));

        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error processing your request");
    }
};

  return (
    <>
      <Navbar />

      {/* Add top padding to avoid overlapping with fixed navbar */}
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
                <BreadcrumbLink asChild className='text-white font-semibold'>
                  <Link to="/blogs">Blogs</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='text-white font-semibold' />
              <BreadcrumbItem>
                <BreadcrumbPage className='text-white font-semibold'>{selectedBlog?.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Page content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-white">
          {/* Blog title, author, published date */}
          <h1 className='text-white font-bold text-5xl'>{selectedBlog?.title}</h1>
          <div className='flex items-center justify-between mt-5 gap-4'>
            <div className='flex items-center'>
              <Avatar className="h-8 w-8 cursor-pointer border border-white/30 mr-2">
                <AvatarImage src={selectedBlog?.author?.photoUrl} />
              </Avatar>
              <h3 className='text-white font-semibold ml-2'>
                {selectedBlog?.author?.firstName} {selectedBlog?.author?.lastName}
              </h3>
            </div>
            <p>Published at {new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
          </div>

          {/* Thumbnail */}
          <div className='mt-3'>
            <img
              src={selectedBlog?.thumbnail}
              width={2000}
              height={500}
              className='object-cover w-full'
            />
            <p className='mt-2 text-white font-light'>{selectedBlog?.subtitle}</p>
          </div>

          {/* Description */}
          <p className='text-2xl mt-10 font-semibold' dangerouslySetInnerHTML={{ __html: selectedBlog?.description }} />
        </div>

        {/* Like section  */}
        <div className="max-w-4xl mx-auto mt-10 h-[112px] flex items-center justify-center border-t border-white/10 bg-white/5 backdrop-blur-sm rounded text-white">
          {/* Placeholder for Like button */}
          <button className="px-6 py-2 bg-white/10 border border-white/20 rounded hover:bg-white/20 transition cursor-pointer "
            onClick={handleLikeAndDislike}>
            {
              liked ?
                <FaHeart size={24} className='cursor-pointer text-red-600' /> : <FaRegHeart className='cursor-pointer text-gray-100' size={24} />
            }
          </button>
          <span className='text-white font-semibold' >{blogLikeCount}</span>
        </div>
      </div>
    </>
  )
}

export default ViewBlog
