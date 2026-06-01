import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { monthNames, daysOfWeek } from '../utils/constants';
import { Link } from 'react-router-dom';

interface BackendTest {
  test_ID: number;
  name: string;
  date: string;
  subject_ID: number;
}

export const Dashboard = () => {
  const [tests, setTests] = useState<BackendTest[]>([]);
  const [userName, setUserName] = useState('Student');
  const [isLoading, setIsLoading] = useState(true);
  const [viewDate, setViewDate] = useState(new Date());


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          setUserName(user.name || 'Student');
        }

        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_URL}/api/tests`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setTests(data);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarGrid = [];

  for (let i = startingDay - 1; i >= 0; i--) {
    calendarGrid.push({ day: daysInPrevMonth - i, currentMonth: false, fullDate: null });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    calendarGrid.push({ day: i, currentMonth: true, fullDate: dateStr });
  }

  const remaining = 42 - calendarGrid.length;
  for (let i = 1; i <= remaining; i++) {
    calendarGrid.push({ day: i, currentMonth: false, fullDate: null });
  }

  const getTimeLeft = (testDate: string) => {
    const diff = new Date(testDate).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Dnes';
    if (days === 1) return 'Zítra';
    return days < 0 ? 'Proběhlo' : `Za ${days} dny`;
  };

  if (isLoading) return <div className="flex h-64 items-center justify-center text-brand-red"><Loader2 className="animate-spin" size={48} /></div>;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
      
      <div className="flex flex-col gap-8">
        <div className="relative overflow-hidden rounded-[24px] p-8 min-h-[240px] flex flex-col justify-center bg-gradient-to-br from-[#0B0B19] to-[#13113C] border border-white/5 shadow-2xl">
          <div className="relative z-10">
            <p className="text-brand-textMuted text-sm mb-1 font-medium">Vítej zpět,</p>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-wide">{userName}</h2>
          </div>
        </div>

        <div className="bg-[#ffffff]/5 backdrop-blur-md rounded-[32px] p-8 w-fit border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setViewDate(new Date(year, month - 1))} className="w-10 h-10 rounded-full bg-brand-card flex items-center justify-center hover:bg-white/10 text-white"><ChevronLeft size={20} /></button>
            <div className="flex gap-2">
              <span className="bg-brand-card px-5 py-2 rounded-lg font-bold text-white">{monthNames[month]}</span>
              <span className="bg-brand-card px-5 py-2 rounded-lg font-bold text-brand-red">{year}</span>
            </div>
            <button onClick={() => setViewDate(new Date(year, month + 1))} className="w-10 h-10 rounded-full bg-brand-card flex items-center justify-center hover:bg-white/10 text-white"><ChevronRight size={20} /></button>
          </div>

          <div className="grid grid-cols-7 gap-3 mb-4 text-center text-sm font-semibold text-brand-textMuted">
            {daysOfWeek.map(day => <div key={day}>{day}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-3 text-center text-sm font-medium">
            {calendarGrid.map((cell, i) => {
              const hasTest = tests.some(t => t.date === cell.fullDate);
              const isToday = cell.fullDate === new Date().toISOString().split('T')[0];

              return (
                <div 
                  key={i} 
                  className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all border border-white/5 
                    ${!cell.currentMonth ? 'text-white/10' : 'text-white'}
                    ${hasTest ? 'bg-[#13113C] border-brand-red/50 shadow-[0_0_10px_rgba(229,57,53,0.2)]' : 'bg-brand-card'}
                    ${isToday ? 'ring-2 ring-brand-red ring-offset-2 ring-offset-[#0B0B19]' : ''}
                    ${cell.currentMonth ? 'hover:bg-white/10 cursor-pointer' : ''}
                  `}
                >
                  {cell.day}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 mt-8 font-bold text-sm text-white/80">
             <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-lg bg-[#13113C] border border-brand-red/50 flex items-center justify-center text-xs">1</span><span>Test</span></div>
          </div>
        </div>
      </div>

      <div className="bg-[#B0B0B0] rounded-[32px] p-8 text-black min-h-[500px]">
        <h3 className="text-3xl font-extrabold mb-8 tracking-tight">Nadcházející</h3>
        <div className="flex flex-col">
          {tests.length > 0 ? tests.map((test, index) => (
            <Link 
              to={`/testy/${test.test_ID}`} 
              key={test.test_ID} 
              className={`flex justify-between items-center py-5 hover:opacity-60 transition-opacity cursor-pointer ${index !== tests.length - 1 ? 'border-b border-black/20' : ''}`}
            >
              <span className="font-bold text-lg">{test.name}</span>
              <div className="text-right">
                <div className="font-extrabold text-black">Předmět ID: {test.subject_ID}</div>
                <div className="text-sm font-semibold text-black/60">{getTimeLeft(test.date)}</div>
              </div>
            </Link>
          )) : (
            <p className="text-black/40 italic">Žádné testy k zobrazení...</p>
          )}
        </div>
      </div>
    </div>
  );
};