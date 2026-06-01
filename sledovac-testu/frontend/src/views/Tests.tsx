import { ArrowDown, ArrowUp, ArrowUpDown, Loader2, Plus, Search, X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TestModal } from "../components/modals/TestModal";

type Test = {
  test_ID: number;
  name: string;
  date: string;
  subject_ID?: number;
  subject_name?: string;
  created_at?: string | number | Date;
};

type SortColumn = 'name' | 'created_at' | 'author' | 'subject' | 'date';

export const Tests = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [userName, setUserName] = useState("Student");

  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const [sortColumn, setSortColumn] = useState<SortColumn>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const fetchTests = useCallback(async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_URL}/api/tests`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Nepodařilo se načíst testy");

      const data: Test[] = await response.json();
      setTests(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Neznámá chyba při načítání testů");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTests();
    
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        if (user.name) setUserName(user.name);
      } catch (e) {
        console.error("Chyba při načítání uživatele z localStorage", e);
      }
    }
  }, [fetchTests]);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) return <ArrowUpDown size={14} className="opacity-30" />;
    return sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />;
  };

  const filteredTests = tests.filter((test) => {
    const matchesName =
      test.name.toLowerCase().includes(searchName.toLowerCase()) ||
      (test.subject_name && test.subject_name.toLowerCase().includes(searchName.toLowerCase()));
    
    const matchesDate = searchDate ? test.date === searchDate : true;

    return matchesName && matchesDate;
  });

  const sortedAndFilteredTests = [...filteredTests].sort((a, b) => {
    let comparison = 0;

    switch (sortColumn) {
      case 'name':
        comparison = a.name.localeCompare(b.name, 'cs');
        break;
      case 'created_at':
        comparison = new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
        break;
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'subject':
        comparison = (a.subject_name || 'Obecný').localeCompare(b.subject_name || 'Obecný', 'cs');
        break;
      case 'author':
        comparison = 0;
        break;
      default:
        comparison = 0;
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  if (isLoading)
    return (
      <div className="flex h-64 items-center justify-center text-brand-red">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-wide">Testy</h2>
          <p className="text-brand-textMuted text-sm mt-1">Správa a přehled všech zkoušek</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-brand-red text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-brand-redHover transition-colors shadow-lg shadow-brand-red/20"
        >
          <Plus size={18} /> Vytvořit test
        </button>
      </div>

      {error && (
        <div className="text-amber-500 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">{error}</div>
      )}

      <div className="flex flex-col md:flex-row gap-4 items-center bg-[#1C1C24]/30 p-4 rounded-[24px] border border-white/5">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-textMuted" size={18} />
          <input
            type="text"
            placeholder="Hledat podle jména testu nebo předmětu..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="w-full bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-brand-red/50 transition-colors"
          />
        </div>

        <div className="w-full md:w-auto flex gap-4 items-center">
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="w-full md:w-auto bg-[#0A0A10]/50 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-brand-red/50 transition-colors"
            style={{ colorScheme: 'dark' }}
          />

          {(searchName || searchDate) && (
            <button 
              onClick={() => { setSearchName(""); setSearchDate(""); }}
              className="flex items-center gap-2 text-brand-textMuted hover:text-brand-red transition-colors p-2"
              title="Zrušit filtry"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="bg-[#1C1C24]/30 p-6 rounded-[24px] border border-white/5">
        
        <div className="grid grid-cols-5 gap-4 pb-4 border-b-2 border-brand-red text-brand-red font-bold text-xs md:text-sm tracking-wider uppercase px-4 select-none">
          
          <div 
            className="col-span-1 flex items-center gap-1 cursor-pointer hover:text-white transition-colors"
            onClick={() => handleSort('name')}
          >
            Jméno testu <SortIcon column="name" />
          </div>
          
          <div 
            className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"
            onClick={() => handleSort('created_at')}
          >
            Datum zadání <SortIcon column="created_at" />
          </div>
          
          <div 
            className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"
            onClick={() => handleSort('author')}
          >
            Autor <SortIcon column="author" />
          </div>
          
          <div 
            className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"
            onClick={() => handleSort('subject')}
          >
            Předmět <SortIcon column="subject" />
          </div>
          
          <div 
            className="flex items-center justify-end gap-1 cursor-pointer hover:text-white transition-colors text-right"
            onClick={() => handleSort('date')}
          >
            <SortIcon column="date" /> Termín
          </div>

        </div>

        <div className="flex flex-col mt-2">
          {sortedAndFilteredTests.length > 0 ? (
            sortedAndFilteredTests.map((test) => (
              <div
                key={test.test_ID}
                onClick={() => navigate(`/testy/${test.test_ID}`)}
                className="grid grid-cols-5 gap-4 py-5 px-4 items-center text-sm font-medium border-b border-white/5 cursor-pointer hover:bg-white/5 hover:scale-[1.01] transition-all duration-200 rounded-xl"
              >
                <div className="col-span-1 text-white text-base font-bold truncate pr-2">
                  {test.name}
                </div>
                
                <div className="text-brand-textMuted">
                  {new Date(test.created_at || Date.now()).toLocaleDateString('cs-CZ')}
                </div>
                
                <div className="text-brand-textMuted truncate pr-2" title={userName}>
                  {userName}
                </div>
                
                <div className="text-white font-bold truncate pr-2" title={test.subject_name || "Obecný"}>
                  {test.subject_name || "Obecný"}
                </div>
                
                <div className="text-right flex items-center justify-end">
                  <span className="text-brand-red font-bold text-base">
                    {new Date(test.date).toLocaleDateString('cs-CZ')}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-brand-textMuted flex flex-col items-center gap-2">
              <Search size={32} className="opacity-20 mb-2" />
              <p>Zadaným filtrům neodpovídá žádný test.</p>
              {(searchName || searchDate) && (
                <button 
                  onClick={() => { setSearchName(""); setSearchDate(""); }}
                  className="text-brand-red hover:underline mt-2 text-sm"
                >
                  Zrušit filtry
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <TestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTests}
      />
    </div>
  );
};