import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function BlogCard({ blog }) {
  const navigate = useNavigate();
  const {user}=useSelector(state=>state.auth)
  const {
    _id,
    thumbnail,
    title,
    author,
    category,
    subtitle,
    createdAt
  } = blog;
  const handleReadMore = () => {
    if(!user){
      alert("Please Login / Signup first to read the blogs")
    }
    else navigate(`/blog/${_id}`)
  };

  

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl overflow-hidden max-w-md mx-auto p-4 transition hover:scale-[1.02] duration-300">
      
      {/* Thumbnail */}
      <img 
        src={thumbnail} 
        alt="Blog Thumbnail" 
        className="w-full h-48 object-cover rounded-xl mb-4"
      />

      {/* Title */}
      <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">{title}</h2>

      {/* Meta Info */}
      <div className="text-sm text-gray-300 flex flex-wrap gap-x-3 gap-y-1 mb-3">
        <span>👤 {author.firstName}  {author.lastName}</span>
        <span>📅 {new Date(createdAt).toLocaleDateString()}</span>
        <span>🏷️ {category}</span>
      </div>

      {/* Subtitle */}
      <p className="text-gray-200 text-sm mb-4 line-clamp-3">{subtitle}</p>

      {/* Read More Button */}
      <button 
        onClick={handleReadMore}
        className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition cursor-pointer"
      >
        Read More
      </button>
    </div>
  );
}
