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
  User
} from 'lucide-react';

const heroSlides = [
  {
    badge: "Cambridge O-Level & A-Level Online",
    badgeIcon: GraduationCap,
    titleMain: "Learn Today.",
    titleHighlight: "Excel Tomorrow.",
    subtitle: "Build Strong Foundations",
    description: "Personalized online learning designed around every student's academic goals. Expert-led instruction to master Cambridge O-Level, IGCSE, and A-Level subjects with confidence.",
    primaryBtn: { text: "Book a Free Demo", icon: Calendar, action: "modal" },
    secondaryBtn: { text: "Explore Subjects", icon: ArrowRight, to: "/subjects" },
    dialog: {
      type: "session",
      headerTitle: "Academic Class Portal • Active Session",
      headerTag: "Grade A* Target",
      subjectCode: "A-Level Physics (9702)",
      subjectTopic: "Thermodynamics & Waves • Mr. Hamza Khan",
      subjectTag: "In Session",
      progressLabel: "15-Year Topical Question Coverage",
      progressPercent: 88,
      stats: [
        { label: "Batch Size", value: "Max 8" },
        { label: "Timed Practice", value: "18 Mocks", highlight: true },
        { label: "Doubt Portal", value: "24/7" }
      ]
    }
  },
  {
    badge: "Structured Syllabus & Past Papers",
    badgeIcon: CheckCircle2,
    titleMain: "Master Your",
    titleHighlight: "Cambridge Subjects.",
    subtitle: "Structured Lessons & Expert Instruction",
    description: "Structured lessons, expert teachers and exam-focused preparation. Learn syllabus mark schemes, examiner report keywords, and step-by-step problem derivations.",
    primaryBtn: { text: "Explore All Programs", icon: BookOpen, to: "/programs" },
    secondaryBtn: { text: "Book a Free Demo", icon: Calendar, action: "modal" },
    dialog: {
      type: "diagnostics",
      headerTitle: "Curriculum Diagnostics",
      headerTag: "CAIE & Edexcel",
      blocks: [
        {
          title: "Mathematics & Pure Calculus",
          desc: "Full step-by-step derivation videos, past paper solution sheets, and weekly timed mocks.",
          theme: "teal"
        },
        {
          title: "Sciences (Physics, Chem, Bio)",
          desc: "Paper 4 ATP analysis, magnification calculations, and chemical reaction pathways.",
          theme: "teal"
        },
        {
          title: "Economics & Business Studies",
          desc: "20-mark evaluation essay frameworks (BLT method) and macroeconomic policy diagrams.",
          theme: "amber"
        }
      ]
    }
  },
  {
    badge: "Rigorous Exam Rehearsals",
    badgeIcon: Award,
    titleMain: "Prepare With",
    titleHighlight: "Total Confidence.",
    subtitle: "Knowledge, Skills & High Performance",
    description: "Develop the knowledge, analytical skills and exam confidence needed for outstanding grades. Timed mock examinations evaluated under authentic Cambridge grading rubrics.",
    primaryBtn: { text: "Schedule Diagnostic Demo", icon: CalendarCheck, action: "modal" },
    secondaryBtn: { text: "How It Works", icon: ArrowRight, to: "/how-it-works" },
    dialog: {
      type: "mock",
      headerTitle: "Mock Exam Audit Card",
      headerTag: "Verified Rubric",
      examTitle: "Student Mock Performance",
      examSeries: "Cambridge Oct/Nov Series Mock #4",
      score: "94 / 100",
      rubrics: [
        "Examiner keyword accuracy: 96%",
        "Time management per question: Optimal",
        "Formula derivations: Zero penalties"
      ],
      recommendation: "Ready for official series registration with predicted A* profile."
    }
  },
  {
    badge: "International Online Academy",
    badgeIcon: Globe,
    titleMain: "Your Future",
    titleHighlight: "Starts Here.",
    subtitle: "Learn from Experienced Educators from Home",
    description: "Connect with world distinction mentors from the comfort of your home. Small cohorts, individualized attention, and parent feedback loops.",
    primaryBtn: { text: "Start with a Free Demo", icon: Sparkles, action: "modal" },
    secondaryBtn: { text: "Meet Our Faculty", icon: Users, to: "/teachers" },
    dialog: {
      type: "features",
      headerTitle: "Global Academic Community",
      headerTag: "24/7 Access",
      items: [
        {
          badge: "UK",
          badgeBg: "bg-[#059669] text-white",
          title: "Cambridge Assessment Standards",
          desc: "Official syllabuses 2026/2027"
        },
        {
          badge: "HD",
          badgeBg: "bg-[#047857] text-white",
          title: "Recorded Lecture Vault",
          desc: "Rewatch any lesson anytime before exams"
        },
        {
          badge: "1:1",
          badgeBg: "bg-amber-500 text-white",
          title: "Dedicated Mentor Support",
          desc: "Weekly progress reviews with parents"
        }
      ]
    }
  }
];

