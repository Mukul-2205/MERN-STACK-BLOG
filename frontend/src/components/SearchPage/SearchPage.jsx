import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import BlogCard from '../BlogCard/BlogCard';
import axiosInstance from '@/utils/axiosInstance';
import { setBlog } from '@/Store/blogSlice';

function SearchPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('query') || '';
    const dispatch = useDispatch()
    const { blog } = useSelector(state => state.blog); // fallback to []

    const searchThroughAllBlogs = async () => {
        try {
            const res = await axiosInstance.get('/blog/get-published-blogs')
            if (res.data.success) {
                dispatch(setBlog(res.data.blogs))
            }
        } catch (error) {
            console.log(error);

        }
    }
    const filteredBlogs = blog.filter((b) =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        b.category.toLowerCase().includes(query.toLowerCase())
    );



    useEffect(() => {
        searchThroughAllBlogs()
        window.scrollTo(0, 0);
    }, [dispatch]);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-white/10 dark:bg-black/20 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-white drop-shadow-md tracking-wide">
                    Search Results for <span className="text-pink-500">"{query}"</span>
                </h2>

                {filteredBlogs.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredBlogs.map((b) => (
                            <BlogCard key={b._id} blog={b} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-20 flex flex-col items-center text-center text-gray-300">
                        <p className="text-lg">No matching blogs found.</p>
                        <p className="text-sm text-gray-400 mt-2">Try searching something else.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
