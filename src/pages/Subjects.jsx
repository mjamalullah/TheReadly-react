import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { subjectsData } from '../data/subjectsData';
import {
  BookOpen,
  ArrowRight,
  Clock,
  Award,
  Search,
  Check,
  FileText,
  Atom,
  Calculator,
  TrendingUp,
  Landmark,
  Languages,
  Code2
} from 'lucide-react';

export const Subjects = () => {
  const { openSyllabusModal, openBookingModal } = useModal();
  const [boardFilter, setBoardFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getSubjectIcon = (sub) => {
    const title = sub.title.toLowerCase();
    if (sub.category === 'sciences' || title.includes('physics')) return <Atom className="w-5 h-5 text-[#059669]" />;
    if (title.includes('chemistry')) return <Atom className="w-5 h-5 text-[#059669]" />;
    if (title.includes('biology')) return <Atom className="w-5 h-5 text-[#059669]" />;
    if (sub.category === 'maths' || title.includes('math')) return <Calculator className="w-5 h-5 text-[#059669]" />;
    if (title.includes('computer') || title.includes('it') || title.includes('ict')) return <Code2 className="w-5 h-5 text-[#059669]" />;
    if (sub.category === 'commerce' || title.includes('econ') || title.includes('business') || title.includes('account')) return <TrendingUp className="w-5 h-5 text-[#059669]" />;
    if (sub.category === 'humanities' || title.includes('pakistan') || title.includes('islam') || title.includes('history') || title.includes('geography')) return <Landmark className="w-5 h-5 text-[#059669]" />;
    if (sub.category === 'languages' || title.includes('urdu') || title.includes('english')) return <Languages className="w-5 h-5 text-[#059669]" />;
    return <BookOpen className="w-5 h-5 text-[#059669]" />;
  };

  const filtered = subjectsData.filter(s => {
    // Robust board matching supporting IGCSE, O-Level, A-Level, Edexcel, and IT
    const matchBoard = boardFilter === 'all' ||
      (boardFilter === 'igcse' && (
        s.boardCategory === 'igcse' ||
        (s.boards && s.boards.some(b => b.toLowerCase().includes('igcse'))) ||
        (s.codes && s.codes.some(c => c.toLowerCase().includes('igcse') || /0625|0620|0610|0580|0606|0478|0417|0455|0450|0452|0448|0493|0470|0460|0457|0500|0475|0539/i.test(c)))
      )) ||
      (boardFilter === 'olevel' && (
        s.boardCategory === 'olevel' ||
        (s.boards && s.boards.some(b => b.toLowerCase().includes('o level') || b.toLowerCase().includes('o-level')))
      )) ||
      (boardFilter === 'alevel' && (
        s.boardCategory === 'alevel' ||
        (s.boards && s.boards.some(b => b.toLowerCase().includes('a level') || b.toLowerCase().includes('a-level')))
      )) ||
      (boardFilter === 'edexcel' && (
        s.boardCategory === 'edexcel' ||
        (s.boards && s.boards.some(b => b.toLowerCase().includes('edexcel')))
      )) ||
      (boardFilter === 'it-certifications' && (
        s.boardCategory === 'it-certifications' || s.category === 'it-professional' || s.category === 'technology'
      )) ||
      s.boardCategory === boardFilter;

    const matchCat = categoryFilter === 'all' ||
      s.category === categoryFilter ||
      (categoryFilter === 'maths-cs' && (s.category === 'maths' || s.category === 'technology')) ||
      (categoryFilter === 'it-professional' && (s.category === 'it-professional' || s.category === 'technology'));

    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q ||
      s.title.toLowerCase().includes(q) ||
      (s.description && s.description.toLowerCase().includes(q)) ||
      (s.codes && s.codes.some(c => c.toLowerCase().includes(q))) ||
      (s.boards && s.boards.some(b => b.toLowerCase().includes(q)));

    return matchBoard && matchCat && matchSearch;
  });

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="max-w-3xl">
        <span className="section-badge">Academic Inventory</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading mt-2">
          All Cambridge & Edexcel Subjects
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Comprehensive curriculum coverage across Sciences, Mathematics, Commerce, Humanities, and Languages. Select any subject to explore course structure and sample past paper roadmaps.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Board Buttons */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-lg bg-slate-100 border border-slate-200 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Boards' },
              { id: 'olevel', label: 'Cambridge O-Level' },
              { id: 'igcse', label: 'Cambridge IGCSE' },
              { id: 'alevel', label: 'Cambridge A-Level' },
              { id: 'edexcel', label: 'Pearson Edexcel' },
              { id: 'it-certifications', label: 'IT & Certifications' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setBoardFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded text-xs font-bold transition-all cursor-pointer ${
                  boardFilter === tab.id
                    ? 'bg-[#059669] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or code (5054, 9702, 0625)..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white"
            />
          </div>

        </div>

        {/* Discipline Categories */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          {[
            { id: 'all', label: 'All Disciplines' },
            { id: 'sciences', label: 'Sciences' },
            { id: 'maths', label: 'Mathematics' },
            { id: 'languages', label: 'Languages & Urdu' },
            { id: 'commerce', label: 'Commerce & Economics' },
            { id: 'humanities', label: 'Humanities & Law' },
            { id: 'it-professional', label: 'IT & Certifications' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] font-bold'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="font-semibold text-[#059669]">
            {filtered.length} Subjects Available {boardFilter !== 'all' ? `(${boardFilter.toUpperCase()})` : ''}
          </span>
          <span className="hidden sm:inline">Includes theory notes, 15-year past papers & live weekly mocks</span>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No subjects match your criteria</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try resetting your board or category filter, or search with different keywords.
          </p>
          <button
            onClick={() => { setBoardFilter('all'); setCategoryFilter('all'); setSearchQuery(''); }}
            className="btn btn-teal text-xs py-1.5 px-4 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(sub => {
            const featuresList = ((sub.features || sub.topics) && (sub.features || sub.topics).length > 0)
              ? (sub.features || sub.topics).slice(0, 2)
              : ["15-Year Topical Past Papers", "Examiner Keyword Rubrics"];

            return (
              <div
                key={sub.id}
                className="subject-premium-box bg-white flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon + Badges */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="subject-icon-box shrink-0">
                      {getSubjectIcon(sub)}
                    </div>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {sub.boards?.map((b, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            b.includes('O-Level') || b.includes('O Level') || b.includes('IGCSE')
                              ? 'badge-tag-olevel'
                              : b.includes('Edexcel')
                              ? 'badge-tag-edexcel'
                              : 'badge-tag-alevel'
                          }`}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title & Code */}
                  <div className="mb-2.5">
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A] font-heading tracking-tight">
                      {sub.title}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500 font-medium block mt-0.5">
                      {sub.codes?.join(' • ') || ''}
                    </span>
                  </div>

                  {/* Concept Focus Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {sub.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-5">
                    {featuresList.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="pt-3 border-t border-slate-100 mt-auto">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> {sub.duration || '6 - 9 Months'}
                    </span>
                    <span className="flex items-center gap-1 text-[#059669] font-semibold">
                      <Award className="w-3 h-3 text-[#059669]" /> {sub.tutors || 'Certified Faculty'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openSyllabusModal(sub)}
                      className="btn-secondary-academic py-2 text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Details</span>
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      onClick={() => openBookingModal({ subject: `${sub.title} (${sub.codes?.[0] || ''})` })}
                      className="btn-teal-academic py-2 text-xs flex items-center justify-center gap-1 text-white font-bold cursor-pointer"
                    >
                      <span>Free Trial</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Inquiries Banner */}
      <div className="mt-16 card-base p-8 bg-[#ECFDF5] border-[#A7F3D0] flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">Looking for a subject not listed here?</h3>
          <p className="text-xs text-slate-600">We offer specialized 1-on-1 coaching for regional Cambridge options, Edexcel IAL units, and accelerated retakes.</p>
        </div>
        <button
          onClick={() => openBookingModal()}
          className="btn btn-teal text-xs shrink-0 font-bold cursor-pointer"
        >
          <span>Inquire Custom Batch</span>
        </button>
      </div>

    </div>
  );
};
