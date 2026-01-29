import React from 'react'
import EducationCard from './EducationCard'
import aec from '../Assests/aec.jpg'
import blindo from '../Assests/blindo.jpg'

const Education = () => {
  return (
    <>
      <div id='education' className='relative overflow-hidden mt-20 mb-5'>

        <div className='dark:text-white max-w-[1080px] mx-auto relative'>
          <h2 className='text-4xl font-bold text-center mt-2 text-gray-900 dark:text-white'>My <span className='bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent'>Education</span></h2>
          <p className='sm:text-xl font-serif sm:tracking-wider mt-2 text-center text-gray-600 dark:text-gray-400'>Education is not the learning of Facts, <br /> but The Training of The Mind to Think</p>
          <div className='flex flex-wrap justify-center gap-4 mt-8'>
            <EducationCard image={aec} degree={"Batchler of Technology In Computer Science"} college={"Asansol Engineering College (AEC)"} year={"2022-2026 | Persuing"} link={"http://www.aecwb.edu.in/"} />
            <EducationCard image={blindo} degree={"High School | Science "} college={"B L Indo Anglian Public School(A.bad)"} year={"2019-2021 | Completed"} link={"http://bliaps.com/"} />
          </div>

        </div>
      </div>
    </>
  )
}

export default Education