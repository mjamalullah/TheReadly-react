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
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
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
  FileText,
  Atom,
  Globe,
  User,
  Volume2,
  Video,
  FileCheck,
  BadgeCheck
} from 'lucide-react';

const heroSlides = [
  {
    tabLabel: "Live Classroom",
    badge: "Cambridge O-Level & A-Level Online",
    badgeIcon: GraduationCap,
    titleMain: "Learn Today.",
    titleHighlight: "Excel Tomorrow.",
    subtitle: "Interactive Virtual Classroom & Exam Precision",
    description: "Personalized online learning designed around every student's academic goals. Expert-led instruction to master Cambridge O-Level, IGCSE, and A-Level subjects with examiner-trained faculty.",
    primaryBtn: { text: "Book a Free Demo", icon: Calendar, action: "modal" },
    secondaryBtn: { text: "Explore Subjects", icon: ArrowRight, to: "/subjects" },
    mobilePreview: {
      type: "live",
      tag: "Live Faculty",
      subject: "A-Level Physics (9702)",
      topic: "Thermodynamics & Superposition • 1:1 Live Canvas",
      stats: [
        { label: "Class Batch", val: "1-on-1 & Max 8" },
        { label: "Topical Mocks", val: "18 Mocks" },
        { label: "Trial Demo", val: "100% Free" }
      ]
    }
  },
  {
    tabLabel: "Past Paper Vault",
    badge: "15-Year Topical Question Vault",
    badgeIcon: BookOpen,
    titleMain: "Master Your",
    titleHighlight: "Cambridge Subjects.",
    subtitle: "Structured Syllabus & Past Paper Derivations",
    description: "Structured lessons, expert teachers, and exam-focused preparation. Learn syllabus mark schemes, examiner report keywords, and step-by-step problem derivations with topical video solutions.",
    primaryBtn: { text: "Explore All Programs", icon: BookOpen, to: "/programs" },
    secondaryBtn: { text: "Book a Free Demo", icon: Calendar, action: "modal" },
    mobilePreview: {
      type: "vault",
      tag: "Examiner Rubrics",
      subject: "Topical Past Paper Vault (2012–2026)",
      topic: "Mathematics 9709 • Physics 9702 • Chemistry 9701",
      stats: [
        { label: "Method Mark", val: "[M1] Derivations" },
        { label: "Accuracy", val: "[A1] 3 Sig-Figs" },
        { label: "Evaluation", val: "[E1] Rubric" }
      ]
    }
  },
  {
    tabLabel: "Distinction Merit",
    badge: "Rigorous Exam Rehearsals & Distinctions",
    badgeIcon: Award,
    titleMain: "Prepare With",
    titleHighlight: "Total Confidence.",
    subtitle: "Authentic Cambridge Rubrics & A* Results",
    description: "Develop the knowledge, analytical skills, and exam confidence needed for outstanding grades. Timed mock examinations evaluated under authentic Cambridge grading rubrics with guaranteed A* readiness.",
    primaryBtn: { text: "Schedule Diagnostic Demo", icon: CalendarCheck, action: "modal" },
    secondaryBtn: { text: "How It Works", icon: ArrowRight, to: "/how-it-works" },
    mobilePreview: {
      type: "merit",
      tag: "Verified A*",
      subject: "Official Distinction Merit Profile",
      topic: "Score 98.4% • Top 1% Regional Cambridge Candidates",
      stats: [
        { label: "Pakistan", val: "Rank #1" },
        { label: "UAE Dubai", val: "Raw 96%" },
        { label: "UK / KSA", val: "A* Grade" }
      ]
    }
  }
];

