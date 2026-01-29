import React from 'react'

const ExperienceCard = (props) => {
  return (
    <div className='bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/30 rounded-2xl overflow-hidden shadow-lg dark:shadow-none backdrop-blur-sm hover:border-violet-300 dark:hover:border-violet-500/30 transition-all duration-500 p-5 relative w-full' data-aos={props.aos}>

      {/* Arrow for Desktop - varies based on position */}
      {/* We can handle arrow in parent or here via prop. Let's keep it simple here. */}

      <div className='flex flex-wrap justify-between items-start mb-2'>
        <div>
          <h1 className='font-bold text-xl '>{props.role}</h1>
          <p className='dark:text-blue-300 text-blue-700 font-semibold'>{props.company}</p>
        </div>
        <div className='text-right md:hidden block'> {/* Show date here only on mobile */}
          <p className='text-green-600 text-sm font-semibold'>{props.duration}</p>
          <p className='dark:text-gray-400 text-gray-600 text-xs'>{props.location}</p>
        </div>
      </div>

      <ul className='list-disc pl-5 dark:text-gray-300 text-gray-700 space-y-1 font-serif text-sm'>
        {props.description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default ExperienceCard
