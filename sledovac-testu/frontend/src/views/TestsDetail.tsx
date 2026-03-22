import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CalendarDays, Clock, MapPin, User, CheckCircle2, Circle, 
  FileText, Link as LinkIcon, Download, BookOpen, AlertCircle, 
  ArrowLeft, Loader2, Edit3, Plus 
} from 'lucide-react';

import { TestDetailModal } from '../components/modals/TestDetailModal';
import { TopicModal } from '../components/modals/TopicModal';
import { MaterialModal } from '../components/modals/MaterialModal';

interface TestDetailData {
  test_ID: number;
  name: string;
  date: string;
  subject_ID: number;
  time?: string;
  room?: string;
  teacher?: string;
  description?: string;
}

interface Topic {
  id: number;
  text: string;
  done: boolean;
}

interface Material {
  id: number;
  name: string;
  type: string;
  size: string;
  url?: string;
}

export const TestsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [testInfo, setTestInfo] = useState<TestDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);

  const [topics, setTopics] = useState<Topic[]>([
  ]);

  const [materials, setMaterials] = useState<Material[]>([
  ]);

  const fetchTestDetail = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/tests`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Nepodařilo se načíst detail testu');
      
      const data: TestDetailData[] = await response.json();
      const currentTest = data.find(t => t.test_ID === Number(id));
      
      if (!currentTest) throw new Error('Test nebyl nalezen.');
      
      setTestInfo({
        ...currentTest,
        time: currentTest.time || '08:00 - 08:45',
        room: currentTest.room || 'Neurceno',
        teacher: currentTest.teacher || 'Neurceno',
        description: currentTest.description || 'Zatim bez popisu. Klikni na Upravit detaily.'
      });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchTestDetail();
  }, [fetchTestDetail]);

  const toggleTopic = (topicId: number) => {
    setTopics(topics.map(t => t.id === topicId ? { ...t, done: !t.done } : t));
  };

  const handleAddTopic = (text: string) => {
    const newTopic: Topic = { id: Date.now(), text, done: false };
    setTopics([...topics, newTopic]);
  };

  const handleAddMaterial = (name: string, url: string) => {
    const newMaterial: Material = { id: Date.now(), name, type: 'link', size: 'Externí', url };
    setMaterials([...materials, newMaterial]);
  };

  const progress = topics.length > 0 
    ? Math.round((topics.filter(t => t.done).length / topics.length) * 100) 
    : 0;

  const getDaysLeft = (testDate: string) => {
    const diff = new Date(testDate).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Dnes';
    if (days === 1) return 'Zítra';
    return days < 0 ? 'Proběhlo' : `Za ${days} dny`;
  };

  if (isLoading) return <div className="flex h-64 items-center justify-center text-brand-red"><Loader2 className="animate-spin" size={48} /></div>;
  if (error || !testInfo) return <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-xl text-sm">{error || 'Něco se pokazilo'}</div>;

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px]">
      
      <div className="flex flex-col gap-4">
        <button 
          onClick={() => navigate('/testy')}
          className="flex items-center gap-2 text-brand-textMuted hover:text-white transition-colors w-fit text-sm font-bold"
        >
          <ArrowLeft size={16} /> Zpět na seznam testů
        </button>

        <div className="flex justify-between items-end flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-brand-red/20 text-brand-red px-3 py-1 rounded-full text-xs font-bold border border-brand-red/30 uppercase tracking-wider">
                ID Předmětu: {testInfo.subject_ID}
              </span>
              <span className="text-brand-textMuted text-sm flex items-center gap-1">
                <AlertCircle size={14} className={getDaysLeft(testInfo.date) === 'Proběhlo' ? 'text-brand-textMuted' : 'text-amber-400'} /> 
                {getDaysLeft(testInfo.date)}
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-white tracking-wide">{testInfo.name}</h2>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="bg-[#1C1C24] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-white/10 transition-all border border-white/10 flex items-center gap-2"
            >
              <Edit3 size={18} /> Upravit detaily
            </button>
            <button className="bg-brand-red text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-brand-redHover transition-all shadow-lg shadow-brand-red/20 flex items-center gap-2">
              <BookOpen size={18} /> Přidat k učení
            </button>
          </div>
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
                <span className="text-white font-medium">{new Date(testInfo.date).toLocaleDateString('cs-CZ')}</span>
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
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-white">Co se musím naučit</h3>
                <button 
                  onClick={() => setIsTopicModalOpen(true)}
                  className="bg-white/5 hover:bg-white/10 text-white p-1.5 rounded-lg transition-colors border border-white/5"
                  title="Přidat téma"
                >
                  <Plus size={16} />
                </button>
              </div>
              <span className="text-brand-red font-bold text-lg">{progress}% hotovo</span>
            </div>

            <div className="w-full h-2 bg-brand-bg rounded-full overflow-hidden mb-6 border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-brand-red to-red-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex flex-col gap-3">
              {topics.length === 0 && (
                <p className="text-brand-textMuted text-sm italic">Zatím nemáš žádná témata k učení.</p>
              )}
              {topics.map((topic) => (
                <div 
                  key={topic.id} onClick={() => toggleTopic(topic.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                    topic.done ? 'bg-brand-red/10 border-brand-red/20 text-white/50' : 'bg-brand-card hover:bg-white/5 border-white/5 text-white'
                  }`}
                >
                  {topic.done ? <CheckCircle2 className="text-brand-red min-w-[24px]" size={24} /> : <Circle className="text-brand-textMuted min-w-[24px]" size={24} />}
                  <span className={`font-medium ${topic.done ? 'line-through' : ''}`}>{topic.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-[#1C1C24]/50 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl h-full">
            <h3 className="text-xl font-bold text-white mb-6">Materiály k testu</h3>
            <div className="flex flex-col gap-4">
              {materials.length === 0 && (
                <p className="text-brand-textMuted text-sm italic">Žádné materiály k dispozici.</p>
              )}
              {materials.map((mat) => (
                <div 
                  key={mat.id} 
                  onClick={() => mat.url && window.open(mat.url, '_blank')}
                  className="group flex items-center justify-between p-4 bg-brand-bg/50 rounded-xl border border-white/5 hover:border-brand-red/30 cursor-pointer transition-colors"
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
                  {mat.type === 'link' ? (
                    <LinkIcon size={18} className="text-brand-textMuted group-hover:text-white transition-colors ml-2 min-w-[18px]" />
                  ) : (
                    <Download size={18} className="text-brand-textMuted group-hover:text-white transition-colors ml-2 min-w-[18px]" />
                  )}
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => setIsMaterialModalOpen(true)}
              className="w-full mt-6 py-3 rounded-xl border border-dashed border-white/20 text-brand-textMuted hover:text-white hover:border-white/50 hover:bg-white/5 transition-all text-sm font-bold flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Přidat odkaz na materiál
            </button>
          </div>
        </div>
      </div>

      <TestDetailModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={{
          time: testInfo.time || '',
          room: testInfo.room || '',
          teacher: testInfo.teacher || '',
          description: testInfo.description || ''
        }}
        onSave={(newData) => {
          setTestInfo(prev => prev ? { ...prev, ...newData } : prev);
        }}
      />

      <TopicModal 
        isOpen={isTopicModalOpen}
        onClose={() => setIsTopicModalOpen(false)}
        onAdd={handleAddTopic}
      />

      <MaterialModal 
        isOpen={isMaterialModalOpen}
        onClose={() => setIsMaterialModalOpen(false)}
        onAdd={handleAddMaterial}
      />

    </div>
  );
};