import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { countriesData } from '../data/countriesData';
import { READLY_CONFIG } from '../config/readlyConfig';
import { GraduationCap, Send, Sparkles, CheckCircle2, ShieldCheck, Globe, Users, Clock, Award } from 'lucide-react';

export const BecomeTutor = () => {
  const { showToast } = useModal();
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
    const fullWhatsApp = formData.whatsapp.startsWith('+')
      ? formData.whatsapp
      : `${formData.country_code} ${formData.whatsapp}`;

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

    showToast(`Application submitted for ${formData.name}! Opening WhatsApp Academic Desk...`, "success");

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Hero Header */}
      <div className="max-w-3xl">
        <span className="section-badge">Faculty Recruitment</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading mt-2">
          Teach With The Readly Institute
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

        {/* Right Column: Application Form */}
        <div className="lg:col-span-7">
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
                        {popularCountries.map(c => (
                          <option key={c.name} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                        ))}
                      </optgroup>
                      <optgroup label="🌍 All Countries (A - Z)">
                        {otherCountries.map(c => (
                          <option key={c.name} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                        ))}
                      </optgroup>
                    </select>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="333 1234567"
                      className="w-full bg-transparent px-3 py-2 text-slate-800 text-xs focus:outline-none"
                    />
                  </div>
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
        </div>

      </div>

    </div>
  );
};
