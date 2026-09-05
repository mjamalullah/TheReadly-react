import React from 'react';
import { Link } from 'react-router-dom';
import { READLY_CONFIG } from '../config/readlyConfig';
import { Phone, Mail, Clock, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="site-footer bg-[#063326] text-white border-t border-[#0B4635] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#0B4635]">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <img
                src="/images/logo-white.png"
                alt="The Readly Institute White Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-xs leading-relaxed" style={{ color: '#E2E8F0' }}>
              Premier live online academy for Cambridge Assessment International Education (O-Level, IGCSE & A-Level), Pearson Edexcel, and Industry IT Certifications. Mentoring students across Pakistan, UAE, Saudi Arabia, the UK, and overseas to straight A* academic distinctions.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span style={{ color: '#A7F3D0' }}>Registered Academic Preparation Provider</span>
            </div>
          </div>

          {/* Programs Col */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white font-heading flex items-center gap-2 pb-2 border-b border-emerald-800/70">
              <span className="w-1.5 h-3.5 bg-[#10B981] rounded-full inline-block"></span>
              <span>Academic Curriculums</span>
            </h4>
            <ul className="space-y-2 text-xs" style={{ color: '#E2E8F0' }}>
              <li>
                <Link to="/programs" className="hover:text-white transition-colors">Cambridge O-Level (CAIE)</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-white transition-colors">Cambridge IGCSE</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-white transition-colors">Cambridge International AS & A-Level</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-white transition-colors">Pearson Edexcel International GCSE</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-white transition-colors">IT & Professional Certifications</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-white transition-colors">Revision Crash Courses (May/June & Oct/Nov)</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white font-heading flex items-center gap-2 pb-2 border-b border-emerald-800/70">
              <span className="w-1.5 h-3.5 bg-[#10B981] rounded-full inline-block"></span>
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-2 text-xs" style={{ color: '#E2E8F0' }}>
              <li>
                <Link to="/subjects" className="hover:text-white transition-colors">Subject Catalog</Link>
              </li>
              <li>
                <Link to="/teachers" className="hover:text-white transition-colors">Faculty Directory</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-white transition-colors">Past Paper Workbooks</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Readly</Link>
              </li>
              <li>
                <Link to="/book-demo" className="hover:text-white transition-colors">Book Free Trial Class</Link>
              </li>
              <li>
                <Link to="/become-a-tutor" className="hover:text-white transition-colors text-emerald-300 font-semibold">Become a Tutor</Link>
              </li>
              <li>
                <Link to="/join-our-team" className="hover:text-white transition-colors text-emerald-300 font-semibold flex items-center gap-1.5">
                  <span>Join Our Team</span>
                  <span className="text-[9px] bg-[#059669] text-white px-1.5 py-0.2 rounded-full uppercase font-bold">Hiring</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white font-heading flex items-center gap-2 pb-2 border-b border-emerald-800/70">
              <span className="w-1.5 h-3.5 bg-[#10B981] rounded-full inline-block"></span>
              <span>Admissions Direct Desk</span>
            </h4>
            <ul className="space-y-3 text-xs" style={{ color: '#E2E8F0' }}>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px]" style={{ color: '#CBD5E1' }}>WhatsApp & Direct Calls:</span>
                  <a
                    href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi The Readly Institute, I would like to inquire about admissions.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-emerald-400 transition-colors text-sm"
                  >
                    {READLY_CONFIG.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <div>
                    <span className="block text-[11px]" style={{ color: '#CBD5E1' }}>Admissions Desk:</span>
                    <a
                      href={`mailto:${READLY_CONFIG.admissionsEmail}`}
                      className="font-bold text-white hover:text-emerald-400 transition-colors"
                    >
                      {READLY_CONFIG.admissionsEmail}
                    </a>
                  </div>
                  <div>
                    <span className="block text-[11px]" style={{ color: '#CBD5E1' }}>General Inquiries:</span>
                    <a
                      href={`mailto:${READLY_CONFIG.generalEmail}`}
                      className="font-bold text-white hover:text-emerald-400 transition-colors"
                    >
                      {READLY_CONFIG.generalEmail}
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[11px]" style={{ color: '#CBD5E1' }}>Operational Hours:</span>
                  <span style={{ color: '#FFFFFF' }} className="font-medium">{READLY_CONFIG.hours}</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Cambridge Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-start gap-3 max-w-3xl text-center md:text-left">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 hidden sm:block" />
            <p className="leading-relaxed text-xs sm:text-[13px] font-medium" style={{ color: '#D1FAE5' }}>
              <span className="font-bold text-white">Academic Notice:</span> Cambridge Assessment International Education (CAIE) and Pearson Edexcel are registered trademarks of their respective examination authorities. The Readly Institute is an independent online tutoring institution providing supplemental exam preparation.
            </p>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <span className="text-xs sm:text-[13px] font-semibold tracking-wide" style={{ color: '#FFFFFF' }}>
              &copy; {new Date().getFullYear()} The Readly Institute. All rights reserved.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
