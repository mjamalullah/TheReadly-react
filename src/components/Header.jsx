import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { READLY_CONFIG } from '../config/readlyConfig';
import { Menu, X, PhoneCall, ChevronRight, GraduationCap } from 'lucide-react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBookingModal, openTutorModal } = useModal();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/programs', label: 'Programs' },
    { to: '/subjects', label: 'Subjects' },
    { to: '/teachers', label: 'Faculty' },
    { to: '/how-it-works', label: 'How It Works' },
    { to: '/resources', label: 'Resources' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/images/logo.png"
              alt="The Readly Institute Logo"
              className="h-12 sm:h-[52px] md:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
            />
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200/80">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#059669] shadow-xs'
                      : 'text-slate-700 hover:text-[#059669] hover:bg-white/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Header CTAs */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Become a Tutor Button */}
            <button
              onClick={() => openTutorModal()}
              className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:text-[#059669] hover:border-[#059669] hover:bg-[#ECFDF5] transition-all flex items-center gap-1.5 shadow-2xs group cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#059669] group-hover:scale-110 transition-transform" />
              <span>Become a Tutor</span>
            </button>

            {/* Book Free Demo Button */}
            <button
              onClick={() => openBookingModal()}
              className="btn btn-teal text-xs font-bold px-4 py-2 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Book Free Demo</span>
            </button>

            {/* WhatsApp Icon Button Beside Book Free Demo */}
            <a
              href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi The Readly Institute, I would like to inquire about admissions.')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct Admissions WhatsApp"
              title="Chat on WhatsApp (+92 333 7221552)"
              className="w-10 h-10 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.942.812 2.796.812 3.179 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.767-5.798zm3.364 8.163c-.141.396-.714.731-1.01.769-.283.036-.649.064-1.921-.462-1.397-.579-2.316-1.979-2.385-2.072-.07-.093-.565-.751-.565-1.433 0-.682.358-1.018.485-1.157.128-.139.278-.174.372-.174.093 0 .186.002.267.006.086.005.201-.033.314.24.118.283.402.977.437 1.047.035.07.058.152.012.245-.047.093-.07.151-.139.233-.07.081-.147.18-.21.244-.07.07-.143.146-.062.285.081.139.362.597.777.967.534.476.985.624 1.124.693.139.07.221.058.303-.035.082-.093.349-.408.442-.548.093-.14.186-.117.314-.07.128.047.814.384.954.454.14.07.233.105.267.163.035.058.035.337-.106.733z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.05 22l5.167-1.323A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.545 0-3.003-.437-4.247-1.196l-.304-.184-3.134.803.834-3.05-.201-.318A8.127 8.127 0 013.833 12C3.833 7.5 7.5 3.833 12 3.833S20.167 7.5 20.167 12 16.5 20.167 12 20.167z" />
              </svg>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi The Readly Institute, I would like to inquire about admissions.')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Direct Admissions WhatsApp"
              title="Chat on WhatsApp"
              className="w-8 h-8 rounded-lg bg-[#25D366] active:bg-[#20BA5A] text-white flex items-center justify-center shadow-xs"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.942.812 2.796.812 3.179 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.767-5.798zm3.364 8.163c-.141.396-.714.731-1.01.769-.283.036-.649.064-1.921-.462-1.397-.579-2.316-1.979-2.385-2.072-.07-.093-.565-.751-.565-1.433 0-.682.358-1.018.485-1.157.128-.139.278-.174.372-.174.093 0 .186.002.267.006.086.005.201-.033.314.24.118.283.402.977.437 1.047.035.07.058.152.012.245-.047.093-.07.151-.139.233-.07.081-.147.18-.21.244-.07.07-.143.146-.062.285.081.139.362.597.777.967.534.476.985.624 1.124.693.139.07.221.058.303-.035.082-.093.349-.408.442-.548.093-.14.186-.117.314-.07.128.047.814.384.954.454.14.07.233.105.267.163.035.058.035.337-.106.733z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.05 22l5.167-1.323A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.545 0-3.003-.437-4.247-1.196l-.304-.184-3.134.803.834-3.05-.201-.318A8.127 8.127 0 013.833 12C3.833 7.5 7.5 3.833 12 3.833S20.167 7.5 20.167 12 16.5 20.167 12 20.167z" />
              </svg>
            </a>
            <button
              onClick={() => openBookingModal()}
              className="btn btn-teal text-xs py-1.5 px-3 cursor-pointer"
            >
              Book Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fade-in">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3.5 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-[#ECFDF5] text-[#059669]'
                    : 'text-slate-800 hover:bg-slate-50 hover:text-[#059669]'
                }`
              }
            >
              <div className="flex items-center justify-between">
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </NavLink>
          ))}
          <div className="pt-4 border-t border-slate-100 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openTutorModal();
              }}
              className="btn btn-secondary w-full text-xs justify-center py-2.5 flex items-center gap-2 border-slate-300 font-bold"
            >
              <GraduationCap className="w-4 h-4 text-[#059669]" />
              <span>Become a Tutor / Join Faculty</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="btn btn-teal w-full text-xs justify-center py-2.5 font-bold"
            >
              <span>Schedule Free Trial Demo Class</span>
            </button>
            <a
              href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi The Readly Institute, I would like to inquire about admissions.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full text-xs justify-center py-2.5"
            >
              <span>WhatsApp Desk: {READLY_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
