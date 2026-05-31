import { motion } from 'framer-motion'

export function Experience() {
    return (
        <section id="experience" className="py-12 px-4 border-t border-zinc-800/50">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold text-white mb-6">Experience</h2>
                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative pl-8 border-l border-zinc-800"
                    >
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1.5 ring-4 ring-zinc-950"></div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-white">DevOps Intern</h3>
                            <span className="text-sm text-zinc-500">Dec 2025 - Feb 2026</span>
                        </div>
                        <p className="text-blue-400 text-sm mb-3">Employability.Life</p>
                        <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                            Optimized Agile workflows using Azure DevOps Boards. Automated infrastructure provisioning with Terraform on Microsoft Azure, achieving 70% reduction in setup time. Designed CI/CD pipelines with Docker integration for automated builds and deployments. Key achievements: 30% improvement in task tracking efficiency, 50% faster release cycles, and fully automated deployment pipelines.
                        </p>
                        
                        <div className="mt-4 relative group">
                            <h4 className="text-sm font-medium text-zinc-400 mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                                    <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17"></path>
                                </svg>
                                Internship Certificate
                            </h4>
                            <div className="rounded-xl overflow-hidden border border-zinc-700/50 bg-zinc-900/50 p-2 max-w-2xl transition-colors group-hover:border-blue-500/30">
                                <img 
                                    src="/internship-certificate.png" 
                                    alt="DevOps Internship Certificate" 
                                    className="w-full h-auto rounded-lg shadow-md"
                                    onError={(e) => {
                                        // Show a nice fallback if image isn't found
                                        const target = e.target as HTMLImageElement;
                                        target.onerror = null; 
                                        target.src = "https://placehold.co/800x600/18181b/3b82f6?text=Please+add+internship-certificate.png+to+public+folder";
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>


                </div>
            </div>
        </section>
    )
}
