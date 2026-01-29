import React from 'react'
import { Link } from 'react-router-dom'
import leetcode from '../Assests/Leetcode.png';
import { FOOTER_LINKS, SOCIAL_LINKS } from '../../constants';

const Footer = () => {
  return (
    <>
      <div className='dark:text-white flex flex-col justify-center items-center bottom-0 mt-10 max-w-[1080px] mx-auto'>
        <div className='w-[70%] bg-gray-500 h-[1px] mt-6'></div>
        <h1 className='text-center text-3xl font-extrabold mt-5'>Pankaj</h1>
        <ul className='flex flex-wrap gap-1.5 md:gap-3 lg:gap-4 mt-3 text-sm'>
          {FOOTER_LINKS.map((link, index) => (
            <li key={index}><Link to={link.path} className='hover:underline underline-offset-2 hover:text-blue-400'>{link.name}</Link></li>
          ))}
        </ul>
        <div className="mt-8 flex gap-2 text-xl items-center">
          <Link to={SOCIAL_LINKS.leetcode} className=' rounded-full'>
            <img src={leetcode} alt="" />
          </Link>
          <Link to={""}>
            <i className="fa-brands fa-facebook fa-xl text-[#005eff] cursor-pointer " ></i>
          </Link>
          <Link to={SOCIAL_LINKS.linkedin}>
            <i className="fa-brands fa-linkedin fa-xl text-[#075ae9] cursor-pointer" ></i>
          </Link>
          <Link to={SOCIAL_LINKS.github}>
            <i className="fa-brands fa-github fa-xl  cursor-pointer" ></i>
          </Link>
          <Link to={""}>
            <i className="fa-brands fa-square-x-twitter fa-xl text-[#000000] cursor-pointer" ></i>
          </Link>
          <Link to={""}>
            <i className="fa-solid fa-envelope fa-xl text-[#187728] cursor-pointer" ></i>
          </Link>
          <Link to={""}>
            <i className="fa-brands fa-youtube fa-xl text-[#ff0000] cursor-pointer" ></i>
          </Link>
        </div>

        <p className='mt-2'>Copyright  2023 : All right reserved</p>
        <p className='flex justify-center items-center gap-1 p-2 dark:bg-gray-900 dark:text-cyan-400 bg-gray-400 w-full mt-4'>Designed with ❤️ by Pankaj </p>
      </div>

    </>
  )
}

export default Footer