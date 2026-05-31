import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamically import all images from the certifications folder and subfolders
const modules = import.meta.glob('../../assets/certifications/**/*.{png,jpg,jpeg,svg,webp}', { eager: true });

export function Certifications() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { categories, certificationsByCategory } = useMemo(() => {
    const certs: Record<string, any[]> = {};
    const cats = new Set<string>();

    Object.keys(modules).forEach((path, index) => {
      const parts = path.split('/');
      const fileName = parts.pop() || '';
      
      const certificationsIndex = parts.indexOf('certifications');
      let category = 'Other';
      if (certificationsIndex !== -1 && parts.length > certificationsIndex + 1) {
        category = parts[certificationsIndex + 1];
      }

      let formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      if (category.toLowerCase() === 'github') formattedCategory = 'GitHub Contributions';
      if (category.toLowerCase() === 'courses') formattedCategory = 'Course Certificates';
      if (category.toLowerCase() === 'hackathons') formattedCategory = 'Hackathons';
      if (category.toLowerCase() === 'workshops') formattedCategory = 'Workshops';

      const title = fileName
        .split('.')[0]
        .replace(/[-_]/g, ' ')
        .replace(/\s*\(.*?\)\s*/g, '') // Remove text in parentheses
        .replace(/Wrokshop/ig, 'Workshop') // Fix specific typo
        .trim();

      cats.add(formattedCategory);
      if (!certs[formattedCategory]) certs[formattedCategory] = [];
      
      certs[formattedCategory].push({
        id: index,
        image: (modules[path] as any).default,
        title: title || `Certification ${index + 1}`,
      });
    });

    return {
      categories: Array.from(cats).sort(),
      certificationsByCategory: certs,
    };
  }, []);

  const [activeTab, setActiveTab] = useState<string>(categories[0] || 'Other');

  if (categories.length === 0) {
    return null;
  }

  const activeCertifications = certificationsByCategory[activeTab] || [];

  return (
    <>
      <section id="certifications" className="py-24 px-4 bg-zinc-900/30 border-t border-zinc-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-100">Certifications & Achievements</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
            <p className="mt-4 text-zinc-400">My professional certifications, open-source contributions, and event participations</p>
          </motion.div>

          {/* Tabs UI */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === category
                      ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500'
                      : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border border-zinc-700/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Certification Grid */}
          <motion.div 
            key={activeTab} // Using key triggers re-animation on tab change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {activeCertifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-zinc-800/40 rounded-2xl p-4 border border-zinc-700/50 hover:border-blue-500/50 transition-all shadow-lg group flex flex-col cursor-pointer hover:-translate-y-1"
                onClick={() => setSelectedImage(cert.image)}
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 flex items-center justify-center relative mb-4">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white drop-shadow-md">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </div>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-auto text-center px-2">
                  <h3 className="text-zinc-100 font-medium line-clamp-2" title={cert.title}>{cert.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out backdrop-blur-sm"
          >
            <motion.button
              className="absolute top-6 right-6 text-white hover:text-blue-400 bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Certificate Full View"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
