import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { subjectsData } from '../data/subjectsData';
import { tutorsData } from '../data/tutorsData';
import { countriesData } from '../data/countriesData';
import { READLY_CONFIG } from '../config/readlyConfig';
import {
  Sparkles,
  ArrowRight,
  Calculator,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  GraduationCap,
  Layers,
  PhoneCall,
  Play,
  Send,
  ShieldCheck,
  Star,
  Users,
  Award,
  BookOpen,
  Laptop,
  TrendingUp,
  FileText
} from 'lucide-react';

const heroSlides = [
  {
    badge: "Accredited CAIE & Edexcel Online Academy",
    title: "Achieve Cambridge A* Distinctions With Specialized 1-on-1 Faculty Mentorship",
    description: "Personalized online tutoring for Cambridge O-Level, IGCSE & A-Level. Master mark-scheme precision, 15-year topical past papers, and conceptual problem-solving from the comfort of home.",
    primaryBtn: "Book a Free Trial Session",
    secondaryBtn: "Explore Programs",
    stat: "98.4% Distinction Rate"
  },
  {
    badge: "Master Syllabus Prerequisites & Core Exam Papers",
    title: "Structured O-Level & IGCSE Preparation for Peak Exam Confidence",
    description: "Small batches (max 6 students) and intensive 1-on-1 coaching in Urdu, Mathematics, Physics, Chemistry, Biology, and Computer Science. Learn from proven CAIE examiners and top mentors.",
    primaryBtn: "Schedule Diagnostic Trial",
    secondaryBtn: "View Faculty Mentors",
    stat: "15+ Years CAIE Experience"
  },
  {
    badge: "High-Demand Future Skills & Industry Certifications",
    title: "Industry-Aligned IT & Professional Certifications for Career Edge",
    description: "Launch your technical career with Digital Marketing, CSIS Information Security, Modern Full-Stack Web Development, and Python with AI Analytics. Practical hands-on portfolio projects.",
    primaryBtn: "Explore IT Courses",
    secondaryBtn: "Meet Tech Faculty",
    stat: "100% Practical Portfolio"
  }
];

