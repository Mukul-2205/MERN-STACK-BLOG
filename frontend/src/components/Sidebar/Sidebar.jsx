// components/Sidebar/Sidebar.jsx
import { Link } from 'react-router-dom'
import { PenLine, FileText } from 'lucide-react'

export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`fixed lg:static w-64 min-h-full bg-black/20 backdrop-blur-lg border-r border-white/20
        transform transition-all duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="px-4 py-6">
          <h2 className="text-lg font-semibold text-gray-200">Dashboard</h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-2 space-y-1 pb-4">
          <Link
            to="/write-blog"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            onClick={onClose}
          >
            <PenLine className="w-5 h-5 text-gray-300" />
            <span className="text-gray-200">Write Blog</span>
          </Link>

          <Link
            to="/your-blogs"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
            onClick={onClose}
          >
            <FileText className="w-5 h-5 text-gray-300" />
            <span className="text-gray-200">Your Blogs</span>
          </Link>
        </nav>
      </div>
    </aside>
  )
}