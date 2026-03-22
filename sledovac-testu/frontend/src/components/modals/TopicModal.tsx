import React, { useState } from 'react';
import { FormModalTemplate } from './FormModalTemplate';

interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (text: string) => void;
}

export const TopicModal: React.FC<TopicModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    onAdd(text);
    setText('');
    onClose();
  };

  return (
    <FormModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      title="Přidat téma k učení"
      onSubmit={handleSubmit}
      isLoading={false}
      error=""
      submitText="Přidat téma"
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-brand-textMuted uppercase">Co se potřebuješ naučit?</label>
        <input 
          type="text" required autoFocus value={text} onChange={(e) => setText(e.target.value)}
          className="bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50"
          placeholder="Např. Kvadratické rovnice..."
        />
      </div>
    </FormModalTemplate>
  );
};