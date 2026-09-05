import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { countriesData } from '../data/countriesData';
import { READLY_CONFIG } from '../config/readlyConfig';
import {
  Briefcase,
  GraduationCap,
  Users,
  Megaphone,
  Headphones,
  CheckCircle2,
  Sparkles,
  Send,
  ArrowRight,
  ShieldCheck,
  Building,
  HeartHandshake
} from 'lucide-react';

const departments = [
  {
    id: "faculty",
    title: "Academic Faculty & Tutors",
    icon: GraduationCap,
    desc: "Cambridge O-Level, IGCSE & A-Level subject specialists in Mathematics, Sciences, Business & Languages.",
    badge: "Teaching"
  },
  {
    id: "admin",
    title: "Academic Administration & Coordination",
    icon: Users,
    desc: "Timetable scheduling, batch tracking, student attendance, parent coordination, and operational excellence.",
    badge: "Operations"
  },
  {
    id: "marketing",
    title: "Digital Marketing & Growth",
    icon: Megaphone,
    desc: "Performance marketing, social media content, student acquisition, community building, and campaign strategy.",
    badge: "Growth"
  },
  {
    id: "support",
    title: "General & IT Support Staff",
    icon: Headphones,
    desc: "Admissions counseling, technical classroom support, LMS administration, and customer relationship care.",
    badge: "Support"
  }
];

