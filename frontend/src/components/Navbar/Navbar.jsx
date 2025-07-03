import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User as UserIcon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { logout as authSliceLogout } from '../../Store/authSlice';
import axios from 'axios';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axiosInstance from '@/utils/axiosInstance';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const res = await axiosInstance.post('/user/logout')
            if (res.data.success) {
                navigate('/home')
                dispatch(authSliceLogout())
                alert("Logged out successfully!")
            }
        } catch (error) {
            console.log(error);

            alert(error)
        }
        setIsMenuOpen(false);
    };

    // Default avatar handling
    const getAvatarContent = () => {
        if (user?.photoUrl) {
            return <AvatarImage src={user.photoUrl} alt={`${user.firstName} ${user.lastName}`} />;
        }
        return (
            <AvatarFallback className="bg-gray-200 text-gray-700">
                <UserIcon className="h-4 w-4" />
            </AvatarFallback>
        );
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/30 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link to="/" className="text-white font-bold font-serif text-xl tracking-wide">
                        BlogSite
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex space-x-6 items-center">
                        <Link to="/home" className="text-white hover:text-pink-400 transition font-medium cursor-pointer">Home</Link>
                        <Link to="/get-published-blogs" className="text-white hover:text-pink-400 transition font-medium cursor-pointer">Blogs</Link>
                        <Link to="/about" className="text-white hover:text-pink-400 transition font-medium cursor-pointer">About</Link>

                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="text-white hover:text-pink-400 transition font-medium">Login</Link>
                                <Link to="/register" className="text-white hover:text-pink-400 transition font-medium">Signup</Link>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleLogout}
                                    className="text-white hover:text-pink-400 transition font-medium cursor-pointer"
                                >
                                    Logout
                                </button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar className="h-8 w-8 cursor-pointer border border-white/30 ">
                                            {getAvatarContent()}
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='text-white bg-black'>
                                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <Link to='/profile'> <DropdownMenuItem className='cursor-pointer '>Profile</DropdownMenuItem></Link>
                                        <DropdownMenuItem className='cursor-pointer'>Your Blogs</DropdownMenuItem>
                                        <DropdownMenuItem className='cursor-pointer'>Write Blogs</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>
                        )}
                    </div>

                    {/* Desktop Search Box + Button */}
                    <div className="hidden md:flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="px-3 py-1.5 rounded-md bg-white/20 text-white placeholder-white/70 text-sm border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                        />
                        <button
                            type="button"
                            className="px-3 py-1.5 text-white font-medium bg-pink-600 hover:bg-pink-700 rounded-md border border-white/40 shadow transition flex items-center gap-1 cursor-pointer"
                        >
                            <Search className="w-4 h-4" />
                            Search
                        </button>
                    </div>

                    {/* Mobile Menu Button (Hamburger) */}
                    <div className="md:hidden flex items-center space-x-2">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 text-white hover:text-pink-400 transition"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-white hover:text-pink-400 transition"
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar (Toggles on click) */}
                {isSearchOpen && (
                    <div className="md:hidden mt-2 pb-3">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="flex-1 px-3 py-1.5 rounded-md bg-white/20 text-white placeholder-white/70 text-sm border border-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
                            />
                            <button
                                type="button"
                                className="px-3 py-1.5 text-white font-medium bg-pink-600 hover:bg-pink-700 rounded-md border border-white/40 shadow transition flex items-center gap-1 cursor-pointer"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Mobile Menu (Toggles on click) */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-3 pt-2">
                            <Link
                                to="/home"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-white hover:text-pink-400 transition font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/get-published-blogs"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-white hover:text-pink-400 transition font-medium"
                            >
                                Blogs
                            </Link>
                           
                            {!isAuthenticated ? (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-white hover:text-pink-400 transition font-medium"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-white hover:text-pink-400 transition font-medium"
                                    >
                                        Signup
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={handleLogout}
                                        className="text-white hover:text-pink-400 transition font-medium text-left"
                                    >
                                        Logout
                                    </button>
                                    <div className="flex items-center pt-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <Avatar className="h-8 w-8 cursor-pointer border border-white/30 ">
                                                    {getAvatarContent()}
                                                </Avatar>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className='text-white bg-black'>
                                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <Link to='/profile'> <DropdownMenuItem className='cursor-pointer '>Profile</DropdownMenuItem></Link>
                                                <DropdownMenuItem className='cursor-pointer'>Your Blogs</DropdownMenuItem>
                                                <DropdownMenuItem className='cursor-pointer'>Write Blogs</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <span className="ml-2 text-white">
                                            {user?.firstName} {user?.lastName}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;