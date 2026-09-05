import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { Icon } from '../components/Icon';

export const About = () => {
  const { openBookingModal } = useModal();
  return (
    <div className="space-y-12">
      
    {/*  PAGE HERO  */}
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
          <Link to="/" className="hover:text-[#059669]">Home</Link>
          <span>/</span>
          <span className="text-slate-900">About Us</span>
        </div>
        <span className="section-badge">Our Institutional Foundation</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B4635] font-heading tracking-tight mb-4">
          Redefining International <span className="text-[#C59B4B]">Online Education</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          The Readly Institute is dedicated to helping Cambridge O-Level, IGCSE, and A-Level students bridge the gap between classroom theory and top-tier examination achievement.
        </p>
      </div>
    </section>

    {/*  MISSION & VISION  */}
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
      <div className="grid md:grid-cols-2 gap-8">
        
        <div className="card-base p-8 bg-white border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
            <Icon name="compass" className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading mb-3">Our Mission</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            To empower ambitious secondary and higher secondary students worldwide with high-engagement, expert-led online education that fosters deep conceptual mastery, intellectual curiosity, and outstanding performance in Cambridge examinations.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <Icon name="check" className="w-4 h-4 text-[#059669]" />
              <span>Accessible high-caliber instruction without geographic limits</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="check" className="w-4 h-4 text-[#059669]" />
              <span>Demystifying Cambridge assessment objectives & mark schemes</span>
            </li>
          </ul>
        </div>

        <div className="card-base p-8 bg-white border-slate-200">
          <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-5">
            <Icon name="eye" className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading mb-3">Our Vision</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            To become the premier international online academy recognized by top universities and families for academic rigor, transparent student mentorship, and transformative educational outcomes.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <Icon name="check" className="w-4 h-4 text-[#059669]" />
              <span>Setting new benchmarks for interactive digital classrooms</span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="check" className="w-4 h-4 text-[#059669]" />
              <span>Building confident, university-ready independent thinkers</span>
            </li>
          </ul>
        </div>

      </div>
    </section>

    {/*  5 PILLARS OF ACADEMIC EXCELLENCE  */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-100/60 rounded-2xl border border-slate-200 my-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="section-badge">Pedagogical Framework</span>
        <h2 className="text-3xl font-extrabold text-[#0B4635] font-heading">
          Five Pillars of <span className="text-[#C59B4B]">Readly Excellence</span>
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          Every course at The Readly Institute is built upon a proven pedagogical foundation.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card-base p-6 bg-white">
          <span className="text-xs font-mono font-bold text-[#059669] bg-[#ECFDF5] px-2 py-1 rounded">Pillar 01</span>
          <h3 className="text-base font-bold text-slate-900 font-heading mt-3 mb-1.5">First-Principles Concept Clarity</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We avoid rote memorization. Whether explaining electromagnetic induction or Keynesian economics, lessons build from core first principles so students understand the underlying 'why'.
          </p>
        </div>

        <div className="card-base p-6 bg-white">
          <span className="text-xs font-mono font-bold text-[#059669] bg-[#ECFDF5] px-2 py-1 rounded">Pillar 02</span>
          <h3 className="text-base font-bold text-slate-900 font-heading mt-3 mb-1.5">Small Cohort Engagement</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Unlike mass webinars with hundreds of anonymous participants, our cohorts are strictly capped at 8 students. Teachers know every student by name and monitor every student's on-screen working.
          </p>
        </div>

        <div className="card-base p-6 bg-white">
          <span className="text-xs font-mono font-bold text-[#059669] bg-[#ECFDF5] px-2 py-1 rounded">Pillar 03</span>
          <h3 className="text-base font-bold text-slate-900 font-heading mt-3 mb-1.5">15-Year Categorized Topical Past Papers</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every theoretical concept is paired with past paper questions from 2010 to 2025. Students encounter every variation of question format Cambridge has ever examined.
          </p>
        </div>

        <div className="card-base p-6 bg-white">
          <span className="text-xs font-mono font-bold text-[#059669] bg-[#ECFDF5] px-2 py-1 rounded">Pillar 04</span>
          <h3 className="text-base font-bold text-slate-900 font-heading mt-3 mb-1.5">Examiner Rubrics & Keywords</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Knowing the content is only half the battle. We teach students the specific mark scheme trigger phrases and examiner keywords required to secure maximum marks.
          </p>
        </div>

        <div className="card-base p-6 bg-white">
          <span className="text-xs font-mono font-bold text-[#059669] bg-[#ECFDF5] px-2 py-1 rounded">Pillar 05</span>
          <h3 className="text-base font-bold text-slate-900 font-heading mt-3 mb-1.5">Unfiltered Parent Partnership</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Parents receive regular progress cards, attendance logs, and mock analysis. We work as a unified support team ensuring the student stays motivated and accountable.
          </p>
        </div>

        <div className="card-base p-6 bg-gradient-to-br from-teal-800 to-indigo-800 text-white flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-[#FAF6EE] bg-white/10 px-2 py-1 rounded">Get Started</span>
            <h3 className="text-lg font-bold text-white font-heading mt-3 mb-2">Experience the Difference</h3>
            <p className="text-xs text-teal-100 leading-relaxed">
              Attend a live 45-minute demo session and experience how our certified Cambridge educators teach.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBookingModal()}
            className="btn btn-secondary bg-white text-[#0B4635] mt-4 text-xs cursor-pointer"
          >
            <span>Book a Free Demo</span>
            <Icon name="arrow-right" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>

    {/*  BOTTOM CTA BANNER  */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="card-base p-8 sm:p-12 bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/40 text-center rounded-2xl border border-emerald-200/80 shadow-sm">
        <h2 className="text-3xl font-extrabold font-heading mb-3 text-[#0B4635]">Have questions about our <span className="text-[#C59B4B]">academic structure?</span></h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
          Our academic coordinators are available to discuss subject selection, examination series, and custom study plans.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn btn-teal text-xs cursor-pointer">
            <span>Contact Admissions Office</span>
          </Link>
          <a href="https://wa.me/923337221552?text=Hi%20The%20Readly%20Institute,%20I%20have%20questions%20about%20your%20academy" target="_blank" className="btn btn-whatsapp text-xs">
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  
    </div>
  );
};
