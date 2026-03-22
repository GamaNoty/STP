import React, { useState, useEffect } from 'react';
import { FormModalTemplate } from './FormModalTemplate';

interface EditData {
  time: string;
  room: string;
  teacher: string;
  description: string;
}

interface TestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: EditData;
  onSave: (data: EditData) => void;
}

export const TestDetailModal: React.FC<TestDetailModalProps> = ({ 
  isOpen, onClose, initialData, onSave 
}) => {
  const [editData, setEditData] = useState<EditData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setEditData(initialData);
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      onSave(editData);
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
      title="Doplňující informace"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      submitText="Uložit detaily"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-brand-textMuted uppercase">Čas</label>
          <input 
            type="text" value={editData.time} onChange={e => setEditData({...editData, time: e.target.value})} 
            className="bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50" 
            placeholder="08:00" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-brand-textMuted uppercase">Místnost</label>
          <input 
            type="text" value={editData.room} onChange={e => setEditData({...editData, room: e.target.value})} 
            className="bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50" 
            placeholder="Učebna 302" 
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-brand-textMuted uppercase">Zkoušející (Učitel)</label>
        <input 
          type="text" value={editData.teacher} onChange={e => setEditData({...editData, teacher: e.target.value})} 
          className="bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50" 
          placeholder="Mgr. Novák" 
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-brand-textMuted uppercase">Popis / Poznámka</label>
        <textarea 
          value={editData.description} onChange={e => setEditData({...editData, description: e.target.value})} 
          className="bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50 min-h-[100px] resize-none" 
          placeholder="Co se bude dít..."
        />
      </div>
    </FormModalTemplate>
  );
};