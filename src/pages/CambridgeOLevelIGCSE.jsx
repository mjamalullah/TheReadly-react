import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { READLY_CONFIG } from '../config/readlyConfig';
import {
  Award,
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
  TrendingUp,
  GraduationCap
} from 'lucide-react';

export const CambridgeOLevelIGCSE = () => {
  const { openBookingModal } = useModal();
  const [activeFaq, setActiveFaq] = useState(0);

  const subjectTracks = [
    {
      title: "Sciences Faculty (Pure CAIE & IGCSE)",
      badge: "Pre-Medical & Pre-Engineering",
      icon: Atom,
      color: "emerald",
      subjects: [
        {
          name: "Physics",
          codes: "CAIE 5054 • IGCSE 0625",
          desc: "Mechanics, thermal physics, electricity & magnetism, waves, nuclear physics. Comprehensive Alternative to Practical (ATP) experimental analysis.",
          papers: "Paper 1 (MCQ), Paper 2 (Theory), Paper 4 (ATP)"
        },
        {
          name: "Chemistry",
          codes: "CAIE 5070 • IGCSE 0620",
          desc: "Stoichiometry calculations, periodic trends, organic synthesis, electrochemistry, and qualitative reagent identification.",
          papers: "Paper 1 (MCQ), Paper 2 (Structured), Paper 4 (ATP)"
        },
        {
          name: "Biology",
          codes: "CAIE 5090 • IGCSE 0610",
          desc: "Cell biology, bioenergetics, genetics, human physiology, biotechnology, and scientific labeled biological illustrations.",
          papers: "Paper 1 (MCQ), Paper 2 (Theory), Paper 6 (ATP)"
        }
      ]
    },
    {
      title: "Mathematics & Computing Track",
      badge: "Analytical & STEM Foundation",
      icon: Calculator,
      color: "blue",
      subjects: [
        {
          name: "Mathematics (Syllabus D & Extended)",
          codes: "CAIE 4024 • IGCSE 0580",
          desc: "Vectors, trigonometry, algebraic manipulation, quadratic functions, coordinate geometry, matrices, probability, and statistics.",
          papers: "Paper 1 (Non-Calculator) & Paper 2 (Calculator)"
        },
        {
          name: "Additional Mathematics",
          codes: "CAIE 4037 • IGCSE 0606",
          desc: "Pure calculus (differentiation & integration), circular measure, permutations & combinations, and binomial expansions.",
          papers: "Paper 1 & Paper 2 (Advanced Problem Solving)"
        },
        {
          name: "Computer Science",
          codes: "CAIE 2210 • IGCSE 0478",
          desc: "Computer architecture, binary logic gates, flowchart tracing, algorithm design, and structured Python/VB programming.",
          papers: "Paper 1 (Theory) & Paper 2 (Algorithms & Code)"
        }
      ]
    },
    {
      title: "Commerce & Business Leadership",
      badge: "Economics & Finance Pathway",
      icon: TrendingUp,
      color: "amber",
      subjects: [
        {
          name: "Principles of Accounts",
          codes: "CAIE 7707 • IGCSE 0452",
          desc: "Double-entry bookkeeping, trial balances, ledger accounts, bank reconciliation statements, and partnership final accounts.",
          papers: "Paper 1 (MCQ) & Paper 2 (Structured Accounts)"
        },
        {
          name: "Economics",
          codes: "CAIE 2281 • IGCSE 0455",
          desc: "Basic economic problem, price mechanism, market failure, macro-economic government aims, inflation, and global trade.",
          papers: "Paper 1 (MCQ) & Paper 2 (Data Response & Essays)"
        },
        {
          name: "Business Studies",
          codes: "CAIE 7115 • IGCSE 0450",
          desc: "Business activity, marketing mix, human resource management, operations management, financial analysis, and business strategy.",
          papers: "Paper 1 (Short Answers) & Paper 2 (Case Study)"
        }
      ]
    },
    {
      title: "Languages & Regional Humanities",
      badge: "Mandatory CAIE Suite",
      icon: Languages,
      color: "rose",
      subjects: [
        {
          name: "English Language",
          codes: "CAIE 1123 • IGCSE 0500",
          desc: "Textual comprehension, précis & summary writing, directed writing, argumentative essays, and vocabulary precision.",
          papers: "Paper 1 (Reading) & Paper 2 (Writing)"
        },
        {
          name: "Urdu (First & Second Language)",
          codes: "CAIE 3247 / 3248 • IGCSE 0539",
          desc: "Urdu essay composition, precis writing, idiom usage, translation techniques, and examiner mark scheme accuracy.",
          papers: "Paper 1 (Composition) & Paper 2 (Language Usage)"
        },
        {
          name: "Pakistan Studies & Islamiyat",
          codes: "CAIE 2059 • CAIE 2058",
          desc: "History & culture, geography & development of Pakistan, Quranic passages, Ahadith, Caliphates, and structured mark schemes.",
          papers: "Paper 1 & Paper 2 (Structured 4, 7 & 14 Marks)"
        }
      ]
    }
  ];

  const pillars = [
    {
      icon: Target,
      title: "SLO Syllabus Deconstruction",
      desc: "Every syllabus point is broken down into examinable components. We cover learning outcomes precisely as tested by Cambridge examiners."
    },
    {
      icon: Layers,
      title: "15-Year Categorized Past Papers",
      desc: "Topical question banks spanning 2012–2026. Students solve every exam variation from easy introductory to high-difficulty threshold questions."
    },
    {
      icon: BarChart3,
      title: "Examiner Mark Scheme Precision",
      desc: "Master Method Marks [M], Accuracy Marks [A], and Independent Marks [B]. Learn exact keywords that avoid examiner mark penalties."
    },
    {
      icon: FileCheck,
      title: "Timed Monthly Series Mocks",
      desc: "Full 100% authentic exam simulation under strict time limits. Detailed diagnostic feedback reports highlight exact score gaps."
    }
  ];

  const faqs = [
    {
      q: "What is the key difference between Cambridge O-Level and Cambridge IGCSE?",
      a: "Both qualifications are globally equivalent and benchmarked at Grade 10/11 secondary level by Cambridge Assessment International Education (CAIE). Cambridge O-Level uses grades A* to E and is tailored predominantly for Pakistan, Bangladesh, and select international centers with dedicated regional subjects like Pakistan Studies (2059) and Urdu (3248). Cambridge IGCSE uses either A* to G or 9 to 1 grading and is offered in international schools across UAE, Saudi Arabia, the UK, and overseas. Our faculty is dual-certified to prepare students for either syllabus."
    },
    {
      q: "Can students appear in Cambridge O-Level or IGCSE as private candidates?",
      a: "Yes! Students can register as 'Private Candidates' directly with the British Council in Pakistan, UAE, Saudi Arabia, and over 100 countries worldwide. The resulting official Cambridge Certificate and statement of results are completely identical to those of regular school students. The Readly provides end-to-end guidance for exam venue selection and private candidate registration."
    },
    {
      q: "Do you offer separate 1-on-1 tutoring or small batches for O-Level/IGCSE?",
      a: "We offer both! Students can enrol in our highly interactive Micro-Batches (capped strictly at 6 to 8 students) or choose dedicated 1-on-1 Personalized Tutoring for accelerated coverage, retake preparation, or subject-specific diagnostic coaching."
    },
    {
      q: "How are Paper 4 Alternative to Practical (ATP) papers taught online?",
      a: "For Sciences (Physics 5054/0625, Chemistry 5070/0620, Biology 5090/0610), students take Paper 4 Alternative to Practical (ATP). We teach this through virtual digital lab apparatus simulations, error analysis derivations, graph plotting rules, table headings, and past paper experiment question dissection."
    },
    {
      q: "What past paper years and variants are solved during classes?",
      a: "Students solve complete topical past paper booklets from 2012 through to the most recent 2025/2026 series. We cover all regional variants (Variant 1, 2, and 3) so students are never surprised by unfamiliar question formats on exam day."
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
              <span className="text-[#0B4635] font-bold">Cambridge O-Level & IGCSE</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#FEF9EE] text-[#0B4635] border border-[#E8D3A7]">
                <Award className="w-4 h-4 text-[#C59B4B]" />
                <span>Cambridge Assessment International Education</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-[#059669] border border-emerald-200">
                Grades 9, 10 & 11 • Secondary Education
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black text-[#0B4635] font-heading tracking-tight leading-[1.12]">
              Cambridge O-Level & <span className="text-[#C59B4B]">IGCSE Programs.</span>
            </h1>

            <p className="text-base sm:text-xl font-bold text-[#059669] font-heading">
              Comprehensive Preparation for CAIE Cambridge O-Level & International IGCSE
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              Engineered for academic distinction. Comprehensive Cambridge syllabus deconstruction, step-by-step mathematical proofs, examiner report keyword mastery, and 15 years of categorized past paper drilling.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openBookingModal({ curriculum: 'Cambridge O-Level' })}
                className="btn btn-teal text-xs sm:text-sm font-bold py-3.5 px-6 shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Diagnostic Demo</span>
              </button>

              <Link
                to="/programs/online-o-level"
                className="btn btn-secondary text-xs sm:text-sm font-bold py-3.5 px-6 flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-[#059669]" />
                <span>Need Full Online Schooling?</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 text-xs">
              <div>
                <span className="text-xl font-black text-[#0B4635] block">94%</span>
                <span className="text-slate-500 font-medium">A* & A Pass Rate</span>
              </div>
              <div>
                <span className="text-xl font-black text-[#0B4635] block">15+ Years</span>
                <span className="text-slate-500 font-medium">Topical Question Vault</span>
              </div>
              <div>
                <span className="text-xl font-black text-[#0B4635] block">Max 8</span>
                <span className="text-slate-500 font-medium">Students Per Batch</span>
              </div>
              <div>
                <span className="text-xl font-black text-[#0B4635] block">100% Live</span>
                <span className="text-slate-500 font-medium">Real-time HD Classes</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE METHODOLOGY / 4 PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-badge">Proven Pedagogy</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4635] font-heading mt-2">
            Engineered for <span className="text-[#C59B4B]">Top Examiner Marks</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Our systematic 4-pillar methodology ensures students learn syllabus concepts deeply and score every mark on Cambridge exam papers.
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
            <span className="section-badge">Curriculum Coverage</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4635] font-heading mt-2">
              Academic Tracks & <span className="text-[#C59B4B]">Syllabus Codes</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Complete syllabus coverage across both Cambridge O-Level and International IGCSE syllabuses.
            </p>
          </div>
          <Link to="/subjects" className="btn btn-secondary btn-sm text-xs font-bold shrink-0">
            <span>Explore All 60+ Subjects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {subjectTracks.map((track, tIdx) => {
            const TrackIcon = track.icon;
            return (
              <div key={tIdx} className="card-base p-6 sm:p-8 bg-white border-slate-200 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] border border-emerald-200 flex items-center justify-center">
                        <TrackIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 font-heading">{track.title}</h3>
                        <span className="text-[11px] font-semibold text-emerald-700">{track.badge}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {track.subjects.map((sub, sIdx) => (
                      <div key={sIdx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-1.5 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">{sub.name}</h4>
                          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {sub.codes}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{sub.desc}</p>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium pt-1">
                          <span className="text-[#059669] font-bold">Exam Breakdown:</span>
                          <span>{sub.papers}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">3 - 4 hrs/week live classes</span>
                  <button
                    type="button"
                    onClick={() => openBookingModal({ curriculum: 'Cambridge O-Level' })}
                    className="btn btn-teal btn-sm text-xs font-bold cursor-pointer"
                  >
                    <span>Enrol in Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. O-LEVEL VS IGCSE COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-base p-8 sm:p-10 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/40 border border-emerald-200/80 rounded-2xl space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="section-badge">Side-by-Side Guide</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B4635] font-heading mt-1">
              Cambridge O-Level vs Cambridge IGCSE
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Both tracks lead to identical international academic progression into Cambridge A-Levels or IB Diploma.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-[#059669] uppercase">CAIE O-Level</span>
                <span className="text-xs font-semibold text-slate-500">Traditional UK GCE Benchmark</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">Cambridge O-Level (General Certificate)</h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>Grading scale: A*, A, B, C, D, E</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>Includes Pakistan Studies (2059), Islamiyat (2058) & Urdu (3248)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>Exam series available in May/June and October/November</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span>Alternative to Practical (ATP) option eliminates wet lab requirements</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 uppercase">Cambridge IGCSE</span>
                <span className="text-xs font-semibold text-slate-500">Global International Standard</span>
              </div>
              <h4 className="text-base font-bold text-slate-900">Cambridge IGCSE (International Certificate)</h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Grading scale: A* to G or 9 to 1 (UK standard system)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Taught in UAE, Saudi Arabia, UK and overseas British curriculum schools</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Core and Extended tier options in Mathematics and Sciences</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Global coursework and alternative assessment rubrics</span>
                </li>
              </ul>
            </div>
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
              Zero Obligation • 100% Free Trial
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0B4635]">
              Ready to Master Your <span className="text-[#C59B4B]">Cambridge Subjects?</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Book a complimentary 1-on-1 diagnostic trial demo with a senior Cambridge faculty specialist. Evaluate syllabus requirements and past paper strategies today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openBookingModal({ curriculum: 'Cambridge O-Level' })}
              className="btn btn-teal text-xs sm:text-sm font-bold py-3.5 px-6 shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Free Trial Demo</span>
            </button>

            <a
              href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi The Readly Institute, I would like to inquire about Cambridge O-Level and IGCSE coaching.')}`}
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
