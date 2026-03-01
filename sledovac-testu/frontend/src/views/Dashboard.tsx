import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Dashboard = () => {
  const upcomingTests = [
    { id: 1, name: 'Detail Testu', subject: 'Předmět', time: 'Za 2 dny' },
    { id: 2, name: 'Detail Testu', subject: 'Předmět', time: 'Za 2 dny' },
    { id: 3, name: 'Detail Testu', subject: 'Předmět', time: 'Za 2 dny' },
    { id: 4, name: 'Detail Testu', subject: 'Předmět', time: 'Za 2 dny' },
  ];

  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
      
      <div className="flex flex-col gap-8">
        
        <div className="relative overflow-hidden rounded-[24px] p-8 min-h-[240px] flex flex-col justify-center bg-gradient-to-br from-[#0B0B19] to-[#13113C] border border-white/5 shadow-2xl">
          <div className="relative z-10">
            <p className="text-brand-textMuted text-sm mb-1 font-medium">Welcome back,</p>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-wide">John Doe</h2>
            <p className="text-brand-textMuted text-sm max-w-[200px] leading-relaxed">
              Glad to see you again!<br/>
              Ask me anything.
            </p>
          </div>
        </div>

        <div className="bg-[#ffffff]/5 backdrop-blur-md rounded-[32px] p-8 w-fit border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <button className="w-10 h-10 rounded-full bg-brand-card flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              <span className="bg-brand-card px-5 py-2 rounded-lg font-bold text-white shadow-md">April</span>
              <span className="bg-brand-card px-5 py-2 rounded-lg font-bold text-brand-red shadow-md">2021</span>
            </div>
            <button className="w-10 h-10 rounded-full bg-brand-card flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-3 mb-4 text-center text-sm font-semibold text-brand-textMuted">
            {weekDays.map(day => <div key={day}>{day}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-3 text-center text-sm font-medium">
            {[29, 30, 31].map(day => (
              <div key={`prev-${day}`} className="w-12 h-12 flex items-center justify-center text-white/20">{day}</div>
            ))}
            {[1, 2, 3, 4, 5, 6].map(day => (
              <div key={day} className="w-12 h-12 flex items-center justify-center bg-brand-card rounded-xl hover:bg-white/10 cursor-pointer transition-colors border border-white/5">{day}</div>
            ))}
            <div className="w-12 h-12 flex items-center justify-center bg-brand-red text-white rounded-xl font-bold shadow-[0_4px_12px_rgba(229,57,53,0.4)] cursor-pointer">7</div>
            
            {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((day, i) => (
              <div key={`next-${i}`} className="w-12 h-12 flex items-center justify-center bg-brand-card rounded-xl hover:bg-white/10 cursor-pointer transition-colors border border-white/5">
                {day === 0 ? '' : day}
              </div>
            ))}
            {[1, 2].map(day => (
              <div key={`future-${day}`} className="w-12 h-12 flex items-center justify-center text-white/20">{day}</div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 font-bold text-sm">
             <div className="flex items-center gap-3">
               <span className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center text-xs shadow-md shadow-brand-red/20">1</span> 
               <span>Učení</span>
             </div>
             <div className="flex items-center gap-3">
               <span className="w-8 h-8 rounded-lg bg-[#13113C] flex items-center justify-center text-xs border border-white/10">1</span> 
               <span>Test</span>
             </div>
             <div className="flex items-center gap-3">
               <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-red to-[#13113C] flex items-center justify-center text-xs shadow-md">1</span> 
               <span>Učení + Test</span>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-[#B0B0B0] rounded-[32px] p-8 text-black h-full min-h-[500px]">
        <h3 className="text-3xl font-extrabold mb-8 tracking-tight">Testy</h3>
        <div className="flex flex-col gap-0">
          {upcomingTests.map((test, index) => (
            <div 
              key={test.id} 
              className={`flex justify-between items-center py-5 ${index !== upcomingTests.length - 1 ? 'border-b border-black/20' : ''}`}
            >
              <span className="font-bold text-lg">{test.name}</span>
              <div className="text-right">
                <div className="font-extrabold">{test.subject}</div>
                <div className="text-sm font-semibold text-black/60">{test.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};