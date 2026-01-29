import React, { useEffect, useState } from 'react'
import { FaCode, FaServer, FaLightbulb, FaRocket, FaGraduationCap } from 'react-icons/fa'

const About = () => {
  const [githubStats, setGithubStats] = useState({});
  const [leetcodeStats, setLeetcodeStats] = useState({
    solved: 680,
    easy: 233,
    medium: 390,
    hard: 57
  });

  useEffect(() => {
    const fetctGithubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/PankajKumar1947');
        const data = await response.json();
        console.log(data);
        setGithubStats(data);
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
      }
    }
    fetctGithubStats()
  }, [])

  const aboutPoints = [
    {
      icon: <FaGraduationCap className="text-violet-400" />,
      text: "B.Tech student in Computer Science at Asansol Engineering College, passionate about full-stack development."
    },
    {
      icon: <FaServer className="text-blue-400" />,
      text: "Skilled in backend technologies like Node.js, Express.js, and MongoDB."
    },
    {
      icon: <FaCode className="text-emerald-400" />,
      text: "Frontend expertise in React.js, Next.js, JavaScript, HTML, CSS, and Tailwind CSS."
    },
    {
      icon: <FaLightbulb className="text-amber-400" />,
      text: "Over 680+ data structures and algorithm problems solved on LeetCode."
    },
    {
      icon: <FaRocket className="text-pink-400" />,
      text: "Excited to contribute to impactful projects at the intersection of technology and creativity."
    }
  ];

  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-[1080px] mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold dark:text-white text-gray-900">
            About <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Me</span>
          </h2>
        </div>

        {/* Main Content - Flex Layout */}
        <div className="flex flex-col lg:flex-row gap-10 mb-16">
          {/* About Text Section - Left Side */}
          <div className="lg:w-1/2 space-y-6" data-aos="fade-right">
            <div className="relative">
              <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
                Hello! I'm <span className="text-violet-500">Pankaj Kumar</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                A passionate developer who loves crafting elegant solutions to complex problems.
                I believe in writing clean, efficient code and building applications that make a difference.
              </p>
            </div>

            {/* About Points with Icons */}
            <div className="space-y-3">
              {aboutPoints.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700/30 shadow-sm dark:shadow-none backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:border-violet-300 dark:hover:border-violet-500/30 transition-all duration-300 group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-900/50 flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300">
                    {point.icon}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed pt-1">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Coding Journey Section - Right Side */}
          <div className="lg:w-1/2" data-aos="fade-left">
            <div className="mb-4">
              <h3 className="text-2xl font-bold dark:text-white text-gray-900">
                My <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Coding Journey</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Tracking my progress and contributions</p>
            </div>

            {/* Compact Stats Card */}
            <div className="bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/30 rounded-2xl p-5 shadow-lg dark:shadow-none backdrop-blur-sm space-y-5">
              {/* GitHub Section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-gray-900/60 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <span className="text-gray-900 dark:text-white font-semibold">GitHub Activity</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-100 dark:bg-gray-900/40 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{githubStats.public_repos || '52'}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Repos</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-900/40 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-gray-900 dark:text-white">{githubStats.followers || '13'}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Followers</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-900/40 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">2.9k+</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Commits</div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 dark:border-gray-700/50" />

              {/* LeetCode Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-gray-900/60 flex items-center justify-center">
                      <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                      </svg>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold">LeetCode</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{leetcodeStats.solved}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 dark:text-gray-400 w-14">Easy</span>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(leetcodeStats.easy / leetcodeStats.solved) * 100}%` }} />
                    </div>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 w-8 text-right">{leetcodeStats.easy}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 dark:text-gray-400 w-14">Medium</span>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(leetcodeStats.medium / leetcodeStats.solved) * 100}%` }} />
                    </div>
                    <span className="text-xs text-amber-600 dark:text-amber-400 w-8 text-right">{leetcodeStats.medium}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 dark:text-gray-400 w-14">Hard</span>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700/50 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${(leetcodeStats.hard / leetcodeStats.solved) * 100}%` }} />
                    </div>
                    <span className="text-xs text-red-600 dark:text-red-400 w-8 text-right">{leetcodeStats.hard}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                { label: 'Projects', value: '15+', color: 'from-violet-500 to-purple-500' },
                { label: 'Problems', value: '680+', color: 'from-blue-500 to-cyan-500' },
                { label: 'Commits', value: '2.9k+', color: 'from-emerald-500 to-green-500' },
                { label: 'Tech Stack', value: '20+', color: 'from-orange-500 to-pink-500' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-xl bg-white dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700/30 p-4 text-center shadow-sm dark:shadow-none backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600/50 transition-all duration-300"
                >
                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for slow spin animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  )
}

export default About;
