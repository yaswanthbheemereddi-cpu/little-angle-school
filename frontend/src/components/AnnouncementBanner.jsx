import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="announcement-banner"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-[100] bg-yellow-400 text-blue-900 flex items-center justify-between px-4 py-1.5 text-sm font-semibold"
      >
        <div className="flex items-center gap-2 overflow-hidden flex-1">
          <Bell className="w-4 h-4 flex-shrink-0 animate-bounce" />
          <div className="overflow-hidden">
            <motion.span
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="block whitespace-nowrap"
            >
              🎓 Admissions Open 2025-26 | Classes Nursery to X | Call: +91 75697 03277 | Location: Balighattam, Narsipatnam, Andhra Pradesh
            </motion.span>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          aria-label="Close announcement"
          className="ml-3 p-0.5 hover:bg-yellow-500 rounded flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
