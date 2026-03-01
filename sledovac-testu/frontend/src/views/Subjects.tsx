import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Loader2 } from 'lucide-react';

interface Subject {
  subject_ID: number;
  name: string;
  color?: string;
}

export const Subjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/subjects', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Nepodařilo se načíst předměty');

        const data = await response.json();
        setSubjects(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (isLoading) return (
    <div className="flex h-64 items-center justify-center text-brand-red">
      <Loader2 className="animate-spin" size={48} />
    </div>
  );

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1200px]">
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-wide">Moje předměty</h2>
          <p className="text-brand-textMuted text-sm">Správa tvých studijních oborů</p>
        </div>
        <button className="flex items-center gap-2 bg-brand-red text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-brand-redHover transition-colors shadow-lg shadow-brand-red/20">
          <Plus size={18} />
          Přidat předmět
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.length > 0 ? subjects.map((subject) => (
          <div 
            key={subject.subject_ID}
            className="bg-[#1C1C24]/60 backdrop-blur-md p-6 rounded-[24px] border border-white/5 hover:border-brand-red/30 transition-all group cursor-default"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-card rounded-2xl border border-white/5 text-brand-red group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">{subject.name}</span>
                <span className="text-brand-textMuted text-xs uppercase tracking-widest font-bold">ID: {subject.subject_ID}</span>
              </div>
            </div>
            
            <div 
              className="h-1 w-full mt-6 rounded-full bg-brand-red opacity-20 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: subject.color }}
            ></div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center bg-[#1C1C24]/20 rounded-[32px] border border-dashed border-white/10">
            <p className="text-brand-textMuted">Zatím nemáš žádné předměty. Přidej první!</p>
          </div>
        )}
      </div>

    </div>
  );
};