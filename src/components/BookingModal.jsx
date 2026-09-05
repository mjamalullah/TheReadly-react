import React, { useState, useEffect } from 'react';
import { useModal } from '../context/ModalContext';
import { countriesData } from '../data/countriesData';
import { READLY_CONFIG } from '../config/readlyConfig';
import { X, Sparkles, Send, CheckCircle2 } from 'lucide-react';

const curriculumSubjectsMap = {
  "Cambridge O-Level": [
    "Urdu - First Language (3247)",
    "Urdu - Second Language (3248)",
    "Mathematics - Syllabus D (4024)",
    "Additional Mathematics (4037)",
    "Physics (5054)",
    "Chemistry (5070)",
    "Biology (5090)",
    "Computer Science (2210)",
    "Pakistan Studies (2059)",
    "Islamiyat (2058)",
    "English Language (1123)",
    "Business Studies (7115)",
    "Economics (2281)",
    "Accounting (7707)"
  ],
  "Cambridge IGCSE": [
    "Cambridge IGCSE Urdu (0539)",
    "Cambridge IGCSE Mathematics (0580)",
    "Cambridge IGCSE Physics (0625)",
    "Cambridge IGCSE Chemistry (0620)",
    "Cambridge IGCSE Biology (0610)",
    "Cambridge IGCSE Computer Science (0478)",
    "Cambridge IGCSE English Language (0500)",
    "Cambridge IGCSE Economics (0455)",
    "Cambridge IGCSE Business (0450)"
  ],
  "Cambridge A-Level": [
    "A-Level Mathematics - Pure & Mechanics (9709)",
    "A-Level Further Mathematics (9231)",
    "A-Level Physics (9702)",
    "A-Level Chemistry (9701)",
    "A-Level Biology (9700)",
    "A-Level Computer Science (9618)",
    "A-Level Economics (9708)",
    "A-Level Business (9609)",
    "A-Level Accounting (9706)"
  ],
  "Pearson Edexcel": [
    "Edexcel IGCSE Mathematics A",
    "Edexcel IGCSE Physics",
    "Edexcel IGCSE Chemistry",
    "Edexcel IGCSE Biology",
    "Edexcel International A-Level Pure Maths P1-P4"
  ],
  "IT & Professional Certifications": [
    "Digital Marketing & Performance Strategy (Meta & Google Ads)",
    "CSIS Certification (Cyber Security & Information Systems)",
    "Full-Stack Web Development (HTML, CSS, Modern JS, MERN Stack)",
    "Python for Data Analytics & Artificial Intelligence (AI Tools)"
  ],
  "Revision Crash Course": [
    "O-Level Urdu Intensive Crash Course",
    "O-Level / IGCSE Mathematics 40-Day Mastery",
    "A-Level Pure Mathematics Past Paper Bootcamp",
    "Sciences Alternative to Practical (ATP) Workshop"
  ]
};

const curriculumGradesMap = {
  "Cambridge O-Level": ["O-1 / Grade 9", "O-2 / Grade 10", "O-3 / Grade 11"],
  "Cambridge IGCSE": ["Year 9", "Year 10", "Year 11"],
  "Cambridge A-Level": ["AS-Level / Grade 12", "A2-Level / Grade 13"],
  "Pearson Edexcel": ["IGCSE Year 1", "IGCSE Year 2", "International AS", "International A2"],
  "IT & Professional Certifications": ["Beginner Track (Foundation)", "Intermediate / Professional Track", "Advanced Certification Track"],
  "Revision Crash Course": ["Targeting May/June Series", "Targeting Oct/Nov Series"]
};

