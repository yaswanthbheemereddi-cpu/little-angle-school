import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CheckCircle, FileText, Calendar, IndianRupee, Phone } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };
const WHATSAPP = 'https://wa.me/917569703277?text=Hello%2C%20I%20want%20to%20enquire%20about%20admission.';

const importantDates = [
  { date: 'April 1, 2025', event: 'Admissions Open – 2025-26' },
  { date: 'May 31, 2025', event: 'Last Date for Applications' },
  { date: 'June 5, 2025', event: 'Online Admission Test (if applicable)' },
  { date: 'June 10, 2025', event: 'Announcement of Shortlisted Students' },
  { date: 'June 16, 2025', event: 'School Reopening Day' },
];

const feeStructure = [
  { class: 'Nursery / LKG / UKG', annual: '₹8,000', monthly: '₹700' },
  { class: 'Class I – III', annual: '₹10,000', monthly: '₹900' },
  { class: 'Class IV – V', annual: '₹12,000', monthly: '₹1,050' },
  { class: 'Class VI – VIII', annual: '₹14,000', monthly: '₹1,200' },
  { class: 'Class IX – X', annual: '₹16,000', monthly: '₹1,400' },
];

const documents = [
  'Birth Certificate (original + photocopy)',
  'Transfer Certificate from previous school',
  'Aadhaar Card of child and parent',
  'Caste Certificate (if applicable)',
  'Previous class Marksheet / Report Card',
  '3 Passport-size photographs',
  'Address Proof (Ration Card / Electricity Bill)',
];

const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700 text-sm";

export default function Admissions() {
  const [form, setForm] = useState({ studentName: '', dob: '', gender: '', classApplied: '', parentName: '', parentPhone: '', parentEmail: '', address: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/admissions', form);
      setSubmitted(true);
      toast.success('Application submitted successfully!');
    } catch {
      toast.error('Submission failed. Please try again or call us directly.');
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
          <motion.p variants={fadeUp} className="text-yellow-400 font-semibold text-sm uppercase tracking-widest mb-3">Join Our School Family</motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold font-poppins">Admissions 2025–26</motion.h1>
          <motion.p variants={fadeUp} className="text-blue-200 mt-4 text-lg">Applications accepted for Nursery to Class X. Limited seats available.</motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mt-6">
            <a href="#apply-form" className="btn-secondary">Apply Online Now</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl transition-all">
              <Phone className="w-4 h-4" /> WhatsApp Enquiry
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 bg-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-title text-center mb-10">
          Simple 3-Step Admission Process
        </motion.h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Fill the Form', desc: 'Complete the online admission form below with accurate student and parent/guardian details.', icon: <FileText className="w-8 h-8" /> },
            { step: '02', title: 'Review & Contact', desc: 'Our team will review your application and contact you within 2–3 working days to schedule a visit.', icon: <Calendar className="w-8 h-8" /> },
            { step: '03', title: 'Enrolment', desc: 'Visit our school with the required documents for verification and complete the admission formalities.', icon: <CheckCircle className="w-8 h-8" /> },
          ].map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="bg-blue-50 rounded-2xl p-7 text-center border border-blue-100">
              <div className="w-16 h-16 bg-blue-800 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">{s.icon}</div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Step {s.step}</span>
              <h3 className="font-bold text-blue-900 text-lg mt-1 mb-2 font-poppins">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Important Dates + Fee Structure */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          {/* Dates */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="section-title mb-6 flex items-center gap-3"><Calendar className="w-7 h-7 text-blue-700" /> Important Dates</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {importantDates.map((d, i) => (
                <div key={d.date} className={`flex justify-between items-center px-6 py-4 ${i !== importantDates.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <span className="text-gray-700 text-sm font-medium">{d.event}</span>
                  <span className="text-blue-700 font-bold text-sm whitespace-nowrap ml-4">{d.date}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Fee Structure */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="section-title mb-6 flex items-center gap-3"><IndianRupee className="w-7 h-7 text-blue-700" /> Fee Structure 2025–26</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="text-left px-5 py-3">Class</th>
                    <th className="text-right px-5 py-3">Annual</th>
                    <th className="text-right px-5 py-3">Monthly</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map((f, i) => (
                    <tr key={f.class} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-5 py-3 text-gray-700 font-medium">{f.class}</td>
                      <td className="px-5 py-3 text-right text-green-700 font-semibold">{f.annual}</td>
                      <td className="px-5 py-3 text-right text-blue-700 font-semibold">{f.monthly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-400 px-5 py-3">* Fees are subject to change. Contact school for exact details.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="font-bold text-blue-900 text-xl mb-5 font-poppins">Documents Required at Admission</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {documents.map(doc => (
              <div key={doc} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{doc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl shadow-xl p-12 text-center border border-green-100">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 font-poppins mb-3">Application Submitted!</h2>
              <p className="text-gray-500 mb-6">Thank you for applying to Little Angels High School. Our admissions team will contact you within 2–3 working days.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/" className="btn-primary">Back to Home</Link>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 text-white font-semibold px-5 py-3 rounded-xl">
                  <Phone className="w-4 h-4" /> Follow up on WhatsApp
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 border border-gray-100">
              <h2 className="text-2xl font-bold text-blue-900 font-poppins mb-2">Online Admission Form</h2>
              <p className="text-gray-500 text-sm mb-8">Fill in all details carefully. Fields marked * are mandatory.</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <p className="font-semibold text-blue-800 text-sm uppercase tracking-wide mb-4">Student Details</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Student Name *</label>
                      <input name="studentName" required className={inputClass} value={form.studentName} onChange={handleChange} placeholder="Full name of student" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Date of Birth *</label>
                      <input type="date" name="dob" required className={inputClass} value={form.dob} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Gender *</label>
                      <select name="gender" required className={inputClass} value={form.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Class Applying For *</label>
                      <select name="classApplied" required className={inputClass} value={form.classApplied} onChange={handleChange}>
                        <option value="">Select Class</option>
                        {['Nursery', 'LKG', 'UKG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-blue-800 text-sm uppercase tracking-wide mb-4">Parent / Guardian Details</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Parent / Guardian Name *</label>
                      <input name="parentName" required className={inputClass} value={form.parentName} onChange={handleChange} placeholder="Full name" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Mobile Number *</label>
                      <input type="tel" name="parentPhone" required className={inputClass} value={form.parentPhone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address</label>
                      <input type="email" name="parentEmail" className={inputClass} value={form.parentEmail} onChange={handleChange} placeholder="your@email.com (optional)" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Residential Address *</label>
                      <textarea name="address" required rows={2} className={inputClass} value={form.address} onChange={handleChange} placeholder="Door no, Street, Village, Mandal, District" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Additional Message (optional)</label>
                      <textarea name="message" rows={2} className={inputClass} value={form.message} onChange={handleChange} placeholder="Any specific queries or information you'd like to share..." />
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full btn-primary py-4 text-base disabled:opacity-60">
                  {loading ? 'Submitting...' : 'Submit Application →'}
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
