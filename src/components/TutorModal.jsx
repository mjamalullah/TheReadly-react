import React, { useState, useEffect } from 'react';
import { useModal } from '../context/ModalContext';
import { countriesData } from '../data/countriesData';
import { READLY_CONFIG } from '../config/readlyConfig';
import { X, Sparkles, Send, GraduationCap, Briefcase, BookOpen, Award, CheckCircle2 } from 'lucide-react';

export const TutorModal = () => {
  const { tutorModal, closeTutorModal, showToast } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country_code: '+92',
    whatsapp: '',
    city_country: '',
    highest_degree: "Master's Degree (MS / MPhil)",
    university: '',
    experience: '4 – 7 Years',
    curriculum: 'Cambridge O-Level & IGCSE',
    subjects: '',
    availability: 'Evenings (PKT) & Weekends',
    portfolio_link: '',
    bio: ''
  });

  useEffect(() => {
    if (tutorModal.isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeTutorModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [tutorModal.isOpen, closeTutorModal]);

  if (!tutorModal.isOpen) return null;

  const popularCountries = countriesData.filter(c => c.popular);
  const otherCountries = countriesData.filter(c => !c.popular);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.whatsapp.trim() || !formData.subjects.trim()) {
      showToast("Please provide your Name, WhatsApp number, and Subjects.", "error");
      return;
    }

    setIsSubmitting(true);
    const fullWhatsApp = formData.whatsapp.startsWith('+')
      ? formData.whatsapp
      : `${formData.country_code} ${formData.whatsapp}`;

    const payload = {
      form_type: "Tutor Faculty Application",
      target_email: READLY_CONFIG.generalEmail || "info@thereadly.com",
      applicant_name: formData.name.trim(),
      email: formData.email.trim() || 'N/A',
      whatsapp: fullWhatsApp,
      location: formData.city_country.trim() || 'N/A',
      highest_qualification: formData.highest_degree,
      university: formData.university.trim() || 'N/A',
      teaching_experience: formData.experience,
      target_curriculum: formData.curriculum,
      subjects: formData.subjects.trim(),
      weekly_availability: formData.availability,
      cv_portfolio_url: formData.portfolio_link.trim() || 'N/A',
      statement_bio: formData.bio.trim() || 'N/A',
      page: "Header Become a Tutor Modal"
    };

    if (READLY_CONFIG.enableGoogleSheetLogging && READLY_CONFIG.googleSheetWebAppUrl) {
      fetch(READLY_CONFIG.googleSheetWebAppUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.warn('Google Sheet log notice:', err));
    }

    const waLines = [
      "Hello Academic Coordinator @ The Readly Institute,",
      "",
      "I would like to apply to join as an Academic Faculty Member / Tutor. Here are my credentials:",
      "",
      `• Full Name: ${formData.name.trim()}`,
      `• WhatsApp Contact: ${fullWhatsApp}`,
      formData.email.trim() ? `• Email: ${formData.email.trim()}` : null,
      formData.city_country.trim() ? `• City / Country: ${formData.city_country.trim()}` : null,
      `• Highest Qualification: ${formData.highest_degree}`,
      formData.university.trim() ? `• University: ${formData.university.trim()}` : null,
      `• Teaching Experience: ${formData.experience}`,
      `• Target Curriculum: ${formData.curriculum}`,
      `• Primary Subject(s): ${formData.subjects.trim()}`,
      `• Availability: ${formData.availability}`,
      formData.portfolio_link.trim() ? `• CV / Profile Link: ${formData.portfolio_link.trim()}` : null,
      formData.bio.trim() ? `• Background / Distinctions: ${formData.bio.trim()}` : null,
      "",
      "Looking forward to connecting with the Academic Selection Committee. Thank you!"
    ].filter(Boolean);

    const waUrl = `https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent(waLines.join('\n'))}`;

    showToast(`Application submitted for ${formData.name}! Opening WhatsApp Academic Desk...`, "success");
    closeTutorModal();

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeTutorModal();
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
              onClick={closeTutorModal}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#059669]">
                <GraduationCap className="w-3.5 h-3.5 text-[#059669]" />
                Faculty Recruitment Guild
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white pr-8">
              Join The Readly Academic Faculty
            </h3>
            <p className="text-xs text-slate-200 mt-1.5 leading-relaxed pr-2">
              Empower Cambridge O-Level, IGCSE & A-Level candidates globally. Teach 1-on-1 or small batches with premium academic compensation & digital classroom support.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-4 text-xs">
            
            {/* Row 1: Name & Email */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Salman Qureshi"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tutor@example.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                />
              </div>
            </div>

            {/* Row 2: WhatsApp & Location */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">WhatsApp Number *</label>
                <div className="flex rounded-lg border border-slate-300 focus-within:border-[#059669] focus-within:ring-1 focus-within:ring-[#059669] bg-white overflow-hidden transition-all shadow-xs">
                  <select
                    name="country_code"
                    value={formData.country_code}
                    onChange={handleChange}
                    className="bg-slate-50 border-r border-slate-200 px-2 py-2 text-slate-700 text-xs font-semibold focus:outline-none shrink-0 cursor-pointer max-w-[130px] sm:max-w-[155px] truncate"
                  >
                    <optgroup label="⭐ Popular / Quick Select">
                      {popularCountries.map(c => (
                        <option key={c.name} value={c.code}>
                          {c.flag} {c.name} ({c.code})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="🌍 All Countries (A - Z)">
                      {otherCountries.map(c => (
                        <option key={c.name} value={c.code}>
                          {c.flag} {c.name} ({c.code})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <input
                    type="tel"
                    name="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="333 1234567"
                    className="w-full bg-transparent px-3 py-2 text-slate-800 text-xs focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Current City & Country *</label>
                <input
                  type="text"
                  name="city_country"
                  required
                  value={formData.city_country}
                  onChange={handleChange}
                  placeholder="e.g. Lahore, Pakistan / London, UK"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                />
              </div>
            </div>

            {/* Row 3: Qualification & University */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Highest Academic Qualification *</label>
                <select
                  name="highest_degree"
                  value={formData.highest_degree}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                >
                  <option>PhD / Doctorate</option>
                  <option>Master's Degree (MS / MPhil)</option>
                  <option>Bachelor's (BS / BSc / BA Honours)</option>
                  <option>Professional (CA / ACCA / CFA / Bar-at-Law)</option>
                  <option>Cambridge Certified Master Educator</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Degree Institution / University</label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  placeholder="e.g. LUMS, IBA, NUST, Oxford"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                />
              </div>
            </div>

            {/* Row 4: Experience & Curriculum Board */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Total Teaching Experience *</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                >
                  <option>1 – 3 Years (Demonstrated Academic Distinction)</option>
                  <option>4 – 7 Years (Established Track Record)</option>
                  <option>8 – 12 Years (Senior Cambridge Specialist)</option>
                  <option>13+ Years (Master Faculty / Paper Examiner)</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Curriculum Expertise *</label>
                <select
                  name="curriculum"
                  value={formData.curriculum}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                >
                  <option>Cambridge O-Level & IGCSE</option>
                  <option>Cambridge International A-Level (AS & A2)</option>
                  <option>Dual Cambridge (O-Level & A-Level)</option>
                  <option>Pearson Edexcel (IGCSE / International A-Level)</option>
                  <option>Professional IT & Digital Skills Track</option>
                </select>
              </div>
            </div>

            {/* Row 5: Subjects & Availability */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Primary Subject(s) to Teach *</label>
                <input
                  type="text"
                  name="subjects"
                  required
                  value={formData.subjects}
                  onChange={handleChange}
                  placeholder="e.g. Mathematics (4024/9709), Urdu (3247/3248), Physics (5054)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Preferred Availability *</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                >
                  <option>Evenings (PKT) & Weekends</option>
                  <option>Flexible / Multiple Timezones (Gulf, UK, PK)</option>
                  <option>Weekends Only (Intensive Bootcamps)</option>
                  <option>Full-Time Online Academic Load</option>
                </select>
              </div>
            </div>

            {/* Row 6: CV / LinkedIn Link */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">CV / LinkedIn / Portfolio URL</label>
              <input
                type="url"
                name="portfolio_link"
                value={formData.portfolio_link}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/your-profile or Google Drive link"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
              />
            </div>

            {/* Row 7: Bio / Past Distinctions */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Teaching Philosophy & Past Distinctions</label>
              <textarea
                name="bio"
                rows="2"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Briefly share your pedagogy, past Cambridge A* distinction counts, or student transformation stories..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#059669]"
              ></textarea>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-teal w-full text-xs font-bold py-3 justify-center shadow-md hover:shadow-lg transition-all"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Submitting Application...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <span>Submit Faculty Application & Open WhatsApp Desk</span>
                    <Send className="w-4 h-4" />
                  </span>
                )}
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                Applications reviewed by Academic Selection Board within 48 hours.
              </p>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