export const Home = () => {
  const { openBookingModal, openTeacherModal, openSyllabusModal, showToast } = useModal();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Subject Filter States
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Quick Form state
  const [quickForm, setQuickForm] = useState({
    student_name: '',
    parent_name: '',
    country_code: '+92',
    whatsapp_phone: '',
    program: 'Cambridge O-Level',
    subject: 'Urdu - First Language (3247)'
  });
  const [isQuickSubmitting, setIsQuickSubmitting] = useState(false);

  // 3s Auto Hero Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Filtered Subjects
  const filteredSubjects = subjectsData.filter(sub => {
    const matchBoard = selectedBoard === 'all' || sub.boardCategory === selectedBoard;
    const matchCategory = selectedCategory === 'all' || sub.category === selectedCategory;
    return matchBoard && matchCategory;
  }).slice(0, 8);

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickForm.student_name.trim() || !quickForm.whatsapp_phone.trim()) {
      showToast("Please enter Student Name and WhatsApp Number.", "error");
      return;
    }

    setIsQuickSubmitting(true);
    const fullWhatsApp = quickForm.whatsapp_phone.startsWith('+')
      ? quickForm.whatsapp_phone
      : `${quickForm.country_code} ${quickForm.whatsapp_phone}`;

    const payload = {
      form_type: "Quick Homepage Demo Booking",
      student_name: quickForm.student_name.trim(),
      parent_name: quickForm.parent_name.trim() || 'N/A',
      whatsapp: fullWhatsApp,
      program: quickForm.program,
      subject: quickForm.subject,
      page: "Home Page Quick Form"
    };

    if (READLY_CONFIG.enableGoogleSheetLogging && READLY_CONFIG.googleSheetWebAppUrl) {
      fetch(READLY_CONFIG.googleSheetWebAppUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.warn('Google Sheet log notice:', err));
    }

    const waLines = [
      "Hello Team Readly,",
      "",
      "I am interested in admission at The Readly Institute and would like to book a Free Trial Demo Class.",
      "",
      "Here are my details:",
      `• Student Name: ${quickForm.student_name.trim()}`,
      quickForm.parent_name.trim() ? `• Parent Name: ${quickForm.parent_name.trim()}` : null,
      `• WhatsApp: ${fullWhatsApp}`,
      `• Program: ${quickForm.program}`,
      `• Subject for Demo: ${quickForm.subject}`,
      "",
      "Looking forward to hearing from you. Thank you!"
    ].filter(Boolean);

    const waUrl = `https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent(waLines.join('\n'))}`;

    showToast(`Inquiry received for ${quickForm.student_name}! Opening WhatsApp...`, "success");

    setTimeout(() => {
      setIsQuickSubmitting(false);
      window.open(waUrl, '_blank');
    }, 600);
  };

  const faqs = [
    {
      q: "What examination boards does The Readly Institute prepare students for?",
      a: "We provide comprehensive preparation for Cambridge Assessment International Education (CAIE) O-Level (1123, 3247, 3248, 4024, 5054, 5070, 5090, 2210), Cambridge IGCSE, Cambridge International AS & A-Level (9709, 9702, 9701, 9700, 9618), Pearson Edexcel International GCSE/A-Level, and Career IT Professional Certifications."
    },
    {
      q: "How does the 100% Free Trial Demo session work?",
      a: "Our diagnostic trial session is completely free with zero upfront financial commitment. The student meets 1-on-1 with an experienced subject specialist who analyzes prerequisite understanding, explains a sample syllabus concept, and outlines a targeted study plan."
    },
    {
      q: "What happens if a student misses a scheduled live class?",
      a: "Every live class is recorded in high definition and archived inside the student portal within 2 hours. Students can rewatch lectures anytime at normal or 1.5x speed throughout the academic term."
    },
    {
      q: "How are parents kept updated on student progress?",
      a: "We maintain complete transparency. Parents receive bi-weekly WhatsApp progress audits detailing attendance, homework submission accuracy, and monthly timed mock assessment scores compared against historical Cambridge grade thresholds."
    },
    {
      q: "What is the class size in group batches?",
      a: "To ensure every student receives personalized attention, our micro-batches never exceed 6 to 8 students. Tutors engage every learner directly on graphics tablets and address questions in real-time."
    }
  ];

  const popularCountries = countriesData.filter(c => c.popular);
  const otherCountries = countriesData.filter(c => !c.popular);

  return (
    <div className="space-y-16 sm:space-y-24">

      {/* ================= 1. HERO SLIDER SECTION (3s Auto Rotator) ================= */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (Dynamic Slider) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{heroSlides[currentSlide].badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading tracking-tight leading-[1.15] min-h-[120px] sm:min-h-[140px] flex items-center">
                {heroSlides[currentSlide].title}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl min-h-[70px]">
                {heroSlides[currentSlide].description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openBookingModal()}
                  className="btn btn-teal font-bold text-xs sm:text-sm px-6 py-3 shadow-md hover:shadow-lg transition-all"
                >
                  <span>{heroSlides[currentSlide].primaryBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/programs"
                  className="btn btn-secondary font-bold text-xs sm:text-sm px-5 py-3 border border-slate-300 hover:border-[#059669]"
                >
                  <span>{heroSlides[currentSlide].secondaryBtn}</span>
                </Link>
              </div>

              {/* Slide Indicators */}
              <div className="flex items-center gap-2 pt-4">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'w-8 bg-[#059669]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
                <span className="text-[11px] text-slate-600 font-semibold ml-2">
                  Slide {currentSlide + 1} of {heroSlides.length}
                </span>
              </div>

            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="card-base p-6 sm:p-8 bg-white border border-slate-200 shadow-xl rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                      <span className="text-xs font-bold text-slate-800">Live Diagnostic Intake Active</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#059669]">
                      May/June 2026
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#059669] text-white flex items-center justify-center font-bold font-heading text-sm">
                          Urdu
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">Sohail Anjum</h4>
                          <p className="text-[11px] text-slate-500">15+ Years Cambridge Lead</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-800">CAIE Distinction</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0B4635] text-white flex items-center justify-center font-bold font-heading text-sm">
                          Math
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">Dr. Sarah Ahmed</h4>
                          <p className="text-[11px] text-slate-500">Pure Mathematics & Mechanics</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-800">9709 P1/P3</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#C59B4B] text-slate-950 flex items-center justify-center font-bold font-heading text-sm">
                          IT
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">Digital Marketing & CSIS</h4>
                          <p className="text-[11px] text-slate-500">Industry Performance Strategy</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-amber-100 text-amber-800">PRO Certified</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => openBookingModal()}
                      className="btn btn-teal w-full text-xs font-bold py-2.5 justify-center shadow-xs"
                    >
                      <span>Claim Free 30-Min Diagnostic Paper</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 2. TRUST STATS BAR ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="card-base p-5 bg-white border-slate-200 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#059669] font-heading block">4,500+</span>
            <span className="text-xs font-bold text-slate-800 block">Distinction Grades</span>
            <span className="text-[11px] text-slate-500">Verified CAIE & Edexcel</span>
          </div>

          <div className="card-base p-5 bg-white border-slate-200 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0B4635] font-heading block">98.4%</span>
            <span className="text-xs font-bold text-slate-800 block">A* / A Pass Rate</span>
            <span className="text-[11px] text-slate-500">Documented Academic Proof</span>
          </div>

          <div className="card-base p-5 bg-white border-slate-200 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#059669] font-heading block">15+ Years</span>
            <span className="text-xs font-bold text-slate-800 block">CAIE Specialization</span>
            <span className="text-[11px] text-slate-500">Senior Examiner Faculty</span>
          </div>

          <div className="card-base p-5 bg-white border-slate-200 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#C59B4B] font-heading block">100% Live</span>
            <span className="text-xs font-bold text-slate-800 block">1-on-1 & Micro-Batches</span>
            <span className="text-[11px] text-slate-500">Never Exceeding 8 Students</span>
          </div>
        </div>
      </section>

      {/* ================= 3. EXPLORE OUR ACADEMIC PROGRAMS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-badge">Accredited Pathways</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4635] font-heading mt-2">
            Explore Our Programs
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Tailored curriculum tracks covering syllabus deconstruction, mark schemes, and technical industry skills.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {/* Card 1: O-Level */}
          <div className="card-base p-6 bg-white border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase bg-emerald-50 text-[#059669]">CAIE</span>
              <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-[#059669] transition-colors">Cambridge O-Level</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive 1-on-1 tutoring covering syllabus fundamentals, topical question banks, and weekly feedback.
              </p>
            </div>
            <Link to="/programs" className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#059669]">
              <span>View Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Card 2: IGCSE */}
          <div className="card-base p-6 bg-white border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase bg-emerald-50 text-[#059669]">International</span>
              <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-[#059669] transition-colors">Cambridge IGCSE</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Engineered for international school students across UAE, Saudi Arabia, and UK exam centers.
              </p>
            </div>
            <Link to="/programs" className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#059669]">
              <span>View Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Card 3: A-Level */}
          <div className="card-base p-6 bg-white border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase bg-emerald-50 text-[#059669]">Advanced</span>
              <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-[#059669] transition-colors">Cambridge A-Level</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Specialized mentoring for AS and A2 examinations focusing on differential calculus, organic synthesis, and mechanics.
              </p>
            </div>
            <Link to="/programs" className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#059669]">
              <span>View Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Card 4: Edexcel */}
          <div className="card-base p-6 bg-white border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase bg-indigo-50 text-indigo-700">Edexcel</span>
              <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-indigo-700 transition-colors">Pearson Edexcel</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated training for International GCSE and International A-Level with official modular past paper drills.
              </p>
            </div>
            <Link to="/programs" className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span>View Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Card 5: IT Certifications */}
          <div className="card-base p-6 bg-white border-slate-200 hover:border-amber-500 hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-800">Tech Track</span>
              <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-amber-800 transition-colors">IT & Certifications</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Digital Marketing, CSIS Cyber Defense, Modern Full-Stack Web Development, and Python with AI analytics.
              </p>
            </div>
            <Link to="/programs" className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>View Courses</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

        </div>
      </section>

      {/* ================= 4. SUBJECT CATALOG WITH BOARD & CATEGORY FILTERS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="section-badge">Comprehensive Database</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B4635] font-heading mt-1">
              Curriculum Subject Offerings
            </h2>
            <p className="text-xs text-slate-600">Click any subject to view detailed paper breakdowns and syllabus prerequisites.</p>
          </div>
          <Link to="/subjects" className="text-xs font-bold text-[#059669] hover:underline flex items-center gap-1">
            <span>Browse Full Subject Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Board Filters */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
          {[
            { id: 'all', label: 'All Boards' },
            { id: 'olevel', label: 'Cambridge O-Level' },
            { id: 'igcse', label: 'Cambridge IGCSE' },
            { id: 'alevel', label: 'Cambridge A-Level' },
            { id: 'edexcel', label: 'Pearson Edexcel' },
            { id: 'it-certifications', label: 'IT & Certifications' }
          ].map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedBoard(b.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedBoard === b.id
                  ? 'bg-[#0B4635] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Subject Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredSubjects.map(sub => (
            <div
              key={sub.id}
              onClick={() => openSyllabusModal(sub)}
              className="card-base p-5 bg-white border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#059669]">
                    {sub.boards?.[0]}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{sub.codes?.[0]?.split(':')[0] || 'Code'}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#059669] transition-colors">{sub.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{sub.description}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="text-[11px] text-emerald-700 font-bold">View Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 5. MASTER MATHEMATICS SECTION WITH .btn-outline-white ================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="card-base p-8 sm:p-12 bg-gradient-to-br from-[#0A192F] to-[#0E2A47] text-white border-slate-800 shadow-xl rounded-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF6EE] text-[#8C6619] border border-[#E8DCBF]">
                <Calculator className="w-3.5 h-3.5" /> Featured Academic Masterclass
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                Master Mathematics With Confidence
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                From O-Level 4024 to A-Level Pure Mathematics (9709 P1 & P3) and Mechanics. We deconstruct abstract calculus, vectors, and algebra into intuitive, first-principle problem solving.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 text-xs text-slate-200 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Concept-based learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Expert instruction</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>15-Year past paper practice</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Exam strategies & mark schemes</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <Link to="/subjects" className="btn btn-teal">
                  <span>Explore Mathematics</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => openBookingModal({ subject: 'Mathematics (4024 / 9709)' })}
                  className="btn btn-outline-white"
                >
                  <span>Book a Free Trial Class</span>
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-700/80 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Course Syllabus Blueprint</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded bg-slate-800/60">
                    <span>Pure Maths 1 (P1)</span>
                    <span className="text-[#C59B4B] font-mono">Quadratic & Calculus</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-800/60">
                    <span>Pure Maths 3 (P3)</span>
                    <span className="text-[#C59B4B] font-mono">Differential Equations</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-800/60">
                    <span>Mechanics (M1)</span>
                    <span className="text-[#C59B4B] font-mono">Newtonian Dynamics</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-800/60">
                    <span>Probability & Stats (S1)</span>
                    <span className="text-[#C59B4B] font-mono">Normal Distribution</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 6. WHY CHOOSE READLY (6 Structured Blocks) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-badge">The Readly Difference</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4635] font-heading mt-2">
            Why Students Excel With Us
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Built from the ground up for Cambridge distinction results with zero fluff.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card-base p-6 bg-white border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Verified Subject Mentors</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every faculty member has 8 to 15+ years of verified CAIE instruction and has personally guided students to straight A* grades.
            </p>
          </div>

          <div className="card-base p-6 bg-white border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">15-Year Topical Question Banks</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No generic theory. Every lecture is anchored by official Cambridge past paper questions organized topic-by-topic.
            </p>
          </div>

          <div className="card-base p-6 bg-white border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center font-bold">
              <Play className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">24/7 HD Lecture Vault</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never miss a lesson. All live lectures are permanently recorded and available in your portal for exam revisions.
            </p>
          </div>

          <div className="card-base p-6 bg-white border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center font-bold">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Bi-Weekly WhatsApp Audits</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Parents receive structured progress updates detailing homework submission rates and mock exam trends.
            </p>
          </div>

          <div className="card-base p-6 bg-white border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Examiner Mark Scheme Focus</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We teach students how Cambridge examiners allocate marks, preventing unnecessary point loss on phrasing and units.
            </p>
          </div>

          <div className="card-base p-6 bg-white border-slate-200 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">Free 30-Min Diagnostic Session</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assess your syllabus standing before you enroll. No upfront payment or financial commitment required.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 7. HOW IT WORKS (Redesigned 4-Step Process Cards) ================= */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50/80 rounded-3xl border border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-badge">Clear Academic Pathway</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4635] font-heading mt-2">
            How It Works
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            From your introductory trial to exam distinction in four transparent, guided steps.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="card-base p-6 sm:p-7 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] text-white font-heading font-extrabold flex items-center justify-center text-base shadow-md group-hover:scale-105 transition-transform">
                  01
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-[#059669] border border-emerald-100">
                  Step 1 • Trial
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading mb-2 group-hover:text-[#059669] transition-colors">
                Book Your Demo
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose your subject, curriculum board (Cambridge/Edexcel), and schedule a convenient 100% free trial session with our faculty.
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Free • No upfront commitment</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card-base p-6 sm:p-7 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4635] to-[#063326] text-white font-heading font-extrabold flex items-center justify-center text-base shadow-md group-hover:scale-105 transition-transform">
                  02
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                  Step 2 • Pairing
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading mb-2 group-hover:text-[#059669] transition-colors">
                Meet Your Teacher
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect 1-on-1 with an experienced subject specialist who diagnoses syllabus gaps and maps out a milestone roadmap.
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Users className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Diagnostic assessment included</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card-base p-6 sm:p-7 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] text-white font-heading font-extrabold flex items-center justify-center text-base shadow-md group-hover:scale-105 transition-transform">
                  03
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-[#059669] border border-emerald-100">
                  Step 3 • Classes
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading mb-2 group-hover:text-[#059669] transition-colors">
                Start Learning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Attend live interactive digital classes, solve categorized past paper workbooks, and rewatch HD lecture recordings anytime.
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Laptop className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Max 8 students per batch</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="card-base p-6 sm:p-7 bg-white border border-slate-200 rounded-2xl shadow-xs hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C59B4B] to-[#9A7228] text-white font-heading font-extrabold flex items-center justify-center text-base shadow-md group-hover:scale-105 transition-transform">
                  04
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                  Step 4 • A* Goal
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading mb-2 group-hover:text-[#C59B4B] transition-colors">
                Track & Excel
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive weekly feedback reports, sit authentic timed mock examinations, and master mark-scheme techniques for straight A*s.
              </p>
            </div>
            <div className="pt-4 mt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-800">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <span>CAIE & Edexcel mark precision</span>
            </div>
          </div>

        </div>

        <div className="mt-12 text-center flex flex-wrap items-center justify-center gap-4">
          <button onClick={() => openBookingModal()} className="btn btn-teal text-xs">
            <span>Book Your Free Trial Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <Link to="/how-it-works" className="btn btn-secondary text-xs">
            <span>Explore Detailed 5-Stage Methodology</span>
          </Link>
        </div>
      </section>

      {/* ================= 8. FACULTY / TEACHERS ROSTER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="section-badge">Verified Mentors</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4635] font-heading mt-2">
              Learn From Experienced Faculty
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Select a mentor to review detailed achievements or schedule a trial class.
            </p>
          </div>
          <Link to="/teachers" className="text-xs font-bold text-[#059669] hover:underline flex items-center gap-1">
            <span>View Full Faculty Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorsData.slice(0, 3).map(tutor => (
            <div key={tutor.id} className="card-base p-6 bg-white border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                    onError={(e) => { e.target.src = '/images/teachers/sohail-anjum.jpg'; }}
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">{tutor.name}</h3>
                    <p className="text-xs text-[#059669] font-semibold">{tutor.role}</p>
                    <span className="text-[11px] text-slate-500 block mt-0.5">{tutor.qualifications}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">{tutor.bio}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tutor.subjects?.slice(0, 2).map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => openTeacherModal(tutor)}
                  className="text-xs font-bold text-slate-700 hover:text-[#059669]"
                >
                  View Profile
                </button>
                <button
                  onClick={() => openBookingModal({ teacher: tutor.name, subject: tutor.subjects?.[0] || '' })}
                  className="btn btn-teal text-xs py-1.5 px-3"
                >
                  Book Trial
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 9. FAQ ACCORDION ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <span className="section-badge">Got Questions?</span>
          <h2 className="text-3xl font-extrabold text-[#0B4635] font-heading mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl bg-white overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-900 hover:text-[#059669] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-[#059669]' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ================= 10. QUICK TRIAL BOOKING FORM ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-base p-8 sm:p-12 bg-gradient-to-br from-[#0B4635] to-[#063326] text-white rounded-3xl shadow-xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#059669]">
                <Sparkles className="w-3.5 h-3.5" /> Start Your Distinction Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                Ready to Experience The Readly Standard?
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Fill in your details to schedule a complimentary 1-on-1 diagnostic trial paper and consultation with our academic mentors.
              </p>
              <div className="space-y-2 text-xs text-emerald-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No credit card or upfront deposit required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Direct admissions coordinator reply within 1 hour</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleQuickSubmit} className="bg-white p-6 sm:p-8 rounded-2xl text-slate-900 shadow-lg space-y-4 text-xs">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Student Name *</label>
                    <input
                      type="text"
                      required
                      value={quickForm.student_name}
                      onChange={(e) => setQuickForm({ ...quickForm, student_name: e.target.value })}
                      placeholder="e.g. Ali Raza"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Parent Name</label>
                    <input
                      type="text"
                      value={quickForm.parent_name}
                      onChange={(e) => setQuickForm({ ...quickForm, parent_name: e.target.value })}
                      placeholder="e.g. Raza Mohammad"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">WhatsApp Number *</label>
                    <div className="flex rounded-lg border border-slate-300 focus-within:border-[#059669] focus-within:ring-1 focus-within:ring-[#059669] bg-white overflow-hidden shadow-xs">
                      <select
                        value={quickForm.country_code}
                        onChange={(e) => setQuickForm({ ...quickForm, country_code: e.target.value })}
                        className="bg-slate-50 border-r border-slate-200 px-2 py-2 text-slate-700 text-xs font-semibold focus:outline-none max-w-[130px] sm:max-w-[155px] truncate"
                      >
                        <optgroup label="⭐ Popular / Quick Select">
                          {popularCountries.map(c => (
                            <option key={c.name} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                          ))}
                        </optgroup>
                        <optgroup label="🌍 All Countries (A - Z)">
                          {otherCountries.map(c => (
                            <option key={c.name} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                          ))}
                        </optgroup>
                      </select>
                      <input
                        type="tel"
                        required
                        value={quickForm.whatsapp_phone}
                        onChange={(e) => setQuickForm({ ...quickForm, whatsapp_phone: e.target.value })}
                        placeholder="333 7221552"
                        className="w-full bg-transparent px-3 py-2 text-slate-800 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Curriculum Board</label>
                    <select
                      value={quickForm.program}
                      onChange={(e) => setQuickForm({ ...quickForm, program: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                    >
                      <option>Cambridge O-Level</option>
                      <option>Cambridge IGCSE</option>
                      <option>Cambridge A-Level</option>
                      <option>Pearson Edexcel</option>
                      <option>IT & Professional Certifications</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isQuickSubmitting}
                    className="btn btn-teal w-full text-xs font-bold py-3 justify-center shadow-md"
                  >
                    {isQuickSubmitting ? "Sending & Opening WhatsApp..." : "Schedule Diagnostic Trial & Open WhatsApp"}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
