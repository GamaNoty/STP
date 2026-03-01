import React from 'react';
import { BookOpen, Calculator, Globe, Atom, Code, Plus } from 'lucide-react';

export const Subjects = () => {
  const subjects = [
    { id: 1, name: 'Matematika', teacher: 'Mgr. Jan Novák', tests: 3, icon: Calculator, color: 'from-blue-500 to-blue-700' },
    { id: 2, name: 'Český jazyk', teacher: 'PhDr. Eva Malá', tests: 1, icon: BookOpen, color: 'from-brand-red to-red-800' },
    { id: 3, name: 'Angličtina', teacher: 'Bc. Peter Smith', tests: 0, icon: Globe, color: 'from-green-500 to-green-700' },
    { id: 4, name: 'Fyzika', teacher: 'Ing. Karel Zelený', tests: 2, icon: Atom, color: 'from-purple-500 to-purple-700' },
    { id: 5, name: 'Programování', teacher: 'Bc. David Černý', tests: 5, icon: Code, color: 'from-orange-500 to-orange-700' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px]">
      
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-wide mb-2">Předměty</h2>
          <p className="text-brand-textMuted">Správa vyučovacích předmětů</p>
        </div>
        <button className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-2 rounded-full font-bold text-sm hover:bg-white/20 transition-all">
          <Plus size={18} /> Přidat předmět
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
        
        {subjects.map((subject) => (
          <div 
            key={subject.id} 
            className="group bg-[#1C1C24]/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-red/10 transition-all duration-300 cursor-pointer flex flex-col"
          >
            <div className={`h-24 bg-gradient-to-r ${subject.color} relative overflow-hidden flex items-center justify-center`}>
              <subject.icon size={100} className="absolute text-white/20 -right-4 -bottom-4 transform rotate-12 group-hover:rotate-0 transition-transform duration-500" />
              <subject.icon size={40} className="text-white relative z-10 drop-shadow-lg" />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-transparent to-[#0A0A10]/50">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{subject.name}</h3>
                <p className="text-sm text-brand-textMuted mb-6">{subject.teacher}</p>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-xs font-bold text-brand-textMuted uppercase tracking-wider">Aktivní testy</span>
                {subject.tests > 0 ? (
                  <span className="bg-brand-red/20 text-brand-red px-3 py-1 rounded-full text-xs font-bold border border-brand-red/30 shadow-[0_0_10px_rgba(229,57,53,0.2)]">
                    {subject.tests} testů
                  </span>
                ) : (
                  <span className="bg-white/5 text-brand-textMuted px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                    Žádné
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
};