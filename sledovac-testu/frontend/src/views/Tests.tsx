import React from 'react';
import { Clock, User, Users, BookOpen, ChevronDown } from 'lucide-react';

export const Tests = () => {
  const tests = [
    { id: 1, name: 'Detail Testu', date: 'Zadáno před 3h', author: 'John Doe', group: 'Předmět sk.2', subject: 'Předmět', time: 'Za 2 dny' },
    { id: 2, name: 'Detail Testu', date: 'Zadáno před 3h', author: 'John Doe', group: 'Předmět sk.2', subject: 'Předmět', time: 'Za 2 dny' },
    { id: 3, name: 'Detail Testu', date: 'Zadáno před 3h', author: 'John Doe', group: 'Předmět sk.2', subject: 'Předmět', time: 'Za 2 dny' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      <h2 className="text-3xl font-bold text-white tracking-wide">Testy</h2>

      <div className="flex gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-brand-textMuted hover:text-white hover:border-white/40 transition-all text-sm">
          <Clock size={16} />
          <span>Zadáno</span>
          <ChevronDown size={14} className="ml-1" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-brand-textMuted hover:text-white hover:border-white/40 transition-all text-sm">
          <User size={16} />
          <span>Autor</span>
          <ChevronDown size={14} className="ml-1" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-brand-textMuted hover:text-white hover:border-white/40 transition-all text-sm">
          <Users size={16} />
          <span>Týmy</span>
          <ChevronDown size={14} className="ml-1" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-brand-textMuted hover:text-white hover:border-white/40 transition-all text-sm">
          <BookOpen size={16} />
          <span>Předmět</span>
          <ChevronDown size={14} className="ml-1" />
        </button>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-5 gap-4 pb-4 border-b-2 border-brand-red text-brand-red font-bold text-sm tracking-wider uppercase">
          <div className="col-span-1">Jméno testu</div>
          <div>Datum zadání</div>
          <div>Autor</div>
          <div>Skupina</div>
          <div className="text-right">Předmět/Termín</div>
        </div>

        <div className="flex flex-col">
          {tests.map((test, index) => (
            <div 
              key={test.id} 
              className={`grid grid-cols-5 gap-4 py-6 items-center text-sm font-medium ${
                index !== tests.length - 1 ? 'border-b border-white/10' : ''
              }`}
            >
              <div className="col-span-1 text-white text-base">{test.name}</div>
              <div className="text-brand-textMuted">{test.date}</div>
              <div className="text-brand-textMuted">{test.author}</div>
              <div className="text-brand-textMuted">{test.group}</div>
              <div className="text-right flex flex-col">
                <span className="text-white">{test.subject}</span>
                <span className="text-brand-textMuted">{test.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};