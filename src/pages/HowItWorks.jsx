import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { Icon } from '../components/Icon';

export const HowItWorks = () => {
  const { openBookingModal } = useModal();
  return (
    <div className="space-y-12">
      
    {/*  PAGE HERO  */}
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
          <Link to="/" className="hover:text-[#059669]">Home</Link>
          <span>/</span>
          <span className="text-slate-900">Learning Methodology</span>
        </div>
        <span className="section-badge">Systematic Execution</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B4635] font-heading tracking-tight mb-4">
          How Online Learning Works at Readly
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          We have engineered a streamlined 5-stage online instructional system that delivers personal attention, conceptual clarity, and structured exam readiness directly to your screen.
        </p>
      </div>
    </section>

    {/*  DETAILED 5-STAGE PIPELINE  */}
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/*  Stage 1  */}
      <div className="card-base p-8 bg-white border-slate-200">
        <div className="grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-2">
            <span className="text-3xl font-extrabold text-[#059669] font-heading block">01</span>
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Evaluation</span>
          </div>
          <div className="md:col-span-10 space-y-2">
            <h2 className="text-xl font-bold text-slate-900 font-heading">Diagnostic Syllabus Baseline</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Before classes begin, students complete a 30-minute diagnostic worksheet covering foundational syllabus prerequisites. This pinpoints exact areas of weakness (e.g., algebraic manipulation, stoichiometry calculations, or essay evaluation) and allows mentors to personalize their pace from day one.
            </p>
          </div>
        </div>
      </div>

      {/*  Stage 2  */}
      <div className="card-base p-8 bg-white border-slate-200">
        <div className="grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-2">
            <span className="text-3xl font-extrabold text-[#059669] font-heading block">02</span>
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Live Classes</span>
          </div>
          <div className="md:col-span-10 space-y-2">
            <h2 className="text-xl font-bold text-slate-900 font-heading">Interactive Digital Classroom (Max 8 Students)</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Classes take place live via high-definition digital classroom software. Tutors use calibrated graphic tablets to solve calculations, draw anatomical diagrams, and deconstruct past questions live on screen. Because batches never exceed 8 students, every student actively participates and asks questions freely.
            </p>
          </div>
        </div>
      </div>

      {/*  Stage 3  */}
      <div className="card-base p-8 bg-white border-slate-200">
        <div className="grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-2">
            <span className="text-3xl font-extrabold text-[#059669] font-heading block">03</span>
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Drills</span>
          </div>
          <div className="md:col-span-10 space-y-2">
            <h2 className="text-xl font-bold text-slate-900 font-heading">15-Year Categorized Topical Past Papers</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Immediately following theory lectures, students are assigned topical homework workbooks containing official Cambridge past questions from the last 15 years. Every homework submission is personally marked with written comments highlighting lost marks or formatting errors.
            </p>
          </div>
        </div>
      </div>

      {/*  Stage 4  */}
      <div className="card-base p-8 bg-white border-slate-200">
        <div className="grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-2">
            <span className="text-3xl font-extrabold text-[#059669] font-heading block">04</span>
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Simulations</span>
          </div>
          <div className="md:col-span-10 space-y-2">
            <h2 className="text-xl font-bold text-slate-900 font-heading">Timed Mock Examinations Under Authentic Conditions</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Monthly timed mock exams simulate the real exam pressure. Papers are evaluated strictly according to official CAIE and Edexcel mark schemes, providing students with exact predicted grade boundaries and time-management feedback.
            </p>
          </div>
        </div>
      </div>

      {/*  Stage 5  */}
      <div className="card-base p-8 bg-white border-slate-200">
        <div className="grid md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-2">
            <span className="text-3xl font-extrabold text-[#059669] font-heading block">05</span>
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Transparency</span>
          </div>
          <div className="md:col-span-10 space-y-2">
            <h2 className="text-xl font-bold text-slate-900 font-heading">Parent Reporting & 24/7 Lecture Vault</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Parents receive bi-weekly WhatsApp progress audits detailing homework submission rates and mock exam trends. Furthermore, every live class recording is permanently archived in the student portal, allowing students to rewatch any lecture at 1.5x speed before official exams.
            </p>
          </div>
        </div>
      </div>

    </section>

    {/*  CLASSROOM TECH REQUIREMENTS  */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-100/60 rounded-2xl border border-slate-200 my-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="section-badge">Student Setup</span>
        <h2 className="text-3xl font-extrabold text-[#0B4635] font-heading">
          Classroom Technology & Equipment
        </h2>
        <p className="text-slate-600 text-sm mt-2">
          Joining our classes is simple. Here is the recommended student setup for an optimal learning experience:
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-base p-6 bg-white text-center">
          <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto mb-3">
            <Icon name="laptop" className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 font-heading mb-1">Laptop or Desktop</h3>
          <p className="text-xs text-slate-600">Windows, Mac, or Chromebook with Chrome or Edge browser installed.</p>
        </div>

        <div className="card-base p-6 bg-white text-center">
          <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center mx-auto mb-3">
            <Icon name="wifi" className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 font-heading mb-1">Reliable Internet</h3>
          <p className="text-xs text-slate-600">Minimum 5 Mbps broadband connection for smooth HD screen-sharing.</p>
        </div>

        <div className="card-base p-6 bg-white text-center">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-3">
            <Icon name="headphones" className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 font-heading mb-1">Headset with Mic</h3>
          <p className="text-xs text-slate-600">Enables two-way communication and crystal-clear audio during problem solving.</p>
        </div>

        <div className="card-base p-6 bg-white text-center">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto mb-3">
            <Icon name="tablet" className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 font-heading mb-1">Writing Tablet (Optional)</h3>
          <p className="text-xs text-slate-600">Stylus or graphics tablet for students who want to write directly on the board.</p>
        </div>
      </div>
    </section>

    {/*  BOTTOM CTA  */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="card-base p-8 sm:p-12 bg-[#0A192F] text-white text-center rounded-2xl border-slate-800">
        <h2 className="text-3xl font-extrabold font-heading mb-3 text-white">Experience a live class first-hand</h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6">
          Schedule a free 45-minute demo class with our subject mentor. Experience our digital whiteboard pedagogy with zero obligation.
        </p>
        <button
          type="button"
          onClick={() => openBookingModal()}
          className="btn btn-teal text-xs cursor-pointer"
        >
          <span>Book a Free Live Demo</span>
          <Icon name="calendar" className="w-4 h-4" />
        </button>
      </div>
    </section>
  
    </div>
  );
};
