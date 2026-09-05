import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { countriesData } from '../data/countriesData';
import { READLY_CONFIG } from '../config/readlyConfig';
import { PhoneCall, Mail, Clock, Send, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const Contact = () => {
  const { showToast, openThankYouModal } = useModal();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
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
    const rawPhone = (formData.whatsapp_phone || '').trim();
    const cleanPhone = rawPhone.replace(/^0+/, '');
    const fullWhatsApp = rawPhone.startsWith('+')
      ? rawPhone
      : `${formData.country_code} ${cleanPhone}`;

    const targetEmail = formData.inquiry_type === 'Admission Inquiry'
      ? READLY_CONFIG.admissionsEmail
      : READLY_CONFIG.generalEmail;

    const payload = {
      form_type: `Contact - ${formData.inquiry_type}`,
      target_tab: "Admissions",
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
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
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

    setSubmittedData({
      name: formData.student_name.trim(),
      inquiry_type: formData.inquiry_type,
      program: formData.program,
      subject: formData.subject,
      whatsapp: fullWhatsApp,
      waUrl: waUrl
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    showToast(`Inquiry sent successfully for ${formData.student_name}!`, "success");

    openThankYouModal({
      title: "Inquiry Successfully Received",
      name: formData.student_name.trim(),
      englishSubtitle: "Thank you for contacting us. Your message has been received successfully.",
      message: `Thank you for contacting The Readly Institute regarding ${formData.inquiry_type}. Our academic coordinator will review your request and get in touch with you shortly.`,
      whatsapp: fullWhatsApp,
      details: [
        { label: "Inquiry Type", value: formData.inquiry_type },
        { label: "Subject", value: formData.subject },
        { label: "Program", value: formData.program }
      ],
      waUrl: waUrl
    });
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setFormData({
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
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Hero */}
      <div className="max-w-3xl">
        <span className="section-badge">Direct Communication</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading mt-2">
          Contact Admissions & <span className="text-[#C59B4B]">Academic Counseling</span>
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

        {/* Right Col: Form or Thank You Card */}
        <div className="lg:col-span-7">
          {isSubmitted && submittedData ? (
            <div className="card-base p-8 sm:p-10 bg-white border-2 border-emerald-500 rounded-3xl shadow-xl text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  Inquiry Successfully Received
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Thank You, {submittedData.name}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your <strong className="text-slate-900">{submittedData.inquiry_type}</strong> regarding <strong className="text-slate-900">{submittedData.subject}</strong> has been received by our academic desk.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-left space-y-2 text-slate-700 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Contact Person:</span>
                  <span className="font-bold text-slate-900">{submittedData.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">Inquiry Department:</span>
                  <span className="font-semibold text-emerald-700">{submittedData.inquiry_type}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500">WhatsApp:</span>
                  <span className="font-medium text-slate-800">{submittedData.whatsapp}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Expected Response:</span>
                  <span className="font-semibold text-emerald-700">Within 1 Hour</span>
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
                  <span>Chat with Admissions on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
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
                      value={formData.whatsapp_phone}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/[^0-9+\s-]/g, '');
                        setFormData({ ...formData, whatsapp_phone: clean });
                      }}
                      placeholder="300 1234567"
                      className="w-full bg-transparent px-3 py-2 text-slate-800 text-xs focus:outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">e.g. 300 1234567 (without leading zero)</p>
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
          )}
        </div>

      </div>

    </div>
  );
};
