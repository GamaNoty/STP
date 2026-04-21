import React, { useState, useEffect } from 'react';
import { Calendar, type CalendarEvent } from '../components/Calendar';
import { Loader2 } from 'lucide-react';

interface BackendTest {
  test_ID: number;
  subject_ID: number;
  group_ID: number | null;
  user_ID: number;
  name: string;
  date: string;
}

export const CalendarView = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${import.meta.env.VITE_URL}/api/tests`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Nepodařilo se načíst data pro kalendář');

        const data: BackendTest[] = await response.json();

        const formattedEvents: CalendarEvent[] = data.map((test) => ({
          id: test.test_ID,
          date: test.date,
          name: test.name,
          bgColor: 'bg-[#FFB5B5]',
          textColor: 'text-[#8A1A1A]'
        }));

        setEvents(formattedEvents);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Neznámá chyba při načítání testů');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendarData();
  }, []);

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-brand-red" size={48} />
    </div>
  );

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] w-full max-w-[1600px] overflow-hidden">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-wide">Kalendář</h2>
          <p className="text-brand-textMuted text-sm">Přehled tvých studijních povinností</p>
        </div>
        {error && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-2 rounded-xl text-sm">
            {error}
          </div>
        )}
      </div>

      <Calendar events={events} />
    </div>
  );
};