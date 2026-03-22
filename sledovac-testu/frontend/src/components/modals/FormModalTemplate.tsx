import React from 'react';
import { X, Loader2 } from 'lucide-react';

interface FormModalTemplateProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string;
  submitText: string;
  children: React.ReactNode;
}

export const FormModalTemplate: React.FC<FormModalTemplateProps> = ({
  isOpen, onClose, title, onSubmit, isLoading, error, submitText, children
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#1C1C24] border border-white/10 rounded-3xl w-full max-w-md p-6 relative shadow-2xl animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-brand-textMuted hover:text-white transition-colors"
          type="button"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>

        {error && (
          <div className="mb-6 bg-amber-500/10 border border-amber-500/20 text-amber-400 p-3 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          
          {children}

          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-4 w-full bg-brand-red text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-redHover transition-colors shadow-lg shadow-brand-red/20 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : submitText}
          </button>
        </form>
      </div>
    </div>
  );
};