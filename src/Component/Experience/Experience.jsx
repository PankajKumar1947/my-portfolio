import React from 'react'
import ExperienceCard from './ExperienceCard'

const Experience = () => {
  const experiences = [
    {
      role: "Software Engineer",
      company: "Tech Solutions Inc.",
      duration: "Jan 2023 - Present",
      location: "Bangalore, India",
      icon: "fa-solid fa-code",
      description: [
        "Developed scalable web applications using React.js and Node.js significantly improving user engagement.",
        "Collaborated with cross-functional teams to design and implement new features.",
        "Optimized application performance by 30% through code refactoring and efficient api handling.",
        "Mentored junior developers and conducted code reviews ensuring high code quality standard."
      ]
    },
    {
      role: "Frontend Developer",
      company: "Creative Designs Pvt Ltd",
      duration: "Jun 2021 - Dec 2022",
      location: "Mumbai, India",
      icon: "fa-solid fa-laptop-code",
      description: [
        "Built responsive and interactive user interfaces using modern CSS frameworks like Tailwind CSS.",
        "Translating designs and wireframes into high-quality code.",
        "Integrated RESTful APIs to fetch and display dynamic data.",
        "Ensured cross-browser compatibility and fixed UI/UX bugs."
      ]
    },
    {
      role: "Web Developer Intern",
      company: "StartUp Hub",
      duration: "Jan 2020 - Dec 2020",
      location: "Remote",
      icon: "fa-solid fa-globe",
      description: [
        "Assisted in the development of the company website using HTML, CSS, and JavaScript.",
        "Learned and applied best practices for web accessibility and SEO.",
        "Participated in daily stand-up meetings and contributed to sprint planning.",
        "Gained hands-on experience with version control systems like Git."
      ]
    }
  ];

  return (
    <div id='experience' className='dark:text-white max-w-[1080px] mx-auto mt-20 mb-10 overflow-hidden'>
      <h2 className='text-4xl font-semibold mt-2 text-center mb-16'><i className="fa-solid fa-briefcase"></i> My <span className='text-[#86198f] '>Tech Journey</span></h2>

      <div className='relative'>
        {/* Central Line */}
        <div className='hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-400 dark:bg-gray-700'></div>

        {experiences.map((exp, index) => (
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
