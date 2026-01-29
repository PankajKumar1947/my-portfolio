import React from 'react'
import ExperienceCard from './ExperienceCard'
import { EXPERIENCE } from '../../constants'

const Experience = () => {
  // Remove local experiences array


  return (
    <div id='experience' className='dark:text-white max-w-[1080px] mx-auto mt-20 mb-10 overflow-hidden'>
      <h2 className='text-4xl font-semibold mt-2 text-center mb-16'><i className="fa-solid fa-briefcase"></i> My <span className='text-[#86198f] '>Tech Journey</span></h2>

      <div className='relative'>
        {/* Central Line */}
        <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-400 dark:bg-gray-700'></div>

        {EXPERIENCE.map((exp, index) => (
          <div key={index} className={`flex flex-col md:flex-row items-center justify-between mb-8 w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

            {/* Empty Space / Date Side (Desktop) */}
            <div className='w-full md:w-[45%] text-center md:text-right hidden md:block'>
              {index % 2 !== 0 && (
                <div className='text-right pr-8' data-aos="fade-right">
                  <p className='text-xl font-bold dark:text-gray-300'>{exp.duration}</p>
                  <p className='dark:text-gray-400 text-gray-600'>{exp.location}</p>
                </div>
              )}
              {index % 2 === 0 && (
                <div className='text-left pl-8' data-aos="fade-left">
                  <p className='text-xl font-bold dark:text-gray-300'>{exp.duration}</p>
                  <p className='dark:text-gray-400 text-gray-600'>{exp.location}</p>
                </div>
              )}
            </div>

            {/* Center Icon */}
            <div className='bg-white dark:bg-gray-900 border-4 border-[#86198f] rounded-full w-12 h-12 flex items-center justify-center shadow-lg my-4 md:my-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2'>
              <i className={`text-xl text-[#86198f] ${exp.icon}`}></i>
            </div>

            {/* Card Side */}
            <div className='w-full md:w-[45%]'>
              <ExperienceCard
                role={exp.role}
                company={exp.company}
                duration={exp.duration}
                location={exp.location}
                description={exp.description}
                aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experience
