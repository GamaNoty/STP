import React, { useState, useEffect } from 'react';
import { FormModalTemplate } from './FormModalTemplate';

interface Subject {
  subject_ID: number;
  name: string;
  color?: string;
}

interface SubjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  subject?: Subject;
}

export const SubjectDetailModal: React.FC<SubjectDetailModalProps> = ({ isOpen, onClose, onSuccess, subject }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#E53935');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // PŘIDÁNO: Když se modal otevře, předvyplníme data
  useEffect(() => {
    if (isOpen) {
      if (subject) {
        setName(subject.name);
        setColor(subject.color || '#E53935');
      } else {
        setName('');
        setColor('#E53935');
      }
      setError('');
    }
  }, [isOpen, subject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      
      // ZMĚNA: Dynamická URL a Metoda podle toho, zda upravujeme nebo tvoříme
      const url = subject 
        ? `${import.meta.env.VITE_URL}/api/subjects/${subject.subject_ID}` 
        : `${import.meta.env.VITE_URL}/api/subjects`;
      
      const method = subject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, color })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Nepodařilo se uložit předmět.');
      }

      onSuccess();
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // PŘIDÁNO: Funkce pro mazání
  const handleDelete = async () => {
    if (!subject) return;
    
    // Klasické potvrzení z prohlížeče
    if (!window.confirm(`Opravdu chceš smazat předmět "${subject.name}"?`)) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_URL}/api/subjects/${subject.subject_ID}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Nepodařilo se smazat předmět.');
      }

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
      title={subject ? "Upravit předmět" : "Nový předmět"}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      submitText={subject ? "Uložit změny" : "Vytvořit předmět"}
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-brand-textMuted uppercase">Název předmětu</label>
        <input 
          type="text" required value={name} onChange={(e) => setName(e.target.value)}
          className="bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50"
          placeholder="Např. Matematika"
        />
      </div>

      <div className="flex flex-col gap-2 mb-2">
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

      {/* Tlačítko pro smazání se ukáže jen při úpravě existujícího předmětu */}
      {subject && (
        <button
          type="button" // MUSÍ být type="button", jinak to odešle formulář
          onClick={handleDelete}
          disabled={isLoading}
          className="w-full py-3 rounded-xl border border-brand-red/30 text-brand-red font-bold hover:bg-brand-red hover:text-white transition-colors mt-2"
        >
          Smazat předmět
        </button>
      )}
    </FormModalTemplate>
  );
};