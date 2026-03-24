import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Award, BookOpen, Users, Trophy, Star, ChevronRight,
  Phone, ArrowRight, Quote, Bell, CheckCircle, GraduationCap, Heart
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.13 } } };

const highlights = [
  { icon: <BookOpen className="w-7 h-7" />, title: 'AP Board Curriculum', desc: 'Comprehensive AP State Board syllabus from Nursery to Class X with qualified, experienced teachers.', color: 'bg-blue-50 text-blue-700' },
  { icon: <Users className="w-7 h-7" />, title: 'Nurturing Environment', desc: 'A safe, inclusive campus where every child is known by name and supported to reach their full potential.', color: 'bg-green-50 text-green-700' },
  { icon: <Trophy className="w-7 h-7" />, title: 'Excellent Results', desc: '95%+ board pass rate with students consistently securing top ranks in district-level examinations.', color: 'bg-yellow-50 text-yellow-700' },
  { icon: <Award className="w-7 h-7" />, title: 'Co-Curricular Excellence', desc: 'Annual day, sports meet, science fair, cultural events, and inter-school competitions for all-round growth.', color: 'bg-purple-50 text-purple-700' },
  { icon: <Star className="w-7 h-7" />, title: 'Modern Facilities', desc: 'Digital classrooms, science lab, library, indoor and outdoor play areas for hands-on, experiential learning.', color: 'bg-red-50 text-red-700' },
  { icon: <Heart className="w-7 h-7" />, title: 'Parent Partnership', desc: 'Regular parent-teacher meetings, progress reports, and an open-door policy for transparent communication.', color: 'bg-pink-50 text-pink-700' },
];

const testimonials = [
  { name: 'Srinivas Rao', role: 'Parent of Class VIII student', text: 'Little Angels has transformed my daughter. The teachers are dedicated, the values they instil go beyond textbooks. She has achieved 95% in her exams this year!', stars: 5 },
  { name: 'Lakshmi Devi', role: 'Parent of Class V student', text: 'The school genuinely cares about each child. My son used to be shy, but after just one year here his confidence has grown tremendously. Highly recommend!', stars: 5 },
  { name: 'Raju Naidu', role: 'Parent of Class X alumni', text: 'My daughter completed Class X from Little Angels and scored distinction. The teachers prepared her thoroughly for board exams. Forever grateful to this school.', stars: 5 },
];

const stats = [
  { num: '500+', label: 'Students Enrolled' },
  { num: '25+', label: 'Experienced Faculty' },
  { num: '15+', label: 'Years of Excellence' },
  { num: '95%', label: 'Pass Rate' },
];

const WHATSAPP = 'https://wa.me/917569703277?text=Hello%2C%20I%20am%20interested%20in%20admission%20at%20Little%20Angels%20High%20School.';

const demoNotices = [
  { _id: '1', title: 'Admissions Open 2025-26', category: 'Admission', isImportant: true, content: 'Applications are now being accepted for all classes from Nursery to Class X.', createdAt: new Date().toISOString() },
  { _id: '2', title: 'Annual Sports Day – April 15', category: 'Events', isImportant: false, content: 'Annual Sports Day will be conducted on April 15. All students must participate.', createdAt: new Date().toISOString() },
  { _id: '3', title: 'Parent-Teacher Meeting', category: 'General', isImportant: false, content: 'PTM scheduled for March 30. All parents are requested to attend.', createdAt: new Date().toISOString() },
];

const categoryColors = {
  Admission: 'bg-blue-100 text-blue-700',
  Events: 'bg-purple-100 text-purple-700',
  General: 'bg-gray-100 text-gray-700',
  Holiday: 'bg-green-100 text-green-700',
  Finance: 'bg-yellow-100 text-yellow-700',
};

