// components/Sidebar/MobileMenuButton.jsx
import { Menu, X } from 'lucide-react'

export default function MobileMenuButton({ isOpen, onClick }) {
  return (
    <button
      className="lg:hidden fixed top-16 left-4 z-50 p-2 rounded-md bg-black/30 backdrop-blur-md border border-white/10"
      onClick={onClick}
    >
      {isOpen ? (
        <X className="w-6 h-6 text-white" />
      ) : (
        <Menu className="w-6 h-6 text-white" />
      )}
    </button>
  )
}