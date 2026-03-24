import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, FlaskConical, Calculator, Globe2, Music2, Dumbbell, Microscope, Monitor } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const classes = [
  {
    id: 'pre', label: 'Pre-Primary', range: 'Nursery · LKG · UKG',
    desc: 'Play-based learning focused on early childhood development, motor skills, rhymes, number recognition, alphabets, drawing, and storytelling.',
    subjects: ['English (Oral & Written)', 'Telugu (Oral)', 'Numbers & Shapes', 'Environmental Awareness', 'Art & Craft', 'Rhymes & Stories', 'Physical Play'],
    highlight: 'Activity-based curriculum in a safe, colourful environment with daily morning assembly.',
  },
  {
    id: 'primary', label: 'Primary', range: 'Class I – V',
    desc: 'AP Board curriculum laying the foundation with strong basics in language, mathematics, and environmental science.',
    subjects: ['English', 'Telugu', 'Hindi', 'Mathematics', 'Environmental Science (EVS)', 'Art & Craft', 'Physical Education'],
    highlight: 'Continual assessment with project-based learning, unit tests, and half-yearly exams.',
  },
  {
    id: 'middle', label: 'Middle School', range: 'Class VI – VIII',
    desc: 'In-depth subject study introducing dedicated Science and Social Studies with practical lab sessions.',
    subjects: ['English', 'Telugu', 'Hindi', 'Mathematics', 'General Science', 'Social Studies', 'Computer Basics', 'Physical Education'],
    highlight: 'Science experiments, model making, map work, and inter-class quiz competitions.',
  },
  {
    id: 'high', label: 'High School', range: 'Class IX – X',
    desc: 'Board exam preparation with intensive subject coaching, mock tests, and individual attention for AP SSC exams.',
    subjects: ['English (Paper I & II)', 'Telugu / Hindi (Second Language)', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Social Studies (History, Geography, Civics)', 'Computer Science (optional)'],
    highlight: 'Special doubt-clearing sessions, previous year paper practice, and board exam guidance.',
  },
];

const schedule = [
  { time: '8:30 AM', activity: 'School Gates Open' },
  { time: '9:00 AM', activity: 'Morning Assembly & Prayer' },
  { time: '9:15 AM', activity: 'Period 1 & 2' },
  { time: '10:45 AM', activity: 'Short Break (15 min)' },
  { time: '11:00 AM', activity: 'Period 3 & 4' },
  { time: '12:30 PM', activity: 'Lunch Break (30 min)' },
  { time: '1:00 PM', activity: 'Period 5 & 6' },
  { time: '2:30 PM', activity: 'Games / Activity Period' },
  { time: '3:00 PM', activity: 'Dispersal' },
];

const subjectIcons = {
  'English': <BookOpen className="w-5 h-5" />, 'Mathematics': <Calculator className="w-5 h-5" />,
  'General Science': <FlaskConical className="w-5 h-5" />, 'Social Studies': <Globe2 className="w-5 h-5" />,
  'Music': <Music2 className="w-5 h-5" />, 'Physical Education': <Dumbbell className="w-5 h-5" />,
  'Biology': <Microscope className="w-5 h-5" />, 'Computer': <Monitor className="w-5 h-5" />,
};

const subjectColors = ['bg-blue-50 border-blue-200 text-blue-700', 'bg-green-50 border-green-200 text-green-700', 'bg-purple-50 border-purple-200 text-purple-700', 'bg-yellow-50 border-yellow-200 text-yellow-700', 'bg-red-50 border-red-200 text-red-700', 'bg-pink-50 border-pink-200 text-pink-700', 'bg-teal-50 border-teal-200 text-teal-700', 'bg-orange-50 border-orange-200 text-orange-700'];

export default function Academics() {
  const [active, setActive] = useState('pre');
  const current = classes.find(c => c.id === active);

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="hero-gradient py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-yellow-400/10 rounded-full" />
        </div>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 max-w-3xl mx-auto px-4">
          <motion.p variants={fadeUp} className="text-yellow-400 font-semibold text-sm uppercase tracking-widest mb-3">AP Board Affiliated</motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold font-poppins">Academics</motion.h1>
          <motion.p variants={fadeUp} className="text-blue-200 mt-4 text-lg">Quality education from Nursery to Class X following the AP State Board curriculum.</motion.p>
        </motion.div>
      </section>

      {/* Class Tabs */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
          <motion.p variants={fadeUp} className="text-yellow-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Classes</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">Curriculum by Class Level</motion.h2>
        </motion.div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {classes.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all ${active === c.id ? 'bg-blue-800 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'}`}>
              {c.label}
              <span className={`ml-2 text-xs ${active === c.id ? 'text-blue-200' : 'text-gray-400'}`}>{c.range}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-8 text-white">
              <h3 className="text-2xl font-bold font-poppins mb-1">{current.label} — {current.range}</h3>
              <p className="text-blue-200 leading-relaxed">{current.desc}</p>
            </div>
            <div className="p-8">
              <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
                <p className="text-yellow-800 font-semibold text-sm">📌 {current.highlight}</p>
              </div>
              <h4 className="font-bold text-gray-900 mb-5">Subjects Taught</h4>
              <div className="flex flex-wrap gap-3">
                {current.subjects.map((sub, i) => (
                  <span key={sub} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border ${subjectColors[i % subjectColors.length]}`}>
                    {subjectIcons[sub.split(' ')[0]] || <BookOpen className="w-4 h-4" />}
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* School Schedule */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-10">
            <motion.p variants={fadeUp} className="text-yellow-600 font-semibold text-sm uppercase tracking-widest mb-2">Daily Schedule</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">School Timetable</motion.h2>
          </motion.div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {schedule.map((s, i) => (
              <motion.div key={s.time} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className={`flex items-center gap-6 px-6 py-4 ${i !== schedule.length - 1 ? 'border-b border-gray-100' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <span className="text-blue-800 font-bold text-sm w-20 flex-shrink-0">{s.time}</span>
                <div className="w-2 h-2 bg-blue-800 rounded-full flex-shrink-0" />
                <span className="text-gray-700 text-sm">{s.activity}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
          <motion.p variants={fadeUp} className="text-yellow-600 font-semibold text-sm uppercase tracking-widest mb-2">How We Teach</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">Our Teaching Approach</motion.h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { emoji: '🎯', title: 'Concept-First Learning', desc: 'Every concept is explained with real-world examples before moving to practice problems.' },
            { emoji: '📊', title: 'Continuous Assessment', desc: 'Unit tests, projects, and oral assessments throughout the year — not just final exams.' },
            { emoji: '🤝', title: 'Individual Attention', desc: "Small class sizes allow teachers to identify and support each student's unique learning style." },
            { emoji: '🧪', title: 'Hands-On Activities', desc: 'Science experiments, map work, model building, and presentations make learning memorable.' },
          ].map((m, i) => (
            <motion.div key={m.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 card-hover text-center">
              <div className="text-4xl mb-4">{m.emoji}</div>
              <h3 className="font-bold text-gray-900 text-base mb-2 font-poppins">{m.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
