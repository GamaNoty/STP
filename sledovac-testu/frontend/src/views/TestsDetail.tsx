import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, User, CheckCircle2, Circle, FileText, Link as LinkIcon, Download, BookOpen, AlertCircle, ArrowLeft } from 'lucide-react';

export const TestsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const testInfo = {
    name: "Pololetní písemná práce",
    subject: "Matematika",
    date: "15. Dubna 2024",
    time: "08:00 - 09:40",
    room: "Učebna 302",
    teacher: "Mgr. Jan Novák",
    description: `Shrnutí látky za celé první pololetí. Pozor, test bude obsahovat i 2 složitější slovní úlohy na pohyb. Kalkulačky jsou povoleny. (Test ID: ${id})`
  };

  const [topics, setTopics] = useState([
    { id: 1, text: "Lineární rovnice s jednou neznámou", done: true },
    { id: 2, text: "Kvadratické rovnice a diskriminant", done: true },
    { id: 3, text: "Soustavy rovnic (sčítací a dosazovací metoda)", done: false },
    { id: 4, text: "Slovní úlohy o pohybu", done: false },
    { id: 5, text: "Úpravy složitých algebraických výrazů", done: false },
  ]);

  const materials = [
    { id: 1, name: "Shrnutí_vzorců.pdf", type: "pdf", size: "2.4 MB" },
    { id: 2, name: "Zkušební_test_2023.docx", type: "doc", size: "1.1 MB" },
    { id: 3, name: "Video: Khan Academy - Kvadratické rovnice", type: "link", size: "Externí" }
  ];

  const toggleTopic = (id: number) => {
    setTopics(topics.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const progress = Math.round((topics.filter(t => t.done).length / topics.length) * 100);

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px]">
      
      <div className="flex flex-col gap-4">
        {/* Přidáno tlačítko Zpět */}
        <button 
          onClick={() => navigate('/testy')}
          className="flex items-center gap-2 text-brand-textMuted hover:text-white transition-colors w-fit text-sm font-bold"
        >
          <ArrowLeft size={16} /> Zpět na seznam testů
        </button>

        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-brand-red/20 text-brand-red px-3 py-1 rounded-full text-xs font-bold border border-brand-red/30 uppercase tracking-wider">
                {testInfo.subject}
              </span>
              <span className="text-brand-textMuted text-sm flex items-center gap-1">
                <AlertCircle size={14} className="text-orange-400" /> Za 2 dny
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-white tracking-wide">{testInfo.name}</h2>
          </div>
          <button className="bg-white/10 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-white/20 transition-all border border-white/10 flex items-center gap-2">
            <BookOpen size={18} />
            Přidat k učení
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2">
        
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          <div className="bg-[#1C1C24]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl">
            <p className="text-brand-textMuted mb-6 leading-relaxed">
              {testInfo.description}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-brand-textMuted text-xs uppercase font-bold flex items-center gap-1"><CalendarDays size={14}/> Datum</span>
                <span className="text-white font-medium">{testInfo.date}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-brand-textMuted text-xs uppercase font-bold flex items-center gap-1"><Clock size={14}/> Čas</span>
                <span className="text-white font-medium">{testInfo.time}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-brand-textMuted text-xs uppercase font-bold flex items-center gap-1"><MapPin size={14}/> Místnost</span>
                <span className="text-white font-medium">{testInfo.room}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-brand-textMuted text-xs uppercase font-bold flex items-center gap-1"><User size={14}/> Zkoušející</span>
                <span className="text-white font-medium">{testInfo.teacher}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#1C1C24]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Co se musím naučit</h3>
              <span className="text-brand-red font-bold text-lg">{progress}% hotovo</span>
            </div>

            <div className="w-full h-2 bg-brand-bg rounded-full overflow-hidden mb-6 border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-brand-red to-red-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex flex-col gap-3">
              {topics.map((topic) => (
                <div 
                  key={topic.id}
                  onClick={() => toggleTopic(topic.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                    topic.done 
                      ? 'bg-brand-red/10 border-brand-red/20 text-white/50' 
                      : 'bg-brand-card hover:bg-white/5 border-white/5 text-white'
                  }`}
                >
                  {topic.done ? (
                    <CheckCircle2 className="text-brand-red min-w-[24px]" size={24} />
                  ) : (
                    <Circle className="text-brand-textMuted min-w-[24px]" size={24} />
                  )}
                  <span className={`font-medium ${topic.done ? 'line-through' : ''}`}>
                    {topic.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#1C1C24]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl h-full">
            <h3 className="text-xl font-bold text-white mb-6">Materiály k testu</h3>
            
            <div className="flex flex-col gap-4">
              {materials.map((mat) => (
                <div 
                  key={mat.id}
                  className="group flex items-center justify-between p-4 bg-brand-bg/50 rounded-xl border border-white/5 hover:border-brand-red/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-white/5 rounded-lg text-brand-red group-hover:bg-brand-red/20 transition-colors">
                      {mat.type === 'link' ? <LinkIcon size={20} /> : <FileText size={20} />}
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-sm font-bold text-white truncate">{mat.name}</span>
                      <span className="text-xs text-brand-textMuted">{mat.size}</span>
                    </div>
                  </div>
                  <Download size={18} className="text-brand-textMuted group-hover:text-white transition-colors ml-2 min-w-[18px]" />
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-3 rounded-xl border border-dashed border-white/20 text-brand-textMuted hover:text-white hover:border-white/50 hover:bg-white/5 transition-all text-sm font-bold flex items-center justify-center gap-2">
              <FileText size={16} />
              Nahrát vlastní poznámky
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};