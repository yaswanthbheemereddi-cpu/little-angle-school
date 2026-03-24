import { motion } from 'framer-motion';
import { Eye, Target, Heart, GraduationCap, Users, Lightbulb, Shield } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.13 } } };

const milestones = [
  { year: '2009', title: 'The Beginning', desc: 'Little Angels High School was founded by a group of dedicated local educators with a vision to bring quality education to rural Narsipatnam.' },
  { year: '2012', title: 'Growing Strong', desc: 'Expanded to Class VIII and added a Science Laboratory. Student strength crossed 150. First batch of board exam students scored remarkably well.' },
  { year: '2015', title: 'New Campus Wing', desc: 'A new wing with digital classrooms and a library was inaugurated. The school was officially affiliated with the Andhra Pradesh Board of Secondary Education.' },
  { year: '2018', title: 'Award & Recognition', desc: 'Received the "Best School in Rural Education" commendation from the Visakhapatnam District Collector. Began inter-school cultural events.' },
  { year: '2023', title: 'Milestone 500+', desc: 'Student strength crossed 500. Introduced computer lab, added NCC troop, and launched the annual science exhibition.' },
];

const values = [
  { icon: <GraduationCap className="w-7 h-7" />, title: 'Academic Excellence', desc: 'Setting the highest standards in learning with AP Board curriculum and passionate, qualified teachers.', color: 'bg-blue-600' },
  { icon: <Shield className="w-7 h-7" />, title: 'Integrity & Values', desc: 'Building honest, responsible citizens with strong moral foundations that guide them through life.', color: 'bg-green-600' },
  { icon: <Users className="w-7 h-7" />, title: 'Community & Belonging', desc: 'Every student, teacher, and parent is part of one family united by a shared commitment to growth.', color: 'bg-purple-600' },
  { icon: <Lightbulb className="w-7 h-7" />, title: 'Innovation & Curiosity', desc: 'Inspiring students to ask questions, experiment boldly, and discover their unique talents.', color: 'bg-yellow-600' },
];

const faculty = [
  { name: 'Sri K. Venkatesh', subject: 'Mathematics · Science', qual: 'M.Sc, B.Ed – 12 years exp.', initials: 'KV' },
  { name: 'Smt. P. Anitha', subject: 'Telugu · Social Studies', qual: 'M.A, B.Ed – 10 years exp.', initials: 'PA' },
  { name: 'Sri R. Suresh Babu', subject: 'English · EVS', qual: 'M.A(Eng), B.Ed – 8 years exp.', initials: 'RS' },
  { name: 'Smt. L. Padmavathi', subject: 'Hindi · Art & Craft', qual: 'B.A(Hindi), B.Ed – 9 years exp.', initials: 'LP' },
];

