import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { READLY_CONFIG } from '../config/readlyConfig';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Users,
  Sparkles,
  HelpCircle,
  Layers,
  Target,
  BarChart3,
  Atom,
  Calculator,
  Languages,
  Code2,
  Landmark,
  Award,
  PenTool
} from 'lucide-react';

export const MatricBoard = () => {
  const { openBookingModal } = useModal();
  const [activeFaq, setActiveFaq] = useState(0);

  const subjectTracks = [
    {
      title: "Science Group (Pre-Medical & Pre-Engineering)",
      badge: "FBISE & BISE Science Group",
      icon: Atom,
      subjects: [
        {
          name: "Matric Physics (9th & 10th)",
          codes: "Class 9 (Kinematics, Dynamics) • Class 10 (Optics, Electricity)",
          desc: "Complete derivation of physical laws, motion equations, SI units, and step-by-step numerical techniques avoiding mark penalties.",
          breakdown: "MCQs (12 Marks) • Short Conceptual (30 Marks) • Long Numericals (23 Marks)"
        },
        {
          name: "Matric Chemistry (9th & 10th)",
          codes: "Class 9 (Structure of Atoms, Bonding) • Class 10 (Acids, Organic)",
          desc: "Balanced chemical equations, periodic trends, chemical reactivity mechanisms, electrochemistry, and practical conceptual theory.",
          breakdown: "MCQs (12 Marks) • Short Qs (30 Marks) • Long Questions (23 Marks)"
        },
        {
          name: "Matric Biology (9th & 10th)",
          codes: "Class 9 (Cell Biology, Enzymes) • Class 10 (Genetics, Homeostasis)",
          desc: "Accurate scientific terminology, labeled diagram drawing techniques, physiological systems, and SLO reason-based questions.",
          breakdown: "MCQs (12 Marks) • Short Qs (30 Marks) • Long Diagram Questions (23 Marks)"
        }
      ]
    },
    {
      title: "Mathematics & Computer Science Group",
      badge: "STEM & Technical Logic Track",
      icon: Calculator,
      subjects: [
        {
          name: "Matric Mathematics (Science)",
          codes: "Class 9 (Matrices, Logarithms, Algebra) • Class 10 (Quadratic, Theorems)",
          desc: "Rigorous theorem proof derivations (statements & reasons), practical geometry constructions, and 10-year board paper practice.",
          breakdown: "MCQs (15 Marks) • Short Questions (36 Marks) • Theorem & Long Qs (24 Marks)"
        },
        {
          name: "Matric Computer Science",
          codes: "Class 9 (Hardware, Logic, Flowcharts) • Class 10 (C Language)",
          desc: "Programming in C language (syntax, loops, functions, arrays), algorithm flowcharts, binary logic gates, and board practicals.",
          breakdown: "MCQs (12 Marks) • Programming Logic (30 Marks) • Long Code Qs (23 Marks)"
        },
        {
          name: "General Mathematics (Arts Group)",
          codes: "Class 9 & Class 10 General Mathematics",
          desc: "Financial arithmetic, Zakat & Ushr calculations, consumer mathematics, linear equations, statistics, and practical matrices.",
          breakdown: "MCQs (15 Marks) • Short Questions (36 Marks) • Long Word Problems (24 Marks)"
        }
      ]
    },
    {
      title: "Compulsory Humanities & Languages Suite",
      badge: "Mandatory Board Subjects",
      icon: Languages,
      subjects: [
        {
          name: "Matric English (Compulsory)",
          codes: "Class 9 & 10 English Compulsory",
          desc: "Unseen reading comprehension, summary writing, active/passive voice, direct/indirect narration, essay & letter composition, and translation.",
          breakdown: "Objective MCQs (15 Marks) • Grammar & Translation • Subjective Writing"
        },
        {
          name: "Matric Urdu Lazmi",
          codes: "Class 9 & 10 Urdu Lazmi",
          desc: "Sabaq ka Khulasa (Siaq-o-Sabaq), Hissa Nazm wa Ghazal Ash'aar Jamay Tashreeh, Mazmoon Nawesi, Darkhwast & Qawaid-o-Insha presentation.",
          breakdown: "Objective MCQs (15 Marks) • Tashreeh (Hissa Nazm/Ghazal) • Insha Pardazi"
        },
        {
          name: "Pakistan Studies & Islamiyat Lazmi",
          codes: "Mutalia-e-Pakistan & Islamiyat Compulsory",
          desc: "Heading-wise long questions, Quranic Surahs ayat translation, Selected Ahadith context, Ideology of Pakistan, and map chronology.",
          breakdown: "MCQs (10 Marks) • Short Conceptual (20 Marks) • Structured Long (20 Marks)"
        }
      ]
    }
  ];

  const pillars = [
    {
      icon: Target,
      title: "SLO-Based Conceptual Mastery",
      desc: "Federal FBISE and provincial boards are rapidly moving away from rote memorization. We train students to solve analytical, knowledge, and application-based questions with ease."
    },
    {
      icon: Calculator,
      title: "Numerical Problem Solving",
      desc: "Step-by-step formula mastery for Physics and Chemistry. Students master Given Data, To Find, Formula, Calculations, and SI Units to secure 100% numerical marks."
    },
    {
      icon: PenTool,
      title: "Board Presentation Perfection",
      desc: "Examiners evaluate hundreds of papers daily. We train students in clear heading hierarchies, dual-color markers, margin alignments, and calligraphic Urdu presentation."
    },
    {
      icon: FileCheck,
      title: "10-Year Solved Board Papers",
      desc: "Comprehensive solved question banks and pairing schemes across Federal Board (FBISE) and Provincial BISE (Lahore, Rawalpindi, Karachi, Peshawar)."
    }
  ];

  const boardComparisons = [
    {
      board: "Federal Board (FBISE Islamabad)",
      tag: "National & Overseas Standard",
      points: [
        "Rigorous SLO (Student Learning Outcomes) analytical curriculum",
        "E-Sheets (Bubble-sheet & designated answer spaces) examination format",
        "Higher weightage on conceptual reasoning rather than book text regurgitation",
        "Preferred by top national medical (MDCAT) & engineering (ECAT/NUST) aspirants"
      ]
    },
    {
      board: "Punjab Boards (BISE Lahore, Rwp, Fsd, etc.)",
      tag: "Provincial High-Scoring Benchmark",
      points: [
        "Structured Official Pairing Schemes for Physics, Chemistry & Biology",
        "High importance placed on comprehensive heading layouts and textbook definitions",
        "Strict numerical and theorem presentation criteria for position holders",
        "Complete 10-year model paper series drill before annual board examinations"
      ]
    },
    {
      board: "Sindh & KPK Boards (Karachi, Hyd, Peshawar)",
      tag: "Regional Board Alignment",
      points: [
        "Curriculum sync with Sindh Textbook Board (STBB) & KPK Textbook Board",
        "Targeted preparation for theoretical derivations and long question formats",
        "Specialized sessions for objective MCQs and high-frequency repeated questions",
        "Bilingual instruction (English Medium & Urdu Medium options available)"
      ]
    }
  ];

  const faqs = [
    {
      q: "Can a student study Matriculation (9th/10th) completely online?",
      a: "Yes! The Readly Institute provides comprehensive online classes covering every chapter, theoretical concept, practical diagram, and numerical. Whether a student is enrolled in a physical school and needs top-tier evening coaching, or is studying as a private candidate, our structured daily classes and 10-year board paper drill prepare them to score 90%+ (A+ Grade)."
    },
    {
      q: "How does The Readly prepare students for the new FBISE SLO (Student Learning Outcomes) system?",
      a: "The Federal Board now bases exam papers strictly on Student Learning Outcomes (Knowledge, Understanding, and Application). Our teachers do not rely on passive book cramming. We provide students with SLO-categorized concept sheets, analytical short questions, and model paper derivations so they can tackle any unseen conceptual variation with confidence."
    },
    {
      q: "Do you teach both English Medium and Urdu Medium students?",
      a: "Yes! We support both English Medium and Urdu Medium students. Our faculty explains complex scientific concepts clearly, provides notes in the student's chosen medium, and trains them in the specific vocabulary and presentation rubrics required by board examiners."
    },
    {
      q: "How are Mathematics theorems and Physics numericals taught online?",
      a: "Our instructors utilize high-resolution digital writing tablets and interactive whiteboards. Every theorem is drawn live with step-by-step statements, reasons, and construction lines. Physics numericals are broken down systematically (Given, Required, Formula, Solution, Units) so students learn how to secure full marks without skipping steps."
    },
    {
      q: "Are board pairing schemes and model test series included?",
      a: "Yes! In the 2 to 3 months preceding annual board examinations, we conduct intensive Board Test Series. Students solve chapter-wise tests, half-book mocks, and full-book model papers strictly aligned with the latest board pairing scheme and time duration."
    }
  ];

  return (
    <div className="space-y-14 sm:space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FEF9EE]/60 via-slate-50 to-white py-16 md:py-24 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
              <Link to="/" className="hover:text-[#059669] transition-colors">Home</Link>
              <span>/</span>
              <Link to="/programs" className="hover:text-[#059669] transition-colors">Programs</Link>
              <span>/</span>
              <span className="text-[#0B4635] font-bold">Matriculation Board (SSC)</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#FEF9EE] text-[#0B4635] border border-[#E8D3A7]">
                <GraduationCap className="w-4 h-4 text-[#C59B4B]" />
                <span>Secondary School Certificate (SSC Part-I & II)</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#059669] border border-emerald-200">
                FBISE & All Provincial BISE Boards
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-[#0B4635] font-heading tracking-tight leading-[1.12]">
              Federal & Provincial <span className="text-[#C59B4B]">Matric Board Programs.</span>
            </h1>

            <p className="text-base sm:text-xl font-bold text-[#059669] font-heading">
              Comprehensive FBISE & Provincial BISE Coaching for Class 9 & 10
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Empowering Class 9 and Class 10 students across Pakistan and overseas. Master SLO-based conceptual questions, step-by-step Physics numericals, Mathematics theorems, and polished board paper presentation for top A+ positions.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openBookingModal({ curriculum: 'Matriculation Board (SSC)' })}
                className="btn btn-teal text-xs sm:text-sm font-bold py-3.5 px-6 shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Diagnostic Demo</span>
              </button>

              <Link
                to="/subjects"
                className="btn btn-secondary text-xs sm:text-sm font-bold py-3.5 px-6 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#059669]" />
                <span>View Matric Subjects</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 text-xs">
              <div>
                <span className="text-xl font-black text-[#0B4635] block">95%+</span>
                <span className="text-slate-500 font-medium">A+ Grade Target</span>
              </div>
              <div>
                <span className="text-xl font-black text-[#0B4635] block">10-Year</span>
                <span className="text-slate-500 font-medium">Solved Past Papers</span>
              </div>
              <div>
                <span className="text-xl font-black text-[#0B4635] block">SLO</span>
                <span className="text-slate-500 font-medium">Concept-Based Learning</span>
              </div>
              <div>
                <span className="text-xl font-black text-[#0B4635] block">100% Live</span>
                <span className="text-slate-500 font-medium">Micro-Batches & 1:1</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE METHODOLOGY / 4 PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-badge">The Readly Advantage</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4635] font-heading mt-2">
            Engineered for <span className="text-[#C59B4B]">Board Position Holders</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            We transcend rote memorization by combining rigorous conceptual understanding with proven board examiner presentation rubrics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div key={idx} className="card-base p-6 bg-white border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#059669] border border-emerald-100 flex items-center justify-center mb-4">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-heading mb-2">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. DETAILED SUBJECT FACULTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="section-badge">Comprehensive Curriculum</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4635] font-heading mt-2">
              Matriculation <span className="text-[#C59B4B]">Subject Streams</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Class 9 & 10 coverage across Science Group, Computer Science Track, and Compulsory Subjects.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBookingModal({ curriculum: 'Matriculation Board (SSC)' })}
            className="btn btn-secondary btn-sm text-xs font-bold shrink-0 cursor-pointer"
          >
            <span>Book Subject Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {subjectTracks.map((track, tIdx) => {
            const TrackIcon = track.icon;
            return (
              <div key={tIdx} className="card-base p-6 sm:p-7 bg-white border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] border border-emerald-200 flex items-center justify-center shrink-0">
                      <TrackIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading leading-tight">{track.title}</h3>
                      <span className="text-[10px] font-semibold text-emerald-700">{track.badge}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {track.subjects.map((sub, sIdx) => (
                      <div key={sIdx} className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900">{sub.name}</h4>
                        </div>
                        <p className="text-[11px] text-emerald-800 font-semibold">{sub.codes}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">{sub.desc}</p>
                        <div className="text-[10px] text-slate-500 font-medium pt-1 border-t border-slate-200/60 mt-1">
                          <span className="text-[#059669] font-bold">Paper Format: </span>
                          <span>{sub.breakdown}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-600">3 - 4 hrs/week live</span>
                  <button
                    type="button"
                    onClick={() => openBookingModal({ curriculum: 'Matriculation Board (SSC)' })}
                    className="btn btn-teal btn-sm text-xs font-bold cursor-pointer"
                  >
                    <span>Enrol</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FBISE VS PROVINCIAL BOARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-base p-8 sm:p-10 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/40 border border-emerald-200/80 rounded-2xl space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="section-badge">Board Specialization</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B4635] font-heading mt-1">
              Federal FBISE vs Provincial BISE Boards
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              We customize study plans, mock exams, and marking rubrics according to the specific board your student is registered in.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-2">
            {boardComparisons.map((item, bIdx) => (
              <div key={bIdx} className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-[#059669] uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3">{item.board}</h4>
                  <ul className="text-xs text-slate-600 space-y-2">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => openBookingModal({ curriculum: 'Matriculation Board (SSC)' })}
                    className="text-xs font-bold text-[#059669] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Board Diagnostic</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="section-badge">Student & Parent Queries</span>
          <h2 className="text-3xl font-extrabold text-[#0B4635] font-heading">
            Frequently Asked <span className="text-[#C59B4B]">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="card-base bg-white border-slate-200 overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-[#059669] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#059669] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-base p-8 sm:p-12 bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/40 text-center rounded-2xl border border-emerald-200/80 shadow-sm space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FEF9EE] text-[#0B4635] border border-[#E8D3A7]">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B4B]" />
              Federal FBISE & BISE • Free Trial Class
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B4635]">
              Ready to Secure An <span className="text-[#C59B4B]">A+ in Your Board Exams?</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Book a complimentary 1-on-1 diagnostic demo session with an experienced Matric faculty mentor. Assess your numerical, theorem, and SLO reasoning skills today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openBookingModal({ curriculum: 'Matriculation Board (SSC)' })}
              className="btn btn-teal text-xs sm:text-sm font-bold py-3.5 px-6 shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Free Trial Demo</span>
            </button>

            <a
              href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi The Readly Institute, I would like to inquire about Matriculation Board (FBISE / BISE) coaching.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-xs sm:text-sm font-bold py-3.5 px-6 flex items-center gap-2"
            >
              <span>Chat with Admissions</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
