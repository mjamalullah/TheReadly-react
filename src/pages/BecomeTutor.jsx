import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { countriesData } from '../data/countriesData';
import { READLY_CONFIG } from '../config/readlyConfig';
import { GraduationCap, Send, Sparkles, CheckCircle2, ShieldCheck, Globe, Users, Clock, Award } from 'lucide-react';

export const BecomeTutor = () => {
  const { showToast, openThankYouModal } = useModal();
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
      page: "Become a Tutor Page"
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

    openThankYouModal({
      title: "Faculty Application Received",
      name: formData.name.trim(),
      urduMessage: "ہم سے رابطہ کرنے کا بہت شکریہ۔ آپ کی فیکلٹی درخواست کامیابی سے موصول ہو گئی ہے۔",
      message: `Thank you for applying to join the academic faculty at The Readly Institute. Your credentials for ${formData.subjects.trim()} (${formData.curriculum}) are under review by our Academic Selection Committee.`,
      whatsapp: fullWhatsApp,
      details: [
        { label: "Teaching Subjects", value: formData.subjects.trim() },
        { label: "Curriculum", value: formData.curriculum },
        { label: "Highest Degree", value: formData.highest_degree },
        { label: "Experience", value: formData.experience }
      ],
      waUrl: waUrl
    });
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setFormData({
      name: '',
      email: '',
      country_code: '+92',
      whatsapp: '',
      whatsapp_phone: '',
      city_country: '',
      highest_degree: "Master's Degree (M.Phil / MS / M.Sc)",
      university: '',
      experience: '3–5 Years',
      curriculum: 'Cambridge O-Level & IGCSE',
      subjects: '',
      availability: '10–20 hours / week (Part-Time)',
      portfolio_link: '',
      bio: ''
    });
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Hero Header */}
      <div className="max-w-3xl">
        <span className="section-badge">Faculty Recruitment</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading mt-2">
          Teach With <span className="text-[#C59B4B]">The Readly Institute</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Join an elite academic faculty dedicated to producing straight Cambridge A* distinctions worldwide. Teach 1-on-1 or structured batches with flexible timings and competitive international compensation.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* Left Column: Why Teach With Readly */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card-base p-6 bg-white border-slate-200 space-y-5">
            <h3 className="text-base font-bold text-slate-900 font-heading">Why Faculty Choose The Readly</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Global Student Base</h4>
                  <p className="text-slate-600">Mentor students from UAE, UK, Saudi Arabia, Qatar, Canada, and Pakistan without geographical constraints.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Merit-Driven High Honorariums</h4>
                  <p className="text-slate-600">Competitive hourly rates and performance bonuses tied to student retention and distinction results.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Flexible Scheduling</h4>
                  <p className="text-slate-600">Choose your teaching hours—evening slots, weekend intensive revision bootcamps, or daytime batches.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Digital Classroom Support</h4>
                  <p className="text-slate-600">Dedicated academic coordinators manage parent communication, attendance tracking, and fee collection for you.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="p-3.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs text-[#0B4635] space-y-1">
                <span className="font-bold block">Admissions & Faculty Direct WhatsApp:</span>
                <a
                  href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi The Readly Institute, I am interested in joining as a tutor.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#059669] hover:underline"
                >
                  {READLY_CONFIG.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Application Form or Thank You Card */}
        <div className="lg:col-span-7">
          {isSubmitted && submittedData ? (
            <div className="card-base p-8 sm:p-10 bg-white border-2 border-emerald-500 rounded-3xl shadow-xl text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  Application Logged Successfully
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Thank You, {submittedData.name}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your credentials for teaching <strong className="text-slate-900">{submittedData.subjects}</strong> ({submittedData.curriculum}) have been registered with our Academic Selection Committee.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-left space-y-2 text-slate-700 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Teacher Name:</span>
                  <span className="font-bold text-slate-900">{submittedData.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Subjects:</span>
                  <span className="font-semibold text-emerald-700">{submittedData.subjects}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">WhatsApp:</span>
                  <span className="font-medium text-slate-800">{submittedData.whatsapp}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Evaluation:</span>
                  <span className="font-semibold text-emerald-700">Under Review (1–2 Business Days)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={submittedData.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.942.812 2.796.812 3.179 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.767-5.798zm3.364 8.163c-.141.396-.714.731-1.01.769-.283.036-.649.064-1.921-.462-1.397-.579-2.316-1.979-2.385-2.072-.07-.093-.565-.751-.565-1.433 0-.682.358-1.018.485-1.157.128-.139.278-.174.372-.174.093 0 .186.002.267.006.086.005.201-.033.314.24.118.283.402.977.437 1.047.035.07.058.152.012.245-.047.093-.07.151-.139.233-.07.081-.147.18-.21.244-.07.07-.143.146-.062.285.081.139.362.597.777.967.534.476.985.624 1.124.693.139.07.221.058.303-.035.082-.093.349-.408.442-.548.093-.14.186-.117.314-.07.128.047.814.384.954.454.14.07.233.105.267.163.035.058.035.337-.106.733z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.05 22l5.167-1.323A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.545 0-3.003-.437-4.247-1.196l-.304-.184-3.134.803.834-3.05-.201-.318A8.127 8.127 0 013.833 12C3.833 7.5 7.5 3.833 12 3.833S20.167 7.5 20.167 12 16.5 20.167 12 20.167z" />
                  </svg>
                  <span>Chat with Academic Desk on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
          <div className="card-base p-8 bg-white border-slate-200 shadow-md">
            <h3 className="text-xl font-bold text-slate-900 font-heading mb-1">Submit Faculty Application</h3>
            <p className="text-xs text-slate-600 mb-6">Complete the credentials form below. Our academic selection committee reviews applications within 48 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Salman Qureshi"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tutor@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp / Phone Number *</label>
                  <div className="flex rounded-lg border border-slate-300 focus-within:border-[#059669] focus-within:ring-1 focus-within:ring-[#059669] bg-white overflow-hidden shadow-xs">
                    <select
                      value={formData.country_code}
                      onChange={(e) => setFormData({ ...formData, country_code: e.target.value })}
                      className="bg-slate-50 border-r border-slate-200 px-2 py-2 text-slate-700 text-xs font-semibold focus:outline-none max-w-[130px] sm:max-w-[155px] truncate"
                    >
                      <optgroup label="⭐ Popular / Quick Select">
                        {popularCountries.map((c, idx) => (
                          <option key={`pop-${c.name}-${idx}`} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                        ))}
                      </optgroup>
                      <optgroup label="🌍 All Countries (A - Z)">
                        {otherCountries.map((c, idx) => (
                          <option key={`all-${c.name}-${idx}`} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                        ))}
                      </optgroup>
                    </select>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/[^0-9+\s-]/g, '');
                        setFormData({ ...formData, whatsapp: clean });
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
                    required
                    value={formData.city_country}
                    onChange={(e) => setFormData({ ...formData, city_country: e.target.value })}
                    placeholder="e.g. Lahore, Pakistan / London, UK"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Highest Academic Degree *</label>
                  <select
                    value={formData.highest_degree}
                    onChange={(e) => setFormData({ ...formData, highest_degree: e.target.value })}
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
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    placeholder="e.g. LUMS, IBA, NUST, Oxford"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Teaching Experience *</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
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
                    value={formData.curriculum}
                    onChange={(e) => setFormData({ ...formData, curriculum: e.target.value })}
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

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Subject(s) to Teach *</label>
                  <input
                    type="text"
                    required
                    value={formData.subjects}
                    onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                    placeholder="e.g. Mathematics, Urdu, Physics, Chemistry"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preferred Availability *</label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                  >
                    <option>Evenings (PKT) & Weekends</option>
                    <option>Flexible / Multiple Timezones (Gulf, UK, PK)</option>
                    <option>Weekends Only (Intensive Bootcamps)</option>
                    <option>Full-Time Online Academic Load</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">CV / LinkedIn / Portfolio URL</label>
                <input
                  type="url"
                  value={formData.portfolio_link}
                  onChange={(e) => setFormData({ ...formData, portfolio_link: e.target.value })}
                  placeholder="https://linkedin.com/in/your-profile or Google Drive link"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Teaching Philosophy & Past Distinctions</label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Briefly share your pedagogy, past Cambridge A* distinction counts, or student transformation stories..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#059669]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-teal w-full text-xs font-bold py-3 justify-center shadow-md hover:shadow-lg transition-all"
                >
                  {isSubmitting ? "Submitting Application & Opening WhatsApp..." : "Submit Faculty Application & Open WhatsApp Desk"}
                </button>
              </div>
            </form>
          </div>
          )}
        </div>

      </div>

    </div>
  );
};
