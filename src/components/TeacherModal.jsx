import React, { useEffect } from 'react';
import { useModal } from '../context/ModalContext';
import { tutorsData } from '../data/tutorsData';
import { X, Award, CheckCircle2, GraduationCap, Clock, Calendar } from 'lucide-react';

export const TeacherModal = () => {
  const { teacherModal, closeTeacherModal, openBookingModal } = useModal();

  useEffect(() => {
    if (teacherModal.isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeTeacherModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [teacherModal.isOpen, closeTeacherModal]);

  if (!teacherModal.isOpen || !teacherModal.teacher) return null;

  const tutor = typeof teacherModal.teacher === 'string'
    ? tutorsData.find(t => t.id === teacherModal.teacher) || tutorsData[0]
    : teacherModal.teacher;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeTeacherModal();
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
              onClick={closeTeacherModal}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          
          <div className="flex items-start gap-4">
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-20 h-20 rounded-xl object-cover border-2 border-emerald-400/50 shadow-md shrink-0"
              onError={(e) => {
                e.target.src = '/images/teachers/sohail-anjum.jpg';
              }}
            />
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
                Verified Faculty Specialist
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">{tutor.name}</h3>
              <p className="text-xs text-slate-200 font-medium">{tutor.role} • {tutor.qualifications}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white">
                  {tutor.level}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {tutor.experience}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-5 text-xs text-slate-700">
          
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-[#059669]" />
              Academic Mentorship Profile
            </h4>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">{tutor.bio}</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              Verified Achievements & Track Record
            </h4>
            <p className="text-slate-600 leading-relaxed bg-amber-50/70 border border-amber-200/80 p-3 rounded-lg text-xs">
              {tutor.achievements}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
              Assigned Subjects & Papers Taught
            </h4>
            <div className="flex flex-wrap gap-2">
              {tutor.subjects.map((s, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-semibold text-[11px] border border-slate-200">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              onClick={closeTeacherModal}
              className="btn btn-secondary text-xs px-4 py-2"
            >
              Close
            </button>
            <button
              onClick={() => {
                closeTeacherModal();
                openBookingModal({
                  teacher: tutor.name,
                  subject: tutor.subjects[0] || ''
                });
              }}
              className="btn btn-teal text-xs px-5 py-2 font-bold shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Free Trial with {tutor.name.split(' ')[0]}</span>
            </button>
          </div>

        </div>

        </div>
      </div>
    </div>
  );
};
