import React from 'react'

const ContactCard = (props) => {
  return (
    <>
      <a href={props.href}
        className='bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/30 rounded-2xl shadow-lg dark:shadow-none backdrop-blur-sm hover:border-violet-300 dark:hover:border-violet-500/30 transition-all duration-500 flex gap-2 items-center p-3 lg:py-4 cursor-pointer'>
        <i className={`${props.icon} dark:bg-blue-500 bg-gray-300 rounded-full p-3`} ></i>

        <div>
          <h2>{props.name}</h2>
          <h2 className='text-sm opacity-70'>{props.value}</h2>
        </div>
      </a>
    </>
  )
}

export default ContactCard