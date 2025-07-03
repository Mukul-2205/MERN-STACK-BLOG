import React from 'react'
import Navbar from '../Navbar/Navbar'
import HeroSection from '../Hero/HeroSection'
import RecentBlogs from '../RecentBlogs/RecentBlogs'

function Home() {
  return (
    <>
        <Navbar/>
        <HeroSection/>
        <RecentBlogs/>
    </>
  )
}

export default Home