import React, { useState } from 'react';
import { FormModalTemplate } from './FormModalTemplate';

interface SubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SubjectModal: React.FC<SubjectModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#E53935');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/subjects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, color })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Nepodařilo se vytvořit předmět.');
      }

      setName('');
      setColor('#E53935');
      onSuccess();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      title="Nový předmět"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      submitText="Vytvořit předmět"
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-brand-textMuted uppercase">Název předmětu</label>
        <input 
          type="text" required value={name} onChange={(e) => setName(e.target.value)}
          className="bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50"
          placeholder="Např. Matematika"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-brand-textMuted uppercase">Barva (HEX)</label>
        <div className="flex gap-2">
          <input 
            type="color" value={color} onChange={(e) => setColor(e.target.value)}
            className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0 p-0"
          />
          <input 
            type="text" required value={color} onChange={(e) => setColor(e.target.value)}
            className="flex-1 bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50 uppercase"
            placeholder="#E53935"
          />
        </div>
      </div>
    </FormModalTemplate>
  );
};