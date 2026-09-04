import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { subjectsData } from '../data/subjectsData';
import { CheckCircle2, ArrowRight, Calendar, BookOpen, Layers } from 'lucide-react';

export const SubjectDetail = () => {
  const { slug } = useParams();
  const { openBookingModal } = useModal();

  // Find matching subject by slug or default to mathematics
  const subject = subjectsData.find(s => s.id.toLowerCase().includes(slug?.toLowerCase() || '')) || subjectsData[0];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
          <Link to="/" className="hover:text-[#059669]">Home</Link>
          <span>/</span>
          <Link to="/subjects" className="hover:text-[#059669]">Subjects</Link>
          <span>/</span>
          <span className="text-slate-900">{subject.title}</span>
        </div>
        <span className="section-badge">{subject.boards?.join(' • ')}</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading mt-2">
          {subject.title} Syllabus & Examination Blueprint
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          {subject.description}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="card-base p-8 bg-white border-slate-200 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#059669]" />
              Core Components & Paper Structure
            </h2>
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {subject.features?.map((f, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-bold text-slate-800">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-base p-8 bg-white border-slate-200 space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-heading">
              15-Year Categorized Topical Past Papers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every lecture is followed by assigned past-paper questions categorized by topic and difficulty level. Homework is personally marked with written examiner comments.
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="card-base p-6 bg-gradient-to-br from-[#0B4635] to-[#063326] text-white rounded-2xl shadow-xl space-y-4">
            <h3 className="text-lg font-bold font-heading text-white">Book a Free Trial Session</h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              Experience a live 1-on-1 class in {subject.title} with our senior mentor before enrolling.
            </p>
            <button
              onClick={() => openBookingModal({ subject: `${subject.title} (${subject.codes?.[0] || 'CAIE'})` })}
              className="btn btn-teal w-full text-xs font-bold py-3 justify-center shadow-md"
            >
              <span>Book Free Demo Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
