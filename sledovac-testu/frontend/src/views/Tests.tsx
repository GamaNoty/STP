import React from 'react';
import { Clock, BookOpen, ChevronDown, Plus, User, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Tests = () => {
  const navigate = useNavigate();

  const tests = [
    { id: 1, name: 'Pololetní písemná práce', date: 'Zadáno před 3h', author: 'Jan Novák', group: 'Skupina 2', subject: 'Matematika', time: 'Za 2 dny' },
    { id: 2, name: 'Slovíčka - Lekce 4', date: 'Zadáno včera', author: 'Peter Smith', group: 'Skupina 1', subject: 'Angličtina', time: 'Za 5 dní' },
    { id: 3, name: 'Optika a čočky', date: 'Zadáno před 2 dny', author: 'Karel Zelený', group: 'Všichni', subject: 'Fyzika', time: 'Za týden' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      
      <div className="flex justify-between items-end">
        <h2 className="text-3xl font-bold text-white tracking-wide">Testy</h2>
        
        <button className="flex items-center gap-2 bg-brand-red text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-brand-redHover transition-colors shadow-lg shadow-brand-red/20">
          <Plus size={18} />
          Vytvořit test
        </button>
      </div>

      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-brand-textMuted hover:text-white hover:border-white/40 transition-all text-sm">
          <Clock size={16} /><span>Zadáno</span><ChevronDown size={14} className="ml-1" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-brand-textMuted hover:text-white hover:border-white/40 transition-all text-sm">
          <User size={16} /><span>Autor</span><ChevronDown size={14} className="ml-1" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-brand-textMuted hover:text-white hover:border-white/40 transition-all text-sm">
          <Users size={16} /><span>Týmy</span><ChevronDown size={14} className="ml-1" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-brand-textMuted hover:text-white hover:border-white/40 transition-all text-sm">
          <BookOpen size={16} /><span>Předmět</span><ChevronDown size={14} className="ml-1" />
        </button>
      </div>

      <div className="mt-4 bg-[#1C1C24]/30 p-6 rounded-[24px] border border-white/5">
        <div className="grid grid-cols-5 gap-4 pb-4 border-b-2 border-brand-red text-brand-red font-bold text-sm tracking-wider uppercase px-4">
          <div className="col-span-1">Jméno testu</div>
          <div>Datum zadání</div>
          <div>Autor</div>
          <div>Skupina</div>
          <div className="text-right">Předmět/Termín</div>
        </div>

        <div className="flex flex-col">
          {tests.map((test) => (
            <div 
              key={test.id} 
              onClick={() => navigate(`/testy/${test.id}`)}
              className="grid grid-cols-5 gap-4 py-6 px-4 items-center text-sm font-medium border-b border-white/5 cursor-pointer hover:bg-white/5 hover:scale-[1.01] transition-all duration-200 rounded-xl"
            >
              <div className="col-span-1 text-white text-base font-bold">{test.name}</div>
              <div className="text-brand-textMuted">{test.date}</div>
              <div className="text-brand-textMuted">{test.author}</div>
              <div className="text-brand-textMuted">{test.group}</div>
              <div className="text-right flex flex-col">
                <span className="text-white font-bold">{test.subject}</span>
                <span className="text-brand-red">{test.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};