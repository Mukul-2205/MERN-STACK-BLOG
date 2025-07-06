import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from '@/components/BlogCard/BlogCard'; // Adjust if needed
import Navbar from '../Navbar/Navbar';
import axiosInstance from '@/utils/axiosInstance';
import { setBlog } from '@/Store/blogSlice';

function AllBlogs() {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { blog } = useSelector(state => state.blog);

  useEffect(() => {
    const getAllPublishedBlogs = async () => {
      try {
        const res = await axiosInstance.get('/blog/get-published-blogs', {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setBlog(res.data.blogs));
        } else {
          alert("Unable to fetch published blogs");
        }
      } catch (error) {
        console.log(error);
        alert("Error while fetching blogs!");
      }
    };

    getAllPublishedBlogs();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-10 py-8 mt-20">
        {!user ? (
          <div className="text-center text-xl font-semibold mt-20 text-gray-300">
            Please login first to read blogs.
          </div>
        ) : (
          <>
            {Array.isArray(blog) && blog.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blog.map((item) => (
                  <BlogCard key={item._id} blog={item} />
                ))}
              </div>
            ) : blog === null || blog === undefined ? (
              <div className="text-center text-lg font-medium text-gray-400 mt-10">
                Loading blogs...
              </div>
            ) : (
              <div className="text-center text-lg font-medium text-gray-400 mt-10">
                No published blogs found.
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default AllBlogs;
