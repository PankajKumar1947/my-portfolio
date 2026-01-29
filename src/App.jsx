import React from "react"
import Header from "./Component/Header/Header"
import Home from "./Component/Hero/Hero"
import About from "./Component/About/About"
import Contact from "./Component/Contact/Contact"
import Footer from "./Component/Footer/Footer"
import Project from "./Component/Project/Project"
import Education from "./Component/Education/Education"
import Skill from "./Component/Skills/Skill"
import Experience from "./Component/Experience/Experience"

function App() {


  return (
    <>
      <Header />
      <Home />
      <About />
      <Experience />
      <Education />
      <Skill />
      <Project />
      <Contact />
      <Footer />
    </>
  )
}

export default App
