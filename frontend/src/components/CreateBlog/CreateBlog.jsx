import { setBlog } from '@/Store/blogSlice';
import axiosInstance from '@/utils/axiosInstance';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const {blog}=useSelector(state=>state.blog)
    const handleSave = async() => {
        try {
            const res=await axiosInstance.post('/blog/create-blog',{title},{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })

            if(res.data.success){
                blog? dispatch(setBlog([...blog, res.data.blog])) : dispatch(setBlog([res.data.blog]))
                navigate(`/blog/update-blog/${res.data.blog._id}`)
                alert("Title created successfully!! Navigating to update blog page")
            }
            else{
                alert("Title creation failed!!")
            }
        } catch (error) {
            console.log(error);
            alert(error)
        }

    };

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Create Blog</h1>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 flex flex-col gap-4">
                    {/* Create Blog Section */}
                    <h2 className="text-2xl font-semibold">Enter title</h2>

                    <p className="text-sm text-gray-300">
                        Enter title, & start creating your blog
                    </p>

                    {/* Input container */}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Your blog title..."
                        className="w-full p-3 rounded-md bg-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                    />

                    {/* Bottom left button */}
                    <div className="mt-6">
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-pink-600 hover:bg-black text-white rounded-md cursor-pointer"
                        >
                            Save and Create Blog
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBlog;
