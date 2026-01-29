import { FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa";
import uapl from '../Assests/work/uapl.png'
import joyjunction from '../Assests/work/joyjunction.png'

const experiences = [
  {
    title: 'Frontend Developer at United Art Logistics Pvt Ltd (UAPL)',
    duration: 'May 2024 - Present',
    img: uapl,
    link: "https://uapl.ai/",
    tags: ['ReactJS', 'Tailwind CSS', 'Redux Toolkit', 'Google Maps API', 'Razorpay'],
    description: [
      'Built and maintained web interfaces using ReactJS, Tailwind CSS, and Redux Toolkit based on Figma designs, ensuring responsiveness and optimization.',
      'Integrated frontend with backend via Swagger files, collaborating with backend developers to enhance API functionality and data flow.',
      'Integrated the Google Maps API to fetch precise locations within a specified range and implemented Razorpay for seamless order processing.',
    ],
  },
  {
    title: 'Joy Junction - Gamingzone Dhanbad',
    duration: 'April 2024 - May 2024',
    img: joyjunction,
    link: "https://www.joyjunctiongamezone.com/",
    tags: ['ReactJS', 'Tailwind CSS', 'React Router', 'Redux Toolkit'],
    description: [
      'Developed a modern, fully functional, and responsive website using ReactJS, Tailwind CSS, React-router-dom, and Redux Toolkit.',
      'Translated UI designs from Figma into a functional and visually appealing interface.',
      'Integrated dynamic routing with React-router-dom, enhancing user experience with smooth and intuitive navigation.'
    ],
  },
];

const Mywork = () => {
  return (
    <section
      id='project'
      className="relative py-20 overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-[1080px] mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            My <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl mx-auto">
            Overview of my completed projects and professional experience
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/30 rounded-2xl overflow-hidden shadow-lg dark:shadow-none backdrop-blur-sm hover:border-violet-300 dark:hover:border-violet-500/30 transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-500 opacity-80" />

              <div className="flex flex-col lg:flex-row">
                {/* Content Side */}
                <div className="flex-1 p-6 lg:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400">
                        <FaCalendarAlt className="w-3.5 h-3.5" />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                    </div>
                    <a
                      href={exp.link}
                      target='_blank'
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg shadow-violet-500/25 hover:scale-110 transition-transform duration-300"
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-violet-500 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image Side */}
                <div className="lg:w-[40%] relative overflow-hidden bg-gray-100 dark:bg-gray-900/50">
                  <div className="h-48 lg:h-full min-h-[250px] flex items-center justify-center p-4">
                    <img
                      src={exp.img}
                      alt={exp.title}
                      className="w-full h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Mywork