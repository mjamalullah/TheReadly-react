import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { tutorsData } from '../data/tutorsData';
import { User, ArrowRight, Star } from 'lucide-react';

export const Teachers = () => {
  const { openTeacherModal, openBookingModal } = useModal();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Faculty' },
    { id: 'languages', label: 'Languages & Urdu' },
    { id: 'sciences', label: 'Sciences (Physics, Chem, Bio)' },
    { id: 'maths', label: 'Mathematics' },
    { id: 'technology', label: 'Computer Science' },
    { id: 'commerce', label: 'Economics & Business' },
    { id: 'humanities', label: 'English & Humanities' }
  ];

  const filteredTutors = tutorsData.filter(tutor => {
    if (selectedCategory === 'all') return true;
    return tutor.category === selectedCategory;
  });

  return (
    <main>
      {/* PAGE HERO */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
            <Link to="/" className="hover:text-[#059669]">Home</Link>
            <span>/</span>
            <span className="text-slate-900">Faculty Directory</span>
          </div>
          <span className="section-badge">Academic Mentors</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B4635] font-heading tracking-tight mb-4">
            Learn From People Who Know How to Teach
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Every teacher at The Readly Institute is selected for proven academic mastery, years of Cambridge classroom experience, and the ability to inspire genuine intellectual confidence in students.
          </p>
        </div>
      </section>

      {/* FACULTY CATEGORY FILTER PILLS & DIRECTORY */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Faculty Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`tutor-pill px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'active bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Teachers Grid */}
        <div id="tutorsGrid" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map(tutor => (
            <div
              key={tutor.id}
              id={`tutorCard-${tutor.id}`}
              className="academic-card academic-card-hover p-6 flex flex-col justify-between relative bg-white"
            >
              <div>
                {/* Header with Mentor Photo, Name & Level */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md border-2 border-slate-200 shrink-0 bg-[#ECFDF5]">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        e.target.src = '/images/teachers/sohail-anjum.jpg';
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-base font-bold text-slate-900 font-heading truncate">{tutor.name}</h3>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                        {tutor.level}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-[#059669] truncate mt-0.5">{tutor.role}</p>
                    <div className="flex items-center flex-wrap gap-1.5 mt-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-[#FEF9EE] text-[#B45309] border border-[#E8DCBF]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        <span>{tutor.rating ? tutor.rating.toFixed(1) : '5.0'}</span>
                        <span className="text-slate-500 font-medium text-[10px]">({tutor.reviewsCount || '150+'})</span>
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                        {tutor.experience}
                      </span>
                    </div>
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
                  {tutor.subjects?.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-50 border border-slate-200 text-slate-700">
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
      </section>
    </main>
  );
};
