import React from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { Icon } from '../components/Icon';

export const Resources = () => {
  const { openBookingModal } = useModal();
  return (
    <div className="space-y-12">
      
    {/*  PAGE HERO  */}
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
          <Link to="/" className="hover:text-[#059669]">Home</Link>
          <span>/</span>
          <span className="text-slate-900">Academic Resources</span>
        </div>
        <span className="section-badge">Student Study Vault</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B4635] font-heading tracking-tight mb-4">
          Cambridge Exam <span className="text-[#C59B4B]">Resources & Guides</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          High-yield academic tools designed to optimize your revision. Access topical past paper breakdowns, formula summaries, syllabus timelines, and examiner rubrics.
        </p>
      </div>
    </section>

    {/*  FEATURED RESOURCE CATEGORIES  */}
    <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/*  Resource 1  */}
        <div className="card-base p-6 bg-white flex flex-col justify-between border-slate-200">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-4">
              <Icon name="file-text" className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669] block mb-1">Past Paper Bank</span>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-2">15-Year Categorized Topical Past Papers</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Organized question banks by specific sub-topic for Mathematics (4024/9709), Physics (5054/9702), Chemistry (5070/9701), and Computer Science (2210/9618).
            </p>
          </div>
          <button onClick={() => openBookingModal('Topical Past Papers')} className="btn btn-secondary btn-sm w-full text-xs">
            <span>Request Sample Topical Workbook</span>
          </button>
        </div>

        {/*  Resource 2  */}
        <div className="card-base p-6 bg-white flex flex-col justify-between border-slate-200">
          <div>
            <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-4">
              <Icon name="bookmark" className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#059669] block mb-1">Quick Revision</span>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-2">Formula & Keyword Cheat Sheets</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              One-page high-yield cheat sheets containing all required calculus theorems, organic chemistry reaction charts, and mechanics dynamics equations.
            </p>
          </div>
          <button onClick={() => openBookingModal('Formula Sheets')} className="btn btn-secondary btn-sm w-full text-xs">
            <span>Request Formula Sheet</span>
          </button>
        </div>

        {/*  Resource 3  */}
        <div className="card-base p-6 bg-white flex flex-col justify-between border-slate-200">
          <div>
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
              <Icon name="calendar" className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">Study Management</span>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-2">12-Week Cambridge Revision Planner</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Structured weekly timetable template mapping every chapter across O-Level and A-Level to optimal spaced-repetition intervals before exam month.
            </p>
          </div>
          <button onClick={() => openBookingModal('Revision Planner')} className="btn btn-secondary btn-sm w-full text-xs">
            <span>Download Timetable PDF</span>
          </button>
        </div>

      </div>

      {/*  EXAMINER TECHNIQUES DEEP-DIVE  */}
      <div className="card-base p-8 sm:p-10 bg-white border-slate-200">
        <span className="section-badge">Academic Insight</span>
        <h2 className="text-2xl font-bold text-slate-900 font-heading mb-3">
          The Cambridge Examiner's Rubric: How Marks Are Actually Awarded
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl mb-6">
          Most students lose 10% to 20% of their final grade not from lack of conceptual understanding, but due to poor answer phrasing that misses official Cambridge mark scheme keywords.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">State vs. Explain vs. Discuss</h4>
            <p className="text-slate-600">
              Understanding command words: 'State' requires one keyword, 'Explain' requires causal reasoning (Because / Therefore), and 'Discuss' requires a balanced two-sided perspective followed by a reasoned conclusion.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">Working Step Allocation (M & A Marks)</h4>
            <p className="text-slate-600">
              In Mathematics and Physics, Method marks (M) are awarded independently of Accuracy marks (A). Writing clear formula substitutions guarantees partial credit even if a computational slip occurs.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm">ATP Practical Trap Prevention</h4>
            <p className="text-slate-600">
              In Paper 4 / 6 Alternative to Practical exams, specifying experimental controls (e.g. "keeping temperature constant with a water bath") and scale ruler precision are essential criteria.
            </p>
          </div>
        </div>
      </div>

      {/*  FREE TRIAL DEMO CALL TO ACTION  */}
      <div className="card-base p-8 sm:p-12 bg-[#0A192F] text-white text-center rounded-2xl border-slate-800">
        <h2 className="text-3xl font-extrabold font-heading mb-3 text-white">Get Personalized <span className="text-[#C59B4B]">Study Guidance</span></h2>
        <p className="text-slate-300 text-sm max-w-xl mx-auto mb-6">
          Schedule a 45-minute live trial class with a verified Cambridge faculty mentor. Review past questions and receive a customized revision roadmap.
        </p>
        <button
          type="button"
          onClick={() => openBookingModal()}
          className="btn btn-teal text-xs cursor-pointer"
        >
          <span>Book a Free Trial Session</span>
          <Icon name="arrow-right" className="w-4 h-4" />
        </button>
      </div>

    </section>
  
    </div>
  );
};
