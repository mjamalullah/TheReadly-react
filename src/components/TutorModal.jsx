import React, { useState, useEffect } from 'react';
import { useModal } from '../context/ModalContext';
import { countriesData } from '../data/countriesData';
import { READLY_CONFIG } from '../config/readlyConfig';
import { X, Sparkles, Send, GraduationCap, Briefcase, BookOpen, Award, CheckCircle2 } from 'lucide-react';

export const TutorModal = () => {
  const { tutorModal, closeTutorModal, showToast } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

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

  const prevIsOpenRef = React.useRef(false);

  useEffect(() => {
    // Only reset form state when modal transitions from closed to open
    if (tutorModal.isOpen && !prevIsOpenRef.current) {
      setIsSubmitted(false);
      setSubmittedData(null);
    }
    prevIsOpenRef.current = tutorModal.isOpen;

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
    const rawPhone = (formData.whatsapp || '').trim();
    const cleanPhone = rawPhone.replace(/^0+/, '');
    const fullWhatsApp = rawPhone.startsWith('+')
      ? rawPhone
      : `${formData.country_code} ${cleanPhone}`;

    const payload = {
      formType: "teacher",
      form_type: "Tutor Faculty Application",
      target_tab: "Become a Teacher",
      target_gid: READLY_CONFIG.tutorSheetGid || "1304058449",
      spreadsheet_id: READLY_CONFIG.spreadsheetId,
      spreadsheet_url: READLY_CONFIG.tutorGoogleSheetUrl,
      target_email: READLY_CONFIG.generalEmail || "info@thereadly.com",
      name: formData.name.trim(),
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
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
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

    setSubmittedData({
      name: formData.name.trim(),
      subjects: formData.subjects.trim(),
      curriculum: formData.curriculum,
      whatsapp: fullWhatsApp,
      waUrl: waUrl
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    showToast(`Faculty application submitted for ${formData.name}!`, "success");
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
          <div className="bg-[#0B4635] text-white p-5 sm:p-7 relative shrink-0 border-b-2 border-[#C59B4B]">
            <button
              onClick={closeTutorModal}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FEF9EE] text-[#936F1E] border border-[#E8D3A7]">
                <GraduationCap className="w-3.5 h-3.5 text-[#C59B4B]" />
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

          {/* Form or Thank You Card */}
          {isSubmitted && submittedData ? (
            <div className="p-6 sm:p-8 text-center space-y-5 animate-fade-in">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <span className="inline-block px-3 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full">
                  Faculty Application Logged
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Thank You, {submittedData.name}!
                </h3>
                <p className="text-sm font-semibold text-emerald-800 leading-relaxed">
                  Thank you for contacting us. Your faculty application has been successfully received.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your application to teach <strong className="text-slate-900">{submittedData.subjects}</strong> ({submittedData.curriculum}) has been registered with our Academic Selection Committee.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-left space-y-1.5 text-slate-700 max-w-sm mx-auto">
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-bold text-slate-900">{submittedData.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500">Subjects:</span>
                  <span className="font-semibold text-emerald-700">{submittedData.subjects}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500">WhatsApp:</span>
                  <span className="font-medium text-slate-800">{submittedData.whatsapp}</span>
                </div>
                <div className="flex justify-between pt-0.5">
                  <span className="text-slate-500">Review Timeline:</span>
                  <span className="font-semibold text-emerald-700">1–2 Business Days</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={submittedData.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.942.812 2.796.812 3.179 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.767-5.798zm3.364 8.163c-.141.396-.714.731-1.01.769-.283.036-.649.064-1.921-.462-1.397-.579-2.316-1.979-2.385-2.072-.07-.093-.565-.751-.565-1.433 0-.682.358-1.018.485-1.157.128-.139.278-.174.372-.174.093 0 .186.002.267.006.086.005.201-.033.314.24.118.283.402.977.437 1.047.035.07.058.152.012.245-.047.093-.07.151-.139.233-.07.081-.147.18-.21.244-.07.07-.143.146-.062.285.081.139.362.597.777.967.534.476.985.624 1.124.693.139.07.221.058.303-.035.082-.093.349-.408.442-.548.093-.14.186-.117.314-.07.128.047.814.384.954.454.14.07.233.105.267.163.035.058.035.337-.106.733z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.05 22l5.167-1.323A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.545 0-3.003-.437-4.247-1.196l-.304-.184-3.134.803.834-3.05-.201-.318A8.127 8.127 0 013.833 12C3.833 7.5 7.5 3.833 12 3.833S20.167 7.5 20.167 12 16.5 20.167 12 20.167z" />
                  </svg>
                  <span>Chat with Academic Desk on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={closeTutorModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
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
                      {popularCountries.map((c, idx) => (
                        <option key={`pop-${c.name}-${idx}`} value={c.code}>
                          {c.flag} {c.name} ({c.code})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="🌍 All Countries (A - Z)">
                      {otherCountries.map((c, idx) => (
                        <option key={`all-${c.name}-${idx}`} value={c.code}>
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
                    onChange={(e) => {
                      const clean = e.target.value.replace(/[^0-9+\s-]/g, '');
                      setFormData(prev => ({ ...prev, whatsapp: clean }));
                    }}
                    placeholder="300 1234567"
                    className="w-full bg-transparent px-3 py-2 text-slate-800 text-xs focus:outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">e.g. 300 1234567 (without leading zero)</p>
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
          )}

        </div>
      </div>
    </div>
  );
};