export const Home = () => {
  const { openBookingModal, openTeacherModal, openSyllabusModal, showToast } = useModal();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Subject Filter States
  const [selectedBoard, setSelectedBoard] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTutorCategory, setSelectedTutorCategory] = useState('all');
  const [showAllSubjects, setShowAllSubjects] = useState(false);
  const [showAllMobileTutors, setShowAllMobileTutors] = useState(false);

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

      {/* ================= 1. HERO SLIDER SECTION (3.5s Auto Rotator with Dialog Box) ================= */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Slider Prev & Next Arrow Controls */}
          <button
            onClick={() => setCurrentSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
            aria-label="Previous slide"
            className="hidden md:flex absolute -left-3 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 items-center justify-center text-slate-700 hover:text-[#059669] hover:border-[#059669] transition-all hover:scale-105 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide(prev => (prev + 1) % heroSlides.length)}
            aria-label="Next slide"
            className="hidden md:flex absolute -right-3 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 items-center justify-center text-slate-700 hover:text-[#059669] hover:border-[#059669] transition-all hover:scale-105 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            
            {/* Left Content (Dynamic Slider) */}
            <div className="lg:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-4 sm:space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] shadow-2xs">
                {React.createElement(heroSlides[currentSlide].badgeIcon, { className: "w-3.5 h-3.5 shrink-0" })}
                <span className="truncate max-w-[260px] sm:max-w-none">{heroSlides[currentSlide].badge}</span>
              </div>

              <div className="space-y-1.5 sm:space-y-2 w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading tracking-tight leading-[1.2] sm:leading-[1.15]">
                  {heroSlides[currentSlide].titleMain}{' '}
                  <span className="text-[#059669]">{heroSlides[currentSlide].titleHighlight}</span>
                </h1>
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-800">
                  {heroSlides[currentSlide].subtitle}
                </h2>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl md:max-w-2xl min-h-[50px] sm:min-h-[60px]">
                {heroSlides[currentSlide].description}
              </p>

              {/* Action Buttons (Mobile: Tap-Friendly & Centered Above/Near Fold) */}
              <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-start gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
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
                        {heroSlides[currentSlide].dialog.headerTitle}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold bg-[#ECFDF5] text-[#059669] px-2 py-0.5 rounded-full border border-emerald-200">
                      {heroSlides[currentSlide].dialog.headerTag}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
                      <span className="font-extrabold text-[#059669] block text-xs">98%</span>
                      <span className="text-[10px] text-slate-500 font-medium">Distinctions</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/80">
                      <span className="font-extrabold text-slate-800 block text-xs">1-on-1</span>
                      <span className="text-[10px] text-slate-500 font-medium">Mentorship</span>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-200/80">
                      <span className="font-extrabold text-amber-800 block text-xs">Zero Fee</span>
                      <span className="text-[10px] text-slate-500 font-medium">First Demo</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="flex items-center justify-center md:justify-start gap-2 pt-1 sm:pt-2 w-full">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlide === idx ? 'w-8 bg-[#059669]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
                <span className="text-[11px] text-slate-500 font-semibold ml-2">
                  Slide {currentSlide + 1} of {heroSlides.length}
                </span>
              </div>

            </div>

            {/* Right Academic Dialog Box / macOS Preview Window (Desktop only: hidden lg:block) */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="dashboard-preview-window">
                
                {/* macOS Style Header Bar */}
                <div className="dashboard-header-bar">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-xs font-mono font-medium text-slate-200 ml-2">
                      {heroSlides[currentSlide].dialog.headerTitle}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#064E3B] text-emerald-200 px-2.5 py-0.5 rounded border border-emerald-500/30">
                    {heroSlides[currentSlide].dialog.headerTag}
                  </span>
                </div>

                {/* Dialog Body - Slide 1: Academic Class Portal */}
                {heroSlides[currentSlide].dialog.type === 'session' && (
                  <div className="p-6 space-y-4 bg-white">
                    <div className="p-4 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#D1FAE5] text-[#059669] flex items-center justify-center font-bold">
                          <Atom className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#059669] uppercase tracking-wider block">Class Session</span>
                          <h4 className="text-sm font-bold text-slate-900">{heroSlides[currentSlide].dialog.subjectCode}</h4>
                          <p className="text-xs text-slate-500">{heroSlides[currentSlide].dialog.subjectTopic}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-[11px] font-bold text-[#047857] bg-[#D1FAE5] border border-[#A7F3D0] rounded-md">
                        {heroSlides[currentSlide].dialog.subjectTag}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{heroSlides[currentSlide].dialog.progressLabel}</span>
                        <span className="text-[#059669] font-bold">{heroSlides[currentSlide].dialog.progressPercent}% Mastered</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-[#059669] h-2.5 rounded-full transition-all duration-700"
                          style={{ width: `${heroSlides[currentSlide].dialog.progressPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 pt-2 text-center text-xs">
                      {heroSlides[currentSlide].dialog.stats.map((st, i) => (
                        <div
                          key={i}
                          className={`p-2.5 rounded-lg border ${
                            st.highlight
                              ? 'bg-[#ECFDF5] border-[#A7F3D0]'
                              : 'bg-slate-50 border-slate-200/80'
                          }`}
                        >
                          <span className={`font-bold block text-xs sm:text-sm ${st.highlight ? 'text-[#059669]' : 'text-slate-900'}`}>
                            {st.value}
                          </span>
                          <span className="text-[10px] text-slate-500">{st.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dialog Body - Slide 2: Curriculum Diagnostics */}
                {heroSlides[currentSlide].dialog.type === 'diagnostics' && (
                  <div className="p-6 space-y-3.5 bg-white">
                    {heroSlides[currentSlide].dialog.blocks.map((bl, i) => (
                      <div
                        key={i}
                        className={`p-3.5 rounded-xl border ${
                          bl.theme === 'amber'
                            ? 'bg-amber-50/70 border-amber-200'
                            : 'bg-[#ECFDF5] border-[#A7F3D0]'
                        }`}
                      >
                        <h4 className={`text-xs font-bold uppercase ${bl.theme === 'amber' ? 'text-amber-900' : 'text-[#0B4635]'}`}>
                          {bl.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{bl.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Dialog Body - Slide 3: Mock Exam Audit Card */}
                {heroSlides[currentSlide].dialog.type === 'mock' && (
                  <div className="p-6 space-y-4 bg-white">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{heroSlides[currentSlide].dialog.examTitle}</h4>
                        <p className="text-xs text-slate-500">{heroSlides[currentSlide].dialog.examSeries}</p>
                      </div>
                      <span className="text-xl font-extrabold text-[#059669] font-heading">
                        {heroSlides[currentSlide].dialog.score}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-600">
                      {heroSlides[currentSlide].dialog.rubrics.map((r, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl text-xs text-[#0B4635] flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <div>
                        <strong>Tutor Recommendation:</strong> {heroSlides[currentSlide].dialog.recommendation}
                      </div>
                    </div>
                  </div>
                )}

                {/* Dialog Body - Slide 4: Global Academic Community */}
                {heroSlides[currentSlide].dialog.type === 'features' && (
                  <div className="p-6 space-y-3 bg-white">
                    {heroSlides[currentSlide].dialog.items.map((it, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className={`w-9 h-9 rounded-full ${it.badgeBg} flex items-center justify-center font-bold text-xs shrink-0`}>
                          {it.badge}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{it.title}</h4>
                          <p className="text-[11px] text-slate-500">{it.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

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
              
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
                <span>The Readly Distinction Engine</span>
              </span>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading tracking-tight leading-tight">
                  How We Turn Syllabus Doubts Into{' '}
                  <span className="text-[#059669]">Straight A* Distinctions</span>
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
            Learn From People Who Know How to Teach
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
