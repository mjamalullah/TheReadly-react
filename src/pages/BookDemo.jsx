import React, { useState } from 'react';
import { useModal } from '../context/ModalContext';
import { countriesData } from '../data/countriesData';
import { READLY_CONFIG } from '../config/readlyConfig';
import { Sparkles, Send, CheckCircle2, ShieldCheck, Clock, Users } from 'lucide-react';

export const BookDemo = () => {
  const { showToast, openThankYouModal } = useModal();
  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    country_code: '+92',
    whatsapp_phone: '',
    email: '',
    program: 'Cambridge O-Level',
    grade: 'O-2 / Grade 10',
    subject: 'Urdu - First Language (3247)',
    exam_series: 'May / June 2026',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const popularCountries = countriesData.filter(c => c.popular);
  const otherCountries = countriesData.filter(c => !c.popular);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.student_name.trim() || !formData.whatsapp_phone.trim()) {
      showToast("Please enter Student Name and WhatsApp Number.", "error");
      return;
    }

    setIsSubmitting(true);
    const rawPhone = (formData.whatsapp_phone || '').trim();
    const cleanPhone = rawPhone.replace(/^0+/, '');
    const fullWhatsApp = rawPhone.startsWith('+')
      ? rawPhone
      : `${formData.country_code} ${cleanPhone}`;

    const payload = {
      form_type: "Free Trial Demo Booking",
      target_tab: "Admissions",
      student_name: formData.student_name.trim(),
      parent_name: formData.parent_name.trim() || 'N/A',
      whatsapp: fullWhatsApp,
      email: formData.email.trim() || 'N/A',
      program: formData.program,
      grade: formData.grade,
      subject: formData.subject,
      exam_series: formData.exam_series,
      message: formData.message.trim() || 'None',
      page: "Book Demo Page"
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
      "I am interested in admission at The Readly Institute and would like to book a Free Trial Demo Class.",
      "",
      "Here are my details:",
      `• Student Name: ${formData.student_name.trim()}`,
      formData.parent_name.trim() ? `• Parent Name: ${formData.parent_name.trim()}` : null,
      `• WhatsApp: ${fullWhatsApp}`,
      formData.email.trim() ? `• Email: ${formData.email.trim()}` : null,
      `• Program: ${formData.program}`,
      `• Grade / Level: ${formData.grade}`,
      `• Subject for Demo: ${formData.subject}`,
      `• Target Exam Series: ${formData.exam_series}`,
      formData.message.trim() ? `• Notes / Target Topics: ${formData.message.trim()}` : null,
      "",
      "Looking forward to hearing from you. Thank you!"
    ].filter(Boolean);

    const waUrl = `https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent(waLines.join('\n'))}`;

    setSubmittedData({
      name: formData.student_name.trim(),
      parent_name: formData.parent_name.trim(),
      whatsapp: fullWhatsApp,
      email: formData.email.trim(),
      program: formData.program,
      grade: formData.grade,
      subject: formData.subject,
      exam_series: formData.exam_series,
      waUrl: waUrl
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    showToast(`Trial demo booked successfully for ${formData.student_name}!`, "success");

    openThankYouModal({
      title: "Free Trial Demo Registered",
      name: formData.student_name.trim(),
      urduMessage: "ہم سے رابطہ کرنے کا بہت شکریہ۔ آپ کا فری ٹرائل ڈیمو رجسٹر ہو چکا ہے۔",
      message: `Thank you for scheduling a diagnostic demo for ${formData.subject} (${formData.program}). Our admissions desk will assign your faculty mentor and connect with you shortly.`,
      whatsapp: fullWhatsApp,
      details: [
        { label: "Subject", value: formData.subject },
        { label: "Program", value: formData.program },
        { label: "Target Series", value: formData.exam_series }
      ],
      waUrl: waUrl
    });
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setFormData({
      student_name: '',
      parent_name: '',
      country_code: '+92',
      whatsapp_phone: '',
      email: '',
      program: 'Cambridge O-Level',
      grade: 'O-2 / Grade 10',
      subject: 'Urdu - First Language (3247)',
      exam_series: 'May / June 2026',
      message: ''
    });
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      <div className="max-w-3xl">
        <span className="section-badge">100% Free Trial</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B4635] font-heading mt-2">
          Book Your Diagnostic <span className="text-[#C59B4B]">Trial Class</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Experience our high-definition interactive classrooms, review a sample diagnostic paper with a Cambridge specialist, and clarify syllabus targets. Zero upfront fees.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* Left Col: Perks */}
        <div className="lg:col-span-5 space-y-6">
          <div className="card-base p-6 bg-white border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-heading">What Happens in Your Free Trial?</h3>
            
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Prerequisite Audit:</strong> A 20-minute diagnostic check to identify syllabus blind spots.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>1-on-1 Faculty Matching:</strong> Meet the exact subject mentor who will instruct your sessions.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Digital Classroom Test:</strong> Try out our graphics tablet whiteboard and live audio setup.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Custom Target Plan:</strong> Receive a realistic exam timeline for your target series.</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#0B4635] font-bold">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              <span>Zero Risk Guarantee</span>
            </div>
            <p className="text-slate-600">
              No credit card or deposit is collected. You only proceed to fee enrollment if you are 100% satisfied with your trial session.
            </p>
          </div>
        </div>

        {/* Right Col: Form or Thank You Box */}
        <div className="lg:col-span-7">
          {isSubmitted && submittedData ? (
            <div className="card-base p-8 sm:p-10 bg-white border-2 border-emerald-500 rounded-3xl shadow-xl text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                  Trial Demo Registered
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Thank You, {submittedData.name}!
                </h3>
                <p className="text-sm font-semibold text-emerald-800 font-urdu leading-relaxed">
                  ہم سے رابطہ کرنے کا بہت شکریہ۔ آپ کا فری ٹرائل ڈیمو رجسٹر ہو چکا ہے۔
                </p>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your diagnostic demo session for <strong className="text-slate-900">{submittedData.subject}</strong> ({submittedData.program}) has been successfully scheduled. Our admissions coordinator will assign your faculty mentor and connect with you shortly.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-xs text-left space-y-2 text-slate-700 max-w-md mx-auto shadow-2xs">
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500 font-medium">Student Name:</span>
                  <span className="font-bold text-slate-900">{submittedData.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500 font-medium">Subject:</span>
                  <span className="font-semibold text-emerald-700">{submittedData.subject}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-2">
                  <span className="text-slate-500 font-medium">WhatsApp Contact:</span>
                  <span className="font-medium text-slate-800">{submittedData.whatsapp}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500 font-medium">Admissions Status:</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Faculty Assignment In Progress
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={submittedData.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.942.812 2.796.812 3.179 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.767-5.798zm3.364 8.163c-.141.396-.714.731-1.01.769-.283.036-.649.064-1.921-.462-1.397-.579-2.316-1.979-2.385-2.072-.07-.093-.565-.751-.565-1.433 0-.682.358-1.018.485-1.157.128-.139.278-.174.372-.174.093 0 .186.002.267.006.086.005.201-.033.314.24.118.283.402.977.437 1.047.035.07.058.152.012.245-.047.093-.07.151-.139.233-.07.081-.147.18-.21.244-.07.07-.143.146-.062.285.081.139.362.597.777.967.534.476.985.624 1.124.693.139.07.221.058.303-.035.082-.093.349-.408.442-.548.093-.14.186-.117.314-.07.128.047.814.384.954.454.14.07.233.105.267.163.035.058.035.337-.106.733z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.05 22l5.167-1.323A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.545 0-3.003-.437-4.247-1.196l-.304-.184-3.134.803.834-3.05-.201-.318A8.127 8.127 0 013.833 12C3.833 7.5 7.5 3.833 12 3.833S20.167 7.5 20.167 12 16.5 20.167 12 20.167z" />
                  </svg>
                  <span>Chat with Admissions Desk on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Book Another Demo
                </button>
              </div>
            </div>
          ) : (
            <div className="card-base p-8 bg-white border-slate-200 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
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
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp Number *</label>
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
                  <label className="block font-bold text-slate-700 mb-1">Curriculum</label>
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
                  <label className="block font-bold text-slate-700 mb-1">Grade / Level</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                  >
                    <option>O-1 / Grade 9</option>
                    <option>O-2 / Grade 10</option>
                    <option>O-3 / Grade 11</option>
                    <option>AS-Level / Grade 12</option>
                    <option>A2-Level / Grade 13</option>
                    <option>IGCSE Year 10/11</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject for Demo *</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Urdu, Mathematics, Physics"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Series</label>
                  <select
                    value={formData.exam_series}
                    onChange={(e) => setFormData({ ...formData, exam_series: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
                  >
                    <option>May / June 2026</option>
                    <option>Oct / Nov 2026</option>
                    <option>May / June 2027</option>
                    <option>Immediate Foundations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Specific Topics or Notes</label>
                <textarea
                  rows="2"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="e.g. Focus on Pure Maths 1 differential calculus, Urdu essay precis, or past paper reviews..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#059669]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-teal w-full text-xs font-bold py-3 justify-center shadow-md cursor-pointer"
                >
                  {isSubmitting ? "Confirming Free Trial Demo..." : "Confirm Free Trial Demo"}
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
