import React from 'react';
import { useModal } from '../context/ModalContext';
import { tutorsData } from '../data/tutorsData';
import { Award, GraduationCap, CheckCircle2, Calendar } from 'lucide-react';

export const Teachers = () => {
  const { openTeacherModal, openBookingModal } = useModal();

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      <div className="max-w-3xl">
        <span className="section-badge">Verified Mentorship</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading mt-2">
          Academic Faculty Directory
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Learn from experienced Cambridge subject specialists with 8 to 15+ years of verified distinction results in O-Level, IGCSE, and A-Level examinations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tutorsData.map(tutor => (
          <div
            key={tutor.id}
            className="card-base p-6 sm:p-7 bg-white border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-xs shrink-0 group-hover:border-emerald-400 transition-colors"
                  onError={(e) => { e.target.src = '/images/teachers/sohail-anjum.jpg'; }}
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-[#059669] transition-colors">
                    {tutor.name}
                  </h3>
                  <p className="text-xs text-[#059669] font-bold">{tutor.role}</p>
                  <span className="text-[11px] text-slate-500 block mt-0.5">{tutor.qualifications}</span>
                  <span className="inline-block px-2 py-0.5 mt-2 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-100">
                    {tutor.experience}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">{tutor.bio}</p>

              <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-200/80 mb-4 text-[11px] text-amber-900">
                <strong>Track Record:</strong> {tutor.achievements}
              </div>

              <div className="space-y-1 mb-4">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Subjects Taught:</span>
                <div className="flex flex-wrap gap-1.5">
                  {tutor.subjects?.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => openTeacherModal(tutor)}
                className="text-xs font-bold text-slate-700 hover:text-[#059669]"
              >
                View Full Profile
              </button>
              <button
                onClick={() => openBookingModal({ teacher: tutor.name, subject: tutor.subjects?.[0] || '' })}
                className="btn btn-teal text-xs py-2 px-3.5 font-bold shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Trial Class</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