export const BookingModal = () => {
  const { bookingModal, closeBookingModal, showToast } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    student_name: '',
    parent_name: '',
    country_code: '+92',
    whatsapp_phone: '',
    email: '',
    program: 'Cambridge O-Level',
    grade: 'O-2 / Grade 10',
    subject: '',
    teacher: 'Assigned Faculty Specialist',
    exam_series: 'May / June 2026',
    message: ''
  });

  useEffect(() => {
    if (bookingModal.isOpen) {
      const selectedProg = bookingModal.curriculum || 'Cambridge O-Level';
      const availableSubs = curriculumSubjectsMap[selectedProg] || curriculumSubjectsMap['Cambridge O-Level'];
      const defaultSub = bookingModal.subject || availableSubs[0];

      setFormData(prev => ({
        ...prev,
        program: selectedProg,
        subject: defaultSub,
        teacher: bookingModal.teacher || 'Assigned Faculty Specialist'
      }));

      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeBookingModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [bookingModal, closeBookingModal]);

  const handleProgramChange = (e) => {
    const newProg = e.target.value;
    const subs = curriculumSubjectsMap[newProg] || [];
    const grades = curriculumGradesMap[newProg] || [];
    setFormData(prev => ({
      ...prev,
      program: newProg,
      subject: subs[0] || '',
      grade: grades[0] || ''
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.student_name.trim() || !formData.whatsapp_phone.trim()) {
      showToast("Please fill in the required fields (Student Name & WhatsApp Number).", "error");
      return;
    }

    setIsSubmitting(true);

    const fullWhatsApp = formData.whatsapp_phone.startsWith('+')
      ? formData.whatsapp_phone
      : `${formData.country_code} ${formData.whatsapp_phone}`;

    const payload = {
      formType: "admission",
      form_type: "Free Trial Demo Booking",
      target_tab: "Admissions",
      student_name: formData.student_name.trim(),
      parent_name: formData.parent_name.trim() || 'N/A',
      whatsapp: fullWhatsApp,
      email: formData.email.trim() || 'N/A',
      program: formData.program,
      grade: formData.grade,
      subject: formData.subject,
      teacher: formData.teacher,
      exam_series: formData.exam_series,
      message: formData.message.trim() || 'None',
      page: "Free Demo Modal"
    };

    // 1. Google Sheets Background Dispatch
    if (READLY_CONFIG.enableGoogleSheetLogging && READLY_CONFIG.googleSheetWebAppUrl) {
      fetch(READLY_CONFIG.googleSheetWebAppUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      }).catch(err => console.warn('Google Sheet background log notice:', err));
    }

    // 2. WhatsApp Dispatch (Polite Student Perspective Greeting)
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
      formData.teacher && formData.teacher !== 'Assigned Faculty Specialist' ? `• Preferred Mentor: ${formData.teacher}` : null,
      `• Target Exam Series: ${formData.exam_series}`,
      formData.message.trim() ? `• Notes / Target Topics: ${formData.message.trim()}` : null,
      "",
      "Looking forward to hearing from you. Thank you!"
    ].filter(Boolean);

    const waText = encodeURIComponent(waLines.join('\n'));
    const waUrl = `https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${waText}`;

    showToast(`Inquiry confirmed for ${formData.student_name}! Opening WhatsApp to connect with admissions...`, "success");
    closeBookingModal();

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(waUrl, '_blank');
    }, 600);
  };

  if (!bookingModal.isOpen) return null;

  const currentSubjects = curriculumSubjectsMap[formData.program] || [];
  const currentGrades = curriculumGradesMap[formData.program] || [];
  const popularCountries = countriesData.filter(c => c.popular);
  const otherCountries = countriesData.filter(c => !c.popular);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeBookingModal();
      }}
    >
      <div className="flex min-h-full items-start sm:items-center justify-center p-3 sm:p-6 text-left">
        <div 
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4 sm:my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#0B4635] text-white p-5 sm:p-7 relative shrink-0">
            <button
              onClick={closeBookingModal}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#ECFDF5] text-[#059669]">
                <Sparkles className="w-3 h-3 text-[#059669]" />
                100% Free Trial Demo
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white pr-8">
              Schedule Your Diagnostic Trial
            </h3>
            <p className="text-xs text-slate-200 mt-1.5 leading-relaxed pr-2">
              Connect 1-on-1 with an experienced mentor, evaluate our digital classroom, and assess syllabus prerequisites with zero obligation.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-4 text-xs">
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
              <input
                type="text"
                name="student_name"
                required
                value={formData.student_name}
                onChange={handleChange}
                placeholder="e.g. Sara Ahmed"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Parent / Guardian Name</label>
              <input
                type="text"
                name="parent_name"
                value={formData.parent_name}
                onChange={handleChange}
                placeholder="e.g. Ahmed Bilal"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>

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
                  name="whatsapp_phone"
                  required
                  value={formData.whatsapp_phone}
                  onChange={handleChange}
                  placeholder="333 7221552"
                  className="w-full bg-transparent px-3 py-2 text-slate-800 text-xs focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@example.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Curriculum Board</label>
              <select
                name="program"
                value={formData.program}
                onChange={handleProgramChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
              >
                <option value="Cambridge O-Level">Cambridge O-Level</option>
                <option value="Cambridge IGCSE">Cambridge IGCSE</option>
                <option value="Cambridge A-Level">Cambridge A-Level</option>
                <option value="Pearson Edexcel">Pearson Edexcel</option>
                <option value="IT & Professional Certifications">IT & Professional Certifications</option>
                <option value="Revision Crash Course">Revision Crash Course</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Grade / Level</label>
              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
              >
                {currentGrades.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Subject for Trial *</label>
              <select
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#059669]"
              >
                {currentSubjects.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Exam Series</label>
              <select
                name="exam_series"
                value={formData.exam_series}
                onChange={handleChange}
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
            <label className="block font-bold text-slate-700 mb-1">Specific Topics or Learning Goals</label>
            <textarea
              name="message"
              rows="2"
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. Need past paper practice on Differential Equations, essay composition drills, or ATP practicals..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-slate-800 focus:outline-none focus:border-[#059669]"
            ></textarea>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-teal w-full text-xs font-bold py-3 justify-center shadow-md hover:shadow-lg transition-all"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Recording & Opening WhatsApp...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <span>Confirm Free Demo & Message Admissions</span>
                  <Send className="w-4 h-4" />
                </span>
              )}
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Automatic Google Sheet record & instant admissions WhatsApp connection.
            </p>
          </div>

        </form>

        </div>
      </div>
    </div>
  );
};
