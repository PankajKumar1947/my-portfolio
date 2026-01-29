import React from 'react'
import { Link } from 'react-scroll'

const MobileHeader = () => {
  return (
    <>
      <div className='dark:text-white grid grid-cols-3 w-full justify-between gap-5  mt-8 border-b-2 border-blue-500 rounded-lg pb-5 '>
        <Link
          to="home"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          activeClass="text-blue-500 dark:text-blue-400  "
          className="dark:text-white  flex flex-col items-center cursor-pointer"
        >
          <i className="fa-solid fa-house"></i>
          Home
        </Link>
        <Link
          to="about"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          activeClass="text-blue-500 dark:text-blue-400  "
          className="flex flex-col items-center cursor-pointer"
        >
          <i className="fa-solid fa-user"></i>
          About
        </Link>
        <Link
          to="skill"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
          activeClass="text-blue-500 dark:text-blue-400  "
          className="flex flex-col items-center cursor-pointer"
        >
          <i className="fa-solid fa-file-lines"></i>
          Skills
        </Link>
        <Link
          to="experience"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          activeClass="text-blue-500 dark:text-blue-400  "
          className="flex flex-col items-center cursor-pointer"
        >
          <i className="fa-solid fa-briefcase"></i>
          Experience
        </Link>
        <Link
          to="project"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          activeClass="text-blue-500 dark:text-blue-400  "
          className="flex flex-col items-center cursor-pointer"
        >
          <i className="fa-solid fa-image"></i>
          Projects
        </Link>
        <Link
          to="education"
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          activeClass="text-blue-500 dark:text-blue-400  "
          className="flex flex-col items-center cursor-pointer"
        >
          <i className="fa-solid fa-graduation-cap"></i>
          Education
        </Link>
        <Link
          to="contact"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          activeClass="text-blue-500 dark:text-blue-400  "
          className="flex flex-col items-center cursor-pointer"
        >
          <i className="fa-regular fa-paper-plane"></i>
          Contact Me
        </Link>
      </div>
    </>
  )
}

export default MobileHeader