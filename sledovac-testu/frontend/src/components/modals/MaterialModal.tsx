import React, { useState } from 'react';
import { FormModalTemplate } from './FormModalTemplate';

interface MaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, url: string) => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    
    onAdd(name, url);
    setName('');
    setUrl('');
    onClose();
  };

  return (
    <FormModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      title="Přidat studijní materiál"
      onSubmit={handleSubmit}
      isLoading={false}
      error=""
      submitText="Uložit materiál"
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-brand-textMuted uppercase">Název materiálu</label>
        <input 
          type="text" required value={name} onChange={(e) => setName(e.target.value)}
          className="bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50"
          placeholder="Např. Khan Academy video"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-brand-textMuted uppercase">Odkaz (URL)</label>
        <input 
          type="url" required value={url} onChange={(e) => setUrl(e.target.value)}
          className="bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50"
          placeholder="https://..."
        />
      </div>
    </FormModalTemplate>
  );
};