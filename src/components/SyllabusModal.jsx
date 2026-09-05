import React, { useEffect } from 'react';
import { useModal } from '../context/ModalContext';
import { subjectsData } from '../data/subjectsData';
import { X, BookOpen, Layers, CheckCircle2, Clock, Calendar } from 'lucide-react';

export const SyllabusModal = () => {
  const { syllabusModal, closeSyllabusModal, openBookingModal } = useModal();

  useEffect(() => {
    if (syllabusModal.isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeSyllabusModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [syllabusModal.isOpen, closeSyllabusModal]);

  if (!syllabusModal.isOpen || !syllabusModal.subject) return null;

  const sub = typeof syllabusModal.subject === 'string'
    ? subjectsData.find(s => s.id === syllabusModal.subject) || subjectsData[0]
    : syllabusModal.subject;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSyllabusModal();
      }}
    >
      <div className="flex min-h-full items-start sm:items-center justify-center p-3 sm:p-6 text-left">
        <div 
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4 sm:my-8"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* Header */}
          <div className="bg-[#0B4635] text-white p-5 sm:p-7 relative shrink-0">
            <button
              onClick={closeSyllabusModal}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#059669]">
              {sub.category ? sub.category.toUpperCase() : 'CAMBRIDGE ACCREDITED'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">{sub.title}</h3>
          <p className="text-xs text-slate-200 mt-1">
            {sub.boards?.join(' • ')} • Syllabus Codes: {sub.codes?.join(' | ')}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-5 text-xs text-slate-700">
          
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#059669]" />
              Curriculum Overview & Scope
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">{sub.description}</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-[#059669]" />
              Core Exam Components & Paper Breakdown
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {sub.features?.map((f, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-slate-800 font-semibold text-xs">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0]">
            <div>
              <span className="text-[11px] font-bold text-[#0B4635] uppercase block">Course Duration</span>
              <span className="text-xs text-slate-700 font-semibold">{sub.duration || '6 - 9 Months (Comprehensive)'}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#0B4635] uppercase block">Faculty Lead</span>
              <span className="text-xs text-slate-700 font-semibold">{sub.tutors || 'Cambridge Distinction Specialists'}</span>
            </div>
          </div>

          {/* Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              onClick={closeSyllabusModal}
              className="btn btn-secondary text-xs px-4 py-2"
            >
              Close
            </button>
            <button
              onClick={() => {
                closeSyllabusModal();
                openBookingModal({
                  subject: `${sub.title} (${sub.codes?.[0] || 'Cambridge'})`,
                  curriculum: sub.boards?.[0] || 'Cambridge O-Level'
                });
              }}
              className="btn btn-teal text-xs px-5 py-2 font-bold shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Free Trial for {sub.title}</span>
            </button>
          </div>

        </div>

        </div>
      </div>
    </div>
  );
};
