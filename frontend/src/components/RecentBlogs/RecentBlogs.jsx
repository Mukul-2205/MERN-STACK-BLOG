import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '@/utils/axiosInstance';
import BlogCard from '@/components/BlogCard/BlogCard';

function RecentBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get('/blog/get-published-blogs');
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const topThree = blogs.slice(0, 3);
  const rest = blogs.slice(3);

  return (
    <section className="px-8 py-12 relative">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Recent Blogs</h2>

      <div className="relative">
        {/* Top 3 blogs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topThree.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        {/* Fading section with button */}
        {rest.length > 0 && (
          <div className="relative mt-6">
            <div className="relative h-24 overflow-hidden -mb-4"> {/* Negative margin to pull up button */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rest.slice(0, 3).map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
            </div>
            
            {/* Button perfectly aligned with fade edge */}
            <div className="relative z-20 flex justify-center -mt-8"> {/* Pull button up into fade */}
              <button
                onClick={() => navigate('/get-published-blogs')}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors shadow-lg transform translate-y-1/2 cursor-pointer"
              >
                Read More Blogs
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentBlogs;