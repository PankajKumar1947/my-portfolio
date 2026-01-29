import React from 'react'
import {
  SiC, SiCplusplus, SiPython, SiHtml5, SiCss3, SiBootstrap,
  SiTailwindcss, SiJavascript, SiGit, SiGithub, SiReact,
  SiNpm, SiMysql, SiNodedotjs, SiMongodb, SiExpress
} from 'react-icons/si'
import { TbBinaryTree } from 'react-icons/tb'

const skills = [
  { icon: SiC, name: 'C', color: '#A8B9CC' },
  { icon: SiCplusplus, name: 'C++', color: '#00599C' },
  { icon: TbBinaryTree, name: 'DSA', color: '#4CAF50' },
  { icon: SiPython, name: 'Python', color: '#3776AB' },
  { icon: SiHtml5, name: 'HTML', color: '#E34F26' },
  { icon: SiCss3, name: 'CSS', color: '#1572B6' },
  { icon: SiBootstrap, name: 'Bootstrap', color: '#7952B3' },
  { icon: SiTailwindcss, name: 'Tailwind', color: '#06B6D4' },
  { icon: SiJavascript, name: 'JavaScript', color: '#F7DF1E' },
  { icon: SiGit, name: 'Git VCS', color: '#F05032' },
  { icon: SiGithub, name: 'GitHub', color: '#181717' },
  { icon: SiReact, name: 'React', color: '#61DAFB' },
  { icon: SiNpm, name: 'NPM', color: '#CB3837' },
  { icon: SiMysql, name: 'MySQL', color: '#4479A1' },
  { icon: SiNodedotjs, name: 'NodeJS', color: '#339933' },
  { icon: SiMongodb, name: 'MongoDB', color: '#47A248' },
  { icon: SiExpress, name: 'ExpressJS', color: '#000000' },
]

const Skill = () => {
  return (
    <section id='skill' className='relative py-20 overflow-hidden'>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className='max-w-[1080px] mx-auto relative'>
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            <span className="underline underline-offset-8 decoration-violet-500">Skills</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3">
            My <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent font-medium">Technical Skills</span>
          </p>
        </div>

        {/* Skills Grid */}
        <div
          className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 p-6 bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/30 rounded-2xl shadow-lg dark:shadow-none backdrop-blur-sm'
          data-aos="zoom-in"
        >
          {skills.map((skill, index) => {
            const IconComponent = skill.icon
            return (
              <div
                key={index}
                className='group flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-t from-gray-300 to-gray-100 dark:from-indigo-900 dark:to-gray-900 shadow-md shadow-blue-500/30 hover:shadow-blue-400/50 hover:scale-105 transition-all duration-300 cursor-pointer'
                data-aos="flip-down"
                data-aos-delay={index * 50}
              >
                <IconComponent
                  className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: skill.color }}
                />
                <span className='text-xs font-semibold uppercase text-gray-700 dark:text-gray-300 text-center'>
                  {skill.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skill