export default function About() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="hero-gradient py-20 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-yellow-400/10 rounded-full" />
        </div>
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 max-w-3xl mx-auto px-4">
          <motion.p variants={fadeUp} className="text-yellow-400 font-semibold text-sm uppercase tracking-widest mb-3">Shaping Tomorrow's Leaders</motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold font-poppins">About Us</motion.h1>
          <motion.p variants={fadeUp} className="text-blue-200 mt-4 text-lg leading-relaxed">
            Over 15 years of nurturing young minds in the heart of Narsipatnam, Andhra Pradesh.
          </motion.p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-yellow-600 font-semibold text-sm uppercase tracking-widest mb-3">Our Story</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">A Journey of 15+ Years</motion.h2>
            <motion.div variants={fadeUp} className="mt-6 space-y-4 text-gray-600 leading-relaxed">
              <p>
                Little Angels High School was founded in 2009 by a group of passionate local educators who dreamed of bringing quality, affordable English-medium education to the children of Balighattam and surrounding villages of Narsipatnam mandal.
              </p>
              <p>
                Starting with just 40 students and 4 teachers in a small rented building, the school has grown into one of the most trusted educational institutions in the Visakhapatnam district — now housed within the Narsipatnam Srinivasa I.T.I campus with 500+ students.
              </p>
              <p>
                Over these 15+ years, our students have excelled in academics, sports, cultural activities, and community service — making their families and our Narsipatnam community proud.
              </p>
            </motion.div>
          </motion.div>

          {/* Stats grid */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid grid-cols-2 gap-5">
            {[
              { label: 'Founded', value: '2009' },
              { label: 'Students', value: '500+' },
              { label: 'Faculty Members', value: '25+' },
              { label: 'Board Pass Rate', value: '95%' },
            ].map(item => (
              <div key={item.label} className="bg-blue-50 rounded-2xl p-7 text-center card-hover border border-blue-100">
                <p className="text-4xl font-bold text-blue-900 font-poppins">{item.value}</p>
                <p className="text-gray-500 text-sm mt-2">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-yellow-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Journey</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">Milestones That Define Us</motion.h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 -translate-x-1/2" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`relative flex ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center pl-14 md:pl-0`}>
                  {/* dot */}
                  <div className="absolute left-4 md:left-1/2 w-5 h-5 bg-blue-800 rounded-full border-4 border-white shadow-md -translate-x-1/2 flex-shrink-0 z-10" />
                  {/* Year badge */}
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <span className="inline-block bg-blue-800 text-white text-sm font-bold px-4 py-1 rounded-full mb-2">{m.year}</span>
                  </div>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} bg-white rounded-2xl p-6 shadow-sm border border-gray-100`}>
                    <h3 className="font-bold text-blue-900 text-lg mb-2 font-poppins">{m.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
          <motion.p variants={fadeUp} className="text-yellow-600 font-semibold text-sm uppercase tracking-widest mb-2">What We Stand For</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">Our Core Values</motion.h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card-hover bg-white rounded-2xl p-7 shadow-sm border border-gray-100 text-center">
              <div className={`w-14 h-14 ${v.color} text-white rounded-2xl flex items-center justify-center mb-5 mx-auto`}>{v.icon}</div>
              <h3 className="font-bold text-gray-900 text-base mb-2 font-poppins">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-title text-center mb-12">
            Vision &amp; Mission
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-blue-700">
              <div className="w-14 h-14 bg-blue-100 text-blue-800 rounded-2xl flex items-center justify-center mb-5"><Eye className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 font-poppins">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading school in Narsipatnam that inspires every student to reach their highest potential — academically, morally, and socially — and become a responsible, compassionate citizen of tomorrow.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-yellow-500">
              <div className="w-14 h-14 bg-yellow-100 text-yellow-700 rounded-2xl flex items-center justify-center mb-5"><Target className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold text-blue-900 mb-4 font-poppins">Our Mission</h3>
              <ul className="text-gray-600 space-y-3 text-sm">
                {['Provide quality education accessible to all sections of society', 'Foster intellectual curiosity and a love of lifelong learning', 'Build strong moral values and character in every student', 'Encourage co-curricular participation for holistic growth', 'Maintain a safe, inclusive, and supportive school community'].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0 text-xs mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Faculty Highlights */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
          <motion.p variants={fadeUp} className="text-yellow-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Team</motion.p>
          <motion.h2 variants={fadeUp} className="section-title">Meet Our Educators</motion.h2>
          <motion.p variants={fadeUp} className="section-subtitle mt-3">Dedicated, passionate, and experienced teachers who treat every student like their own.</motion.p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map((f, i) => (
            <motion.div key={f.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-700 to-blue-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 font-poppins">
                {f.initials}
              </div>
              <h3 className="font-bold text-gray-900 text-sm font-poppins">{f.name}</h3>
              <p className="text-blue-700 text-xs font-semibold mt-1">{f.subject}</p>
              <p className="text-gray-400 text-xs mt-1">{f.qual}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-10 text-white flex flex-col sm:flex-row gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3" />
          <div className="flex-shrink-0 relative z-10">
            <img src="/images/principal.png" alt="Principal" className="w-28 h-28 rounded-2xl object-cover border-4 border-yellow-400" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-5 h-5 text-yellow-400" />
              <div>
                <h3 className="text-xl font-bold font-poppins">Principal's Message</h3>
                <p className="text-yellow-300 text-sm">B.Ed, M.A — 20+ years in education</p>
              </div>
            </div>
            <blockquote className="text-blue-100 leading-relaxed italic">
              "Every child who walks through our gates is a promise — to their parents and to our community. At Little Angels, we work every single day to honour that promise. We don't just teach subjects; we shape futures, build character, and light the spark of curiosity that lasts a lifetime. I welcome you to be part of our wonderful school family."
            </blockquote>
            <p className="text-yellow-400 font-semibold mt-4">— Principal, Little Angels High School</p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
