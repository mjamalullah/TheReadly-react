import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { countriesData } from '../data/countriesData';
import { READLY_CONFIG } from '../config/readlyConfig';
import { PhoneCall, Mail, Clock, Send, Sparkles, MapPin } from 'lucide-react';

export const Contact = () => {
  const { showToast } = useModal();
  const [formData, setFormData] = useState({
    inquiry_type: 'Admission Inquiry',
    student_name: '',
    parent_name: '',
    country_code: '+92',
    whatsapp_phone: '',
    email: '',
    program: 'Cambridge O-Level',
    subject: 'Urdu - First Language (3247)',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const popularCountries = countriesData.filter(c => c.popular);
  const otherCountries = countriesData.filter(c => !c.popular);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.student_name.trim() || !formData.whatsapp_phone.trim()) {
      showToast("Please provide your Name and WhatsApp number.", "error");
      return;
    }

    setIsSubmitting(true);
    const fullWhatsApp = formData.whatsapp_phone.startsWith('+')
      ? formData.whatsapp_phone
      : `${formData.country_code} ${formData.whatsapp_phone}`;

    const targetEmail = formData.inquiry_type === 'Admission Inquiry'
      ? READLY_CONFIG.admissionsEmail
      : READLY_CONFIG.generalEmail;

    const payload = {
      form_type: `Contact - ${formData.inquiry_type}`,
      target_email: targetEmail,
      student_name: formData.student_name.trim(),
      parent_name: formData.parent_name.trim() || 'N/A',
      whatsapp: fullWhatsApp,
      email: formData.email.trim() || 'N/A',
      program: formData.program,
      subject: formData.subject,
      message: formData.message.trim() || 'General Inquiry',
      page: "Contact Page"
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
      "Hello Team Readly,",
      "",
      `I am reaching out regarding ${formData.inquiry_type === 'Admission Inquiry' ? 'admissions & enrollment' : 'general inquiries'} at The Readly Institute. Details:`,
      "",
      `• Department: ${formData.inquiry_type === 'Admission Inquiry' ? `Admissions (${READLY_CONFIG.admissionsEmail})` : `General Support (${READLY_CONFIG.generalEmail})`}`,
      `• Full Name: ${formData.student_name.trim()}`,
      formData.parent_name.trim() ? `• Parent / Guardian: ${formData.parent_name.trim()}` : null,
      `• WhatsApp: ${fullWhatsApp}`,
      formData.email.trim() ? `• Email: ${formData.email.trim()}` : null,
      `• Program of Interest: ${formData.program}`,
      `• Primary Subject: ${formData.subject}`,
      formData.message.trim() ? `• Message: ${formData.message.trim()}` : null,
      "",
      "Please connect with me with further details. Thank you!"
    ].filter(Boolean);

    const waUrl = `https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent(waLines.join('\n'))}`;

    showToast(`Inquiry received for ${formData.student_name}! Opening WhatsApp...`, "success");

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Hero */}
      <div className="max-w-3xl">
        <span className="section-badge">Direct Communication</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading mt-2">
          Contact Admissions & Academic Counseling
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Have questions regarding syllabus pathways, mentor availability, fee structures, or May/June vs. Oct/Nov series registration? Our academic team replies promptly.
        </p>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* Left Col: Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card-base p-6 bg-white border-slate-200 space-y-5">
            <h3 className="text-base font-bold text-slate-900 font-heading">Admissions Desk Direct</h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-600 font-semibold block text-[11px]">WhatsApp & Phone</span>
                  <a
                    href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi The Readly Institute, I want to inquire about admissions.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-900 font-bold hover:text-[#059669] text-sm"
                  >
                    {READLY_CONFIG.phoneDisplay}
                  </a>
                  <p className="text-[11px] text-slate-600">Direct academic coordinator response</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#059669] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-slate-600 font-semibold block text-[11px]">Admissions Desk:</span>
                    <a href={`mailto:${READLY_CONFIG.admissionsEmail}`} className="text-slate-900 font-bold hover:text-[#059669] text-xs">
                      {READLY_CONFIG.admissionsEmail}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-600 font-semibold block text-[11px]">General Inquiries:</span>
                    <a href={`mailto:${READLY_CONFIG.generalEmail}`} className="text-slate-900 font-bold hover:text-[#059669] text-xs">
                      {READLY_CONFIG.generalEmail}
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-600">Replies within 1 business hour</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-600 font-semibold block text-[11px]">Class Operational Hours</span>
                  <span className="text-slate-900 font-bold">Monday – Saturday</span>
                  <p className="text-[11px] text-slate-600">9:00 AM – 10:00 PM (PKT / UTC+5)</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <a
                href={`https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hi The Readly Institute, I want to inquire about admissions.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full text-xs justify-center"
              >
                <span>Message Instantly on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="card-base p-6 bg-[#ECFDF5] border-[#A7F3D0] space-y-2">
            <h4 className="text-xs font-bold text-[#0B4635] uppercase tracking-wider">Free Syllabus Diagnostic</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Uncertain whether your student should sit the May/June or Oct/Nov series? Request a complimentary diagnostic paper evaluated by our subject mentors.
            </p>
          </div>
        </div>

        {/* Right Col: Form */}
        <div className="lg:col-span-7">
          <div className="card-base p-8 bg-white border-slate-200 shadow-md">
            <h3 className="text-xl font-bold text-slate-900 font-heading mb-1">Send an Inquiry</h3>
            <p className="text-xs text-slate-600 mb-6">Fill in your requirements and our academic counseling team will get back to you promptly.</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Inquiry Type *</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, inquiry_type: 'Admission Inquiry' })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      formData.inquiry_type === 'Admission Inquiry'
                        ? 'border-[#059669] bg-emerald-50 text-[#0B4635] shadow-xs ring-1 ring-[#059669]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs">
                      🎓 Admissions Desk
                    </div>
                    <div className="text-[11px] text-slate-500 font-normal mt-0.5 truncate">
                      {READLY_CONFIG.admissionsEmail}
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, inquiry_type: 'General Inquiry' })}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      formData.inquiry_type === 'General Inquiry'
                        ? 'border-[#059669] bg-emerald-50 text-[#0B4635] shadow-xs ring-1 ring-[#059669]'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs">
                      💬 General Inquiries
                    </div>
                    <div className="text-[11px] text-slate-500 font-normal mt-0.5 truncate">
                      {READLY_CONFIG.generalEmail}
                    </div>
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                    placeholder="e.g. Sara Ahmed"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Parent / Guardian Name</label>
                  <input
                    type="text"
                    value={formData.parent_name}
                    onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
                    placeholder="e.g. Ahmed Bilal"
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
                      value={formData.whatsapp_phone}
                      onChange={(e) => setFormData({ ...formData, whatsapp_phone: e.target.value })}
                      placeholder="333 7221552"
                      className="w-full bg-transparent px-3 py-2 text-slate-800 text-xs focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Program of Interest</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                  >
                    <option>Cambridge O-Level</option>
                    <option>Cambridge IGCSE</option>
                    <option>Cambridge A-Level</option>
                    <option>Pearson Edexcel</option>
                    <option>IT & Professional Certifications</option>
                    <option>Revision Crash Course</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Subject Focus *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Mathematics, Urdu, Physics"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Inquiry / Learning Goals</label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the student's current grade, target series, or specific areas needing help..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#059669]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-teal w-full text-xs font-bold py-3 justify-center shadow-md"
                >
                  {isSubmitting ? "Sending & Opening WhatsApp..." : "Send Inquiry & Open WhatsApp"}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
};
