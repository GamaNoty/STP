import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CalendarEvent {
  id: string | number;
  date: string; // Formát YYYY-MM-DD z backendu
  name: string;
  bgColor: string;
  textColor: string;
}

interface CalendarProps {
  events: CalendarEvent[];
}

export const Calendar: React.FC<CalendarProps> = ({ events }) => {
  // 1. Stav pro aktuálně zobrazený měsíc a rok
  const [viewDate, setViewDate] = useState(new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysOfWeek = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
  const monthNames = [
    "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
    "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
  ];

  // 2. Logika výpočtu dnů
  // První den měsíce (např. středa)
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  // Úprava pro pondělí jako první den (JS má 0 = Neděle)
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  // Počet dní v aktuálním měsíci
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Počet dní v předchozím měsíci (pro zaplnění začátku mřížky)
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDays = [];

  // Výplň z předchozího měsíce
  for (let i = startingDay - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, currentMonth: false, dateStr: null });
  }

  // Dny aktuálního měsíce
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    calendarDays.push({ day: i, currentMonth: true, dateStr });
  }

  // Výplň z příštího měsíce (do 42 políček - 6 řádků)
  const remainingCells = 42 - calendarDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarDays.push({ day: i, currentMonth: false, dateStr: null });
  }

  // Navigace
  const changeMonth = (offset: number) => {
    setViewDate(new Date(year, month + offset, 1));
  };

  return (
    <div className="flex-1 flex flex-col bg-[#1C1C24]/80 backdrop-blur-sm rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
      
      {/* Hlavička s navigací měsíců */}
      <div className="flex items-center justify-between px-6 py-4 bg-brand-bg/40 border-b border-white/5">
        <h3 className="text-xl font-bold text-white">
          {monthNames[month]} <span className="text-brand-textMuted font-medium">{year}</span>
        </h3>
        <div className="flex gap-2">
          <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/5 rounded-lg text-white transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => setViewDate(new Date())} className="px-3 py-1 text-xs font-bold text-brand-red hover:text-white transition-colors">
            Dnes
          </button>
          <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/5 rounded-lg text-white transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Dny v týdnu */}
      <div className="grid grid-cols-7 bg-brand-red text-white text-[11px] font-bold tracking-wider uppercase">
        {daysOfWeek.map(day => (
          <div key={day} className="py-2 text-center border-r border-white/10 last:border-r-0 italic">
            {day}
          </div>
        ))}
      </div>

      {/* Mřížka kalendáře */}
      <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-[#15151C]">
        {calendarDays.map((cell, index) => {
          // Filtrování eventů pro tento konkrétní den
          const dayEvents = events.filter(e => e.date === cell.dateStr);

          return (
            <div 
              key={index} 
              className={`border-r border-b border-white/5 relative p-2 transition-colors hover:bg-white/5 cursor-pointer ${
                !cell.currentMonth ? 'opacity-30' : ''
              } ${index % 7 === 6 ? 'border-r-0' : ''}`}
            >
              <span className={`text-xs font-bold ${
                (index % 7 === 5 || index % 7 === 6) && cell.currentMonth ? 'text-brand-red' : 'text-brand-textMuted'
              }`}>
                {cell.day}
              </span>

              <div className="mt-2 flex flex-col gap-1">
                {dayEvents.map((event) => (
                  <div 
                    key={event.id} 
                    className={`text-[10px] font-bold px-2 py-1 rounded-[4px] truncate shadow-sm ${event.bgColor} ${event.textColor}`}
                  >
                    {event.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};