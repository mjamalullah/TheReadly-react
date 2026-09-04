import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { READLY_CONFIG } from '../config/readlyConfig';
import { Menu, X, PhoneCall, ChevronRight, GraduationCap } from 'lucide-react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBookingModal } = useModal();

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
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="The Readly Institute Logo"
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
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
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi The Readly Institute, I would like to inquire about admissions.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-[#059669] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-600 block uppercase tracking-wider font-semibold leading-none">Admissions Desk</span>
                <span className="text-xs font-bold text-slate-900">{READLY_CONFIG.phoneDisplay}</span>
              </div>
            </a>

            <button
              onClick={() => openBookingModal()}
              className="btn btn-teal text-xs font-bold px-4 py-2.5 shadow-sm hover:shadow-md"
            >
              <span>Book Free Demo</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => openBookingModal()}
              className="btn btn-teal text-xs py-2 px-3"
            >
              Book Demo
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
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
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <a
              href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi The Readly Institute, I would like to inquire about admissions.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full text-xs justify-center py-2.5"
            >
              <span>WhatsApp Desk: {READLY_CONFIG.phoneDisplay}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="btn btn-teal w-full text-xs justify-center py-2.5"
            >
              <span>Schedule Free Trial Demo Class</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
