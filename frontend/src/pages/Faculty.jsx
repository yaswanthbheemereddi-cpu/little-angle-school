import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const departments = [
  {
    name: 'Administration',
    members: [
      { name: 'Sri V. Subrahmanyam', role: 'Principal', qual: 'M.A, B.Ed — 22 years exp.', subjects: 'English & Overall Administration', initials: 'VS', color: 'bg-blue-800' },
      { name: 'Smt. K. Saraswathi', role: 'Vice-Principal', qual: 'M.Sc, B.Ed — 18 years exp.', subjects: 'Mathematics', initials: 'KS', color: 'bg-blue-700' },
    ],
  },
  {
    name: 'Languages',
    members: [
      { name: 'Sri P. Ramakrishna', role: 'Telugu Teacher', qual: 'M.A(Telugu), B.Ed — 14 years', subjects: 'Telugu (VI–X)', initials: 'PR', color: 'bg-green-700' },
      { name: 'Smt. G. Durga', role: 'English Teacher', qual: 'M.A(English), B.Ed — 10 years', subjects: 'English (I–VIII)', initials: 'GD', color: 'bg-green-600' },
      { name: 'Sri A. Santosh', role: 'Hindi Teacher', qual: 'B.A(Hindi), B.Ed — 8 years', subjects: 'Hindi (III–X)', initials: 'AS', color: 'bg-teal-600' },
    ],
  },
  {
    name: 'Mathematics & Science',
    members: [
      { name: 'Sri K. Venkatesh', role: 'Mathematics Teacher', qual: 'M.Sc(Maths), B.Ed — 12 years', subjects: 'Mathematics (VI–X)', initials: 'KV', color: 'bg-purple-700' },
      { name: 'Smt. M. Jayalakshmi', role: 'Science Teacher', qual: 'M.Sc(Physics), B.Ed — 11 years', subjects: 'Physics & Chemistry (VI–X)', initials: 'MJ', color: 'bg-purple-600' },
      { name: 'Sri B. Raju', role: 'Biology Teacher', qual: 'M.Sc(Biology), B.Ed — 9 years', subjects: 'Biology (VIII–X)', initials: 'BR', color: 'bg-indigo-600' },
    ],
  },
  {
    name: 'Social Studies & Computer',
    members: [
      { name: 'Smt. P. Anitha', role: 'Social Studies Teacher', qual: 'M.A(History), B.Ed — 9 years', subjects: 'History, Geography, Civics (VI–X)', initials: 'PA', color: 'bg-orange-600' },
      { name: 'Sri L. Chandra Sekhar', role: 'Computer Teacher', qual: 'MCA — 7 years', subjects: 'Computer Science (VI–X)', initials: 'LC', color: 'bg-red-600' },
    ],
  },
  {
    name: 'Primary Section',
    members: [
      { name: 'Smt. R. Padmavathi', role: 'Class Teacher – V', qual: 'B.Ed — 8 years', subjects: 'All Subjects (Class V)', initials: 'RP', color: 'bg-yellow-600' },
      { name: 'Smt. N. Usha Rani', role: 'Class Teacher – III & IV', qual: 'B.Ed — 7 years', subjects: 'All Subjects (Class III–IV)', initials: 'NU', color: 'bg-yellow-700' },
      { name: 'Smt. T. Madhavi', role: 'Class Teacher – I & II', qual: 'B.Ed — 6 years', subjects: 'All Subjects (Class I–II)', initials: 'TM', color: 'bg-amber-600' },
    ],
  },
  {
    name: 'Pre-Primary & Activities',
    members: [
      { name: 'Smt. D. Sujatha', role: 'Pre-Primary Teacher', qual: 'NTT, D.Ed — 8 years', subjects: 'Nursery, LKG, UKG', initials: 'DS', color: 'bg-pink-600' },
      { name: 'Sri C. Vijay Kumar', role: 'Physical Education Teacher', qual: 'B.P.Ed — 6 years', subjects: 'Sports & Physical Education', initials: 'CV', color: 'bg-rose-600' },
      { name: 'Smt. K. Lavanya', role: 'Art & Craft Teacher', qual: 'Diploma in Fine Arts — 5 years', subjects: 'Art, Craft & Drawing', initials: 'KL', color: 'bg-fuchsia-600' },
    ],
  },
];

export default function Faculty() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="hero-gradient py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-yellow-400/10 rounded-full" />
        </div>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 max-w-3xl mx-auto px-4">
          <motion.p variants={fadeUp} className="text-yellow-400 font-semibold text-sm uppercase tracking-widest mb-3">The Heart of Our School</motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold font-poppins">Our Faculty</motion.h1>
          <motion.p variants={fadeUp} className="text-blue-200 mt-4 text-lg">25+ qualified, passionate, and experienced educators dedicated to every child's growth.</motion.p>
        </motion.div>
      </section>

      {/* Faculty Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: <GraduationCap className="w-6 h-6" />, num: '25+', label: 'Total Teachers' },
              { icon: <BookOpen className="w-6 h-6" />, num: '12+', label: 'Avg. Years Exp.' },
              { icon: <Award className="w-6 h-6" />, num: '100%', label: 'B.Ed Qualified' },
              { icon: <GraduationCap className="w-6 h-6" />, num: '8+', label: 'Postgraduates' },
            ].map(s => (
              <div key={s.label} className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                <div className="w-10 h-10 bg-blue-800 text-white rounded-xl flex items-center justify-center mx-auto mb-3">{s.icon}</div>
                <p className="text-2xl font-bold text-blue-900 font-poppins">{s.num}</p>
                <p className="text-gray-500 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Department Sections */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {departments.map((dept, di) => (
          <div key={dept.name}>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex items-center gap-3 mb-8">
              <div className="h-8 w-1 bg-yellow-400 rounded-full flex-shrink-0" />
              <h2 className="text-xl font-bold text-blue-900 font-poppins">{dept.name}</h2>
              <div className="flex-1 h-px bg-gray-200" />
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {dept.members.map((m, i) => (
                <motion.div key={m.name}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover flex gap-4 items-start">
                  <div className={`w-14 h-14 ${m.color} text-white rounded-2xl flex items-center justify-center text-xl font-bold font-poppins flex-shrink-0`}>
                    {m.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm font-poppins">{m.name}</h3>
                    <p className="text-blue-700 text-xs font-semibold mt-0.5">{m.role}</p>
                    <p className="text-gray-500 text-xs mt-1">{m.subjects}</p>
                    <p className="text-gray-400 text-xs mt-1.5 italic">{m.qual}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
