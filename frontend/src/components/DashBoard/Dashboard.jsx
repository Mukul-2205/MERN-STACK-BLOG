import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, PenLine, FileText, Menu, X } from 'lucide-react'
import Navbar from '../Navbar/Navbar'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '../ui/textarea'
export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[url('/your-background.jpg')] bg-cover bg-center bg-fixed text-white">
      {/* Navbar (always at top) */}
      <Navbar />

      {/* Mobile menu button (positioned below navbar) */}
      <button
        className="lg:hidden fixed top-16 left-4 z-50 p-2 rounded-md bg-black/30 backdrop-blur-md border border-white/10"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Layout container */}
      <div className="flex pt-16 h-[calc(100vh)]">
        {/* Sidebar - Full height */}
        <aside
          className={`fixed lg:static w-64 min-h-full bg-black/20 backdrop-blur-lg border-r border-white/20
            transform transition-all duration-300 ease-in-out z-40
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
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
                onClick={() => setIsSidebarOpen(false)}
              >
                <PenLine className="w-5 h-5 text-gray-300" />
                <span className="text-gray-200">Write Blog</span>
              </Link>

              <Link
                to="/your-blogs"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FileText className="w-5 h-5 text-gray-300" />
                <span className="text-gray-200">Your Blogs</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'
          }`}>
          <div className="p-8">
            <div className="max-w-4xl mx-auto">

              <h1 className="text-3xl font-bold mb-6">Welcome Back, Mukul</h1>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
                {/* Avatar Section */}
                <div className="shrink-0">
                  <Avatar className="w-40 h-40">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                </div>

                {/* Profile Info Section */}
                <div className="flex-1 text-gray-300">
                  <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Name:</p>
                      <p>Mukul Kumar</p>
                    </div>
                    <div>
                      <p className="font-medium">Email:</p>
                      <p>mukul@example.com</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="font-medium">Bio:</p>
                      <p>CSE student at MNIT Jaipur, passionate about web development and security.</p>
                    </div>
                    <Dialog>
                      <form>
                        <DialogTrigger asChild>
                          <Button className='bg-pink-600 cursor-pointer'>Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-black text-white">
                          <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription className='text-white'>
                              Make changes to your profile here. Click save when you&apos;re
                              done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <Label htmlFor="name-1">First Name</Label>
                              <Input id="name" name="firstName" placeholder="Your first name" />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="username-1">Last Name</Label>
                              <Input id="name" name="lastName" placeholder="Your last name" />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="username-1">Email</Label>
                              <Input id="email" name="email" placeholder="youremail@example.com" />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="username-1">Bio</Label>
                              <Textarea id="bio" name="bio" placeholder="Your bio" />
                            </div>
                            <div className="grid gap-3">
                              <Label htmlFor="username-1">Profile Photo</Label>
                              <Input id='file' type='file' accept='image/*' className='bg-white cursor-pointer text-black'/>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Save changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </form>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}