import React from 'react'
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
import { useSelector } from 'react-redux'
import  {Avatar, AvatarImage} from '@/components/ui/avatar'
function ViewBlog() {
  const params = useParams()
  const blogId = params.blogId
  const { blog } = useSelector(state => state.blog)

  const selectedBlog = blog.find((blog) => blog._id === blogId)

  console.log(selectedBlog);

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
          {/* Blog content goes here */}

          {/* Blog title, author, published date */}
          <h1 className='text-white font-bold text-5xl'>{selectedBlog?.title}</h1>
          <div className='flex items-center justify-between mt-5  gap-4'>
            <div className='flex items-center'>
              <Avatar className="h-8 w-8 cursor-pointer border border-white/30 mr-2">
                <AvatarImage src={selectedBlog?.author?.photoUrl}/>
              </Avatar>
              <h3 className='text-white font-semibold ml-2'>{selectedBlog?.author?.firstName} {selectedBlog?.author?.lastName} </h3>
            </div>
            <p>Published at {new Date(selectedBlog.createdAt).toLocaleDateString()}</p>

          </div>

          {/* Thumbnail */}
          <div className='mt-3 '>
            <img 
              src={selectedBlog?.thumbnail} 
              width={2000}
              height={500} 
              className='object-cover w-full'/>
              <p className='mt-2 text-white font-light'>{selectedBlog?.subtitle} </p>
          </div>

          {/* Description */}
          <p className='text-2xl mt-10 font-semibold' dangerouslySetInnerHTML={{__html: selectedBlog?.description}}/>
        </div>
      </div>
    </>
  )
}

export default ViewBlog
