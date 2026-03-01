import React from 'react';

export interface CalendarEvent {
  id: string | number;
  dayNumber: number;
  name: string;
  bgColor: string;
  textColor: string;
}

interface CalendarProps {
  events: CalendarEvent[];
}

export const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const days = Array.from({ length: 35 }, (_, i) => {
    const dayNumber = i - 0; 
    const isCurrentMonth = dayNumber > 0 && dayNumber <= 31;
    const actualDay = isCurrentMonth ? dayNumber : (dayNumber <= 0 ? 31 + dayNumber : dayNumber - 31);
    
    const dayEvents = isCurrentMonth 
      ? events.filter(e => e.dayNumber === actualDay) 
      : [];

    return {
      id: i,
      number: actualDay,
      isCurrentMonth,
      events: dayEvents
    };
  });

  return (
    <div className="flex-1 flex flex-col bg-[#1C1C24]/80 backdrop-blur-sm rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
      
      <div className="grid grid-cols-7 bg-brand-red text-white text-[11px] font-bold tracking-wider uppercase">
        {daysOfWeek.map(day => (
          <div key={day} className="py-2 text-center border-r border-white/10 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 flex-1 auto-rows-fr bg-[#15151C]">
        {days.map((day, index) => (
          <div 
            key={day.id} 
            className={`border-r border-b border-white/5 relative p-2 transition-colors hover:bg-white/5 cursor-pointer ${
              index % 7 === 6 ? 'border-r-0' : '' 
            }`}
          >
            <span className={`text-xs font-bold ${
              !day.isCurrentMonth ? 'text-white/20' : 
              (day.number === 7 || index % 7 === 6) ? 'text-brand-red' : 'text-brand-textMuted'
            }`}>
              {day.number}
            </span>

            <div className="mt-2 flex flex-col gap-1">
              {day.events.map((event) => (
                <div 
                  key={event.id} 
                  className={`text-[10px] font-bold px-2 py-1 rounded-[4px] truncate shadow-sm ${event.bgColor} ${event.textColor}`}
                >
                  {event.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};