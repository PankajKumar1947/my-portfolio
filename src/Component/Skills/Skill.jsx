import React from 'react'
import { SKILLS } from '../../constants'

const Skill = () => {
  return (
    <section id='skills' className='relative py-20 overflow-hidden flex flex-col justify-center min-h-screen'>

      <div className='max-w-[1080px] mx-auto relative w-full'>

        {/* Header */}
        <h1 className='text-center text-4xl mt-12 font-semibold underline underline-offset-8 text-black dark:text-white mb-16' data-aos="fade-down">
          Tech <span className='text-[#86198f] '>Stack</span>
        </h1>

        {/* Vertical Stack layout */}
        <div className="flex flex-col gap-2 w-full">
          {SKILLS.map((category, index) => (
            <div
              key={index}
              className="bg-transparent p-6 hover:border-[#86198f]/50 transition-colors duration-300 flex flex-col h-full"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Category Header */}
              <h3 className="text-xl font-bold text-left mb-8 text-gray-800 dark:text-gray-200">
                <span className="border-b-2 border-[#86198f] pb-2 pr-4 shadow-sm shadow-purple-500/20">{category.category}</span>
              </h3>

              {/* Skills Container */}
              <div className="flex flex-wrap gap-4 justify-start content-start flex-grow">
                {category.items.map((skill, idx) => {
                  const IconComponent = skill.icon;
                  return (
                    <div
                      key={idx}
                      className="group relative flex flex-col items-center gap-2 p-3 rounded-xl bg-white dark:bg-gray-800/40 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 w-24 aspect-square justify-center cursor-pointer"
                    >
                      <IconComponent
                        className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(134,25,143,0.5)]"
                        style={{ color: skill.color }}
                      />
                      <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white uppercase tracking-wider text-center transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Skill