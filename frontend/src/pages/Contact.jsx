import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { MapPin, Phone, Mail, Send, Clock, MessageSquare } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
const WHATSAPP = 'https://wa.me/917569703277?text=Hello%2C%20I%20have%20an%20enquiry%20about%20Little%20Angels%20High%20School.';

const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700 text-sm";

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contact', form);
      setSent(true);
      toast.success('Message sent! We will get back to you shortly.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="hero-gradient py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-yellow-400/10 rounded-full" />
        </div>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 max-w-3xl mx-auto px-4">
          <motion.p variants={fadeUp} className="text-yellow-400 font-semibold text-sm uppercase tracking-widest mb-3">We'd Love to Hear From You</motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold font-poppins">Contact Us</motion.h1>
          <motion.p variants={fadeUp} className="text-blue-200 mt-4 text-lg">Reach out for admissions, enquiries, or general information. We respond promptly.</motion.p>
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: <Phone className="w-6 h-6" />, label: 'Call Us', value: '+91 75697 03277', sub: 'Mon–Sat, 8 AM – 4 PM', href: 'tel:+917569703277', btn: 'Call Now', color: 'bg-blue-600' },
              { icon: <MessageSquare className="w-6 h-6" />, label: 'WhatsApp', value: 'Chat with us', sub: 'Quick responses', href: WHATSAPP, btn: 'Open WhatsApp', color: 'bg-green-600' },
              { icon: <Mail className="w-6 h-6" />, label: 'Email', value: 'info@littleangelsschool.in', sub: 'We reply within 24 hrs', href: 'mailto:info@littleangelsschool.in', btn: 'Send Email', color: 'bg-purple-600' },
            ].map(item => (
              <motion.a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover text-center">
                <div className={`w-14 h-14 ${item.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-4`}>{item.icon}</div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{item.label}</p>
                <p className="font-bold text-gray-900 text-sm mb-1">{item.value}</p>
                <p className="text-gray-400 text-xs">{item.sub}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          {/* Contact Info + Map */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="section-title mb-8">Find Us</motion.h2>
            <div className="space-y-5 mb-8">
              {[
                { icon: <MapPin className="w-5 h-5" />, label: 'Address', val: 'MJ57+29P, Balighattam\nNarsipatnam, Andhra Pradesh 531118\n(Inside Narsipatnam Srinivasa I.T.I Campus)' },
                { icon: <Phone className="w-5 h-5" />, label: 'Phone', val: '+91 75697 03277' },
                { icon: <Mail className="w-5 h-5" />, label: 'Email', val: 'info@littleangelsschool.in\nadmissions@littleangelsschool.in' },
                { icon: <Clock className="w-5 h-5" />, label: 'Office Hours', val: 'Monday – Saturday: 8:00 AM – 4:00 PM\nSunday: Closed' },
              ].map(item => (
                <motion.div key={item.label} variants={fadeUp} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                    <p className="text-gray-500 text-sm whitespace-pre-line mt-0.5">{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Google Maps */}
            <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-60">
              <iframe
                title="Little Angels High School – Balighattam, Narsipatnam"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15197.0!2d82.61!3d17.674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37be8f2e52d2ef%3A0x7b3f2f3c6e4d1a2b!2sNarsipatnam%2C%20Andhra%20Pradesh%20531116!5e0!3m2!1sen!2sin!4v1711261214000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-gray-100">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Send className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm mb-6">We have received your message and will get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-primary px-6 py-2.5 text-sm">Send Another</button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-blue-900 font-poppins mb-2">Send Us a Message</h2>
                <p className="text-gray-500 text-sm mb-7">For admissions enquiries, feedback, or any other questions.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Your Name *</label>
                      <input id="contact-name" name="name" required className={inputClass} value={form.name} onChange={handleChange} placeholder="Full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Phone Number</label>
                      <input id="contact-phone" name="phone" type="tel" className={inputClass} value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address *</label>
                    <input id="contact-email" name="email" type="email" required className={inputClass} value={form.email} onChange={handleChange} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Subject</label>
                    <select id="contact-subject" name="subject" className={inputClass} value={form.subject} onChange={handleChange}>
                      <option value="">Select a subject</option>
                      <option>Admission Enquiry</option>
                      <option>Fee Information</option>
                      <option>Transport Information</option>
                      <option>General Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Message *</label>
                    <textarea id="contact-message" name="message" required rows={4} className={inputClass} value={form.message} onChange={handleChange} placeholder="Write your message here..." />
                  </div>
                  <button type="submit" id="contact-submit" disabled={loading}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-base disabled:opacity-60">
                    {loading ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