export const JoinOurTeam = () => {
  const { showToast } = useModal();
  const [selectedDept, setSelectedDept] = useState("faculty");

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country_code: '+92',
    whatsapp_phone: '',
    city_country: '',
    department: 'Academic Faculty & Tutors',
    role_title: 'Cambridge O/A-Level Tutor',
    highest_degree: "Master's Degree (M.Phil / MS / M.Sc)",
    experience: '3–5 Years',
    skills: '',
    portfolio_link: '',
    availability: 'Part-Time (10–20 Hours/Week)',
    bio: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const popularCountries = countriesData.filter(c => c.popular);
  const otherCountries = countriesData.filter(c => !c.popular);

  const handleDeptSelect = (deptId, deptTitle) => {
    setSelectedDept(deptId);
    let defaultRole = 'Staff Specialist';
    if (deptId === 'faculty') defaultRole = 'Cambridge O/A-Level Tutor';
    else if (deptId === 'admin') defaultRole = 'Academic Program Coordinator';
    else if (deptId === 'marketing') defaultRole = 'Digital Marketing & Content Lead';
    else if (deptId === 'support') defaultRole = 'Admissions & Student Counselor';

    setFormData(prev => ({
      ...prev,
      department: deptTitle,
      role_title: defaultRole
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.whatsapp_phone.trim()) {
      showToast("Please provide your full name and WhatsApp phone number.", "error");
      return;
    }

    setIsSubmitting(true);
    const rawPhone = (formData.whatsapp_phone || '').trim();
    const cleanPhone = rawPhone.replace(/^0+/, '');
    const fullWhatsApp = rawPhone.startsWith('+')
      ? rawPhone
      : `${formData.country_code} ${cleanPhone}`;

    const isTeacher = formData.department.toLowerCase().includes("faculty") || 
                      formData.department.toLowerCase().includes("tutor");

    const payload = {
      formType: isTeacher ? "teacher" : "team",
      form_type: `Career Application - ${formData.department}`,
      target_tab: isTeacher ? "Become a Teacher" : "Team & Careers",
      name: formData.name.trim(),
      applicant_name: formData.name.trim(),
      email: formData.email.trim() || 'N/A',
      whatsapp: fullWhatsApp,
      location: formData.city_country.trim() || 'N/A',
      city_country: formData.city_country.trim() || 'N/A',
      department: formData.department,
      role: formData.role_title,
      highest_qualification: formData.highest_degree,
      qualification: formData.highest_degree,
      experience: formData.experience,
      skills: formData.skills.trim() || 'N/A',
      subjects: formData.skills.trim() || 'N/A',
      cv_portfolio_url: formData.portfolio_link.trim() || 'N/A',
      portfolio_link: formData.portfolio_link.trim() || 'N/A',
      weekly_availability: formData.availability,
      availability: formData.availability,
      statement_bio: formData.bio.trim() || 'N/A',
      bio: formData.bio.trim() || 'N/A',
      message: formData.bio.trim() || 'N/A',
      page: "Join Our Team (Careers)"
    };

    if (READLY_CONFIG.enableGoogleSheetLogging && READLY_CONFIG.googleSheetWebAppUrl) {
      try {
        await fetch(READLY_CONFIG.googleSheetWebAppUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Google Sheet log notice:', err);
      }
    }

    // Save submission record for confirmation card
    setSubmittedData({
      name: formData.name.trim(),
      department: formData.department,
      role: formData.role_title,
      whatsapp: fullWhatsApp,
      email: formData.email.trim()
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    showToast("Application submitted successfully! Our HR team will review your profile.", "success");
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setFormData({
      name: '',
      email: '',
      country_code: '+92',
      whatsapp_phone: '',
      city_country: '',
      department: 'Academic Faculty & Tutors',
      role_title: 'Cambridge O/A-Level Tutor',
      highest_degree: "Master's Degree (M.Phil / MS / M.Sc)",
      experience: '3–5 Years',
      skills: '',
      portfolio_link: '',
      availability: 'Part-Time (10–20 Hours/Week)',
      bio: ''
    });
  };

  const waHRText = submittedData
    ? `Hello The Readly Institute HR & Careers,\n\nI have submitted my application for the role of ${submittedData.role} (${submittedData.department}).\n\n• Applicant Name: ${submittedData.name}\n• Contact: ${submittedData.whatsapp}\n\nLooking forward to hearing from you!`
    : `Hello The Readly Institute HR & Careers, I am interested in career opportunities.`;

  const waHRUrl = `https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent(waHRText)}`;

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="section-badge inline-flex items-center gap-1.5">
          <Briefcase className="w-3.5 h-3.5 text-[#059669]" /> Careers & Talent Acquisition
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading">
          Join Our Team at The Readly Institute
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          We are building a world-class online academic institute. Whether you are an expert Cambridge educator, an administrative coordinator, a growth marketer, or student counselor, we offer a collaborative, rewarding environment.
        </p>
      </div>

      {/* Department Selection Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {departments.map((dept) => {
          const Icon = dept.icon;
          const isSelected = selectedDept === dept.id;
          return (
            <button
              key={dept.id}
              type="button"
              onClick={() => handleDeptSelect(dept.id, dept.title)}
              className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#059669] bg-[#ECFDF5]/60 shadow-md ring-2 ring-[#059669]'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isSelected ? 'bg-[#059669] text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-[#059669] text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {dept.badge}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{dept.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{dept.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Main Application Area */}
      <div className="max-w-4xl mx-auto">
        {isSubmitted && submittedData ? (
          /* Thank You / Success Card (No Auto-Redirect) */
          <div className="bg-white border-2 border-emerald-500 rounded-3xl p-8 sm:p-12 shadow-xl text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                Application Successfully Logged
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Thank You, {submittedData.name}!
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                Your application for <strong className="text-slate-900">{submittedData.role}</strong> in the <strong className="text-slate-900">{submittedData.department}</strong> department has been recorded in our talent management database.
              </p>
            </div>

            {/* Application Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 text-left max-w-lg mx-auto space-y-2 text-xs sm:text-sm text-slate-700">
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold text-slate-900">{submittedData.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500">Department:</span>
                <span className="font-semibold text-emerald-700">{submittedData.department}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-medium text-slate-800">{submittedData.whatsapp}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500">Review Timeline:</span>
                <span className="font-semibold text-slate-900">2–3 Business Days</span>
              </div>
            </div>

            {/* Standalone Actions (No auto-redirect) */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={waHRUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.942.812 2.796.812 3.179 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.767-5.798zm3.364 8.163c-.141.396-.714.731-1.01.769-.283.036-.649.064-1.921-.462-1.397-.579-2.316-1.979-2.385-2.072-.07-.093-.565-.751-.565-1.433 0-.682.358-1.018.485-1.157.128-.139.278-.174.372-.174.093 0 .186.002.267.006.086.005.201-.033.314.24.118.283.402.977.437 1.047.035.07.058.152.012.245-.047.093-.07.151-.139.233-.07.081-.147.18-.21.244-.07.07-.143.146-.062.285.081.139.362.597.777.967.534.476.985.624 1.124.693.139.07.221.058.303-.035.082-.093.349-.408.442-.548.093-.14.186-.117.314-.07.128.047.814.384.954.454.14.07.233.105.267.163.035.058.035.337-.106.733z" />
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.05 22l5.167-1.323A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.545 0-3.003-.437-4.247-1.196l-.304-.184-3.134.803.834-3.05-.201-.318A8.127 8.127 0 013.833 12C3.833 7.5 7.5 3.833 12 3.833S20.167 7.5 20.167 12 16.5 20.167 12 20.167z" />
                </svg>
                <span>Chat with HR on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleResetForm}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#0B4635] to-[#063326] p-6 sm:p-8 text-white">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" /> Selected Department
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading">{formData.department}</h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1">
                Please complete the credentials below. All submissions are treated with strict confidentiality.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
              
              {/* Row 1: Name & Role Title */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Salman Tariq / Ayesha Malik"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Specific Position / Title Desired *
                  </label>
                  <input
                    type="text"
                    required
                    name="role_title"
                    value={formData.role_title}
                    onChange={handleChange}
                    placeholder="e.g. O-Level Math Tutor / Social Media Specialist"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-slate-800"
                  />
                </div>
              </div>

              {/* Row 2: WhatsApp & Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    WhatsApp Contact Number *
                  </label>
                  <div className="flex rounded-xl border border-slate-300 focus-within:ring-2 focus-within:ring-[#059669] focus-within:border-transparent overflow-hidden">
                    <select
                      value={formData.country_code}
                      onChange={(e) => setFormData({ ...formData, country_code: e.target.value })}
                      className="bg-slate-50 border-r border-slate-200 px-2.5 py-2.5 text-slate-700 text-xs font-semibold focus:outline-none max-w-[130px] sm:max-w-[150px] truncate"
                    >
                      <optgroup label="⭐ Popular">
                        {popularCountries.map((c, idx) => (
                          <option key={`pop-${c.name}-${idx}`} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                        ))}
                      </optgroup>
                      <optgroup label="🌍 All Countries">
                        {otherCountries.map((c, idx) => (
                          <option key={`all-${c.name}-${idx}`} value={c.code}>{c.flag} {c.name} ({c.code})</option>
                        ))}
                      </optgroup>
                    </select>
                    <input
                      type="tel"
                      required
                      name="whatsapp_phone"
                      value={formData.whatsapp_phone}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/[^0-9+\s-]/g, '');
                        setFormData(prev => ({ ...prev, whatsapp_phone: clean }));
                      }}
                      placeholder="300 1234567"
                      className="w-full px-3.5 py-2.5 text-slate-800 focus:outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">e.g. 300 1234567 (without leading zero)</p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-slate-800"
                  />
                </div>
              </div>

              {/* Row 3: Location & Qualifications */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    City & Country of Residence
                  </label>
                  <input
                    type="text"
                    name="city_country"
                    value={formData.city_country}
                    onChange={handleChange}
                    placeholder="e.g. Lahore, Pakistan / Dubai, UAE"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Highest Educational Qualification
                  </label>
                  <select
                    name="highest_degree"
                    value={formData.highest_degree}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-slate-800 bg-white"
                  >
                    <option>Ph.D. / Doctorate</option>
                    <option>Master's Degree (M.Phil / MS / M.Sc)</option>
                    <option>Bachelor's Degree (BS / B.Sc / BBA)</option>
                    <option>CA / ACCA / CFA</option>
                    <option>Professional Diploma / Certification</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Experience & Availability */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Total Relevant Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-slate-800 bg-white"
                  >
                    <option>Less than 1 Year (Entry Level / Trainee)</option>
                    <option>1–2 Years</option>
                    <option>3–5 Years</option>
                    <option>5–10 Years</option>
                    <option>10+ Years (Senior Lead / Faculty Head)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Work Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-slate-800 bg-white"
                  >
                    <option>Part-Time (10–20 Hours/Week)</option>
                    <option>Full-Time Dedicated (35–40 Hours/Week)</option>
                    <option>Evenings & Weekends Only</option>
                    <option>Project / Consultation Basis</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Skills / Subjects */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Primary Skills / Subjects to Teach / Tools *
                </label>
                <input
                  type="text"
                  required
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder={
                    selectedDept === 'faculty'
                      ? "e.g. Cambridge A-Level Math (9709), O-Level Physics (5054)"
                      : selectedDept === 'marketing'
                      ? "e.g. Meta Ads, Google Analytics, Canva, Video Editing, Copywriting"
                      : "e.g. Google Sheets, Timetable Management, Student CRM, LMS Support"
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-slate-800"
                />
              </div>

              {/* Row 6: CV / Portfolio Link */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Resume / CV / Portfolio / LinkedIn Link
                </label>
                <input
                  type="url"
                  name="portfolio_link"
                  value={formData.portfolio_link}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/... or https://linkedin.com/in/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-slate-800"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Please ensure your Google Drive link has view permissions set to \"Anyone with the link\".
                </span>
              </div>

              {/* Row 7: Bio / Note */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Professional Summary / Why do you want to join The Readly Institute?
                </label>
                <textarea
                  rows="3"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about key distinctions, accomplishments, or teaching pedagogy..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#059669] focus:border-transparent text-slate-800"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-teal w-full py-3.5 text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Processing Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-slate-500 text-center mt-2.5">
                  Submitting will record your credentials. You will not be redirected automatically.
                </p>
              </div>

            </form>
          </div>
        )}
      </div>

      {/* Culture & Perks Section */}
      <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto pt-6">
        <div className="card-base p-6 text-center space-y-2 border border-slate-200">
          <div className="w-12 h-12 bg-emerald-50 text-[#059669] rounded-2xl flex items-center justify-center mx-auto">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Empowering Work Culture</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Collaborate with passionate educators and innovators dedicated to transforming academic learning.
          </p>
        </div>

        <div className="card-base p-6 text-center space-y-2 border border-slate-200">
          <div className="w-12 h-12 bg-emerald-50 text-[#059669] rounded-2xl flex items-center justify-center mx-auto">
            <Building className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Flexible & Remote Options</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Teach or manage operations from anywhere with modern digital classroom infrastructure.
          </p>
        </div>

        <div className="card-base p-6 text-center space-y-2 border border-slate-200">
          <div className="w-12 h-12 bg-emerald-50 text-[#059669] rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Competitive Remuneration</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Attractive compensation packages, timely settlements, and performance bonuses for outstanding results.
          </p>
        </div>
      </div>

    </div>
  );
};
