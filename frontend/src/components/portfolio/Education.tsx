import { motion } from 'framer-motion'

export function Education() {
    return (
        <section className="py-12 px-4 border-t border-zinc-800/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-white mb-6">Education</h2>
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 hover:bg-zinc-900/50 transition-all"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-white">Bachelor of Engineering in Information Science</h3>
                            <span className="text-sm text-zinc-500 font-mono">3rd Year</span>
                        </div>
                        <p className="text-zinc-300">P.E.S College of Engineering</p>
                        <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                            Strong foundation in software engineering, data structures, algorithms, and systems design. Specialized coursework in web development, cloud computing, and database management.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 hover:bg-zinc-900/50 transition-all"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-white">PCMB - 91.33%</h3>
                            <span className="text-sm text-zinc-500 font-mono">Pre-University</span>
                        </div>
                        <p className="text-zinc-300">Mandavya Excellence PU College</p>
                        <p className="text-sm text-zinc-400 mt-4 leading-relaxed">
                            Strong analytical and mathematical foundation with excellent performance in Physics, Chemistry, Mathematics, and Biology.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 hover:bg-zinc-900/50 transition-all"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-white">High School - 94%</h3>
                            <span className="text-sm text-zinc-500 font-mono">Secondary</span>
                        </div>
                        <p className="text-zinc-300">ST Johns High School</p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
