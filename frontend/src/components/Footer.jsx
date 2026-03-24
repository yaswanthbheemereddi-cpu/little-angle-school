import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Phone, Mail, Facebook, Youtube, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
              <GraduationCap className="text-blue-900 w-6 h-6" />
            </div>
            <div>
              <p className="font-bold font-poppins leading-tight">Little Angels High School</p>
              <p className="text-yellow-300 text-xs telugu-text">లిటిల్ అంగెల్స్ హై పాఠశాల</p>
            </div>
          </div>
          <p className="text-blue-200 text-sm leading-relaxed">
            Building Bright Futures through quality education and holistic development in Narsipatnam, Andhra Pradesh.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="w-8 h-8 bg-blue-800 hover:bg-yellow-400 hover:text-blue-900 rounded-full flex items-center justify-center transition-all duration-200">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 bg-blue-800 hover:bg-yellow-400 hover:text-blue-900 rounded-full flex items-center justify-center transition-all duration-200">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 bg-blue-800 hover:bg-yellow-400 hover:text-blue-900 rounded-full flex items-center justify-center transition-all duration-200">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-yellow-400 mb-4 font-poppins">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[['/', 'Home'], ['/about', 'About Us'], ['/academics', 'Academics'], ['/admissions', 'Admissions'], ['/gallery', 'Gallery'], ['/notices', 'Notice Board'], ['/contact', 'Contact']].map(([path, label]) => (
              <li key={path}>
                <Link to={path} className="text-blue-200 hover:text-yellow-400 transition-colors duration-200">
                  → {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Classes */}
        <div>
          <h3 className="font-bold text-yellow-400 mb-4 font-poppins">Classes Offered</h3>
          <ul className="space-y-1 text-sm text-blue-200">
            {['Nursery & KG', 'Classes I – V (Primary)', 'Classes VI – VIII (Upper Primary)', 'Classes IX – X (Secondary)'].map(cls => (
              <li key={cls} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0"></span>
                {cls}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-bold text-yellow-400 mb-4 font-poppins">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2 text-blue-200">
              <MapPin className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
              MJ57+29P, Balighattam, Narsipatnam, Andhra Pradesh 531118
            </li>
            <li className="flex items-center gap-2 text-blue-200">
              <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <a href="tel:+917569703277" className="hover:text-yellow-400 transition-colors">+91 75697 03277</a>
            </li>
            <li className="flex items-center gap-2 text-blue-200">
              <Mail className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <a href="mailto:info@littleangelsschool.in" className="hover:text-yellow-400 transition-colors">info@littleangelsschool.in</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-900 py-4 text-center text-blue-300 text-xs">
        <p>© {new Date().getFullYear()} Little Angels High School, Balighattam. All rights reserved.</p>
      </div>
    </footer>
  );
}
