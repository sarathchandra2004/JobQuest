import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarausel from './CategoryCarausel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'

export default function Home() {
  return (
    <div>
        <Navbar/>

        <HeroSection/>

        <CategoryCarausel/>

        <LatestJobs/>

        <Footer/>

    </div>
  )
}
