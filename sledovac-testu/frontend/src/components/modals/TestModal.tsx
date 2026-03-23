import React, { useState } from 'react';
import { FormModalTemplate } from './FormModalTemplate';

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const TestModal: React.FC<TestModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_URL}/api/tests`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          name, 
          date, 
          subject_ID: parseInt(subjectId) || 1 ,
          group_ID: groupId ? parseInt(groupId) : null
        })
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.errors && data.errors.length > 0) {
           throw new Error(`${data.errors[0].path}: ${data.errors[0].message}`);
        }
        throw new Error(data.message || 'Nepodařilo se vytvořit test.');
      }

      setName('');
      setDate('');
      setSubjectId('');
      setGroupId('');

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
      title="Nový test"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      submitText="Vytvořit test"
    >
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-brand-textMuted uppercase">Název testu</label>
        <input 
          type="text" required value={name} onChange={(e) => setName(e.target.value)}
          className="bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50"
          placeholder="Např. Fyzika - Optika"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-brand-textMuted uppercase">Datum konání</label>
        <input 
          type="date" required value={date} onChange={(e) => setDate(e.target.value)}
          className="bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50"
          style={{ colorScheme: 'dark' }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-brand-textMuted uppercase">ID Předmětu</label>
        <input 
          type="number" required value={subjectId} onChange={(e) => setSubjectId(e.target.value)}
          className="bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50"
          placeholder="Např. 1"
          min="1"
        />
      </div>
    </FormModalTemplate>
  );
};