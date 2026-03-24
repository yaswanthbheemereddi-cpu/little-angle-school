import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  GraduationCap, LogOut, Bell, Users, Image, Trash2,
  Plus, X, CheckCircle, XCircle, Eye, UploadCloud
} from 'lucide-react';

const tabs = ['Overview', 'Notices', 'Admissions', 'Gallery'];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [notices, setNotices] = useState([]);
  const [admissions, setAdmissions] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', category: 'General', isImportant: false });
  const [imageFile, setImageFile] = useState(null);
  const [imageTitle, setImageTitle] = useState('');
  const [imageCategory, setImageCategory] = useState('Events');
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');
  const adminName = localStorage.getItem('adminName') || 'Admin';
  const headers = { Authorization: `Bearer ${token}` };

  const fetchAll = async () => {
    const [n, a, g] = await Promise.all([
      axios.get('/api/notices', { headers }),
      axios.get('/api/admissions', { headers }),
      axios.get('/api/gallery', { headers }),
    ]);
    setNotices(n.data);
    setAdmissions(a.data);
    setGallery(g.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    navigate('/admin/login');
  };

  const createNotice = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/notices', noticeForm, { headers });
      toast.success('Notice created!');
      setNoticeForm({ title: '', content: '', category: 'General', isImportant: false });
      fetchAll();
    } catch { toast.error('Failed to create notice'); }
  };

  const deleteNotice = async id => {
    if (!window.confirm('Delete this notice?')) return;
    await axios.delete(`/api/notices/${id}`, { headers });
    toast.success('Notice deleted');
    fetchAll();
  };

  const updateAdmissionStatus = async (id, status) => {
    await axios.put(`/api/admissions/${id}`, { status }, { headers });
    toast.success(`Admission ${status}`);
    fetchAll();
  };

  const uploadImage = async e => {
    e.preventDefault();
    if (!imageFile) return toast.error('Please select an image');
    const data = new FormData();
    data.append('image', imageFile);
    data.append('title', imageTitle);
    data.append('category', imageCategory);
    try {
      await axios.post('/api/gallery', data, { headers, 'Content-Type': 'multipart/form-data' });
      toast.success('Image uploaded!');
      setImageFile(null);
      setImageTitle('');
      fetchAll();
    } catch { toast.error('Failed to upload'); }
  };

  const deleteImage = async id => {
    await axios.delete(`/api/gallery/${id}`, { headers });
    toast.success('Image deleted');
    fetchAll();
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm";

  const statusBadge = s => ({
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }[s] || 'bg-gray-100');

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="font-bold text-blue-900">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">Welcome, {adminName}</span>
            <button onClick={logout} className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab ? 'bg-blue-800 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <Bell className="w-7 h-7" />, label: 'Notices', count: notices.length, color: 'bg-blue-100 text-blue-800' },
              { icon: <Users className="w-7 h-7" />, label: 'Admissions', count: admissions.length, color: 'bg-green-100 text-green-800' },
              { icon: <Image className="w-7 h-7" />, label: 'Gallery Images', count: gallery.length, color: 'bg-yellow-100 text-yellow-800' },
            ].map(item => (
              <div key={item.label} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-4`}>{item.icon}</div>
                <p className="text-3xl font-bold text-blue-900 font-poppins">{item.count}</p>
                <p className="text-gray-500 text-sm mt-1">{item.label}</p>
              </div>
            ))}
            <div className="sm:col-span-3 bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <p className="font-semibold text-blue-900 mb-1">Pending Admissions</p>
              <p className="text-2xl font-bold text-blue-800">{admissions.filter(a => a.status === 'pending').length}</p>
              <p className="text-sm text-blue-600 mt-1">Applications awaiting review</p>
            </div>
          </motion.div>
        )}

        {/* Notices Tab */}
        {activeTab === 'Notices' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid lg:grid-cols-2 gap-8">
            {/* Create Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2"><Plus className="w-4 h-4" /> Create Notice</h3>
              <form onSubmit={createNotice} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Title *</label>
                  <input required className={inputClass} value={noticeForm.title} onChange={e => setNoticeForm({ ...noticeForm, title: e.target.value })} placeholder="Notice title" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Content *</label>
                  <textarea required rows={4} className={inputClass} value={noticeForm.content} onChange={e => setNoticeForm({ ...noticeForm, content: e.target.value })} placeholder="Notice content..." />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Category</label>
                    <select className={inputClass} value={noticeForm.category} onChange={e => setNoticeForm({ ...noticeForm, category: e.target.value })}>
                      {['General', 'Admission', 'Holiday', 'Events', 'Finance'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input type="checkbox" checked={noticeForm.isImportant} onChange={e => setNoticeForm({ ...noticeForm, isImportant: e.target.checked })} className="rounded" />
                      Mark Important
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full py-2.5">Post Notice</button>
              </form>
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              <h3 className="font-bold text-blue-900 sticky top-0 bg-gray-50 py-1">All Notices ({notices.length})</h3>
              {notices.map(n => (
                <div key={n._id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-3">
                  <div className="flex-1">
                    {n.isImportant && <span className="text-xs text-red-500 font-bold">⚠ IMPORTANT</span>}
                    <p className="font-semibold text-gray-900 text-sm">{n.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{n.content}</p>
                    <span className="text-xs text-blue-600">{n.category}</span>
                  </div>
                  <button onClick={() => deleteNotice(n._id)} className="text-red-400 hover:text-red-600 flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {notices.length === 0 && <p className="text-gray-400 text-center py-8 text-sm">No notices yet.</p>}
            </div>
          </motion.div>
        )}

        {/* Admissions Tab */}
        {activeTab === 'Admissions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="font-bold text-blue-900 mb-4">All Admissions ({admissions.length})</h3>
            <div className="space-y-3">
              {admissions.map(a => (
                <div key={a._id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="font-bold text-blue-900">{a.studentName}</p>
                      <p className="text-sm text-gray-500">{a.classApplied} · Parent: {a.parentName} · {a.parentPhone}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.address}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadge(a.status)}`}>{a.status}</span>
                      {a.status === 'pending' && (
                        <>
                          <button onClick={() => updateAdmissionStatus(a._id, 'approved')} className="text-green-600 hover:text-green-800">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button onClick={() => updateAdmissionStatus(a._id, 'rejected')} className="text-red-500 hover:text-red-700">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {admissions.length === 0 && <p className="text-gray-400 text-center py-8 text-sm">No admissions submitted yet.</p>}
            </div>
          </motion.div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'Gallery' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid lg:grid-cols-3 gap-8">
            {/* Upload Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2"><UploadCloud className="w-4 h-4" /> Upload Image</h3>
              <form onSubmit={uploadImage} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Image Title *</label>
                  <input required className={inputClass} value={imageTitle} onChange={e => setImageTitle(e.target.value)} placeholder="e.g., Annual Day 2025" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Category</label>
                  <select className={inputClass} value={imageCategory} onChange={e => setImageCategory(e.target.value)}>
                    {['Events', 'Classrooms', 'Sports', 'Cultural', 'Campus'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 mb-1 block">Image File *</label>
                  <input type="file" accept="image/*" required className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-medium"
                    onChange={e => setImageFile(e.target.files[0])} />
                </div>
                <button type="submit" className="btn-primary w-full py-2.5">Upload</button>
              </form>
            </div>

            {/* Grid */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-blue-900 mb-4">Gallery Images ({gallery.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {gallery.map(img => (
                  <div key={img._id} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
                    <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button onClick={() => deleteImage(img._id)} className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-white text-xs font-medium truncate">{img.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              {gallery.length === 0 && <p className="text-gray-400 text-center py-8 text-sm">No images uploaded yet.</p>}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
