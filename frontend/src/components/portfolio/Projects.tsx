import { motion } from 'framer-motion'

export function Projects() {
  return (
    <section id="projects" className="py-12 px-4 border-t border-zinc-800/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-6">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-default"
          >
            <h3 className="font-medium text-white text-lg">Hisab Kitab</h3>
            <p className="text-sm text-zinc-300 mt-2 leading-relaxed">Digital ledger and credit management system for small businesses. Enables credit/debit tracking, transaction history, and real-time reporting dashboards. Built with Django, React, SQLite, and Recharts.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-default"
          >
            <h3 className="font-medium text-white text-lg">Kelsa Setu</h3>
            <p className="text-sm text-zinc-300 mt-2 leading-relaxed">Bilingual job platform connecting gig workers with employers. Features real-time job matching, video resumes, and location-based discovery. Built with Django REST, React, Tailwind, and Supabase.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
