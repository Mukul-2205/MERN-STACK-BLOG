// pages/ProfilePage.jsx
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '../ui/textarea'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser } from '@/Store/authSlice'
import { useState } from 'react'

export default function ProfilePage() {
  const { user } = useSelector(state => state.auth)
  const [openEditProfile, setOpenEditProfile] = useState(false)
  const [input, setInput] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    bio: user?.bio,
    file: user.photoUrl
  })
  const dispatch = useDispatch()

  const setInputFieldsInEditProfile = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const uploadProfilePhotoInEditProfile = (e) => {
    setInput({
      ...input,
      file: e.target.files[0]
    })
  }

  const handleSaveChanges = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("firstName", input.firstName)
    formData.append("lastName", input.lastName)
    formData.append("bio", input.bio)
    formData.append("email", input.email)
    if (input?.file) {
      formData.append("file", input?.file)
    }
    try {
      const res = await axios.put('http://localhost:8000/api/v1/user/updateprofile', formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        }
      )
      if (res.data.success) {
        setOpenEditProfile(false)
        dispatch(setUser(res.data.user))
        alert('profile updated successfully')
      }
    } catch (error) {
      console.log(error);
      alert(error)
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome Back, {user.firstName} {user.lastName}</h1>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Avatar Section */}
          <div className="shrink-0">
            <Avatar className="w-40 h-40">
              <AvatarImage src={user.photoUrl || "https://github.com/shadcn.png"} />
            </Avatar>
          </div>

          {/* Profile Info Section */}
          <div className="flex-1 text-gray-300">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Name: </p>
                <p>{user.firstName} {user.lastName}</p>
              </div>
              <div>
                <p className="font-medium">Email: </p>
                <p>{user.email}</p>
              </div>
              <div className="md:col-span-2">
                <p className="font-medium">Bio:</p>
                <p>{user.bio}</p>
              </div>
              <Dialog open={openEditProfile} onOpenChange={setOpenEditProfile}>
                <Button 
                  onClick={() => setOpenEditProfile(true)} 
                  className='bg-pink-600 cursor-pointer w-25'
                >
                  Edit Profile
                </Button>
                <DialogContent className="sm:max-w-[425px] bg-black text-white">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription className='text-white'>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Label htmlFor="name-1">First Name</Label>
                      <Input 
                        id="name" 
                        name="firstName" 
                        placeholder="Your first name"
                        value={input.firstName} 
                        onChange={setInputFieldsInEditProfile}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username-1">Last Name</Label>
                      <Input 
                        id="name" 
                        name="lastName" 
                        placeholder="Your last name" 
                        value={input.lastName} 
                        onChange={setInputFieldsInEditProfile} 
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username-1">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        placeholder="youremail@example.com" 
                        value={input.email} 
                        onChange={setInputFieldsInEditProfile} 
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username-1">Bio</Label>
                      <Textarea 
                        id="bio" 
                        name="bio" 
                        placeholder="Your bio" 
                        value={input.bio} 
                        onChange={setInputFieldsInEditProfile} 
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="username-1">Profile Photo</Label>
                      <Input 
                        id='file' 
                        type='file' 
                        accept='image/*' 
                        className='bg-white cursor-pointer text-black'
                        onChange={uploadProfilePhotoInEditProfile}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSaveChanges} className='cursor-pointer'>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}