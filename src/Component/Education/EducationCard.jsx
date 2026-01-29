import React from 'react'

const EducationCard = (props) => {
  return (
    <>
      <a href={props.link}
        className='bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/30 rounded-2xl overflow-hidden shadow-lg dark:shadow-none backdrop-blur-sm hover:border-violet-300 dark:hover:border-violet-500/30 transition-all duration-500 flex w-full md:w-[50%] lg:w-[45%] p-2 mt-10 cursor-pointer'
        data-aos="zoom-in-down">
        <div className='w-[48%]'>
          <img src={props.image} alt="" className='w-[90%] rounded-l-xl h-full' />
        </div>
        <div className='flex flex-col justify-between py-3'>
          <h1 className='font-bold text-xl '>{props.degree}</h1>
          <p className='dark:text-blue-300 text-blue-700 '>{props.college} </p>
          <p className='text-green-600 text-lg lg:text-xl md:text-xl font-semibold'>{props.year}</p>
        </div>
      </a>
    </>
  )
}

export default EducationCard