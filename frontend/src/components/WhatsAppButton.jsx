import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      id="whatsapp-btn"
      href="https://wa.me/917569703277?text=Hello%20Little%20Angels%20High%20School%2C%20I%20need%20information%20about%20admissions."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="whatsapp-btn w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer transition-colors duration-300"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </motion.div>
    </a>
  );
}