export default function Home() {
  const [notices, setNotices] = useState(demoNotices);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    axios.get('/api/notices').then(r => { if (r.data?.length) setNotices(r.data.slice(0, 3)); }).catch(() => {});
    axios.get('/api/gallery').then(r => { if (r.data?.length) setGallery(r.data.slice(0, 5)); }).catch(() => {});
  }, []);

  return (
    <div className="pt-8">
      {/* ── HERO ── */}
      <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-white/5 rounded-full" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-white/5 rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-16">
          {/* Left */}
          <motion.div initial="hidden" animate="visible" variants={stagger} className="text-white">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 text-sm px-4 py-2 rounded-full mb-6 font-semibold border border-yellow-400/30">
              <Star className="w-4 h-4 fill-yellow-300" /> Admissions Open 2025–26
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight font-poppins">
              Little Angels<br /><span className="text-yellow-400">High School</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-2xl text-yellow-200 mt-3 font-semibold" style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}>
              లిటిల్ అంగెల్స్ హై పాఠశాల
            </motion.p>
            <motion.p variants={fadeUp} className="text-blue-100 text-lg mt-5 leading-relaxed max-w-lg">
              <strong className="text-yellow-300">Building Bright Futures</strong> — A premier educational institution in Balighattam, Narsipatnam providing quality education from Nursery to Class X since 2009.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
              <Link to="/admissions" className="btn-secondary flex items-center gap-2">
                Apply for Admission <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-white bg-green-500 hover:bg-green-600 font-semibold px-5 py-3 rounded-xl transition-all">
                <Phone className="w-4 h-4" /> WhatsApp Us
              </a>
            </motion.div>
            {/* Quick facts */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-8">
              {['AP Board Affiliated', 'Nursery – Class X', 'Est. 2009', 'Balighattam, Narsipatnam'].map(fact => (
                <span key={fact} className="flex items-center gap-1.5 text-sm text-blue-200">
                  <CheckCircle className="w-4 h-4 text-yellow-400" /> {fact}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right – hero image + stats */}
          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col gap-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img src="/images/school-hero.png" alt="Little Angels High School campus" className="w-full h-72 object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(s => (
                <div key={s.label} className="glass rounded-2xl p-4 text-center">
                  <p className="text-3xl font-bold text-yellow-400 font-poppins">{s.num}</p>
                  <p className="text-blue-100 text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-yellow-600 font-semibold text-sm uppercase tracking-widest mb-2">Why Parents Choose Us</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">What Makes Us Different</motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle mt-3">Excellence in education, character building, and holistic development for every child.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="card-hover bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-5`}>{item.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 font-poppins">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NOTICE BOARD PREVIEW ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-blue-700 font-semibold text-sm uppercase tracking-widest mb-1">Latest Updates</p>
              <h2 className="section-title">Notice Board</h2>
            </div>
            <Link to="/notices" className="flex items-center gap-1 text-blue-700 font-semibold hover:gap-2 transition-all text-sm">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {notices.map(n => (
              <motion.div key={n._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 card-hover relative overflow-hidden">
                {n.isImportant && <div className="absolute top-0 left-0 right-0 h-1 bg-red-500 rounded-t-2xl" />}
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="w-4 h-4 text-blue-700" />
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[n.category] || 'bg-gray-100 text-gray-700'}`}>{n.category}</span>
                  {n.isImportant && <span className="text-xs text-red-500 font-bold">IMPORTANT</span>}
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-snug">{n.title}</h3>
                <p className="text-gray-500 text-xs mt-2 line-clamp-2">{n.content}</p>
                <p className="text-gray-400 text-xs mt-3">{new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLASSROOM IMAGE STRIP ── */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-white">
              <p className="text-yellow-400 font-semibold text-sm uppercase tracking-widest mb-3">Life at Little Angels</p>
              <h2 className="text-4xl font-bold font-poppins mb-5">A Place Where Learning Comes Alive</h2>
              <p className="text-blue-200 leading-relaxed mb-6">
                Our classrooms are vibrant, our playgrounds are full of laughter, and our teachers are passionate. Every day at Little Angels is a new adventure in learning, friendship, and growth.
              </p>
              <Link to="/gallery" className="btn-secondary inline-flex items-center gap-2">
                View Gallery <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="/images/classroom.png" alt="Students learning in classroom" className="w-full h-80 object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-yellow-600 font-semibold text-sm uppercase tracking-widest mb-2">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">What Parents Say</motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 card-hover">
                <Quote className="w-8 h-8 text-blue-200 mb-4" />
                <p className="text-gray-600 text-sm leading-relaxed italic mb-5">"{t.text}"</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.stars)].map((_, s) => <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPAL QUOTE ── */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-10 text-white flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
          <div className="flex-shrink-0">
            <img src="/images/principal.png" alt="Principal" className="w-32 h-32 rounded-2xl object-cover border-4 border-yellow-400" />
          </div>
          <div className="relative z-10">
            <Quote className="w-8 h-8 text-yellow-400/40 mb-3" />
            <p className="text-blue-100 leading-relaxed italic text-lg">
              "At Little Angels High School, we believe every child is a star waiting to shine. We are committed not just to academic excellence, but to building young individuals with strong values, resilience, and a compassionate heart."
            </p>
            <p className="text-yellow-400 font-semibold mt-4">— Principal, Little Angels High School</p>
            <p className="text-blue-300 text-sm">B.Ed, M.A., 20+ years in education</p>
          </div>
        </motion.div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-yellow-400 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-9 h-9 text-yellow-400" />
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-blue-900 font-poppins mb-4">
              Secure Your Child's Future Today
            </motion.h2>
            <motion.p variants={fadeUp} className="text-blue-800 text-lg mb-8">
              Limited seats available for 2025-26. Apply online or walk into our school office to enquire.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link to="/admissions" className="btn-primary">Apply for Admission</Link>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                <Phone className="w-4 h-4" /> Chat on WhatsApp
              </a>
              <Link to="/contact" className="flex items-center gap-2 bg-white/30 hover:bg-white/50 text-blue-900 font-semibold px-6 py-3 rounded-xl transition-all">
                Contact School
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