export const Home = () => {
  const { openBookingModal, openTeacherModal, openSyllabusModal, showToast, openThankYouModal } = useModal();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Subject Filter States
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTutorCategory, setSelectedTutorCategory] = useState('all');
  const [showAllSubjects, setShowAllSubjects] = useState(false);
  const [showAllMobileTutors, setShowAllMobileTutors] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Join as Tutor Short Form state
  const [tutorShortForm, setTutorShortForm] = useState({
    name: '',
    country_code: '+92',
    whatsapp_phone: '',
    email: '',
    curriculum: 'Cambridge O-Level & IGCSE',
    highest_qualification: "Master's Degree (M.Phil / MS / M.Sc)",
    experience: '3–5 Years',
    subjects: '',
    cv_link: '',
    bio: ''
  });
  const [isTutorSubmitting, setIsTutorSubmitting] = useState(false);
  const [isTutorSubmitted, setIsTutorSubmitted] = useState(false);
  const [tutorSubmittedData, setTutorSubmittedData] = useState(null);

  // 4.5s Auto Hero Slider with Pause on Hover
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  useEffect(() => {
    if (isHeroPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHeroPaused, currentSlide]);

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };
  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % heroSlides.length);
  };
  const handleSelectSlide = (idx) => {
    setCurrentSlide(idx);
  };

  // Board matching logic for IGCSE, O-Level, A-Level, Edexcel, IT
  const isMatchingBoard = (sub, board) => {
    if (board === 'all') return true;
    if (board === 'igcse') {
      return sub.boardCategory === 'igcse' ||
        (sub.boards && sub.boards.some(b => b.toLowerCase().includes('igcse'))) ||
        (sub.codes && sub.codes.some(c => c.toLowerCase().includes('igcse') || /0625|0620|0610|0580|0606|0478|0417|0455|0450|0452|0448|0493|0470|0460|0457|0500|0475|0539/i.test(c)));
    }
    if (board === 'olevel') {
      return sub.boardCategory === 'olevel' || (sub.boards && sub.boards.some(b => b.toLowerCase().includes('o level') || b.toLowerCase().includes('o-level')));
    }
    if (board === 'alevel') {
      return sub.boardCategory === 'alevel' || (sub.boards && sub.boards.some(b => b.toLowerCase().includes('a level') || b.toLowerCase().includes('a-level')));
    }
    if (board === 'edexcel') {
      return sub.boardCategory === 'edexcel' || (sub.boards && sub.boards.some(b => b.toLowerCase().includes('edexcel')));
    }
    if (board === 'it-certifications') {
      return sub.boardCategory === 'it-certifications' || sub.category === 'it-professional' || sub.category === 'technology';
    }
    return sub.boardCategory === board;
  };

  // Filtered Subjects for Home Page (Flagship / Main selection with 4-item initial limit)
  const allFilteredSubjects = subjectsData.filter(sub => {
    if (selectedBoard === 'all') {
      return sub.isMain;
    }
    return isMatchingBoard(sub, selectedBoard);
  });

  const displayedSubjects = showAllSubjects ? allFilteredSubjects : allFilteredSubjects.slice(0, 4);

  // Filtered Tutors for Faculty Section
  const filteredTutors = tutorsData.filter(tutor => {
    if (selectedTutorCategory === 'all') return true;
    return tutor.category === selectedTutorCategory;
  });

  const handleTutorShortSubmit = async (e) => {
    e.preventDefault();
    if (!tutorShortForm.name.trim() || !tutorShortForm.whatsapp_phone.trim() || !tutorShortForm.subjects.trim()) {
      showToast("Please enter your Name, WhatsApp Number, and Subjects to Teach.", "error");
      return;
    }

    setIsTutorSubmitting(true);
    const rawPhone = (tutorShortForm.whatsapp_phone || '').trim();
    const cleanPhone = rawPhone.replace(/^0+/, '');
    const fullWhatsApp = rawPhone.startsWith('+')
      ? rawPhone
      : `${tutorShortForm.country_code} ${cleanPhone}`;

    const payload = {
      formType: "teacher",
      form_type: "Homepage Pre-Footer Tutor Form",
      target_tab: "Become a Teacher",
      target_gid: READLY_CONFIG.tutorSheetGid || "1304058449",
      name: tutorShortForm.name.trim(),
      applicant_name: tutorShortForm.name.trim(),
      whatsapp: fullWhatsApp,
      email: tutorShortForm.email.trim() || 'N/A',
      highest_qualification: tutorShortForm.highest_qualification,
      teaching_experience: tutorShortForm.experience,
      target_curriculum: tutorShortForm.curriculum,
      subjects: tutorShortForm.subjects.trim(),
      weekly_availability: "Part-Time / Flexible",
      cv_portfolio_url: tutorShortForm.cv_link.trim() || 'N/A',
      statement_bio: tutorShortForm.bio.trim() || 'N/A',
      page: "Home Page Pre-Footer Section"
    };

    if (READLY_CONFIG.enableGoogleSheetLogging && READLY_CONFIG.googleSheetWebAppUrl) {
      try {
        await fetch(READLY_CONFIG.googleSheetWebAppUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Google Sheet log notice:', err);
      }
    }

    setTutorSubmittedData({
      name: tutorShortForm.name.trim(),
      whatsapp: fullWhatsApp,
      subjects: tutorShortForm.subjects.trim(),
      curriculum: tutorShortForm.curriculum
    });

    setIsTutorSubmitting(false);
    setIsTutorSubmitted(true);
    showToast("Application received! Our Academic Selection Committee will review your profile.", "success");

    openThankYouModal({
      title: "Faculty Application Received",
      name: tutorShortForm.name.trim(),
      englishSubtitle: "Thank you for reaching out to The Readly Institute. Your faculty application has been successfully received.",
      message: `Your credentials for teaching ${tutorShortForm.subjects.trim()} (${tutorShortForm.curriculum}) have been received. Our Academic Selection Committee will review your profile.`,
      whatsapp: fullWhatsApp,
      details: [
        { label: "Teaching Subjects", value: tutorShortForm.subjects.trim() },
        { label: "Curriculum", value: tutorShortForm.curriculum },
        { label: "Experience", value: tutorShortForm.experience }
      ],
      waUrl: `https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        `Hello The Readly Institute Academic Desk,\n\nI have applied to join as a Tutor for ${tutorShortForm.subjects.trim()}.\n• Applicant: ${tutorShortForm.name.trim()}\n• Contact: ${fullWhatsApp}\n\nLooking forward to speaking with the Academic Selection Committee!`
      )}`
    });
  };

  const handleResetTutorForm = () => {
    setIsTutorSubmitted(false);
    setTutorSubmittedData(null);
    setTutorShortForm({
      name: '',
      country_code: '+92',
      whatsapp_phone: '',
      email: '',
      curriculum: 'Cambridge O-Level & IGCSE',
      highest_qualification: "Master's Degree (M.Phil / MS / M.Sc)",
      experience: '3–5 Years',
      subjects: '',
      cv_link: '',
      bio: ''
    });
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

      {/* ================= 1. HERO SLIDER SECTION (3.5s Auto Rotator with Dialog Box) ================= */}
      <section 
        onMouseEnter={() => setIsHeroPaused(true)}
        onMouseLeave={() => setIsHeroPaused(false)}
        className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Slider Prev & Next Arrow Controls */}
          <button
            onClick={handlePrevSlide}
            aria-label="Previous slide"
            className="hidden md:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 items-center justify-center text-slate-700 hover:text-[#0B4635] hover:border-[#C59B4B] hover:bg-[#FEF9EE] transition-all hover:scale-110 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextSlide}
            aria-label="Next slide"
            className="hidden md:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 items-center justify-center text-slate-700 hover:text-[#0B4635] hover:border-[#C59B4B] hover:bg-[#FEF9EE] transition-all hover:scale-110 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            
            {/* Left Content (Dynamic Slider with Cinematic Staggered Entrance) */}
            <div 
              key={`slide-left-${currentSlide}`}
              className="lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-4 sm:space-y-5"
            >
              
              <div 
                className="animate-hero-fade-slide inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FEF9EE] text-[#936F1E] border border-[#E8D3A7] shadow-2xs"
                style={{ animationDelay: '0ms' }}
              >
                {React.createElement(heroSlides[currentSlide].badgeIcon, { className: "w-3.5 h-3.5 shrink-0 text-[#C59B4B]" })}
                <span className="truncate max-w-[260px] sm:max-w-none">{heroSlides[currentSlide].badge}</span>
              </div>

              <div className="space-y-1.5 sm:space-y-2 w-full">
                <h1 
                  className="animate-hero-fade-slide text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading tracking-tight leading-[1.2] sm:leading-[1.15]"
                  style={{ animationDelay: '90ms' }}
                >
                  {heroSlides[currentSlide].titleMain}{' '}
                  <span className="text-[#C59B4B]">{heroSlides[currentSlide].titleHighlight}</span>
                </h1>
                <h2 
                  className="animate-hero-fade-slide text-base sm:text-lg md:text-xl font-bold text-slate-800"
                  style={{ animationDelay: '170ms' }}
                >
                  {heroSlides[currentSlide].subtitle}
                </h2>
              </div>

              <p 
                className="animate-hero-fade-slide text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl md:max-w-2xl min-h-[50px] sm:min-h-[60px]"
                style={{ animationDelay: '250ms' }}
              >
                {heroSlides[currentSlide].description}
              </p>

              {/* Action Buttons (Mobile: Tap-Friendly & Centered Above/Near Fold) */}
              <div 
                className="animate-hero-fade-slide w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-2.5 sm:gap-3.5 pt-1 sm:pt-2"
                style={{ animationDelay: '330ms' }}
              >
                {heroSlides[currentSlide].primaryBtn.action === 'modal' ? (
                  <button
                    onClick={() => openBookingModal()}
                    className="btn btn-teal font-bold text-xs sm:text-sm px-6 py-3.5 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] cursor-pointer"
                  >
                    <span>{heroSlides[currentSlide].primaryBtn.text}</span>
                    {React.createElement(heroSlides[currentSlide].primaryBtn.icon, { className: "w-4 h-4 shrink-0" })}
                  </button>
                ) : (
                  <Link
                    to={heroSlides[currentSlide].primaryBtn.to}
                    className="btn btn-teal font-bold text-xs sm:text-sm px-6 py-3.5 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px]"
                  >
                    <span>{heroSlides[currentSlide].primaryBtn.text}</span>
                    {React.createElement(heroSlides[currentSlide].primaryBtn.icon, { className: "w-4 h-4 shrink-0" })}
                  </Link>
                )}

                {heroSlides[currentSlide].secondaryBtn.action === 'modal' ? (
                  <button
                    onClick={() => openBookingModal()}
                    className="btn btn-secondary font-bold text-xs sm:text-sm px-5 py-3.5 border border-slate-300 hover:border-[#059669] flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] cursor-pointer"
                  >
                    <span>{heroSlides[currentSlide].secondaryBtn.text}</span>
                    {React.createElement(heroSlides[currentSlide].secondaryBtn.icon, { className: "w-4 h-4 shrink-0" })}
                  </button>
                ) : (
                  <Link
                    to={heroSlides[currentSlide].secondaryBtn.to}
                    className="btn btn-secondary font-bold text-xs sm:text-sm px-5 py-3.5 border border-slate-300 hover:border-[#059669] flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px]"
                  >
                    <span>{heroSlides[currentSlide].secondaryBtn.text}</span>
                    {React.createElement(heroSlides[currentSlide].secondaryBtn.icon, { className: "w-4 h-4 shrink-0" })}
                  </Link>
                )}
              </div>

              {/* Mobile-Optimized Alternative Display (< lg viewports) */}
              <div className="w-full block lg:hidden pt-2">
                <div className="p-4 rounded-2xl bg-white/95 border border-emerald-100 shadow-md shadow-emerald-950/5 space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
                      <span className="text-[11px] font-bold text-[#0B4635]">
                        {heroSlides[currentSlide].mobilePreview.subject}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold bg-[#FEF9EE] text-[#936F1E] px-2 py-0.5 rounded-full border border-[#E8D3A7]">
                      {heroSlides[currentSlide].mobilePreview.tag}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-medium">
                    {heroSlides[currentSlide].mobilePreview.topic}
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    {heroSlides[currentSlide].mobilePreview.stats.map((st, i) => (
                      <div key={i} className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
                        <span className="font-extrabold text-[#059669] block text-xs truncate">{st.val}</span>
                        <span className="text-[10px] text-slate-500 font-medium truncate block">{st.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Slide Indicator Tabs with Dynamic Progress Countdown */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2 w-full">
                {heroSlides.map((slide, idx) => {
                  const isActive = currentSlide === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}: ${slide.tabLabel}`}
                      className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 cursor-pointer text-left ${
                        isActive 
                          ? 'bg-white border-2 border-[#C59B4B] shadow-sm shadow-[#C59B4B]/10 scale-[1.02]' 
                          : 'bg-white/70 border border-slate-200/80 hover:bg-white hover:border-[#C59B4B]/50'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-[#0B4635]' : 'text-slate-400'}`}>
                          0{idx + 1}
                        </span>
                        <span className={`text-xs font-bold ${isActive ? 'text-[#0B4635]' : 'text-slate-600 group-hover:text-slate-900'}`}>
                          {slide.tabLabel}
                        </span>
                      </div>

                      {isActive && (
                        <div className="w-8 sm:w-12 h-1.5 rounded-full bg-[#FEF9EE] border border-[#E8D3A7] overflow-hidden ml-1">
                          <div
                            key={`progress-${currentSlide}-${isHeroPaused}`}
                            className={`h-full bg-gradient-to-r from-[#B38838] to-[#C59B4B] rounded-full ${
                              !isHeroPaused ? 'hero-progress-active' : 'w-full'
                            }`}
                          />
                        </div>
                      )}
                    </button>
                  );
                })}

                {isHeroPaused && (
                  <span className="text-[10px] uppercase font-bold text-[#936F1E] bg-[#FEF9EE] border border-[#E8D3A7] px-2.5 py-1 rounded-full animate-fade-in ml-1">
                    Hover Paused
                  </span>
                )}
              </div>

            </div>

            {/* Right Desktop Area: 3 Completely Unique Layouts & Animations (hidden lg:block) */}
            <div className="hidden lg:block lg:col-span-5">
              
              {/* SLIDE 1 DESIGN: Live Interactive Virtual Whiteboard & Academic Portal */}
              {currentSlide === 0 && (
                <div key="slide-design-0" className="anim-slide1-portal anim-ambient-float">
                  <div className="dashboard-preview-window border border-emerald-100 shadow-2xl bg-white overflow-hidden rounded-2xl">
                    {/* macOS Header Bar */}
                    <div className="dashboard-header-bar bg-[#06251C] px-4 py-3 flex items-center justify-between border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                        <span className="text-xs font-mono font-semibold text-slate-200 ml-2">
                          Academic Portal • Live Classroom 04
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[10px] font-bold bg-[#0B4635] text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                          Faculty Live
                        </span>
                      </div>
                    </div>

                    {/* Portal Body */}
                    <div className="p-5 space-y-4 bg-white">
                      {/* Faculty & Subject Info Card */}
                      <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50/90 via-teal-50/60 to-white border border-emerald-200/80 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#0B4635] text-white flex items-center justify-center font-bold shadow-md shadow-emerald-950/10">
                            <Atom className="w-5 h-5 text-emerald-300" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-extrabold text-[#0B4635] uppercase tracking-wider">Active Stream</span>
                              <span className="text-[10px] font-bold bg-[#FEF9EE] text-[#936F1E] px-1.5 py-0.2 rounded border border-[#E8D3A7]">Grade A* Target</span>
                            </div>
                            <h4 className="text-sm font-extrabold text-slate-900 font-heading mt-0.5">A-Level Physics (9702)</h4>
                            <p className="text-xs text-slate-500">Thermodynamics & Superposition • Engr. Hamza</p>
                          </div>
                        </div>
                        
                        {/* Animated Audio Equalizer Waveform */}
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#06251C] text-emerald-300 text-[10px] font-mono shadow-2xs">
                            <Volume2 className="w-3 h-3 text-emerald-400" />
                            <span>Audio</span>
                            <div className="flex items-end gap-0.5 h-3 w-3.5 ml-0.5">
                              <span className="w-0.5 bg-emerald-400 rounded-full audio-bar-1"></span>
                              <span className="w-0.5 bg-emerald-400 rounded-full audio-bar-2"></span>
                              <span className="w-0.5 bg-emerald-400 rounded-full audio-bar-3"></span>
                              <span className="w-0.5 bg-emerald-400 rounded-full audio-bar-4"></span>
                            </div>
                          </div>
                          <span className="text-[10px] text-emerald-700 font-bold">1:1 Graphics Tablet</span>
                        </div>
                      </div>

                      {/* Simulated Live Whiteboard Step */}
                      <div className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-1.5 shadow-inner">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1.5">
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Whiteboard Canvas Stream
                          </span>
                          <span className="text-[10px] text-slate-400">CAIE 9702/P4 • Q3 Derivation</span>
                        </div>
                        <div className="space-y-1 text-[11px] font-mono">
                          <p className="text-slate-300">Step 1: First Law &rarr; <span className="text-amber-300 font-bold">&Delta;Q = &Delta;U + W</span></p>
                          <p className="text-emerald-300">Step 2: Isobaric Work &rarr; <span className="text-white font-bold">W = P &middot; &Delta;V = 1.01 &times; 10&#8309; &times; 0.045 J</span></p>
                          <p className="text-slate-400 text-[10px] italic pt-0.5">&bull; [M1] Formula substitution verified &bull; [A1] Final Answer: 4.54 kJ</p>
                        </div>
                      </div>

                      {/* Syllabus Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                            15-Year Topical Question Coverage
                          </span>
                          <span className="text-[#059669] font-extrabold">92% Mastered</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-[#0B4635] via-[#059669] to-[#C59B4B] h-2 rounded-full w-[92%] transition-all duration-1000"></div>
                        </div>
                      </div>

                      {/* 3 Metrics Pills */}
                      <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                        <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200">
                          <span className="font-extrabold text-[#0B4635] block text-xs sm:text-sm">1-on-1 / Batch</span>
                          <span className="text-[10px] text-slate-500 font-medium">Max 8 Learners</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200">
                          <span className="font-extrabold text-amber-900 block text-xs sm:text-sm">18 Mocks</span>
                          <span className="text-[10px] text-slate-500 font-medium">Timed Practice</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                          <span className="font-extrabold text-slate-800 block text-xs sm:text-sm">24/7 Desk</span>
                          <span className="text-[10px] text-slate-500 font-medium">Doubt Portal</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2 DESIGN: 3D Layered Dual-Card Stack (Past Paper Vault & Examiner Rubrics) */}
              {currentSlide === 1 && (
                <div key="slide-design-1" className="relative space-y-[-24px] select-none">
                  {/* Card 1: Top Layer (Past Paper Matrix & Video Solutions) */}
                  <div className="anim-card-top relative z-10 p-5 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-slate-900/10 transition-transform duration-300 hover:scale-[1.01]">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#FEF9EE] border border-[#E8D3A7] flex items-center justify-center text-[#C59B4B]">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-extrabold text-[#0B4635] uppercase tracking-wide">Topical Past Paper Vault</h4>
                          <p className="text-[11px] text-slate-500">2012 – 2026 Series • Topical Video Solutions</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-[#ECFDF5] text-[#059669] px-2.5 py-1 rounded-full border border-emerald-200">
                        CAIE & Edexcel
                      </span>
                    </div>

                    {/* Subject Rows with Video Solution Badges */}
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-emerald-50/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
                          <span className="text-xs font-bold text-slate-900">Mathematics (4024 / 9709)</span>
                        </div>
                        <span className="text-[10px] font-bold bg-white text-[#0B4635] px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1 shadow-2xs">
                          <Video className="w-3 h-3 text-[#C59B4B]" />
                          P1, P2 & Pure P3 Solved
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-emerald-50/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#C59B4B]"></span>
                          <span className="text-xs font-bold text-slate-900">Physics (5054 / 9702)</span>
                        </div>
                        <span className="text-[10px] font-bold bg-white text-[#0B4635] px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1 shadow-2xs">
                          <FileCheck className="w-3 h-3 text-[#059669]" />
                          ATP Paper 4 & Theory
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-emerald-50/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="text-xs font-bold text-slate-900">Chemistry & Biology</span>
                        </div>
                        <span className="text-[10px] font-bold bg-white text-[#0B4635] px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1 shadow-2xs">
                          <BadgeCheck className="w-3 h-3 text-emerald-600" />
                          Organic Pathways & MS
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Bottom Overlapping Layer (Examiner Marking Rubrics) */}
                  <div className="anim-card-bottom relative z-0 p-5 pt-8 rounded-2xl bg-gradient-to-br from-[#06251C] to-[#0B4635] text-white border border-[#C59B4B]/40 shadow-2xl shadow-emerald-950/20">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                      <div className="flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-[#C59B4B]" />
                        <span className="text-xs font-extrabold text-[#FEF9EE] uppercase tracking-wider">Examiner Rubric Breakdown</span>
                      </div>
                      <span className="text-[10px] font-bold bg-[#C59B4B] text-[#06251C] px-2 py-0.5 rounded-full font-mono">
                        100% Mark Scheme Aligned
                      </span>
                    </div>

                    {/* Rubric Criteria Checklist */}
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="flex items-start gap-2.5 bg-white/5 p-2 rounded-lg border border-white/5">
                        <span className="text-[10px] font-mono font-bold bg-[#C59B4B]/20 text-[#DFBA73] px-1.5 py-0.5 rounded shrink-0">[M1]</span>
                        <span className="text-slate-200 text-[11px]"><strong>Method Mark:</strong> Step-by-step formula & algebraic substitution verified</span>
                      </div>
                      <div className="flex items-start gap-2.5 bg-white/5 p-2 rounded-lg border border-white/5">
                        <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded shrink-0">[A1]</span>
                        <span className="text-slate-200 text-[11px]"><strong>Accuracy Mark:</strong> Correct numerical answer rounded strictly to 3 sig-figs</span>
                      </div>
                      <div className="flex items-start gap-2.5 bg-white/5 p-2 rounded-lg border border-white/5">
                        <span className="text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded shrink-0">[E1]</span>
                        <span className="text-slate-200 text-[11px]"><strong>Evaluation Mark:</strong> Examiner report command words & critical conclusions</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3 DESIGN: Framed Gold Distinction Certificate & Global Merit Scorecard */}
              {currentSlide === 2 && (
                <div key="slide-design-2" className="anim-certificate-stamp anim-gold-pulse relative rounded-2xl border-2 border-[#C59B4B] bg-gradient-to-b from-[#FFFDF9] via-[#FCF8EE] to-[#F7EED8] p-6 shadow-2xl shadow-[#C59B4B]/20 select-none overflow-hidden">
                  {/* Certificate Corner Geometric Accents */}
                  <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#C59B4B]"></div>
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#C59B4B]"></div>
                  <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#C59B4B]"></div>
                  <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#C59B4B]"></div>

                  {/* Watermark Crest */}
                  <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
                    <Award className="w-56 h-56 text-[#0B4635]" />
                  </div>

                  {/* Certificate Header */}
                  <div className="text-center border-b border-[#E8D3A7] pb-3 mb-3 relative">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF9EE] border border-[#C59B4B] text-[#936F1E] text-[10px] font-extrabold uppercase tracking-widest mb-1 shadow-2xs">
                      <Award className="w-3.5 h-3.5 text-[#C59B4B]" />
                      <span>Official Distinction Audit Card</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-[#0B4635] font-heading tracking-wide uppercase">
                      The Readly Institute &bull; Merit Roll
                    </h3>
                    <p className="text-[11px] text-slate-600 font-serif italic">Cambridge Assessment International Series Mock Audit</p>
                  </div>

                  {/* Distinction Score Ribbon */}
                  <div className="p-3.5 rounded-xl bg-white/95 border border-[#E8D3A7] flex items-center justify-between shadow-sm mb-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Official Result Profile</span>
                      <h4 className="text-xl font-extrabold text-[#0B4635] font-heading leading-tight">
                        Grade A* Distinction
                      </h4>
                      <span className="text-[11px] text-[#936F1E] font-medium flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#C59B4B] text-[#C59B4B]" />
                        Top 1% Worldwide Candidate Profile
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-black text-[#0B4635] font-heading block">98.4%</span>
                      <span className="text-[10px] font-bold text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-emerald-200">
                        Grade Cleared
                      </span>
                    </div>
                  </div>

                  {/* Global Student Merit Roll Pills (3 international hubs) */}
                  <div className="space-y-1.5 mb-3">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block px-1">
                      Global Candidate Benchmarks:
                    </span>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-lg bg-white/90 border border-[#E8D3A7]/80 shadow-2xs">
                        <span className="text-sm block">🇵🇰</span>
                        <span className="font-extrabold text-slate-900 block text-[11px]">Pakistan #1</span>
                        <span className="text-[9px] text-slate-500">Math 4024 (Raw 98)</span>
                      </div>

                      <div className="p-2 rounded-lg bg-white/90 border border-[#E8D3A7]/80 shadow-2xs">
                        <span className="text-sm block">🇦🇪</span>
                        <span className="font-extrabold text-slate-900 block text-[11px]">UAE (Dubai)</span>
                        <span className="text-[9px] text-slate-500">Physics 9702 (A*)</span>
                      </div>

                      <div className="p-2 rounded-lg bg-white/90 border border-[#E8D3A7]/80 shadow-2xs">
                        <span className="text-sm block">🇸🇦 🇬🇧</span>
                        <span className="font-extrabold text-slate-900 block text-[11px]">KSA & UK</span>
                        <span className="text-[9px] text-slate-500">IGCSE CS 0478 (A*)</span>
                      </div>
                    </div>
                  </div>

                  {/* Verification Stamp Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#E8D3A7]/80 text-[10px] text-slate-600">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <ShieldCheck className="w-4 h-4 text-[#059669]" />
                      <span>Verified Examiner Grading Rubric</span>
                    </div>
                    <span className="font-mono font-bold text-[#936F1E] bg-[#FEF9EE] px-2 py-0.5 rounded border border-[#E8D3A7]">
                      REF: RDL-2026-A*
                    </span>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* ================= 2. TRUST STATS BAR ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="card-base p-5 bg-white border-slate-200 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0B4635] font-heading block">4,500+</span>
            <span className="text-xs font-bold text-slate-800 block">Distinction Grades</span>
            <span className="text-[11px] text-slate-500">Verified CAIE & Edexcel</span>
          </div>

          <div className="card-base p-5 bg-white border-slate-200 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#C59B4B] font-heading block">98.4%</span>
            <span className="text-xs font-bold text-slate-800 block">A* / A Pass Rate</span>
            <span className="text-[11px] text-slate-500">Documented Academic Proof</span>
          </div>

          <div className="card-base p-5 bg-white border-slate-200 text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#0B4635] font-heading block">15+ Years</span>
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
            Explore Our <span className="text-[#C59B4B]">Academic Programs</span>
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
              Curriculum <span className="text-[#C59B4B]">Subject Offerings</span>
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
              onClick={() => {
                setSelectedBoard(b.id);
                setShowAllSubjects(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                selectedBoard === b.id
                  ? 'bg-[#0B4635] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Subject Cards Grid (Initial 4-item display with smooth expansion) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-all duration-500">
          {displayedSubjects.map(sub => (
            <div
              key={sub.id}
              onClick={() => openSyllabusModal(sub)}
              className="card-base p-5 bg-white border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group animate-card-entry"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#059669]">
                    {sub.boards?.[0]}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-semibold truncate max-w-[120px]">
                    {sub.codes?.[0]?.replace(/^(CAIE O Level:|Cambridge IGCSE:|CAIE AS & A Level:|Edexcel IGCSE:|Edexcel IAL:)\s*/i, '') || 'Code'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#059669] transition-colors leading-snug">
                  {sub.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{sub.description}</p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="text-[11px] text-emerald-700 font-bold">View Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Toggle / Expand Mechanism (Show All / Show Less) */}
        {allFilteredSubjects.length > 4 && (
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setShowAllSubjects(prev => !prev)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-white text-[#0B4635] border-2 border-emerald-100 hover:border-[#059669] hover:bg-[#ECFDF5] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer min-h-[44px] group"
            >
              <span>{showAllSubjects ? 'Show Less' : `View All Subjects (${allFilteredSubjects.length})`}</span>
              {showAllSubjects ? (
                <ChevronUp className="w-4 h-4 text-[#059669] transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#059669] transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        )}

        {/* Explore All Subjects Action Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#ECFDF5] via-white to-[#FAF6EE] border border-[#A7F3D0] flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#059669]">
              Comprehensive Academic Catalog
            </span>
            <h4 className="text-base sm:text-lg font-extrabold text-[#0B4635] font-heading">
              Looking for More Subjects? Explore All 50+ Syllabi
            </h4>
            <p className="text-xs text-slate-600">
              Browse complete past paper breakdowns, syllabus codes, and examiner schemes across O-Level, IGCSE, A-Level, Edexcel & IT Tracks.
            </p>
          </div>
          <Link
            to="/subjects"
            className="btn-teal-academic py-2.5 px-6 text-xs font-bold shrink-0 flex items-center gap-2 shadow-sm hover:scale-[1.02] transition-transform"
          >
            <span>Explore Full Catalog (50+ Subjects)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ================= 5. THE DISTINCTION ENGINE SECTION (Replaces single-subject Maths) ================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#F4FBF7] via-white to-[#FAF6EE] border-2 border-[#A7F3D0] shadow-xl rounded-3xl relative overflow-hidden">
          
          {/* Subtle Decorative Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
              
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FEF9EE] text-[#936F1E] border border-[#E8D3A7] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
                <span>The Readly Distinction Engine</span>
              </span>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading tracking-tight leading-tight">
                  How We Turn Syllabus Doubts Into{' '}
                  <span className="text-[#C59B4B]">Straight A* Distinctions</span>
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl">
                  We don't believe in crowded classrooms or passive video watching. Every student follows an individualized diagnostic roadmap combining concept breakdown, 15-year past paper mastery, and Cambridge examiner mark-scheme precision.
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid sm:grid-cols-2 gap-3.5 w-full text-left pt-2">
                
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#059669] hover:shadow-md transition-all space-y-1.5 group">
                  <div className="flex items-center gap-2 text-[#0B4635] text-xs font-bold uppercase tracking-wider group-hover:text-[#059669] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>1-on-1 Diagnostic Intake</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    A 30-min evaluation to identify prerequisite gaps before lessons begin.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#059669] hover:shadow-md transition-all space-y-1.5 group">
                  <div className="flex items-center gap-2 text-[#0B4635] text-xs font-bold uppercase tracking-wider group-hover:text-[#059669] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>15-Yr Topical Past Papers</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Classified question banks drilled with official CAIE mark-scheme keywords.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#059669] hover:shadow-md transition-all space-y-1.5 group">
                  <div className="flex items-center gap-2 text-[#0B4635] text-xs font-bold uppercase tracking-wider group-hover:text-[#059669] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>Timed Mocks & Grade Curves</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Full timed simulations calibrated to real historical grade thresholds.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#059669] hover:shadow-md transition-all space-y-1.5 group">
                  <div className="flex items-center gap-2 text-[#0B4635] text-xs font-bold uppercase tracking-wider group-hover:text-[#059669] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                    <span>WhatsApp Parent Audits</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Bi-weekly reports on attendance, homework completion, and mock scores.
                  </p>
                </div>

              </div>

              {/* Action Buttons (Tap-friendly on mobile) */}
              <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-3 pt-3">
                <button
                  onClick={() => openBookingModal()}
                  className="btn btn-teal font-bold text-xs sm:text-sm px-6 py-3.5 shadow-md hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] cursor-pointer"
                >
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>Schedule Free Diagnostic Session</span>
                </button>
                <Link
                  to="/subjects"
                  className="bg-white text-[#0B4635] border-2 border-slate-300 hover:border-[#059669] hover:bg-[#ECFDF5] hover:text-[#059669] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] shadow-2xs transition-all"
                >
                  <span>Explore All 50+ Subjects</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              </div>

            </div>

            {/* Right Interactive Dashboard Preview */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/90 shadow-xl space-y-5">
                
                {/* Scorecard Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4635] to-[#047857] shadow-md flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <span className="font-black text-xl tracking-tight leading-none select-none" style={{ color: '#ffffff' }}>
                        A*
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0B4635] font-heading">Diagnostic Assessment Tracker</h4>
                      <p className="text-[11px] text-[#059669] font-semibold">Cambridge & Edexcel Distinction Target</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse"></span>
                    Live Status
                  </span>
                </div>

                {/* Progress Gauges */}
                <div className="space-y-3.5 text-xs">
                  
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                      <span>Concept Foundations (P1 / P2)</span>
                      <span className="text-[#059669] font-bold">100% Mastered</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/50">
                      <div className="bg-gradient-to-r from-[#059669] to-teal-400 h-2.5 rounded-full w-full"></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                      <span>Topical Past Paper Drills (15 Yrs)</span>
                      <span className="text-[#059669] font-bold">94% Completed</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/50">
                      <div className="bg-gradient-to-r from-[#059669] to-teal-400 h-2.5 rounded-full w-[94%]"></div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                      <span>Examiner Mark-Scheme Calibration</span>
                      <span className="text-[#059669] font-bold">98% Accuracy</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/50">
                      <div className="bg-gradient-to-r from-[#059669] to-teal-400 h-2.5 rounded-full w-[98%]"></div>
                    </div>
                  </div>

                </div>

                {/* 3 Metric Badges */}
                <div className="grid grid-cols-3 gap-2.5 pt-2 text-center text-xs">
                  <div className="p-3 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] shadow-2xs">
                    <span className="text-base sm:text-lg font-extrabold block font-heading" style={{ color: '#059669' }}>98.4%</span>
                    <span className="text-[10px] text-slate-600 font-semibold">A* / A Pass</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                    <span className="text-base sm:text-lg font-extrabold block font-heading" style={{ color: '#0B4635' }}>1-on-1</span>
                    <span className="text-[10px] text-slate-600 font-semibold">Focused Pacing</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCBF] shadow-2xs">
                    <span className="text-base sm:text-lg font-extrabold block font-heading" style={{ color: '#B45309' }}>100%</span>
                    <span className="text-[10px] text-slate-600 font-semibold">Free Demo</span>
                  </div>
                </div>

                {/* Micro Guarantee Note */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-center gap-2 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#059669] shrink-0" />
                  <span>Zero upfront payment required. Experience our teaching before deciding.</span>
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
            Why Students <span className="text-[#C59B4B]">Excel With Us</span>
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
            Our Systematic <span className="text-[#C59B4B]">Learning Methodology</span>
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] shadow-md flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
                  <span className="text-white !text-white font-black text-lg select-none leading-none" style={{ color: '#ffffff' }}>
                    01
                  </span>
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4635] to-[#063326] shadow-md flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
                  <span className="text-white !text-white font-black text-lg select-none leading-none" style={{ color: '#ffffff' }}>
                    02
                  </span>
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#059669] to-[#047857] shadow-md flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
                  <span className="text-white !text-white font-black text-lg select-none leading-none" style={{ color: '#ffffff' }}>
                    03
                  </span>
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C59B4B] to-[#9A7228] shadow-md flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform">
                  <span className="text-white !text-white font-black text-lg select-none leading-none" style={{ color: '#ffffff' }}>
                    04
                  </span>
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

      {/* ================= 8. ACADEMIC FACULTY / TEACHERS ROSTER ================= */}
      <section id="teachers" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-pattern-lattice rounded-2xl border border-slate-200 my-6">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#059669] block mb-1.5">Academic Faculty</span>
          <h2 className="text-3xl font-extrabold text-[#0B4635] font-heading">
            Learn From Faculty Who <span className="text-[#C59B4B]">Mastered Cambridge</span>
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Select a verified subject mentor to schedule a 1-on-1 diagnostic trial session.
          </p>
        </div>

        {/* Discipline Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
          {[
            { id: 'all', label: 'All Faculty' },
            { id: 'languages', label: 'Languages & Urdu' },
            { id: 'sciences', label: 'Sciences (Physics, Chem, Bio)' },
            { id: 'maths', label: 'Mathematics' },
            { id: 'technology', label: 'Computer Science' },
            { id: 'commerce', label: 'Economics & Business' },
            { id: 'humanities', label: 'English & Humanities' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedTutorCategory(cat.id);
                setShowAllMobileTutors(false);
              }}
              className={`tutor-pill px-3.5 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                selectedTutorCategory === cat.id
                  ? 'active bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Teachers Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor, idx) => (
            <div
              key={tutor.id}
              id={`tutorCard-${tutor.id}`}
              className={`academic-card academic-card-hover p-6 flex flex-col justify-between relative bg-white ${
                !showAllMobileTutors && idx >= 4 ? 'hidden sm:flex' : 'flex'
              }`}
            >
              <div>
                {/* Header with Mentor Photo, Name & Level */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md border-2 border-slate-200 shrink-0 bg-[#ECFDF5]">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => { e.target.src = '/images/teachers/sohail-anjum.jpg'; }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-base font-bold text-slate-900 font-heading truncate">{tutor.name}</h3>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                        {tutor.level}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#059669] truncate">{tutor.role}</p>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded inline-block mt-1">
                      {tutor.experience}
                    </span>
                  </div>
                </div>

                {/* Qualification & Credentials */}
                <p className="text-[11px] font-medium text-slate-500 mb-2.5">
                  {tutor.qualifications}
                </p>

                {/* Short Bio */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {tutor.bio}
                </p>

                {/* Subjects Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {tutor.subjects?.map((s, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 rounded text-[10px] bg-slate-50 border border-slate-200 text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Select Action */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => openTeacherModal(tutor)}
                  className="btn-secondary-academic py-1.5 px-3 text-xs font-semibold flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => openBookingModal({ teacher: tutor.name, subject: tutor.subjects?.[0] || '' })}
                  className="btn-teal-academic py-1.5 px-3 text-xs font-bold flex items-center gap-1.5"
                >
                  <span>Select Mentor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-Only View All / Show Less Toggle Button */}
        {filteredTutors.length > 4 && (
          <div className="flex sm:hidden justify-center pt-6">
            <button
              onClick={() => setShowAllMobileTutors(prev => !prev)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-white text-[#0B4635] border-2 border-emerald-100 hover:border-[#059669] hover:bg-[#ECFDF5] shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer min-h-[44px] group"
            >
              <span>{showAllMobileTutors ? 'Show Less' : `View All Teachers (${filteredTutors.length})`}</span>
              {showAllMobileTutors ? (
                <ChevronUp className="w-4 h-4 text-[#059669] transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#059669] transition-transform group-hover:translate-y-0.5" />
              )}
            </button>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link to="/teachers" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669] hover:underline">
            <span>Explore All Faculty Bios & Distinctions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ================= 9. FAQ ACCORDION ================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center">
          <span className="section-badge">Got Questions?</span>
          <h2 className="text-3xl font-extrabold text-[#0B4635] font-heading mt-2">
            Frequently Asked <span className="text-[#C59B4B]">Questions</span>
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

      {/* ================= 10. JOIN AS TUTOR SHORT FORM (LIGHT-DARK HIGH CONTRAST) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 bg-gradient-to-br from-slate-100 via-slate-50 to-emerald-50/50 border border-slate-200/90 rounded-3xl shadow-lg text-slate-800">
          {isTutorSubmitted && tutorSubmittedData ? (
            /* Thank You / Confirmation State (No Auto-Redirect) */
            <div className="bg-white text-slate-900 rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-200 text-center space-y-6 max-w-2xl mx-auto animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-[#059669] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-200">
                  Faculty Application Received
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Thank You, {tutorSubmittedData.name}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                  Your credentials for teaching <strong className="text-slate-900 font-bold">{tutorSubmittedData.subjects}</strong> ({tutorSubmittedData.curriculum}) have been successfully submitted to our Academic Faculty Desk.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-left space-y-2 text-slate-700 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Applicant Name:</span>
                  <span className="font-bold text-slate-900">{tutorSubmittedData.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">Contact WhatsApp:</span>
                  <span className="font-semibold text-slate-800">{tutorSubmittedData.whatsapp}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500 font-medium">Review Status:</span>
                  <span className="font-bold text-[#059669]">Under Evaluation (1–2 Days)</span>
                </div>
              </div>

              {/* Standalone Action Buttons (No auto-redirect) */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    `Hello The Readly Institute Academic Desk,\n\nI have applied to join as a Tutor for ${tutorSubmittedData.subjects}.\n• Applicant: ${tutorSubmittedData.name}\n• Contact: ${tutorSubmittedData.whatsapp}\n\nLooking forward to speaking with the Academic Selection Committee!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.942.812 2.796.812 3.179 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.767-5.798zm3.364 8.163c-.141.396-.714.731-1.01.769-.283.036-.649.064-1.921-.462-1.397-.579-2.316-1.979-2.385-2.072-.07-.093-.565-.751-.565-1.433 0-.682.358-1.018.485-1.157.128-.139.278-.174.372-.174.093 0 .186.002.267.006.086.005.201-.033.314.24.118.283.402.977.437 1.047.035.07.058.152.012.245-.047.093-.07.151-.139.233-.07.081-.147.18-.21.244-.07.07-.143.146-.062.285.081.139.362.597.777.967.534.476.985.624 1.124.693.139.07.221.058.303-.035.082-.093.349-.408.442-.548.093-.14.186-.117.314-.07.128.047.814.384.954.454.14.07.233.105.267.163.035.058.035.337-.106.733z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.05 22l5.167-1.323A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.545 0-3.003-.437-4.247-1.196l-.304-.184-3.134.803.834-3.05-.201-.318A8.127 8.127 0 013.833 12C3.833 7.5 7.5 3.833 12 3.833S20.167 7.5 20.167 12 16.5 20.167 12 20.167z" />
                  </svg>
                  <span>Chat with Academic Desk on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetTutorForm}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Value Proposition & High-Contrast Typography */}
              <div className="lg:col-span-5 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEF9EE] text-[#936F1E] border border-[#E8D3A7]">
                  <GraduationCap className="w-4 h-4 text-[#C59B4B]" /> Faculty Recruitment Desk
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4635] font-heading leading-tight">
                  Teach With <span className="text-[#C59B4B]">The Readly Institute</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Join an elite faculty of Cambridge & Edexcel subject specialists. Mentor motivated students across Pakistan, the Middle East, and the UK from the convenience of your home.
                </p>

                <div className="space-y-3 text-xs pt-1">
                  <div className="flex items-start gap-3 bg-white/90 p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-medium">Competitive hourly remuneration with prompt direct payouts</span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/90 p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-medium">Flexible teaching schedules adapted to your availability</span>
                  </div>
                  <div className="flex items-start gap-3 bg-white/90 p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-medium">Verified topical question banks, LMS, and grading tools provided</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to="/become-a-tutor"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#059669] hover:text-[#047857] hover:underline underline-offset-4 transition-colors"
                  >
                    <span>View full faculty benefits & compensation details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Short Application Form (Crisp Light Card with Dark Fonts) */}
              <div className="lg:col-span-7">
                <form onSubmit={handleTutorShortSubmit} className="bg-white p-6 sm:p-8 rounded-2xl text-slate-900 shadow-xl border border-slate-200/80 space-y-4 text-xs">
                  
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900 font-heading">Faculty Quick Application</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Please provide your details below. All submissions are treated confidentially.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={tutorShortForm.name}
                        onChange={(e) => setTutorShortForm({ ...tutorShortForm, name: e.target.value })}
                        placeholder="e.g. Dr. Salman Tariq"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 mb-1">WhatsApp Phone *</label>
                      <div className="flex rounded-lg border border-slate-300 focus-within:ring-2 focus-within:ring-[#059669] focus-within:border-transparent bg-white overflow-hidden">
                        <select
                          value={tutorShortForm.country_code}
                          onChange={(e) => setTutorShortForm({ ...tutorShortForm, country_code: e.target.value })}
                          className="bg-slate-100 border-r border-slate-200 px-2.5 py-2.5 text-slate-700 text-xs font-semibold focus:outline-none max-w-[125px] truncate"
                        >
                          <optgroup label="⭐ Popular">
                            {popularCountries.map((c, idx) => (
                              <option key={`pop-${c.name}-${idx}`} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                            ))}
                          </optgroup>
                          <optgroup label="🌍 All Countries">
                            {otherCountries.map((c, idx) => (
                              <option key={`all-${c.name}-${idx}`} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                            ))}
                          </optgroup>
                        </select>
                        <input
                          type="tel"
                          required
                          value={tutorShortForm.whatsapp_phone}
                          onChange={(e) => {
                            const clean = e.target.value.replace(/[^0-9+\s-]/g, '');
                            setTutorShortForm({ ...tutorShortForm, whatsapp_phone: clean });
                          }}
                          placeholder="300 1234567"
                          className="w-full bg-transparent px-3 py-2 text-slate-900 font-medium text-xs focus:outline-none"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">e.g. 300 1234567 (without leading zero)</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={tutorShortForm.email}
                        onChange={(e) => setTutorShortForm({ ...tutorShortForm, email: e.target.value })}
                        placeholder="tutor@example.com"
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Curriculum Board</label>
                      <select
                        value={tutorShortForm.curriculum}
                        onChange={(e) => setTutorShortForm({ ...tutorShortForm, curriculum: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all"
                      >
                        <option>Cambridge O-Level & IGCSE</option>
                        <option>Cambridge International A-Level</option>
                        <option>Pearson Edexcel (IGCSE & IAL)</option>
                        <option>IT & Professional Certifications</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Highest Qualification</label>
                      <select
                        value={tutorShortForm.highest_qualification}
                        onChange={(e) => setTutorShortForm({ ...tutorShortForm, highest_qualification: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all"
                      >
                        <option>Ph.D. / Doctorate</option>
                        <option>Master's Degree (M.Phil / MS / M.Sc)</option>
                        <option>Bachelor's Degree (BS / B.Sc / BA)</option>
                        <option>CA / ACCA / CFA</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Teaching Experience</label>
                      <select
                        value={tutorShortForm.experience}
                        onChange={(e) => setTutorShortForm({ ...tutorShortForm, experience: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all"
                      >
                        <option>1–2 Years</option>
                        <option>3–5 Years</option>
                        <option>5–10 Years</option>
                        <option>10+ Years (Senior Specialist)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Subject(s) You Wish to Teach *</label>
                    <input
                      type="text"
                      required
                      value={tutorShortForm.subjects}
                      onChange={(e) => setTutorShortForm({ ...tutorShortForm, subjects: e.target.value })}
                      placeholder="e.g. A-Level Pure Mathematics (9709), Physics (9702), Chemistry (9701)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Resume / CV Link (Google Drive / LinkedIn)</label>
                    <input
                      type="url"
                      value={tutorShortForm.cv_link}
                      onChange={(e) => setTutorShortForm({ ...tutorShortForm, cv_link: e.target.value })}
                      placeholder="https://drive.google.com/... or LinkedIn profile URL"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isTutorSubmitting}
                      className="btn btn-teal w-full text-xs font-bold py-3.5 justify-center shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                    >
                      {isTutorSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>Submitting Faculty Credentials...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Faculty Application</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-slate-500 text-center mt-2.5 font-normal">
                      Submitting records your application securely. You will not be redirected automatically.
                    </p>
                  </div>
                </form>
              </div>

            </div>
          )}
        </div>
      </section>

    </div>
  );
};