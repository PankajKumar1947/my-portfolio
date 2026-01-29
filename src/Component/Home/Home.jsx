import React from 'react'
import Hero from '../Hero/Hero'
import About from '../About/About'
import Education from '../Education/Education'
import Experience from '../Experience/Experience'
import Skill from '../Skills/Skill'
import Project from '../Project/Project'
import Contact from '../Contact/Contact'

import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import Mywork from '../Mywork/Mywork'


const Home = () => {
  // animation
  useEffect(() => {
    AOS.init({ duration: 1500 })
  }, [])
  return (
    <>
      <Hero />
      <About />
      <Skill />
      <Experience />
      <Mywork />
      <Project />
      <Education />
      <Contact />
    </>
  )
}

export default Home