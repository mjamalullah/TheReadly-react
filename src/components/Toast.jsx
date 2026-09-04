import React from 'react';
import { useModal } from '../context/ModalContext';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const Toast = () => {
  const { toast } = useModal();
  if (!toast.visible) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-in">
      <div
        className={`p-4 rounded-xl shadow-2xl border flex items-start gap-3 text-xs font-semibold ${
          isSuccess
            ? 'bg-emerald-900/95 text-white border-emerald-500 shadow-emerald-950/50'
            : 'bg-red-900/95 text-white border-red-500 shadow-red-950/50'
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        )}
        <div className="leading-relaxed">{toast.message}</div>
      </div>
    </div>
  );
};
