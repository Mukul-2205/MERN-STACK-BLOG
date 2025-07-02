import React from 'react';
import { useSelector } from 'react-redux';
import BlogCard from '@/components/BlogCard/BlogCard'; // adjust path if needed
import Navbar from '../Navbar/Navbar';

function AllBlogs() {
  const { user } = useSelector(state => state.auth);

  const blogs = [
    {
      id: '1',
      thumbnail: 'https://via.placeholder.com/600x300',
      title: 'Exploring React Hooks',
      author: 'Jane Doe',
      date: '2025-07-01',
      category: 'React',
      subtitle: 'A dive into useState, useEffect, and custom hooks.',
    },
    {
      id: '2',
      thumbnail: 'https://via.placeholder.com/600x300',
      title: 'Getting Started with Tailwind CSS',
      author: 'John Smith',
      date: '2025-06-20',
      category: 'CSS',
      subtitle: 'Simplify styling using utility-first CSS framework.',
    },
    {
      id: '3',
      thumbnail: 'https://via.placeholder.com/600x300',
      title: 'Understanding Redux Toolkit',
      author: 'Alice Johnson',
      date: '2025-06-15',
      category: 'Redux',
      subtitle: 'How to manage app state efficiently using Redux Toolkit.',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-10 py-8 mt-20">
        {!user ? (
          <div className="text-center text-xl font-semibold mt-20 text-gray-300">
            Please login first to read blogs.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AllBlogs;
