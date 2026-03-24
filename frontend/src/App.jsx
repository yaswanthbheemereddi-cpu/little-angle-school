import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AnnouncementBanner from './components/AnnouncementBanner';
import Home from './pages/Home';
import About from './pages/About';
import Admissions from './pages/Admissions';
import Academics from './pages/Academics';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NoticeBoard from './pages/NoticeBoard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Faculty from './pages/Faculty';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <AnnouncementBanner />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/notices" element={<NoticeBoard />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </Router>
  );
}
