import React from 'react';
import { READLY_CONFIG } from '../config/readlyConfig';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloat = () => {
  const waUrl = `https://wa.me/${READLY_CONFIG.whatsappNumber}?text=${encodeURIComponent("Hi The Readly Institute, I would like to inquire about admissions.")}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Direct Admissions WhatsApp Desk"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="text-xs font-bold font-heading hidden sm:inline">Admissions WhatsApp</span>
    </a>
  );
};
