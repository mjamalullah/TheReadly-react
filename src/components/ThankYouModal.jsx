import React, { useEffect } from 'react';
import { useModal } from '../context/ModalContext';
import { READLY_CONFIG } from '../config/readlyConfig';
import { CheckCircle2, X, Sparkles } from 'lucide-react';

export const ThankYouModal = () => {
  const { thankYouModal, closeThankYouModal } = useModal();

  useEffect(() => {
    if (thankYouModal?.isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeThankYouModal();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [thankYouModal?.isOpen, closeThankYouModal]);

  if (!thankYouModal?.isOpen) return null;

  const defaultWaUrl = thankYouModal.waUrl || `https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hello The Readly Institute, I have submitted an application/inquiry for ${thankYouModal.name || 'Admissions'}.`
  )}`;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
      onClick={closeThankYouModal}
    >
      <div 
        className="relative bg-white text-slate-900 rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-emerald-100 text-center space-y-5 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeThankYouModal}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebratory Icon */}
        <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-25" />
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
          </div>
        </div>

        {/* Badge & Title */}
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#FEF9EE] text-[#936F1E] border border-[#E8D3A7]">
            <Sparkles className="w-3 h-3 text-[#C59B4B]" />
            {thankYouModal.title || 'Form Successfully Submitted'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
            Thank You, {thankYouModal.name || 'Valued Learner'}!
          </h3>
          <p className="text-sm font-semibold text-emerald-800 font-urdu leading-relaxed">
            {thankYouModal.urduMessage || 'ہم سے رابطہ کرنے کا بہت شکریہ۔ آپ کی تفصیلات کامیابی سے موصول ہو گئی ہیں۔'}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto pt-1">
            {thankYouModal.message || 'Your submission has been successfully received by The Readly Institute. Our academic desk will review your profile and contact you shortly.'}
          </p>
        </div>

        {/* Summary Details Box */}
        {((thankYouModal.details && thankYouModal.details.length > 0) || thankYouModal.whatsapp) && (
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 text-xs text-left space-y-2 text-slate-700 max-w-md mx-auto shadow-2xs">
            <div className="flex justify-between border-b border-slate-200/80 pb-2">
              <span className="text-slate-500 font-medium">Applicant Name:</span>
              <span className="font-bold text-slate-900">{thankYouModal.name || 'N/A'}</span>
            </div>
            {thankYouModal.whatsapp && (
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500 font-medium">WhatsApp Contact:</span>
                <span className="font-semibold text-slate-800">{thankYouModal.whatsapp}</span>
              </div>
            )}
            {thankYouModal.details && thankYouModal.details.map((item, idx) => (
              <div key={idx} className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500 font-medium">{item.label}:</span>
                <span className="font-semibold text-emerald-800">{item.value}</span>
              </div>
            ))}
            <div className="flex justify-between pt-1">
              <span className="text-slate-500 font-medium">Status:</span>
              <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Received & Queued for Academic Review
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={defaultWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.942.812 2.796.812 3.179 0 5.767-2.587 5.767-5.766.001-3.187-2.575-5.77-5.767-5.798zm3.364 8.163c-.141.396-.714.731-1.01.769-.283.036-.649.064-1.921-.462-1.397-.579-2.316-1.979-2.385-2.072-.07-.093-.565-.751-.565-1.433 0-.682.358-1.018.485-1.157.128-.139.278-.174.372-.174.093 0 .186.002.267.006.086.005.201-.033.314.24.118.283.402.977.437 1.047.035.07.058.152.012.245-.047.093-.07.151-.139.233-.07.081-.147.18-.21.244-.07.07-.143.146-.062.285.081.139.362.597.777.967.534.476.985.624 1.124.693.139.07.221.058.303-.035.082-.093.349-.408.442-.548.093-.14.186-.117.314-.07.128.047.814.384.954.454.14.07.233.105.267.163.035.058.035.337-.106.733z" />
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.05 22l5.167-1.323A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.167c-1.545 0-3.003-.437-4.247-1.196l-.304-.184-3.134.803.834-3.05-.201-.318A8.127 8.127 0 013.833 12C3.833 7.5 7.5 3.833 12 3.833S20.167 7.5 20.167 12 16.5 20.167 12 20.167z" />
            </svg>
            <span>Message on WhatsApp (Optional)</span>
          </a>
          <button
            type="button"
            onClick={closeThankYouModal}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Theek Hai / Done
          </button>
        </div>
      </div>
    </div>
  );
};
