import React from 'react'
import { FaRegHandPointRight } from "react-icons/fa";
import { BiLinkExternal } from 'react-icons/bi';
import { PROJECTS } from '../../constants';

const Project = () => {
  return (
    <>
      <div id='project'>
        <section className="max-w-[1080px] mx-auto py-10 text-white">
          <h1 className='text-center text-black dark:text-white text-4xl mt-8 font-semibold underline underline-offset-8'>My <span className='text-[#86198f] '>Projects</span></h1>
          <p className='text-center dark:text-gray-300 text-gray-700 mt-4 text-md mb-10 '>Some of my Projects made during learning and Currently Working</p>

          <div className='space-y-8'>
            {
              PROJECTS?.map((project, i) => {
                return (
                  <div
                    key={i}
                    className="grid lg:grid-cols-2 gap-2 sm:gap-8 items-center bg-white dark:bg-gray-800/40  p-4 py-6 rounded-xl">
                    <div className={`space-y-2 ${i % 2 === 0 ? 'order-last' : ''}`}>
                      <div className='flex justify-start items-center gap-2'>
                        <div className="inline-flex items-center gap-2 bg-gray-400 dark:bg-white/10 rounded-full px-4 py-2">
                          <span className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-black font-semibold">
                            0{i + 1}
                          </span>
                          <h2 className="sm:text-2xl font-semibold">
                            {project.title}
                          </h2>
                        </div>
                        <div>
                          <BiLinkExternal
                            onClick={() => window.open(project.repoLink ? project.repoLink : project.liveLink)}
                            size={25} className='text-blue-500 cursor-pointer' />
                        </div>
                      </div>

                      <div className="text-black dark:text-gray-400 text-sm space-y-2">
                        {
                          project.desc.map((desc, ind) => (
                            <div key={ind} className="flex items-start justify-start gap-x-2 pl-2">
                              <FaRegHandPointRight size={30} className='text-green-600 min-w-[30px]' />
                              <span>{desc}</span>
                            </div>
                          ))
                        }
                      </div>

                      <div className='flex gap-2 flex-wrap'>
                        {
                          project.tech.map((eachTech, ind) => (
                            <div key={ind} className="flex items-center gap-x-1 bg-gray-500 dark:bg-gray-700 p-2 rounded-full px-4 text-xs">
                              <img src={eachTech.logo} alt="" className='w-[25px] max-h-[30px]' />
                              <span>{eachTech.name}</span>
                            </div>
                          ))
                        }

                      </div>
                    </div>

                    <div>
                      <img src={project.img} alt="" className='rounded-2xl' />
                    </div>

                  </div>
                )
              })
            }
          </div>
        </section>
      </div>
    </>
  )
}

export default Project