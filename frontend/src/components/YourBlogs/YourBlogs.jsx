import React, { useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { setBlog } from '@/Store/blogSlice'
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from 'react-router-dom'

function YourBlogs() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { blog } = useSelector(state => state.blog)
  const fetchOwnBlogs = async () => {
    try {
      const res = await axiosInstance.get('/blog/get-own-blogs', { withCredentials: true })
      if (res.data.success) {
        dispatch(setBlog(res.data.blogs))
      }
      else {
        alert("No current blogs")
      }
    } catch (error) {
      console.log(error);
      alert("Error while fetching blogs")
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      const res = await axiosInstance.delete(`/blog/delete-blog/${blogId}`, { withCredentials: true })
      if (res.data.success) {
        const updatedBlogs = blog.filter(blogs => blogs._id !== blogId)
        dispatch(setBlog(updatedBlogs))
        alert("Blog deleted successfully!!")
      }
      else {
        alert("Unable to delete blog!!")
      }
    } catch (error) {
      console.log(error);
      alert("Error occured while deleting blogs!!")
    }
  }
  console.log(blog);

  useEffect(() => {
    fetchOwnBlogs()
  }, [])
  return (
    <>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <Table>
            <TableCaption className='text-white text-sm pb-4'>A list of your blogs.</TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead className="text-white px-6 py-3">Title</TableHead>
                <TableHead className="text-white px-6 py-3">Category</TableHead>
                <TableHead className="text-white px-6 py-3">Date</TableHead>
                <TableHead className="text-white px-6 py-3 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.isArray(blog) && blog.length > 0 ? (
                blog.map((item, index) => (
                  <TableRow key={index} className="hover:bg-white/10 transition duration-200">
                    <TableCell className="px-6 py-4 flex items-center gap-4">
                      <img
                        src={item?.thumbnail}
                        alt="thumbnail"
                        className="w-16 h-16 object-cover rounded-md border border-gray-600"
                      />
                      <p className='text-white font-medium truncate max-w-xs cursor-pointer' onClick={() => navigate(`/blog/${item._id}`)}>
                        {item?.title}
                      </p>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-white capitalize">{item?.category}</TableCell>
                    <TableCell className="px-6 py-4 text-white">
                      {new Date(item?.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <BsThreeDotsVertical className="text-white text-lg cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='text-white bg-zinc-900 border-zinc-700'>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className='cursor-pointer hover:bg-zinc-800' onClick={() => navigate(`/blog/update-blog/${item._id}`)}>Edit Blog</DropdownMenuItem>
                          <DropdownMenuItem className='cursor-pointer hover:bg-zinc-800' onClick={() => deleteBlog(item._id)}>Delete Blog</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-white">
                    No blogs found.
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

export default YourBlogs