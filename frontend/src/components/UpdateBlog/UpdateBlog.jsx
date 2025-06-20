import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '@/utils/axiosInstance';
function UpdateBlog() {
    const editor = useRef(null)
    const navigate=useNavigate()
    const params=useParams()
    const id=params.blogId
    const {blog}=useSelector(state=>state.blog)
    const selectedBlog=blog.find(blog=>blog._id===id)
    const [descriptionContent, setDescriptionContent]=useState(selectedBlog.description)
    const [blogData, setBlogData]=useState({
        title: selectedBlog?.title,
        subtitle: selectedBlog?.subtitle,
        description: descriptionContent,
        category: selectedBlog?.category
    })
    console.log(params);
    const [previewThumbnail, setPreviewThumbnail]=useState(selectedBlog?.thumbnail)

    const handleChange=(e)=>{
        const {name,value}=e.target
        setBlogData((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSelectCategory=(value)=>{
        setBlogData({...blogData, category: value})
    }

    const handleThumbnail=(e)=>{
        const file=e.target.files?.[0]
        if(file){
            setBlogData({...blogData, thumbnail: file})
            const fileReader=new FileReader()
            fileReader.onloadend=()=>setPreviewThumbnail(fileReader.result)
            fileReader.readAsDataURL(file)
        }
    }

    const handleSaveAndUpdateBlog=async ()=>{
        const formData=new FormData()
        formData.append('title',blogData.title)
        formData.append('subtitle', blogData.subtitle)
        formData.append('description', descriptionContent)
        formData.append('category',blogData.category)
        formData.append('file', blogData.thumbnail)

        try {
            const res=await axiosInstance.put(`/blog/update-blog/${id}`,formData,{
                headers: {
                    "Content-Type":"multipart/form-data"
                },
                withCredentials: true
            })

            if(res.data.success){
                alert('Blog saved and updated successfully!!')
            }
        } catch (error) {
            console.log(error);
            alert('Failed to save and update blog!!')
        }
    }
    const handlePublish = () => {
        console.log("Published");
        // Add publish logic
    };

    const handleUnpublish = () => {
        console.log("Unpublished");
        // Add unpublish logic
    };

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Edit and Update the Blog</h1>

                {/* Publish/Unpublish buttons */}
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={handlePublish}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md cursor-pointer"
                    >
                        Publish
                    </button>
                    <button
                        onClick={handleUnpublish}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer"
                    >
                        Unpublish
                    </button>
                </div>

                {/* Blog edit section */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 flex flex-col gap-4">
                    {/* Title */}
                    <h2 className="text-2xl font-semibold">Title</h2>
                    <input
                        type="text"
                        placeholder="Your blog title..."
                        name='title'
                        value={blogData?.title}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                    />

                    {/* Subtitle */}
                    <h2 className="text-2xl font-semibold mt-4">Subtitle</h2>
                    <input
                        type="text"
                        name='subtitle'
                        placeholder="Your blog subtitle..."
                        value={blogData?.subtitle}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    {/*Description */}
                    <h2 className="text-2xl font-semibold mt-4">Description</h2>
                    <JoditEditor
                        ref={editor}
                        value={blogData?.description}
                        onChange={(newContent)=>setDescriptionContent(newContent)}
                        className='jodit_toolbar text-black'
                    />

                    {/* Category */}
                    <h2 className="text-2xl font-semibold mt-4">Category</h2>
                    <Select onValueChange={handleSelectCategory} name="category">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="Healthcare">Healthcare</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                                <SelectItem value="Technology">Technology</SelectItem>
                                <SelectItem value="Security">Security</SelectItem>
                                <SelectItem value="Education">Education</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>


                    {/* Thumbnail */}
                    <h2 className="text-2xl font-semibold mt-4">Thumbnail</h2>
                    <input
                        type="file"
                        id='file'
                        name='thumbnail'
                        accept='image/*'
                        onChange={handleThumbnail}
                        className="w-full p-3 rounded-md bg-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white"

                    />

                    {
                        previewThumbnail && (
                            <img 
                                src={previewThumbnail} 
                                className='w-70 h-55 m-1'
                            />
                        )
                    }
                    {/* Save button */}
                    <div className="mt-6">
                        <button
                            className="px-6 py-2 bg-black hover:bg-black text-white rounded-md cursor-pointer mr-2"
                            onClick={()=>navigate(-1)}
                        >
                           Back
                        </button>
                        <button
                            onClick={handleSaveAndUpdateBlog}
                            className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md cursor-pointer"
                        >
                            Save Blog
                        </button>

                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateBlog;
