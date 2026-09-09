import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { READLY_CONFIG } from '../config/readlyConfig';
import {
  Users,
  Clock,
  BookOpen,
  Calendar,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ShieldCheck,
  Award,
  Video,
  FileCheck,
  GraduationCap,
  Sparkles,
  PhoneCall,
  Laptop
} from 'lucide-react';

export const OnlineOLevel = () => {
  const { openBookingModal } = useModal();
  const [activeFaq, setActiveFaq] = useState(0);

  const subjectPackages = [
    {
      title: "Sciences Stream (Pre-Medical / Pre-Engineering)",
      badge: "Pure CAIE Labs & ATP",
      subjects: [
        { code: "Physics (5054)", papers: "Paper 1 (MCQ), Paper 2 (Theory), Paper 4 (ATP Alternative to Practical)" },
        { code: "Chemistry (5070)", papers: "Paper 1 (MCQ), Paper 2 (Theory), Paper 4 (ATP Lab Analysis)" },
        { code: "Biology (5090)", papers: "Paper 1 (MCQ), Paper 2 (Theory), Paper 6 (ATP Experimental Methods)" },
        { code: "Mathematics - Syllabus D (4024)", papers: "Paper 1 (Non-Calculator) & Paper 2 (Calculator Precision)" }
      ]
    },
    {
      title: "Computer Science & Advanced Mathematics Track",
      badge: "STEM & Tech Pathway",
      subjects: [
        { code: "Computer Science (2210)", papers: "Paper 1 (Computer Systems) & Paper 2 (Algorithms, Programming & Logic)" },
        { code: "Additional Mathematics (4037)", papers: "Paper 1 & Paper 2 (Calculus, Trigonometry & Vectors)" },
        { code: "Mathematics - Syllabus D (4024)", papers: "Algebraic manipulation, geometry theorems & statistics" },
        { code: "Physics (5054)", papers: "Mechanics, thermal physics, electricity & waves" }
      ]
    },
    {
      title: "Commerce & Business Management Stream",
      badge: "Finance & Economics Pathway",
      subjects: [
        { code: "Principles of Accounts (7707)", papers: "Paper 1 (MCQ) & Paper 2 (Ledgers, Balance Sheets & Final Accounts)" },
        { code: "Economics (2281)", papers: "Paper 1 (MCQ) & Paper 2 (Structured Macro/Micro Economic Analysis)" },
        { code: "Business Studies (7115)", papers: "Paper 1 (Short Answers) & Paper 2 (Case Study Evaluations)" },
        { code: "Mathematics (4024)", papers: "Financial arithmetic, statistics, probability & trigonometry" }
      ]
    },
    {
      title: "Compulsory Humanities & Languages Suite",
      badge: "Mandatory CAIE Package",
      subjects: [
        { code: "English Language (1123)", papers: "Reading Comprehension, Summary Writing & Directed Writing" },
        { code: "Islamiyat (2058)", papers: "Quranic Passages, Hadith, Caliphate & Islamic History (4 & 10 Marks)" },
        { code: "Pakistan Studies (2059)", papers: "Paper 1 (History & Culture) & Paper 2 (Environment of Pakistan)" },
        { code: "Urdu (3247 / 3248)", papers: "First Language or Second Language Translation, Essays & Comprehension" }
      ]
    }
  ];

  const faqs = [
    {
      q: "Can a student appear in Cambridge O-Level exams without going to a physical school?",
      a: "Yes, absolutely! Cambridge Assessment International Education (CAIE) and the British Council allow students to register as 'Private Candidates'. Thousands of homeschoolers every year register for exams through the British Council in Pakistan, UAE, Saudi Arabia, and worldwide without ever stepping into a physical school. The certificate and grades awarded are 100% identical to regular school candidates."
    },
    {
      q: "Does The Readly Institute help with British Council private exam registration?",
      a: "Yes! Our academic advisory team guides parents and students step-by-step through the entire British Council private candidate registration process for both the May/June and October/November exam series. We assist in selecting proper syllabus codes, choosing convenient exam centers, and verifying statement of entries."
    },
    {
      q: "What is the daily schedule for the Morning and Evening batches?",
      a: "Our Morning Batch operates from 9:00 AM to 1:00 PM PKT (ideal for full-time homeschoolers). Our Evening Batch operates from 4:30 PM to 8:30 PM PKT (ideal for students who prefer afternoon/evening routines or study in different time zones). Each subject session lasts 50–60 minutes, followed by a live Q&A and topical past paper drill."
    },
    {
      q: "What is the maximum class size in these online batches?",
      a: "We maintain a strict micro-batch policy of maximum 6 to 8 students per batch. This ensures that the teacher knows every single student by name, can inspect their working on the digital canvas, and every student can ask questions freely without hesitation."
    },
    {
      q: "What if a student misses a class due to an emergency or power outage?",
      a: "Every live class is automatically recorded in Full HD and uploaded to the student portal alongside the teacher's handwritten digital whiteboard notes and solved problem sets. The student can review the recording anytime and ask doubts directly to the teacher via the 24/7 student doubt desk."
    },
    {
      q: "How do you conduct past paper practice and mock exams for homeschoolers?",
      a: "Practice is embedded into every single day. After completing each chapter topic, students solve 15 years of topical past paper questions (2012–2026). Homework is submitted digitally and corrected strictly using official Cambridge marking schemes with [M1], [A1], and [E1] mark breakdowns. Furthermore, full timed monthly mock exams simulate authentic examination conditions."
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FEF9EE]/60 via-slate-50 to-white py-16 md:py-24 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
            <Link to="/" className="hover:text-[#059669]">Home</Link>
            <span>/</span>
            <Link to="/programs" className="hover:text-[#059669]">Programs</Link>
            <span>/</span>
            <span className="text-[#0B4635] font-bold">Online O-Level Batches</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] border border-emerald-200 text-[#059669] text-xs font-bold">
                <Users className="w-3.5 h-3.5" />
                <span>Full Online Schooling • Cambridge O-Level (Grades 9–11)</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading tracking-tight leading-tight">
                Complete Online Cambridge O-Level.{' '}
                <span className="text-[#C59B4B]">No Physical School Needed.</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                Engineered for homeschoolers, private candidates, and independent students. Complete your full Cambridge O-Level (CAIE) curriculum from the comfort of your home with structured interactive batch classes, daily 15-year topical past paper practice, and end-to-end British Council private exam registration support.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openBookingModal({ curriculum: 'Cambridge O-Level' })}
                  className="btn btn-teal font-bold text-xs sm:text-sm px-6 py-3.5 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Enrol in O-Level Batch (Free Trial)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi The Readly Institute, I am inquiring about Full Online Cambridge O-Level Schooling & Batch Classes from home.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp font-bold text-xs sm:text-sm px-5 py-3.5 flex items-center justify-center gap-2"
                >
                  <span>Chat with Admissions on WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 text-xs">
                <div>
                  <span className="font-extrabold text-[#0B4635] block text-sm sm:text-base">Max 6–8</span>
                  <span className="text-slate-500 text-[11px]">Students / Batch</span>
                </div>
                <div>
                  <span className="font-extrabold text-[#0B4635] block text-sm sm:text-base">Morning & Eve</span>
                  <span className="text-slate-500 text-[11px]">Flexible Timings</span>
                </div>
                <div>
                  <span className="font-extrabold text-[#0B4635] block text-sm sm:text-base">15-Yr Topical</span>
                  <span className="text-slate-500 text-[11px]">Past Paper Vault</span>
                </div>
                <div>
                  <span className="font-extrabold text-[#0B4635] block text-sm sm:text-base">100% CAIE</span>
                  <span className="text-slate-500 text-[11px]">Private Exam Support</span>
                </div>
              </div>

            </div>

            {/* Right Interactive Portal Mockup */}
            <div className="lg:col-span-5">
              <div className="dashboard-preview-window border border-emerald-200/90 shadow-2xl bg-white overflow-hidden rounded-2xl">
                
                {/* macOS Style Bar */}
                <div className="bg-[#06251C] px-4 py-3 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                    <span className="text-xs font-mono font-semibold text-slate-200 ml-2">
                      Online Schooling Portal • Grade 10 Batch 02
                    </span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#0B4635] text-amber-300 border border-[#C59B4B]/40 px-2 py-0.5 rounded-full">
                    ● Enrolling Now
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3.5 bg-white text-left">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 via-[#FEF9EE] to-amber-50/60 border border-emerald-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#0B4635] uppercase tracking-wider block">Cohort Track</span>
                      <h4 className="text-xs font-extrabold text-slate-900 font-heading">
                        Cambridge O-Level Complete Package
                      </h4>
                      <p className="text-[11px] text-slate-500">Sciences, Math, English & Pak Studies</p>
                    </div>
                    <span className="text-[10px] font-bold bg-[#059669] text-white px-2 py-1 rounded">
                      Homeschool Ready
                    </span>
                  </div>

                  {/* Batch Timings */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200">
                      <span className="text-base block mb-0.5">🌅</span>
                      <span className="font-extrabold text-[#0B4635] block text-[11px]">Morning Cohort</span>
                      <span className="text-[10px] text-slate-500 font-mono">9:00 AM – 1:00 PM PKT</span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200">
                      <span className="text-base block mb-0.5">🌆</span>
                      <span className="font-extrabold text-[#936F1E] block text-[11px]">Evening Cohort</span>
                      <span className="text-[10px] text-slate-500 font-mono">4:30 PM – 8:30 PM PKT</span>
                    </div>
                  </div>

                  {/* Daily Routine Breakdown */}
                  <div className="space-y-1.5 text-xs">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      Daily Learning Methodology:
                    </span>
                    
                    <div className="space-y-1 text-[11px]">
                      <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <span className="font-bold text-slate-800">1. Live Digital Whiteboard Lecture</span>
                        <span className="text-slate-500 text-[10px]">50 Mins</span>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <span className="font-bold text-slate-800">2. Supervised Topical Past Paper Solving</span>
                        <span className="text-emerald-700 font-bold text-[10px]">15-Yr CAIE Vault</span>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <span className="font-bold text-slate-800">3. Individual Homework Correction & Rubrics</span>
                        <span className="text-[#C59B4B] font-bold text-[10px]">[M1][A1] Markings</span>
                      </div>
                      <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <span className="font-bold text-slate-800">4. British Council Registration Support</span>
                        <span className="text-emerald-700 font-bold text-[10px]">Private Candidate</span>
                      </div>
                    </div>
                  </div>

                  {/* Trial CTA */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-600">Zero obligation 45-minute demo</span>
                    <button
                      type="button"
                      onClick={() => openBookingModal({ curriculum: 'Cambridge O-Level' })}
                      className="text-xs font-extrabold text-[#0B4635] hover:text-[#059669] underline cursor-pointer"
                    >
                      Book Trial Class &rarr;
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. WHO IS THIS PROGRAM FOR? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-badge">Student Pathways</span>
          <h2 className="text-3xl font-extrabold text-[#0B4635] font-heading mt-2">
            Who Is This <span className="text-[#C59B4B]">Program For?</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Whether you choose not to attend a physical school or seek intensive exam excellence, Readly provides complete academic accreditation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center font-bold text-lg">
              🏡
            </div>
            <h3 className="text-base font-extrabold text-slate-900 font-heading">Full-Time Homeschoolers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Replace rigid physical school routines with an accredited online timetable. Complete syllabus coverage across all O-Level subjects with verified faculty.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#936F1E] flex items-center justify-center font-bold text-lg">
              🎯
            </div>
            <h3 className="text-base font-extrabold text-slate-900 font-heading">Private Candidates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Preparing to appear privately through the British Council for the May/June or Oct/Nov series. We manage your preparation timeline and exam registration.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#059669] flex items-center justify-center font-bold text-lg">
              🌍
            </div>
            <h3 className="text-base font-extrabold text-slate-900 font-heading">Overseas & Expat Families</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pakistani, Arab, and international families living in UAE, Saudi Arabia, Qatar, or the UK seeking premier Cambridge faculty at accessible tuition fees.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all space-y-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#936F1E] flex items-center justify-center font-bold text-lg">
              📈
            </div>
            <h3 className="text-base font-extrabold text-slate-900 font-heading">Grade Retake & Acceleration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students retaking specific subjects or accelerating from Grade 9 to 11 in a single academic year through rigorous daily past-paper topical drills.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MORNING VS EVENING BATCH COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-base p-8 sm:p-12 bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/40 border-2 border-emerald-200/90 rounded-2xl shadow-sm space-y-8">
          
          <div className="text-center max-w-2xl mx-auto">
            <span className="section-badge">Flexible Schedules</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B4635] font-heading mt-2">
              Choose Your Daily <span className="text-[#C59B4B]">Batch Timetable</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Select the batch that perfectly complements your family's daily lifestyle. All batches include the identical comprehensive curriculum and topical past-paper training.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            
            {/* Morning Batch Card */}
            <div className="p-6 rounded-xl bg-white border border-emerald-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌅</span>
                  <div>
                    <h3 className="text-base font-extrabold text-[#0B4635] font-heading">Morning Batch (School Hours)</h3>
                    <span className="text-xs font-mono text-slate-500">9:00 AM – 1:00 PM PKT / GMT+5</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-[#ECFDF5] text-[#059669] px-2.5 py-1 rounded-full border border-emerald-200">
                  Full Homeschoolers
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span><strong>Structured Morning Routine:</strong> Simulates a traditional school day without the 2-hour daily traffic commute.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span><strong>4 Daily Classes:</strong> 50 minutes each with 10-minute hydration intervals and focused faculty interaction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                  <span><strong>Afternoons Completely Free:</strong> Students finish their academic day by 1:00 PM, leaving afternoons for sports and hobbies.</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => openBookingModal({ curriculum: 'Cambridge O-Level' })}
                className="btn btn-teal w-full text-xs font-bold py-2.5 justify-center cursor-pointer"
              >
                <span>Register for Morning Batch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Evening Batch Card */}
            <div className="p-6 rounded-xl bg-white border border-amber-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🌆</span>
                  <div>
                    <h3 className="text-base font-extrabold text-[#936F1E] font-heading">Evening Batch (After School)</h3>
                    <span className="text-xs font-mono text-slate-500">4:30 PM – 8:30 PM PKT / GMT+5</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-[#FEF9EE] text-[#936F1E] px-2.5 py-1 rounded-full border border-[#E8D3A7]">
                  Overseas / Flexible
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59B4B] shrink-0 mt-0.5" />
                  <span><strong>Ideal for Middle East Time Zones:</strong> Aligns seamlessly with UAE (+1 hr) and Saudi Arabia (+2 hrs) timelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59B4B] shrink-0 mt-0.5" />
                  <span><strong>Convenient for Working Parents:</strong> Parents can observe their children's classes and homework reviews in the evening.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59B4B] shrink-0 mt-0.5" />
                  <span><strong>Live Whiteboard Recordings:</strong> Backup recordings available immediately if evening dinner or family events arise.</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => openBookingModal({ curriculum: 'Cambridge O-Level' })}
                className="btn btn-secondary w-full text-xs font-bold py-2.5 justify-center cursor-pointer border-[#C59B4B] text-[#936F1E] hover:bg-[#FEF9EE]"
              >
                <span>Register for Evening Batch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 4. COMPLETE SUBJECT STREAM PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-badge">Curriculum Coverage</span>
          <h2 className="text-3xl font-extrabold text-[#0B4635] font-heading mt-2">
            Complete Cambridge O-Level <span className="text-[#C59B4B]">Subject Packages</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            Our batch classes cover all core subjects required by Cambridge Assessment International Education and university equivalence boards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {subjectPackages.map((pkg, idx) => (
            <div key={idx} className="card-base p-6 bg-white border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-[#0B4635] font-heading">{pkg.title}</h3>
                <span className="text-[10px] font-bold bg-emerald-50 text-[#059669] px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                  {pkg.badge}
                </span>
              </div>

              <div className="space-y-3">
                {pkg.subjects.map((sub, sIdx) => (
                  <div key={sIdx} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">{sub.code}</span>
                      <span className="text-[10px] font-mono text-[#059669] font-bold">15-Yr Topical Solved</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-normal">{sub.papers}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 5-STEP HOMESCHOOLING METHODOLOGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-badge">Pedagogical Framework</span>
          <h2 className="text-3xl font-extrabold text-[#0B4635] font-heading mt-2">
            How Our Online Schooling <span className="text-[#C59B4B]">Produces Straight A*s</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2">
            We don't leave homeschoolers to self-study. We run a rigorous, instructor-guided framework that ensures every student peaks at exam time.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <span className="text-2xl font-black text-[#C59B4B] font-mono block">01</span>
            <h4 className="text-sm font-extrabold text-slate-900 font-heading">Concept Foundations</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Crystal-clear live instruction using interactive digital whiteboards and graphic tablets. Every formula derivation explained from root principles.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <span className="text-2xl font-black text-[#C59B4B] font-mono block">02</span>
            <h4 className="text-sm font-extrabold text-slate-900 font-heading">Daily Topical Drilling</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              No generic textbook exercises. Students solve 15 years of past Cambridge exam questions topical-by-topical immediately after each chapter.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <span className="text-2xl font-black text-[#C59B4B] font-mono block">03</span>
            <h4 className="text-sm font-extrabold text-slate-900 font-heading">Examiner Mark Schemes</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students learn official mark schemes: Method marks [M1], Accuracy marks [A1], and Evaluation rubrics [E1] to eliminate avoidable mark deductions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <span className="text-2xl font-black text-[#C59B4B] font-mono block">04</span>
            <h4 className="text-sm font-extrabold text-slate-900 font-heading">Timed Monthly Mocks</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full-length exam simulations administered under strict exam conditions. Evaluated with authentic percentile ranks and error diagnostics.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
            <span className="text-2xl font-black text-[#C59B4B] font-mono block">05</span>
            <h4 className="text-sm font-extrabold text-slate-900 font-heading">Exam Registration Desk</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Complete support for British Council private candidate exam entry: guidance with registration deadlines, venue locations, and exam series planning.
            </p>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON TABLE: PHYSICAL SCHOOL VS READLY ONLINE BATCHES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-badge">Clear Comparison</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B4635] font-heading mt-2">
            Conventional Physical School vs. <span className="text-[#C59B4B]">Readly Online Batches</span>
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs bg-white text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-4">Educational Metric</th>
                <th className="p-4 text-slate-500">Conventional Physical School</th>
                <th className="p-4 text-[#0B4635] bg-emerald-50/70 border-x border-emerald-200 font-extrabold">
                  The Readly Institute (Online Batches)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-4 font-bold text-slate-900">Classroom Batch Size</td>
                <td className="p-4 text-slate-500">30 to 45 students per class</td>
                <td className="p-4 bg-emerald-50/40 border-x border-emerald-200 font-bold text-[#059669]">
                  Strictly 6 to 8 students (Micro-Batch)
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Daily Travel & Commute Time</td>
                <td className="p-4 text-slate-500">1.5 to 2.5 hours lost in daily traffic</td>
                <td className="p-4 bg-emerald-50/40 border-x border-emerald-200 font-bold text-[#059669]">
                  0 minutes (Study safely from home)
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Past Paper Topical Coverage</td>
                <td className="p-4 text-slate-500">Usually 2–3 recent years rushed at year-end</td>
                <td className="p-4 bg-emerald-50/40 border-x border-emerald-200 font-bold text-[#059669]">
                  15 Years (2012–2026) topical mastery every chapter
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Missed Class Recovery</td>
                <td className="p-4 text-slate-500">Missed forever; rely on classmate's notes</td>
                <td className="p-4 bg-emerald-50/40 border-x border-emerald-200 font-bold text-[#059669]">
                  Full HD recorded video + digital canvas notes provided
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">British Council Exam Entry</td>
                <td className="p-4 text-slate-500">Restricted by school internal quotas</td>
                <td className="p-4 bg-emerald-50/40 border-x border-emerald-200 font-bold text-[#059669]">
                  Full independence as British Council private candidate
                </td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Tuition & School Fee</td>
                <td className="p-4 text-slate-500">High tuition + building charges + transport</td>
                <td className="p-4 bg-emerald-50/40 border-x border-emerald-200 font-bold text-[#059669]">
                  Transparent, affordable fee with all study materials included
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center">
          <span className="section-badge">Got Questions?</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B4635] font-heading mt-2">
            Frequently Asked <span className="text-[#C59B4B]">Questions</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Common questions parents and students ask about online Cambridge O-Level schooling.
          </p>
        </div>

        <div className="space-y-3 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="card-base p-4 sm:p-5 bg-white border-slate-200 rounded-xl transition-all cursor-pointer"
                onClick={() => setActiveFaq(isOpen ? -1 : idx)}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#059669] shrink-0" />
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">{faq.q}</h4>
                  </div>
                  <span className="text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </div>
                {isOpen && (
                  <p className="text-xs text-slate-600 leading-relaxed mt-3 pt-3 border-t border-slate-100 animate-fade-in pl-7">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. BOTTOM CALL TO ACTION */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="card-base p-8 sm:p-12 bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/40 text-center rounded-2xl border border-emerald-200/80 shadow-sm">
          <h2 className="text-3xl font-extrabold font-heading mb-3 text-[#0B4635]">
            Start Your Cambridge O-Level <span className="text-[#C59B4B]">From Home Today</span>
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
            Join our upcoming Morning or Evening micro-batch. Take a 45-minute live diagnostic trial class with zero financial commitment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openBookingModal({ curriculum: 'Cambridge O-Level' })}
              className="btn btn-teal text-xs font-bold px-6 py-3 shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
            >
              <span>Enrol in O-Level Batch (Free Trial)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi The Readly Institute, I would like to speak with an academic advisor about Cambridge O-Level Online Schooling Batches.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-xs font-bold px-5 py-3 flex items-center gap-2"
            >
              <span>WhatsApp Academic Desk</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
