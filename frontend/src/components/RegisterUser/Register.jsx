import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Register() {
    const [firstName, setFirstName]=useState("")
    const [lastName, setLastName]=useState("")
    const [email,setEmail]=useState("")
    const [password, setPassword]=useState("")
    const navigate=useNavigate()
    const handleRegister = async (e)=>{
        e.preventDefault()
        console.log(firstName,lastName,email,password);
        
        try {
            const res= await axios.post('http://localhost:8000/api/v1/user/register',{firstName,lastName,email,password},{
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials:true
            })

            if(res.data.success){
                navigate('/login')
                alert("Registered Successfully!!")
            }
        } catch (error) {
            alert(error.messasge)
        }
    }
    return (
        <>
            <div className="relative min-h-screen inset-0 z-10 flex flex-col items-center justify-center px-6 py-8">
                <div className="w-full bg-white/30 backdrop-blur-md shadow-2xl rounded-2xl border border-white/40 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                            {/* Full Name */}
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-semibold text-black/90">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="John Doe"
                                    className="bg-black/20 border border-white/40 placeholder-black/70 text-black text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-semibold text-black/90">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="John Doe"
                                    className="bg-black/20 border border-white/40 placeholder-black/70 text-black text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-black/90">
                                    Your email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="bg-black/20 border border-white/40 placeholder-black/70 text-black text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-semibold text-black/90">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password must have characters from a-z, A-Z, 0-9, @#$%&*"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                    className="bg-black/20 border border-white/40 placeholder-black/70 text-black text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 h-10"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full text-white bg-black hover:bg-black/90 focus:ring-2 focus:outline-none focus:ring-white font-semibold rounded-lg text-sm px-5 py-2.5 text-center transition"
                            >
                                Create an account
                            </button>

                            {/* Footer Link */}
                            <p className="text-sm font-light text-black text-center">
                                Already have an account?{' '}
                                <Link to='/login' className='font-bold text-blackc underline'>Login</Link>
                            </p>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Register