import { motion } from 'framer-motion'
import profileImg from '../../assets/profile.png'

export function Hero() {
  return (
    <section className="py-24 px-4 overflow-hidden relative">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 relative z-10">
        
        {/* Profile Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="relative group shrink-0 order-1 lg:order-2"
        >
          {/* Decorative glowing background */}
          <div className="absolute -inset-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
          
          {/* Image Container */}
          <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl z-10 bg-zinc-900">
            <img 
              src={profileImg} 
              alt="Thejas M S" 
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          {/* Floating badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-4 -right-4 bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-2xl shadow-xl z-20 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-zinc-100">Available for hire</span>
          </motion.div>
        </motion.div>

        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center lg:text-left max-w-2xl order-2 lg:order-1"
        >
          <div className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            Welcome to my portfolio
          </div>
          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 tracking-tight">
            Hi, I'm <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Thejas M S</span>
          </h1>
          <p className="text-xl text-zinc-300 leading-relaxed">
            Full-Stack Developer & DevOps Practitioner crafting scalable web applications and cloud infrastructure. Specializing in Django, React, Azure, and containerized deployments.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a href="#projects" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center gap-2">
              See Projects
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
            <a href="#experience" className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium rounded-xl transition-all border border-zinc-700/50 hover:border-zinc-500/50">
              View Experience
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
