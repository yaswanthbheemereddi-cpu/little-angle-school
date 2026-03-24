import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Bell, Search, Calendar } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const categoryColors = {
  Admission: 'bg-blue-100 text-blue-700 border-blue-200',
  Events: 'bg-purple-100 text-purple-700 border-purple-200',
  General: 'bg-gray-100 text-gray-700 border-gray-200',
  Holiday: 'bg-green-100 text-green-700 border-green-200',
  Finance: 'bg-yellow-100 text-yellow-700 border-yellow-200',
};

const demoNotices = [
  { _id: '1', title: 'Admissions Open 2025-26', category: 'Admission', isImportant: true, content: 'Applications are now being accepted for all classes from Nursery to Class X for the academic year 2025-26. Visit the school office or apply online.', createdAt: new Date() },
  { _id: '2', title: 'Annual Sports Day – April 15, 2025', category: 'Events', isImportant: false, content: 'Annual Sports Day will be conducted on April 15, 2025 at the school grounds. All students must participate. Parents are invited.', createdAt: new Date(Date.now() - 86400000 * 1) },
  { _id: '3', title: 'Parent-Teacher Meeting – March 30', category: 'General', isImportant: false, content: 'A Parent-Teacher Meeting is scheduled for March 30, 2025 from 10:00 AM to 1:00 PM. All parents are requested to attend.', createdAt: new Date(Date.now() - 86400000 * 2) },
  { _id: '4', title: 'School Holiday – Ugadi', category: 'Holiday', isImportant: false, content: 'School will remain closed on March 30, 2025 on the occasion of Ugadi. School will reopen on March 31.', createdAt: new Date(Date.now() - 86400000 * 3) },
  { _id: '5', title: 'Annual Day Registration Open', category: 'Events', isImportant: true, content: 'Students who wish to participate in Annual Day cultural programmes should register with their class teacher by March 25, 2025.', createdAt: new Date(Date.now() - 86400000 * 4) },
  { _id: '6', title: 'Fee Payment Reminder – Quarter 4', category: 'Finance', isImportant: false, content: 'Parents are reminded to pay the 4th quarter fee before April 10, 2025 to avoid late fee penalty.', createdAt: new Date(Date.now() - 86400000 * 5) },
  { _id: '7', title: 'Science Exhibition – May 2025', category: 'Events', isImportant: false, content: 'Annual Science Exhibition is scheduled for May 10, 2025. Students from Class VI–X are encouraged to participate individually or in groups.', createdAt: new Date(Date.now() - 86400000 * 6) },
];

const categories = ['All', 'Admission', 'Events', 'General', 'Holiday', 'Finance'];
const PAGE_SIZE = 6;

export default function NoticeBoard() {
  const [notices, setNotices] = useState(demoNotices);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get('/api/notices').then(r => { if (r.data?.length) setNotices(r.data); }).catch(() => {});
  }, []);

  const filtered = notices
    .filter(n => activeCategory === 'All' || n.category === activeCategory)
    .filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()));

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = filtered.length > page * PAGE_SIZE;

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="hero-gradient py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-yellow-400/10 rounded-full" />
        </div>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 max-w-3xl mx-auto px-4">
          <motion.p variants={fadeUp} className="text-yellow-400 font-semibold text-sm uppercase tracking-widest mb-3">Stay Informed</motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold font-poppins">Notice Board</motion.h1>
          <motion.p variants={fadeUp} className="text-blue-200 mt-4 text-lg">Latest announcements, events, holidays, and updates from Little Angels High School.</motion.p>
        </motion.div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search notices..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? 'bg-blue-800 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-blue-50'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notice Count */}
        <p className="text-gray-500 text-sm mb-6">{filtered.length} notice{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Notices */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No notices found for your search.</p>
          </div>
        ) : (
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-4">
            {paginated.map(n => (
              <motion.div key={n._id} variants={fadeUp}
                className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${n.isImportant ? 'border-red-500' : 'border-blue-200'} border border-gray-100 relative`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${categoryColors[n.category] || 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                        {n.category}
                      </span>
                      {n.isImportant && (
                        <span className="text-xs font-bold text-red-500 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">⚠ IMPORTANT</span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">{n.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{n.content}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs whitespace-nowrap flex-shrink-0">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {hasMore && (
          <div className="text-center mt-8">
            <button onClick={() => setPage(p => p + 1)} className="btn-primary px-8 py-3">
              Load More Notices
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
