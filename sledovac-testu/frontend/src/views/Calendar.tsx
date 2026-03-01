import React, { useState } from 'react';
import { Calendar, type CalendarEvent } from '../components/Calendar';

export const CalendarView = () => {
  const [view, setView] = useState<'uceni' | 'testy'>('uceni');

  const learningEvents: CalendarEvent[] = [
    { id: 1, dayNumber: 3, name: 'Czech - Opakování', bgColor: 'bg-[#B5FFE1]', textColor: 'text-[#1A8A5A]' },
    { id: 2, dayNumber: 15, name: 'Math - Rovnice', bgColor: 'bg-[#B5E1FF]', textColor: 'text-[#1A5A8A]' },
  ];

  const testEvents: CalendarEvent[] = [
    { id: 3, dayNumber: 2, name: 'Math - Písemka', bgColor: 'bg-[#FFB5B5]', textColor: 'text-[#8A1A1A]' },
    { id: 4, dayNumber: 16, name: 'Math - Velký test', bgColor: 'bg-[#FFB5B5]', textColor: 'text-[#8A1A1A]' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] w-full max-w-[1600px] overflow-hidden">
      
      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => setView('uceni')}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
            view === 'uceni' 
              ? 'bg-brand-red text-white' 
              : 'bg-brand-card text-brand-textMuted hover:text-white'
          }`}
        >
          Kalendář Učení
        </button>
        <button 
          onClick={() => setView('testy')}
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
            view === 'testy' 
              ? 'bg-brand-red text-white' 
              : 'bg-brand-card text-brand-textMuted hover:text-white'
          }`}
        >
          Kalendář Testů
        </button>
      </div>

      <Calendar events={view === 'uceni' ? learningEvents : testEvents} />

    </div>
  );
};