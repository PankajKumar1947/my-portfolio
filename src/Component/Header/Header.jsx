import React from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-scroll'
import MobileHeader from './MobileHeader'
import { useState } from 'react'
import useTheme from '../../context/theme'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { themeMode, lightTheme, darkTheme } = useTheme();

    //theme
    const onChangeBtn = () => {
        if (themeMode == "dark")
            lightTheme();
        else
            darkTheme();
    }

    //hamberg
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };



    return (
        <>
            <div className='fixed w-full mx-auto px-3 md:px-10 lg:px-16 top-0 pt-1 bg-opacity-10 dark:bg-opacity-10  dark:bg-[rgb(25,25,26)] bg-gray-300  z-10  backdrop-filter backdrop-blur-lg '>
                <nav className=' dark:text-white flex justify-between mt-2 items-center select-none pb-2 max-w-[1080px] mx-auto border-b-2 border-blue-700 '>
                    <div>
                        <h1 className='text-3xl font-bold bg-gradient-to-r from-red-600 via-indigo-500 to-blue-600 inline-block text-transparent bg-clip-text'>Pankaj</h1>
                    </div>
                    <ul className="flex gap-1 md:gap-4 lg:gap-6 items-center">
                        <li >
                            <Link
                                to="home"
                                spy={true}
                                smooth={true}
                                offset={-80}
                                duration={500}
                                activeClass="text-blue-500 dark:text-blue-400 underline underline-offset-4 "
                                className="lg:block hidden cursor-pointer hover:text-blue-500"
                            >Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="about"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                activeClass="text-blue-500 dark:text-blue-400 underline underline-offset-4 "
                                className="lg:block hidden cursor-pointer hover:text-blue-500"
                            >About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="skill"
                                spy={true}
                                smooth={true}
                                offset={-25}
                                duration={500}
                                activeClass="text-blue-500 dark:text-blue-400 underline underline-offset-4 "
                                className="lg:block hidden cursor-pointer hover:text-blue-500"
                            >
                                Skills
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="experience"
                                spy={true}
                                smooth={true}
                                offset={-80}
                                duration={500}
                                activeClass="text-blue-500 dark:text-blue-400 underline underline-offset-4 "
                                className="lg:block hidden cursor-pointer hover:text-blue-500"
                            >
                                Experience
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"project"}
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={500}
                                activeClass="text-blue-500 dark:text-blue-400 underline underline-offset-4 "
                                className="lg:block hidden cursor-pointer hover:text-blue-500"
                            >
                                Project
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="education"
                                spy={true}
                                smooth={true}
                                offset={-80}
                                duration={500}
                                activeClass="text-blue-500 dark:text-blue-400 underline underline-offset-4 "
                                className="lg:block hidden cursor-pointer hover:text-blue-500"
                            >
                                Education
                            </Link>
                        </li>
                        {/* <li>
                        <NavLink
                        to={"blog"}
                        className={({isActive})=>`${isActive ? "text-orange-500 underline underline-offset-4": "dark:text-white text-black"} cursor-pointer text-lg}  hover:text-orange-500 dark:hover:text-orange-500 lg:block hidden`}
                        >
                            Blog
                        </NavLink>
                    </li> */}

                        <li>
                            <Link
                                to={"contact"}
                                spy={true}
                                smooth={true}
                                offset={-80}
                                duration={500}
                                activeClass="text-blue-500 dark:text-blue-400 underline underline-offset-4 "
                                className="lg:block hidden cursor-pointer hover:text-blue-500"
                            >
                                Contact
                            </Link>
                        </li>

                        <li className='lg:block md:block hidden'>
                            <button className='bg-indigo-600 hover:bg-blue-600 px-3 text-white  py-1 rounded-md  '>Hire Me</button>
                        </li>

                        <li className='text-xl cursor-pointer dark:bg-[#334155] bg-white rounded-full p-2'
                            onClick={onChangeBtn}>
                            {themeMode == "dark" ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brightness-high" viewBox="0 0 16 16">
                                <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon" viewBox="0 0 16 16">
                                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                            </svg>}
                        </li>

                        <li className='lg:hidden block dark:bg-gray-500 bg-white rounded-full p-2 px-3'
                            onClick={toggleMenu}>{isOpen ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-bars"></i>}
                        </li>

                    </ul>



                </nav>
                <div className='lg:hidden block '>
                    {isOpen ? <MobileHeader /> : ""}
                </div>

            </div>




        </>
    )
}

export default Header