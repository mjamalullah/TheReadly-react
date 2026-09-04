import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { subjectsData } from '../data/subjectsData';
import { BookOpen, ArrowRight, Layers, Clock, Sparkles } from 'lucide-react';

export const Subjects = () => {
  const { openSyllabusModal, openBookingModal } = useModal();
  const [boardFilter, setBoardFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filtered = subjectsData.filter(s => {
    const matchBoard = boardFilter === 'all' || s.boardCategory === boardFilter;
    const matchCat = categoryFilter === 'all' || s.category === categoryFilter;
    return matchBoard && matchCat;
  });

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      <div className="max-w-3xl">
        <span className="section-badge">Full Academic Catalog</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading mt-2">
          Subject Catalog & Syllabus Breakdown
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Explore complete course syllabi for Cambridge O-Level, IGCSE, A-Level, Edexcel, and IT Certifications. Every course is taught with topical question banks from 2010 to 2025.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-3 pb-2 border-b border-slate-200">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Curriculums' },
            { id: 'olevel', label: 'Cambridge O-Level' },
            { id: 'igcse', label: 'Cambridge IGCSE' },
            { id: 'alevel', label: 'Cambridge A-Level' },
            { id: 'edexcel', label: 'Pearson Edexcel' },
            { id: 'it-certifications', label: 'IT & Certifications' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setBoardFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                boardFilter === tab.id
                  ? 'bg-[#0B4635] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All Categories' },
            { id: 'sciences', label: 'Sciences' },
            { id: 'maths', label: 'Mathematics' },
            { id: 'languages', label: 'Languages' },
            { id: 'commerce', label: 'Commerce & Humanities' },
            { id: 'it-professional', label: 'IT & Marketing Certifications' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                categoryFilter === cat.id
                  ? 'bg-[#059669] text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(sub => (
          <div
            key={sub.id}
            className="card-base p-6 bg-white border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-[#059669]">
                  {sub.boards?.join(' • ')}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{sub.codes?.[0] || 'Code'}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading group-hover:text-[#059669] transition-colors">
                {sub.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {sub.description}
              </p>

              <div className="space-y-1.5 pt-2">
                {sub.features?.slice(0, 3).map((f, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => openSyllabusModal(sub)}
                className="text-xs font-bold text-slate-700 hover:text-[#059669]"
              >
                View Syllabus
              </button>
              <button
                onClick={() => openBookingModal({ subject: `${sub.title} (${sub.codes?.[0] || 'CAIE'})` })}
                className="btn btn-teal text-xs py-1.5 px-3 font-bold"
              >
                Book Trial
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
