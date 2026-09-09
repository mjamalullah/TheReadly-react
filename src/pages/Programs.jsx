import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { Icon } from '../components/Icon';

export const Programs = () => {
  const { openBookingModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }, [location]);

  return (
    <div className="space-y-12">
      
    {/*  PAGE HERO  */}
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
          <Link to="/" className="hover:text-[#059669]">Home</Link>
          <span>/</span>
          <span className="text-slate-900">Academic Programs</span>
        </div>
        <span className="section-badge">Curriculum Pathways</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B4635] font-heading tracking-tight mb-4">
          Academic Programs Engineered for <span className="text-[#C59B4B]">Distinction</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Comprehensive online tracks tailored to Cambridge Assessment International Education (O-Level, IGCSE, A-Level), Matriculation Board (FBISE & Provincial BISE), and Pearson Edexcel. Designed for Grades 9 through 13.
        </p>
      </div>
    </section>

    {/*  DETAILED PROGRAMS STACK  */}
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/*  1. CAMBRIDGE O-LEVEL  */}
      <div id="olevel" className="card-base p-8 sm:p-10 bg-white border-slate-200">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                Grades 9 - 11 • Secondary Education
              </span>
              <span className="text-xs font-mono text-slate-500">CAIE 4000 / 5000 / 7000 Series</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Cambridge O-Level Program
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our O-Level program is engineered to build unshakeable conceptual foundations across Sciences, Mathematics, Commerce, and Humanities. We guide students from the fundamentals through to rigorous 15-year topical past paper mastery.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>Complete theory workbook with worked examples</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>Paper 1 MCQ elimination tactics & time management</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>Paper 4 Alternative to Practical (ATP) experimental questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>Structured calculation layout avoiding mark scheme penalties</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openBookingModal({ curriculum: 'Cambridge O-Level' })}
                className="btn btn-teal btn-sm cursor-pointer"
              >
                <span>O-Level Enrolment & Free Trial</span>
                <Icon name="calendar" className="w-4 h-4" />
              </button>
              <Link to="/programs/cambridge-olevel-igcse" className="btn btn-secondary btn-sm cursor-pointer">
                <span>Dedicated O-Level & IGCSE Page &rarr;</span>
              </Link>
              <Link to="/subjects" className="btn btn-secondary btn-sm cursor-pointer">
                <span>View Subjects</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider">Program Overview</h4>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Cohort Size:</span>
              <span className="font-bold text-slate-800">Max 8 Students</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Weekly Hours:</span>
              <span className="font-bold text-slate-800">3 - 4 hrs / subject</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Topical Questions:</span>
              <span className="font-bold text-slate-800">1,200+ per subject</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Mock Frequency:</span>
              <span className="font-bold text-[#059669]">Monthly + Series Mocks</span>
            </div>
          </div>
        </div>
      </div>

      {/*  1.1 SPECIAL TRACK: FULL ONLINE O-LEVEL & BATCH CLASSES (HOMESCHOOLERS & PRIVATE CANDIDATES)  */}
      <div id="olevel-batches" className="card-base p-8 sm:p-10 bg-gradient-to-br from-emerald-50/80 via-white to-amber-50/40 border-2 border-emerald-200/90 shadow-md scroll-mt-24">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-emerald-100">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3.5 py-1 rounded-full text-xs font-black bg-[#0B4635] text-white uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <Icon name="graduation-cap" className="w-4 h-4 text-[#C59B4B]" />
                <span>Virtual Cambridge School</span>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF9EE] text-[#0B4635] border border-[#E8D3A7]">
                Formal Schooling Without Physical Attendance
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100/80 text-[#059669]">
                Morning & Evening Batches
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-[#0B4635] font-heading">
              Full-Fledged Online Cambridge O-Level <span className="text-[#C59B4B]">School.</span>
            </h3>
            <p className="text-sm font-bold text-[#059669] mt-1">
              Study Full O-Level Just Like a Regular School — Complete Daily Classes & Exam Entry
            </p>
            <p className="text-sm text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
              Designed specifically for students who want to study Cambridge O-Level completely from home without going to a conventional physical school. Get structured daily classes, interactive small batches (max 6–8 students), daily topical past paper solving, and full British Council private candidate exam registration assistance.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <button
              type="button"
              onClick={() => openBookingModal({ curriculum: 'Cambridge O-Level' })}
              className="btn btn-teal text-xs font-bold py-3 px-5 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Enrol in O-Level Batch</span>
              <Icon name="users" className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/923337221552?text=Hi%20The%20Readly%20Institute,%20I%20am%20interested%20in%20Full%20Online%20O-Level%20Batch%20Classes%20from%20home"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-xs font-bold py-2.5 px-4 flex items-center justify-center gap-2"
            >
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Batch Structure Details Grid */}
        <div className="grid md:grid-cols-3 gap-4 pt-6 text-xs">
          <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-[#0B4635] font-bold text-sm">
              <span className="text-lg">⏰</span>
              <h4>Flexible Daily Batch Timings</h4>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Choose between <strong>Morning Batch (9:00 AM – 1:00 PM PKT)</strong> for full-time homeschoolers, or <strong>Evening Batch (4:30 PM – 8:30 PM PKT)</strong>. Structured daily timetable covering 4 to 5 subjects systematically.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-[#0B4635] font-bold text-sm">
              <span className="text-lg">📝</span>
              <h4>Daily Topical Past Paper Drilling</h4>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Students don't just learn theory—they solve 15 years of CAIE topical past paper questions after every concept. Daily homework is submitted online and marked according to official Cambridge marking schemes.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center gap-2 text-[#0B4635] font-bold text-sm">
              <span className="text-lg">🎓</span>
              <h4>Private Candidate Registration Help</h4>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              We guide parents and students step-by-step through British Council private candidate exam registration for May/June and Oct/Nov series, including syllabus codes, venue selection, and statement of entry.
            </p>
          </div>
        </div>

        {/* Subjects Covered in Batch Track */}
        <div className="mt-6 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-extrabold text-[#0B4635] block">Complete O-Level Subject Packages Available:</span>
            <span className="text-slate-600 text-[11px]">
              Mathematics (4024), Additional Maths (4037), Physics (5054), Chemistry (5070), Biology (5090), Computer Science (2210), English Language (1123), Urdu (3248), Pakistan Studies (2059), Islamiyat (2058), Accounting, Economics & Business.
            </span>
          </div>
          <button
            type="button"
            onClick={() => openBookingModal({ curriculum: 'Cambridge O-Level' })}
            className="shrink-0 text-xs font-bold text-[#059669] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Book 45-Min Free Trial</span>
            <Icon name="arrow-right" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/*  2. CAMBRIDGE IGCSE  */}
      <div id="igcse" className="card-base p-8 sm:p-10 bg-white border-slate-200">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                International Secondary Curriculum
              </span>
              <span className="text-xs font-mono text-slate-500">CAIE 0400 / 0500 / 0600 Series</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Cambridge IGCSE Program
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Designed for international school students following Cambridge IGCSE. We offer targeted instruction across Extended Mathematics (0580), Extended Sciences (0625, 0620, 0610), First Language English (0500), and Computer Science (0478).
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>Core and Extended curriculum options covered thoroughly</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>Investigative science practical paper skills</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>International English reading & directed writing frameworks</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>Edexcel IGCSE curriculum matching available</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openBookingModal({ curriculum: 'Cambridge IGCSE' })}
                className="btn btn-teal btn-sm cursor-pointer"
              >
                <span>IGCSE Enrolment & Free Trial</span>
                <Icon name="calendar" className="w-4 h-4" />
              </button>
              <Link to="/subjects" className="btn btn-secondary btn-sm cursor-pointer">
                <span>View IGCSE Subjects</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider">Program Overview</h4>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Curriculum:</span>
              <span className="font-bold text-slate-800">CAIE & Edexcel IGCSE</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Live Feedback:</span>
              <span className="font-bold text-slate-800">Direct Teacher Markup</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Exam Series:</span>
              <span className="font-bold text-slate-800">May/June & Oct/Nov</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Doubt Support:</span>
              <span className="font-bold text-[#059669]">Daily WhatsApp Access</span>
            </div>
          </div>
        </div>
      </div>

      {/*  3. CAMBRIDGE A-LEVEL  */}
      <div id="alevel" className="card-base p-8 sm:p-10 bg-white border-[#A7F3D0] shadow-md">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#059669] border border-teal-300">
                Pre-University • AS & A2 Level
              </span>
              <span className="text-xs font-mono text-slate-500">CAIE 9000 Series & Edexcel IAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Cambridge International AS & A-Level
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              A-Level demands university-level critical thinking, sophisticated mathematical proofs, and examiner report keyword precision. Our mentors have achieved straight A* credentials and break down the most demanding modules with effortless clarity.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>Pure Mathematics (P1, P3), Mechanics, and Statistics 1 & 2</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>Advanced Physics Paper 4 theory & Paper 5 experiment planning</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>A-Level Economics 20-mark evaluation essay frameworks</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>Computer Science Paper 4 live screen Python programming</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openBookingModal({ curriculum: 'Cambridge A-Level' })}
                className="btn btn-teal btn-sm cursor-pointer"
              >
                <span>A-Level Enrolment & Free Trial</span>
                <Icon name="calendar" className="w-4 h-4" />
              </button>
              <Link to="/subjects" className="btn btn-secondary btn-sm cursor-pointer">
                <span>View A-Level Subjects</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#ECFDF5]/70 p-6 rounded-xl border border-[#A7F3D0] space-y-3 text-xs">
            <h4 className="font-bold text-teal-950 uppercase tracking-wider">A-Level Highlights</h4>
            <div className="flex justify-between py-1.5 border-b border-[#A7F3D0]">
              <span className="text-slate-600">Level:</span>
              <span className="font-bold text-slate-900">AS (Year 12) & A2 (Year 13)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#A7F3D0]">
              <span className="text-slate-600">Instruction Format:</span>
              <span className="font-bold text-slate-900">Small Group or 1:1</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#A7F3D0]">
              <span className="text-slate-600">Timed Mocks:</span>
              <span className="font-bold text-slate-900">18 Full Mocks/year</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#A7F3D0]">
              <span className="text-slate-600">Target Standard:</span>
              <span className="font-bold text-[#059669]">A* Distinction Pathway</span>
            </div>
          </div>
        </div>
      </div>

      {/*  4. MATRICULATION BOARD (SSC PART I & II)  */}
      <div id="matric" className="card-base p-8 sm:p-10 bg-white border-slate-200 scroll-mt-24">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                Grades 9 & 10 • SSC Part-I & Part-II
              </span>
              <span className="text-xs font-mono text-slate-500">Federal FBISE & Provincial BISE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Matriculation Board Program (SSC)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Designed specifically for Matric students enrolled in Federal Board (FBISE Islamabad) and Provincial Boards (Punjab BISE, Sindh Board, KPK Board). We transition students from rote learning to SLO-based (Student Learning Outcomes) conceptual mastery, accurate numerical derivations, and polished Urdu & English presentation for top board positions.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>SLO-based conceptual reasoning and high-yield question banks</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>Step-by-step Physics & Chemistry numerical problem solving</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>Matric Mathematics theorem proofs & geometry presentation</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-[#059669]" />
                <span>10-Year solved model papers & board examiner presentation rubrics</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openBookingModal({ curriculum: 'Matriculation Board (SSC)' })}
                className="btn btn-teal btn-sm cursor-pointer"
              >
                <span>Matric Enrolment & Free Trial</span>
                <Icon name="calendar" className="w-4 h-4" />
              </button>
              <Link to="/programs/matric" className="btn btn-secondary btn-sm cursor-pointer">
                <span>Dedicated Matric Page &rarr;</span>
              </Link>
              <Link to="/subjects" className="btn btn-secondary btn-sm cursor-pointer">
                <span>View Subjects</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider">Program Overview</h4>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Board Coverage:</span>
              <span className="font-bold text-slate-800">FBISE & All Provincial BISE</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Class Format:</span>
              <span className="font-bold text-slate-800">Interactive Micro-Batches / 1:1</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Curriculum Approach:</span>
              <span className="font-bold text-slate-800">SLO & Model Papers</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Target Standard:</span>
              <span className="font-bold text-[#059669]">A+ Grade (90%+ Marks)</span>
            </div>
          </div>
        </div>
      </div>

      {/*  5. EXAM REVISION BOOTCAMP  */}
      <div id="revision" className="card-base p-8 sm:p-10 bg-white border-slate-200">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Crash Courses & Retake Acceleration
              </span>
              <span className="text-xs font-mono text-slate-500">6 - 8 Weeks Intensive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Exam Preparation & Crash Courses
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Designed specifically for students entering upcoming May/June or Oct/Nov series who need fast, targeted revision. We bypass broad lectures to focus purely on high-yield topics, past paper prediction series, and examiner trap elimination.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-amber-600" />
                <span>Intensive high-yield chapter summaries and formula sheets</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-amber-600" />
                <span>Daily timed past paper sections under strict exam conditions</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-amber-600" />
                <span>Personalized score audit identifying missing marks</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="check" className="w-4 h-4 text-amber-600" />
                <span>Confidence coaching and stress management strategies</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => openBookingModal({ curriculum: 'Revision Crash Course' })}
                className="btn btn-teal btn-sm cursor-pointer"
              >
                <span>Enrol in Revision Bootcamp</span>
                <Icon name="calendar" className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider">Bootcamp Specs</h4>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Duration:</span>
              <span className="font-bold text-slate-800">6 - 8 Weeks</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Intensity:</span>
              <span className="font-bold text-slate-800">Daily Sessions Available</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Papers Solved:</span>
              <span className="font-bold text-slate-800">10 Full Past Papers</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-500">Best For:</span>
              <span className="font-bold text-amber-700">Upcoming Series & Retakes</span>
            </div>
          </div>
        </div>
      </div>

    </section>

    {/*  ================= 5. IT & PROFESSIONAL CERTIFICATIONS =================  */}
    <section id="it-certifications" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
      
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="section-badge">Career & Industry Tracks</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B4635] font-heading mb-3">
          IT & Professional <span className="text-[#C59B4B]">Certifications</span>
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          High-demand tech programs engineered for students and professionals seeking hands-on skills, industry certifications, and career acceleration in Digital Marketing, Cyber Security, Full-Stack Development, and AI.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        
        {/*  Course 1: Digital Marketing  */}
        <div className="card-base card-hover p-6 sm:p-8 bg-white border-emerald-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] flex items-center justify-center">
                <Icon name="trending-up" className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                Google & Meta Certified
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 font-heading mb-2">Digital Marketing & Performance Strategy</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Master performance advertising, lead generation funnels, search engine optimization (SEO), and social media algorithms with live ad budget simulations.
            </p>

            <div className="space-y-2.5 mb-6">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-[#059669] shrink-0" />
                <span>Meta Ads Manager (Facebook & Instagram) Campaign Architecture</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-[#059669] shrink-0" />
                <span>Google Search, Display & Performance Max (PMax) Ads</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-[#059669] shrink-0" />
                <span>Technical & On-Page SEO + Conversion Rate Optimization (CRO)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-[#059669] shrink-0" />
                <span>Google Analytics 4 (GA4), Tag Manager & Meta Pixel Mastery</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Duration: 3 - 6 Months</span>
            <button
              type="button"
              onClick={() => openBookingModal({ 
                curriculum: 'IT & Professional Certifications', 
                subject: 'Digital Marketing & Performance Strategy (Meta & Google Ads)' 
              })}
              className="btn btn-teal btn-sm text-xs cursor-pointer"
            >
              <span>Enrol / Book Free Demo</span>
              <Icon name="arrow-right" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/*  Course 2: CSIS Certification  */}
        <div className="card-base card-hover p-6 sm:p-8 bg-white border-blue-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
                <Icon name="shield-check" className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Cyber Defense Track
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 font-heading mb-2">CSIS Certification (Information Security)</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Computer Systems & Information Security certification designed to build robust foundational and applied defense capabilities in network architecture and vulnerability handling.
            </p>

            <div className="space-y-2.5 mb-6">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Enterprise Network Security & Cryptographic Protocols</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Vulnerability Auditing, Pen-Testing & Threat Surface Mapping</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Security Operations Center (SOC) Log Analysis & Incident Response</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Official CSIS Exam Preparation & Portfolio Validation</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Duration: 4 - 6 Months</span>
            <button
              type="button"
              onClick={() => openBookingModal({ 
                curriculum: 'IT & Professional Certifications', 
                subject: 'CSIS Certification (Cyber Security & Information Systems)' 
              })}
              className="btn btn-teal btn-sm text-xs cursor-pointer"
            >
              <span>Enrol / Book Free Demo</span>
              <Icon name="arrow-right" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/*  Course 3: Full-Stack Web Development  */}
        <div className="card-base card-hover p-6 sm:p-8 bg-white border-indigo-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center">
                <Icon name="code" className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Full-Stack Engineering
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 font-heading mb-2">Full-Stack Web Development</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Learn modern software development from HTML/CSS and JavaScript ES6+ through React component systems, Node.js REST API servers, and database management.
            </p>

            <div className="space-y-2.5 mb-6">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Modern Frontend: React, Tailwind CSS & State Management</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Backend Architecture: Node.js, Express & RESTful APIs</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Database Mastery: SQL & NoSQL (MongoDB/PostgreSQL)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Git/GitHub Workflows & Live Production Cloud Deployments</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Duration: 4 - 6 Months</span>
            <button
              type="button"
              onClick={() => openBookingModal({ 
                curriculum: 'IT & Professional Certifications', 
                subject: 'Full-Stack Web Development (HTML, CSS, Modern JS, MERN Stack)' 
              })}
              className="btn btn-teal btn-sm text-xs cursor-pointer"
            >
              <span>Enrol / Book Free Demo</span>
              <Icon name="arrow-right" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/*  Course 4: Python & AI  */}
        <div className="card-base card-hover p-6 sm:p-8 bg-white border-amber-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
                <Icon name="cpu" className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Data Science & AI
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 font-heading mb-2">Python, Data Analytics & AI</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Practical Python engineering for data analytics, workflow automation, statistical modeling, and modern Generative AI tool integration.
            </p>

            <div className="space-y-2.5 mb-6">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Python Programming Fundamentals & OOP Architecture</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Data Analysis & Wrangling with Pandas and NumPy</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Interactive Visualizations with Matplotlib and Seaborn</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Icon name="check-circle" className="w-4 h-4 text-amber-600 shrink-0" />
                <span>AI Prompt Engineering & Machine Learning Model APIs</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Duration: 3 - 6 Months</span>
            <button
              type="button"
              onClick={() => openBookingModal({ 
                curriculum: 'IT & Professional Certifications', 
                subject: 'Python for Data Analytics & Artificial Intelligence (AI Tools)' 
              })}
              className="btn btn-teal btn-sm text-xs cursor-pointer"
            >
              <span>Enrol / Book Free Demo</span>
              <Icon name="arrow-right" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </section>

    {/*  PROGRAM COMPARISON TABLE  */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="section-badge">Side-by-Side</span>
        <h2 className="text-3xl font-extrabold text-[#0B4635] font-heading">
          Program Comparison <span className="text-[#C59B4B]">Matrix</span>
        </h2>
      </div>

      <div className="card-base bg-white overflow-x-auto border-slate-200">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100/80 text-slate-900 font-heading text-[11px] uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-4">Feature</th>
              <th className="p-4">Cambridge O-Level</th>
              <th className="p-4">Cambridge IGCSE</th>
              <th className="p-4">Cambridge A-Level</th>
              <th className="p-4">Matric Board (SSC)</th>
              <th className="p-4">Revision Bootcamp</th>
              <th className="p-4 text-[#059669]">IT & Certifications</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-4 font-bold text-slate-900">Target Audience</td>
              <td className="p-4 text-slate-600">Grades 9 - 11</td>
              <td className="p-4 text-slate-600">Grades 9 - 10</td>
              <td className="p-4 text-slate-600">Grades 12 - 13 (AS/A2)</td>
              <td className="p-4 text-slate-600">Grades 9 & 10 (SSC I/II)</td>
              <td className="p-4 text-slate-600">All Exam Candidates</td>
              <td className="p-4 text-slate-600">Students & Professionals</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-900">Batch Size</td>
              <td className="p-4 text-slate-600">Max 8 Students</td>
              <td className="p-4 text-slate-600">Max 8 Students</td>
              <td className="p-4 text-slate-600">Max 8 (or 1:1)</td>
              <td className="p-4 text-slate-600">Max 8 (or 1:1)</td>
              <td className="p-4 text-slate-600">Max 6 Students</td>
              <td className="p-4 text-slate-600">Max 8 (Interactive Labs)</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-900">Focus & Projects</td>
              <td className="p-4 text-slate-600">15 Years Categorized</td>
              <td className="p-4 text-slate-600">15 Years Categorized</td>
              <td className="p-4 text-slate-600">15 Years + Variant Analysis</td>
              <td className="p-4 text-slate-600">FBISE SLOs + 10-Yr Past Papers</td>
              <td className="p-4 text-slate-600">Intensive Prediction Series</td>
              <td className="p-4 text-slate-600">Real Projects & Live Ad Spend</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-900">Recorded Vault</td>
              <td className="p-4 text-emerald-600 font-bold">✓ Included</td>
              <td className="p-4 text-emerald-600 font-bold">✓ Included</td>
              <td className="p-4 text-emerald-600 font-bold">✓ Included</td>
              <td className="p-4 text-emerald-600 font-bold">✓ Included</td>
              <td className="p-4 text-emerald-600 font-bold">✓ Included</td>
              <td className="p-4 text-emerald-600 font-bold">✓ Lifetime Access</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-slate-900">Certification / Credential</td>
              <td className="p-4 text-slate-600">Bi-weekly Audits</td>
              <td className="p-4 text-slate-600">Bi-weekly Audits</td>
              <td className="p-4 text-slate-600">Monthly + Progress Portal</td>
              <td className="p-4 text-slate-600">Board Model Papers & Mocks</td>
              <td className="p-4 text-slate-600">Weekly Score Reports</td>
              <td className="p-4 text-emerald-600 font-bold">Verified Industry Certificate</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    {/*  BOTTOM CTA  */}
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="card-base p-8 sm:p-12 bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/40 text-center rounded-2xl border border-emerald-200/80 shadow-sm">
        <h2 className="text-3xl font-extrabold font-heading mb-3 text-[#0B4635]">Not sure which program matches your <span className="text-[#C59B4B]">goals?</span></h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto mb-6">
          Our senior academic advisor will evaluate your previous scores, examination series, and target universities free of charge.
        </p>
        <button
          type="button"
          onClick={() => openBookingModal({ curriculum: 'Cambridge O-Level' })}
          className="btn btn-teal text-xs cursor-pointer"
        >
          <span>Book an Academic Consultation</span>
          <Icon name="arrow-right" className="w-4 h-4" />
        </button>
      </div>
    </section>
  
    </div>
  );
};
