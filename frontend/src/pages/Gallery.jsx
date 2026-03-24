import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { X, Image } from 'lucide-react';

const CATEGORIES = ['All', 'Events', 'Classrooms', 'Sports', 'Cultural', 'Campus'];

const demoImages = [
  { _id: '1', title: 'Annual Day Celebration', category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&q=80', description: 'Students performing at Annual Day' },
  { _id: '2', title: 'Science Lab', category: 'Classrooms', imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80', description: 'Modern science laboratory' },
  { _id: '3', title: 'Sports Day', category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=400&q=80', description: 'Annual sports day competition' },
  { _id: '4', title: 'Cultural Program', category: 'Cultural', imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80', description: 'Cultural dance performance' },
  { _id: '5', title: 'School Campus', category: 'Campus', imageUrl: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=400&q=80', description: 'Our beautiful campus' },
  { _id: '6', title: 'Classroom Activity', category: 'Classrooms', imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80', description: 'Interactive classroom learning' },
  { _id: '7', title: 'Value Education', category: 'Events', imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&q=80', description: 'Value education assembly' },
  { _id: '8', title: 'Sports Ground', category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&q=80', description: 'Our sports ground' },
];

export default function Gallery() {
  const [images, setImages] = useState(demoImages);
  const [selected, setSelected] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    axios.get('/api/gallery').then(res => {
      if (res.data.length > 0) setImages([...res.data, ...demoImages]);
    }).catch(() => {});
  }, []);

  const filtered = selected === 'All' ? images : images.filter(img => img.category === selected);

  return (
    <div className="pt-24">
      <section className="hero-gradient py-16 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-yellow-300 font-medium mb-2">Our Moments</p>
          <h1 className="text-4xl md:text-5xl font-bold font-poppins">Gallery</h1>
          <p className="text-blue-200 mt-3 text-lg">Capturing memories from events, activities, and campus life</p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selected === cat ? 'bg-blue-800 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((img) => (
              <motion.div
                key={img._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-square bg-gray-100"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white font-semibold text-sm">{img.title}</p>
                    <p className="text-yellow-300 text-xs">{img.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Image className="w-14 h-14 mx-auto mb-3 opacity-40" />
            <p>No images in this category yet.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-3xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setLightbox(null)} className="absolute -top-10 right-0 text-white hover:text-yellow-400">
                <X className="w-7 h-7" />
              </button>
              <img src={lightbox.imageUrl} alt={lightbox.title} className="w-full rounded-2xl shadow-2xl" />
              <div className="mt-3 text-center">
                <p className="text-white font-semibold">{lightbox.title}</p>
                <p className="text-yellow-400 text-sm">{lightbox.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
